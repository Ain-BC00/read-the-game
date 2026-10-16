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

test('reports configured status without exposing credentials', async () => {
  configureFoundry();
  const response = await handler(context(), { method: 'GET', headers: {} });
  assert.equal(response.status, 200);
  assert.equal(response.body.configured, true);
  assert.equal(JSON.stringify(response.body).includes('test-secret'), false);
});

test('rejects Foundry narration that cites an event not received by the app', async () => {
  configureFoundry();
  let requestedUrl;
  let requestBody;
  global.fetch = async (url, options) => {
    requestedUrl = url;
    requestBody = JSON.parse(options.body);
    return {
      ok: true,
      json: async () => ({ output_text: JSON.stringify({
        story: 'Vale escaped the press.',
        why_it_matters: 'The completed pass followed pressure.',
        recap: 'Northbridge pressed before Vale completed a diagonal pass.',
        evidence_event_ids: ['pass-1', 'invented-event']
      }) })
    };
  };
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-narration-client' },
    body: { events: sampleEvents(), metrics: { pass_difficulty_score: 74 }, language: 'en', mode: 'analyst' }
  });
  assert.equal(response.status, 502);
  assert.equal(requestedUrl, 'https://foundry.example.test/openai/v1/responses');
  assert.match(requestBody.input, /pressure_escape/);
  assert.equal(response.body.error, 'invalid_evidence_references');
});

test('verifies every evidence reference against received synthetic events', async () => {
  configureFoundry();
  let requestBody;
  global.fetch = async (url, options) => {
    requestBody = JSON.parse(options.body);
    return { ok: true, json: async () => ({ output_text: JSON.stringify({
      story: 'Vale escaped the press.',
      why_it_matters: 'The pass followed pressure.',
      recap: 'Northbridge pressed before Vale completed a diagonal pass.',
      evidence_event_ids: ['press-1', 'pass-1']
    }) }) };
  };
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-verified-client' },
    body: { match_id: 'session-1', task: 'match_recap', events: sampleEvents(), metrics: { sequence_count: 1, pass_count: 1, pass_difficulty_score: 74 }, language: 'en', mode: 'analyst' }
  });
  assert.equal(response.status, 200);
  assert.equal(JSON.parse(requestBody.input).task, 'complete_session_recap');
  assert.equal(JSON.parse(requestBody.input).metrics.sequence_count, 1);
  assert.deepEqual(response.body.verification, {
    status: 'verified',
    method: 'all cited IDs match received synthetic event IDs',
    verified_event_ids: ['press-1', 'pass-1']
  });
  assert.deepEqual(response.body.evidence_event_ids, ['press-1', 'pass-1']);
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

test('uses a clear unavailable response when no Foundry settings exist', async () => {
  for (const name of settingNames) delete process.env[name];
  const response = await handler(context(), {
    method: 'POST', headers: { 'x-forwarded-for': 'test-unconfigured-client' }, body: { events: sampleEvents() }
  });
  assert.equal(response.status, 503);
  assert.equal(response.body.error, 'ai_not_configured');
});
