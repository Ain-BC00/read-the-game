# READ THE GAME — Project pitch

## English

**READ THE GAME turns fictional football events into match stories people can understand and trust.** Its live-style synthetic feed drives an animated tactical view, useful match signals, evidence-linked explanations, session recaps, and broadcast-ready overlay data. A coordinated Microsoft Foundry workflow uses tactical-analysis and audience-narration roles, then checks cited events against the feed; Fan and Analyst modes receive personalized English or Spanish storytelling. The frontend uses HTML, CSS, and browser JavaScript; the backend is a JavaScript Azure Function running on Node.js. The project uses Azure Static Web Apps, Azure Functions, Microsoft Foundry (`gpt-5-mini`), and GitHub Actions. It helps fans and production teams see why a sequence matters, not just what happened. The current demo uses synthetic event streams, not real match feeds or video analysis.

## Español

**READ THE GAME convierte eventos ficticios de fútbol en historias del partido que las personas pueden entender y verificar.** Su flujo sintético temporizado alimenta una vista táctica animada, señales útiles, explicaciones vinculadas con evidencia, recaps de sesión y datos de overlays listos para transmisión. Un flujo coordinado de Microsoft Foundry combina los roles de análisis táctico y narración para la audiencia, y después verifica las referencias contra los eventos recibidos; los modos Fan y Analista personalizan la historia en español o inglés. El frontend está hecho con HTML, CSS y JavaScript; el backend usa una Azure Function en JavaScript sobre Node.js. El proyecto usa Azure Static Web Apps, Azure Functions, Microsoft Foundry (`gpt-5-mini`) y GitHub Actions. Ayuda a fans y equipos de producción a entender por qué importa una jugada, además de saber qué ocurrió. La demostración actual usa eventos sintéticos, no transmisiones reales ni análisis de video.

## Submission links

- Live Azure web app: https://delightful-forest-0a04ede10.2.azurestaticapps.net/
- Public source repository: https://github.com/Ain-BC00/read-the-game
- Public demo video: https://youtu.be/bTZP2mEAM3E

## Accuracy notes

- The two agent roles make sequential calls to the same `gpt-5-mini` Foundry deployment; this project does not use two separate models.
- Events are synthetic and arrive on a timer. The app does not ingest a real-time external match feed, analyze video, or identify real players.
- Overlay cues can be exported as JSON; they are not connected to a broadcast renderer.
- The demo video is published on YouTube. Add its URL to the hackathon project page along with the public source repository.
