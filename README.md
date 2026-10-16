# READ THE GAME

Read the Game is a bilingual match intelligence workspace for fictional football events. It reconstructs the action, calculates football signals, explains why they matter, and turns selected moments into timed, machine-readable overlay cues.

## What works in this version

- Three repeatable tactical patterns: a diagonal outlet, a central overload, and a wide escape. Each pattern has its own player routes, question, evidence, and generated recap.
- A synthetic event feed that arrives in timed steps and updates the pitch, event list, metrics, story, and recap as each event lands.
- Import of structured synthetic event JSON, with validation that rejects real/non-synthetic labels, unknown event types, teams, or roster names; imported events replay through the same feed.
- Fictional player identification by name, number, position, and team. Player top speed is surfaced above a 25 km/h threshold.
- Pass distance and completion, illustrative pass difficulty, estimated ball and shot speed, and qualitative sequence control, pressure, and rhythm.
- Evidence-linked explanations, a transparent “what if” route estimate, and a short recap of the events received so far.
- Fan and analyst modes, Spanish and English, and saved preferences for team, player, and metric.
- Downloadable schema 1.2 JSON containing structured events, derived metrics, and timestamped overlay cues linked to event IDs.
- A two-stage intelligence workflow: deterministic tactical signal detection (pressure escape, speed threshold, difficult pass, shot/save, pressure snapshot), followed by Microsoft Foundry narration grounded in those signals and event references.
- Azure Static Web Apps hosting and an Azure Functions endpoint prepared for Microsoft Foundry. Cloud narration is only active after the updated code is deployed and the server-side Foundry settings are configured.

## Honest scope

The app uses only fictional, football-realistic events. It does not ingest an external match feed, analyze video, or identify real players from broadcast footage. Its “live” mode is a timed synthetic event stream and its recap covers the received sequence, not a full 90-minute match. Speed values and tactical difficulty are illustrative calculations from the supplied synthetic positions, not official tracking data. The Foundry endpoint has not yet been verified against the deployed site, so do not describe cloud AI as live until that test passes. No Premier League match data or imagery is included.

The hackathon description says video auto-eventing is a feature to consider; it is not stated as a must-have. The core submission still needs a real working AI connection, a public repository, a pitch that names technologies actually used, and a public demo video shorter than two minutes.

## Run it locally

Open index.html in a modern browser. Press **Start synthetic feed** to watch events arrive. **New sequence** rotates through the three tactical patterns. You can replay the timeline, switch Fan/Analyst and Spanish/English, follow a fictional player, compare the what-if route, and download event JSON after at least one event arrives. Use **Load JSON events** to ingest an exported synthetic event envelope and replay it. Opening the HTML file directly uses the deterministic local explanation; the Azure Functions API runs only in an Azure Static Web Apps / Functions environment. Run `node --test api/narrate/index.test.js` from the repository root to exercise the API contract with a mocked model response; this does not call Foundry or consume tokens.

## Microsoft Foundry and Azure

The current public Azure Static Web App still serves an older revision until the reviewed branch is deployed. This source includes api/narrate and the deployment workflow points to the api folder. Once the updated source is deployed, add these server-side environment variables in the Static Web App production environment:

- AI_PROVIDER = foundry
- FOUNDRY_ENDPOINT = the Foundry project endpoint
- FOUNDRY_API_KEY = the secret key
- FOUNDRY_DEPLOYMENT = gpt-5-mini

Never put the key in browser code, GitHub files, screenshots, or chat. The GET endpoint at /api/narrate should report configured: true after configuration; then test an actual narration and check Azure usage before enabling repeated calls. See api/README.md for configuration and cost details.

## Still needed for the hackathon submission

- Deploy this reviewed revision to Azure and verify the public site and API.
- Test Foundry with the deployed server-side settings and confirm event citations.
- Test the website at desktop and mobile widths and test JSON import/export in a browser.
- Prepare a concise pitch that accurately describes the implemented Microsoft/Azure services.
- Record and publish a demonstration video under two minutes, without unlicensed music or third-party marks.
- Add the public GitHub repository and public video URL to the hackathon project page.
