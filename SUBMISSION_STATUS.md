# READ THE GAME — estado de la entrega

## Revisión frente a la convocatoria

| Requisito | Estado verificado |
|---|---|
| Proyecto y datos sintéticos | La aplicación produce tres secuencias tácticas ficticias e importa eventos JSON sintéticos. No usa partidos ni imágenes de la Premier League. |
| Ingesta | Los eventos sintéticos llegan en pasos temporizados y se pueden importar desde JSON. No hay conexión a un proveedor externo de datos en vivo. |
| Interpretación | Calcula distancia y finalización de pases, dificultad ilustrativa, velocidad estimada del balón y tiro, velocidad máxima de jugador y señales de control, presión y ritmo. |
| Identificación | Etiqueta jugadores ficticios por nombre, dorsal, posición y equipo; activa alerta de velocidad con eventos sintéticos. No reconoce personas en video. |
| Narrativa y explicación | La narración de Foundry se probó desde la web pública de Azure. Dos roles coordinados (Analista táctico y Narrador para audiencia) producen una historia adaptada; el servidor valida las referencias contra los eventos recibidos. Los dos roles usan el mismo despliegue `gpt-5-mini`. |
| Recap | Hay recap de sesión para los eventos recibidos, con opción de generarlo con Foundry. No equivale al resumen de un partido completo de 90 minutos. Aún falta incluirlo en la demostración final. |
| Renderizado | La web reconstruye las jugadas y exporta overlays JSON temporizados con referencias a eventos. No se conecta a un mezclador ni a un renderizador de transmisión. |
| Personalización | Modos Fan/Analista, español/inglés, equipo, jugador y métrica favoritos. |
| Multiidioma | Interfaz y narración en español e inglés. |
| Auto-eventing desde video | No implementado; la convocatoria lo plantea como una función sugerida. |
| Tecnologías | Azure Static Web Apps, Azure Functions, Microsoft Foundry (`gpt-5-mini`) y GitHub Actions para pruebas y despliegue. La clave de Foundry se mantiene en la configuración del servidor. |
| Pruebas | Las pruebas automatizadas de la API pasaron en GitHub Actions antes del despliegue. En Azure se completó el flujo sintético y se verificó una respuesta real de Foundry con eventos citados comprobados. |
| Presentación | El repositorio público y el pitch bilingüe están listos. El video público y la página final de envío siguen pendientes. |

## Alcance honesto

“En vivo” se refiere a la llegada temporizada de eventos sintéticos, no a una transmisión de partido. Las velocidades, posiciones y puntuaciones son cálculos ilustrativos a partir de los datos sintéticos. La app no analiza video, no identifica jugadores reales y no distribuye datos de partidos de la Premier League. El auto-eventing de video aparece como una posibilidad a considerar, no como uno de los cinco pasos centrales de la canalización.

## Lo que falta para entregar

1. Grabar y publicar un video de demostración de menos de dos minutos, sin música ni material protegido sin autorización.
2. Pegar el enlace público del video y el enlace del repositorio en la página del hackathon.
3. Mostrar en el video el flujo sintético, la narración de Foundry con evidencia, los modos Fan/Analista y el recap.

El pitch listo para copiar está en [PROJECT_PITCH.md](PROJECT_PITCH.md). El código fuente público está en https://github.com/Ain-BC00/read-the-game.
