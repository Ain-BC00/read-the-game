# READ THE GAME — Azure-ready demo

A browser-based demo for the Synthetic Match Insights Engine challenge. Its central interaction combines a short tactical “read the play” challenge with a what-if comparison: viewers see how Vale escaped pressure, then compare that synthetic sequence with an alternative central pass and its estimated interception risk. All match data is synthetic and fictional.

## What the demo includes

- Repeatable synthetic match moments, with timeline, football pitch, player markers and animated ball path.
- An interactive question, feedback and evidence explaining the selected answer.
- Pass distance and nearest-defender gap calculated from the generated positions.
- A “what if?” route with an explicitly illustrative risk estimate, not a prediction.
- Fan and analyst views, Spanish and English text, recap, and downloadable structured event JSON.

## Honest scope

The demo creates synthetic events in the browser. It does not ingest a real live feed, call an AI model, or persist match data. No real Premier League data or footage is used. Do not describe AI agents or Azure runtime services as implemented until they have actually been connected and demonstrated.

## Run locally

Open `index.html` in a modern browser. Google Fonts are optional; system fallbacks are included. Use “Otra jugada” to generate another sequence, “¿Y si…?” to inspect the alternate route, and Fan/Analista and ES/EN to change the explanation.

## Host on Azure Static Web Apps

This repository is a static website and can be hosted by Azure Static Web Apps without a custom backend. In the Azure portal, create a Static Web App and connect this GitHub repository. Set the app location to `/`; leave API location and output location empty. Authorize the GitHub Actions workflow Azure generates. This project has no build step; the repository root is the app output.

Check the portal's estimated cost before creating resources. Azure's free trial credit is temporary; if it expires and the subscription is not upgraded, resources may be disabled. Keep the source and demo video accessible independently, and do not upgrade billing unless intentionally accepting its costs.

## Remaining hackathon submission work

1. Test every interaction and fix any visual or accessibility issues.
2. Connect Azure AI / Microsoft Foundry only if the account has access and the required model deployment is available; keep a deterministic demo fallback.
3. Deploy the app and verify that the URL opens in a private/incognito window.
4. Write the final pitch accurately describing technologies actually used.
5. Record a demo video under two minutes and provide its public URL.
