# READ THE GAME — Submission Overview

## Project capabilities

| Hackathon area | What the project demonstrates |
|---|---|
| Synthetic match data | Three repeatable fictional football sequences and structured JSON events. |
| Event ingestion | A timed synthetic feed and JSON import that replays events in sequence. |
| Match interpretation | Pass distance and completion, illustrative difficulty, estimated ball and shot speed, player sprint thresholds, pressure, control, and rhythm signals. |
| Player context | Fictional player names, shirt numbers, positions, and teams linked to match events. |
| Explainable narratives | Tactical analysis and audience narration coordinated through Microsoft Foundry, with cited event IDs checked by the API. |
| Personalization | Fan and Analyst modes, English and Spanish, plus favorite team, player, and metric preferences. |
| Broadcast presentation | Animated match reconstruction, session recaps, and timestamped overlay cues exportable as JSON. |
| Microsoft and Azure | Azure Static Web Apps, Azure Functions, Microsoft Foundry (`gpt-5-mini`), and GitHub Actions. |

## Demo and submission materials

- **Live application:** https://delightful-forest-0a04ede10.2.azurestaticapps.net/
- **Public source repository:** https://github.com/Ain-BC00/read-the-game
- **Project pitch:** [PROJECT_PITCH.md](PROJECT_PITCH.md)
- **Architecture and workflow diagrams:** [Architecture](docs/architecture.svg) · [Narrative workflow](docs/match-flow.svg)
- **Demonstration video:** Published on YouTube: https://youtu.be/bTZP2mEAM3E

## Presentation notes

The demo uses fictional teams, players, and football events. Its live-style experience is a timed synthetic feed. Match stories, recaps, and broadcast cues are based on the events received by the application. Overlay cues are exportable as JSON for integration with a renderer.

The published demo presents the synthetic event flow, Fan and Analyst views, evidence-linked narration, session recap, and overlay export.

## Final submission checklist

1. Add the public YouTube video URL to the hackathon project page.
2. Add the public repository and project pitch to the same page.
