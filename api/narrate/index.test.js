const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('./index');

const settingNames = ['AI_PROVIDER', 'FOUNDRY_ENDPOINT', 'FOUNDRY_API_KEY', 'FOUNDRY_DEPLOYMENT'];
const savedSettings = Object.fromEntries(settingNames.map((name) => [name, process.env[name]]));
const originalFetch = global.fetch;

test.afterEach(() => {
  for (const name of settingNames) {
    if (savedSettings[name] === undefined) delete process.env[name];
    else process.env[name] = savedSettings[name];
  }
  global.fetch = originalFetch;
});

function configureFoundry() {
  process.env.AI_PROVIDER = 'foundry';
  process.env.FOUNDRY_ENDPOINT = 'https://foundry.example.test';
  process.env.FOUNDRY_API_KEY = 'test-secret';
  process.env.FOUNDRY_DEPLOYMENT = 'gpt-5-mini';
}

function context() {
  return { log: { warn() {}, error() {} } };
}

function sampleEvents() {
  return [
    { id: 'press-1', timestamp: '63:18', type: 'pressure', team: 'Northbridge', player: 'Samir Haddad', synthetic: true },
    { id: 'pass-1', timestamp: '63:20', type: 'pass', team: 'Vale United', player: 'Camila Vega', receiver: 'Sara Costa', distance_m: 42, travel_seconds: 1.45, pressure_pct: 78, outcome: 'completed', synthetic: true }
  ];
}

function analystOutput(ids = ['press-1', 'pass-1']) {
  return { tactical_read: 'Vale played through the press with a completed forward pass.', why_it_matters: 'The pass followed opposing pressure in the received events.', evidence_event_ids: ids };
}

function narratorOutput(ids = ['press-1', 'pass-1']) {
  return { story: 'Vale escaped the press with a forward pass.', recap: 'Northbridge pressed before Vale completed a diagonal pass.', evidence_event_ids: ids };
}

function queuedModelResponses(responses, requests = []) {
  let index = 0;
  global.fetch = async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) });
    const value = responses[index++];
    if (value instanceof Error) throw value;
    return { ok: true, json: async () => ({ output_text: JSON.stringify(value) }) };
  };
}

test('reports the configured orchestrated workflow without exposing credentials', async () => {
  configureFoundry();
  const response = await handler(context(), { method: 'GET', headers: {} });
  assert.equal(response.status, 200);
  assert.equal(response.body.configured, true);
  assert.equal(response.body.mode, 'orchestrated_narration');
  assert.deepEqual(response.body.workflow, ['tactical_analysis', 'audience_narration', 'evidence_verification']);
  assert.equal(JSON.stringify(response.body).includes('test-secret'), false);
});

test('coordinates tactical and audience agents, then verifies the evidence chain', async () => {
  configureFoundry();
  const requests = [];
  queuedModelResponses([analystOutput(), narratorOutput()], requests);
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-orchestrated-client' },
    body: { match_id: 'session-1', task: 'match_recap', events: sampleEvents(), metrics: { sequence_count: 1, pass_count: 1, pass_difficulty_score: 74 }, language: 'en', mode: 'analyst', preference: { team: 'Vale United', player: 'Sara Costa', metric: 'distance' } }
  });
  assert.equal(response.status, 200);
  assert.equal(requests.length, 2);
  assert.equal(requests[0].url, 'https://foundry.example.test/openai/v1/responses');
  assert.match(requests[0].body.instructions, /Tactical Analyst agent/);
  const narratorInput = JSON.parse(requests[1].body.input);
  assert.match(requests[1].body.instructions, /Audience Narrator agent/);
  assert.equal(narratorInput.task, 'complete_session_recap');
  assert.equal(narratorInput.metrics.sequence_count, 1);
  assert.deepEqual(narratorInput.tactical_analysis.allowed_evidence_event_ids, ['press-1', 'pass-1']);
  assert.deepEqual(narratorInput.preference, { team: 'Vale United', player: 'Sara Costa', metric: 'distance' });
  assert.deepEqual(response.body.orchestration, {
    workflow: ['tactical_analysis', 'audience_narration', 'evidence_verification'], model_calls: 2, verified: true
  });
  assert.deepEqual(response.body.verification, {
    status: 'verified',
    method: 'narrator citations are a subset of tactical-agent citations and match received synthetic event IDs',
    verified_event_ids: ['press-1', 'pass-1']
  });
  assert.deepEqual(response.body.evidence_event_ids, ['press-1', 'pass-1']);
  assert.equal(response.body.why_it_matters, analystOutput().why_it_matters);
});

test('stops orchestration before narration when the tactical agent cites unknown evidence', async () => {
  configureFoundry();
  const requests = [];
  queuedModelResponses([analystOutput(['not-received'])], requests);
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-invalid-tactical-evidence' },
    body: { events: sampleEvents(), language: 'en', mode: 'fan' }
  });
  assert.equal(response.status, 502);
  assert.equal(response.body.stage, 'tactical_analysis_evidence');
  assert.equal(response.body.error, 'invalid_evidence_references');
  assert.equal(requests.length, 1);
});

test('rejects narrator evidence outside the tactical agent evidence boundary', async () => {
  configureFoundry();
  const requests = [];
  queuedModelResponses([analystOutput(['pass-1']), narratorOutput(['press-1'])], requests);
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-narrator-evidence-boundary' },
    body: { events: sampleEvents(), language: 'en', mode: 'fan' }
  });
  assert.equal(response.status, 502);
  assert.equal(response.body.error, 'invalid_evidence_references');
  assert.equal(response.body.stage, 'evidence_verification');
  assert.equal(requests.length, 2);
});

test('rejects non-synthetic and out-of-order events before calling the model', async () => {
  configureFoundry();
  global.fetch = async () => { throw new Error('model must not be called'); };
  const nonSynthetic = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-invalid-client' },
    body: { events: [{ ...sampleEvents()[0], synthetic: false }] }
  });
  assert.equal(nonSynthetic.status, 400);
  const outOfOrder = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-order-client' },
    body: { events: sampleEvents().reverse() }
  });
  assert.equal(outOfOrder.status, 400);
});

test('uses an unavailable response when Foundry settings are missing', async () => {
  for (const name of settingNames) delete process.env[name];
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-unconfigured-client' }, body: { events: sampleEvents() }
  });
  assert.equal(response.status, 503);
  assert.equal(response.body.error, 'ai_not_configured');
});
