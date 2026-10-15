# READ THE GAME — submission readiness

## Elevator pitch draft

Read the Game turns synthetic match events into an interactive explanation of a tactical decision. Fans compare what happened with a clearly labeled hypothetical alternative, follow the reconstructed play on a pitch, inspect the event evidence, and switch between a simple fan explanation and an analyst view. The same moment can be explored in Spanish or English and exported as timed, machine-readable event data.

## Current implementation

| Requirement | Current status |
|---|---|
| Synthetic football events | Generates fictional pressure, pass, and box-entry events in the browser; exports the sequence as JSON. |
| Interpretation | Calculates pass distance, nearest-defender gap, and illustrative alternative passing-lane risk. |
| Explainability | Shows the route, pressure and evidence behind the explanation. |
| On-screen rendering | Reconstructs movement on a pitch with a timeline and overlay-like story cards. |
| Personalization | Fan/analyst mode and Spanish/English. Favorite team/player focus is not implemented. |
| Narrative and recap | Produces a short recap from the synthetic sequence. |
| Live ingestion / video auto-eventing | Not implemented; this is a local synthetic playback. |
| Microsoft/Azure AI | Not connected yet. Do not claim Azure AI or agents until integrated and tested. |
| Public URL / GitHub / demo video | Public GitHub repository exists; Azure deployment and demo video are still pending. |

## Deployment path

The project is static HTML/CSS/JavaScript at the repository root. It can be hosted on Azure Static Web Apps by connecting this public GitHub repository; set app location to `/`, and leave API and output folders empty. Azure's free-trial credit is temporary; if it expires and the subscription is not upgraded, resources may be disabled. Keep the source and demo video accessible independently, and do not upgrade billing unless intentionally accepting its costs.

## Before submission

1. Test the complete demo locally and in the deployed public URL.
2. Add and demonstrate a real Microsoft/Azure AI component only if the account and service access are available. Keep a deterministic fallback.
3. Verify the public repository URL.
4. Prepare the final project description with only technologies actually used.
5. Record a public demo video under two minutes.
6. Verify the Hackathon project form accepts the personal account and the deployed link.
