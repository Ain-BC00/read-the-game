# Read the Game

**Read the Game** is an interactive, bilingual football-storytelling demo for the Synthetic Match Insights Engine challenge. It helps a viewer understand *why a play mattered*, not only what event occurred.

**Try it:** https://delightful-forest-0a04ede10.2.azurestaticapps.net  
**Source code:** https://github.com/Ain-BC00/read-the-game

## The idea

A viewer follows one fictional attacking sequence, answers a quick “read the play” question, and sees the evidence behind the explanation. Then they can compare the play with a clearly labeled “what if?” alternative pass and inspect its illustrative interception risk.

The demo is designed for two audiences: a concise fan explanation and a more detailed analyst view. It also supports Spanish and English.

## What works in this demo

- Reproducible fictional match sequences with a timeline, pitch, player markers, and animated ball path.
- Interactive question with feedback and a visual explanation of the play.
- Pass distance and nearest-defender gap calculated from generated player positions.
- A hypothetical alternative route with an explicitly illustrative risk estimate, not a match prediction.
- Fan and analyst views, Spanish and English text, a short recap, and downloadable structured event JSON.

## Data and implementation

All teams, players, and match events in the demo are fictional and generated in the browser. No real Premier League match data or footage is used.

The current implementation is a static HTML, CSS, and JavaScript application, hosted on Azure Static Web Apps Free and published from this public GitHub repository using GitHub Actions. It does **not** ingest a real live match feed, analyze video, call an AI model, or use AI agents. The explanations and estimates are deterministic. We will describe those capabilities as future work unless they are integrated and demonstrated.

The event contract is documented in [event-schema.json](event-schema.json). The site itself has no custom backend or database.

## Run locally

Open `index.html` in a modern browser. Choose **Otra jugada** to generate another sequence, **¿Y si…?** to inspect the alternate route, and use the audience and language controls to change the explanation. Google Fonts are optional; system fonts are included as fallbacks.

## Repository files

- `index.html`, `styles.css`, `app.js`: the web experience.
- `event-schema.json`: the documented structure for synthetic match events and JSON export.
- `.github/workflows/`: the Azure Static Web Apps deployment workflow.
- `SUBMISSION_STATUS.md`: current deployment and submission checklist.

## For judges

**Elevator pitch:** Read the Game turns fictional football events into an interactive, evidence-linked explanation of a tactical decision. Viewers can follow the play, compare a hypothetical alternative, and switch between fan and analyst explanations in Spanish or English.

This is a working static prototype of the audience experience. It demonstrates synthetic event generation, interpretation, explainability, on-screen rendering, personalization, and structured output; real-time feed ingestion and AI-generated narratives are not implemented in this version.
