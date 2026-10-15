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

This folder is a static website and can be hosted by Azure Static Web Apps without a custom backend. In the Azure portal, create a Static Web App, connect the GitHub repository containing this project, and set the app location to `/outputs/storyvar-demo`. Leave API location and output location empty. Authorize the GitHub Actions workflow Azure generates. This project has no build step; the app folder itself is the output.

Check the portal's estimated cost before creating resources. Azure's free trial credit expires after 30 days; if you do not upgrade to pay-as-you-go, the subscription and resources can be disabled. Keep a local copy and public GitHub repository available. Do not upgrade billing unless you knowingly choose to.

## Remaining hackathon submission work

1. Test every interaction and fix any visual or accessibility issues.
2. Connect Azure AI / Microsoft Foundry only if the account has access and the required model deployment is available; keep a deterministic demo fallback.
3. Publish the repository publicly and deploy the app. Verify that the URL opens in a private/incognito window.
4. Write the final pitch accurately describing technologies actually used.
5. Record a demo video under two minutes and provide its public URL.
