# READ THE GAME — verificación del proyecto

## Revisión frente a la convocatoria

| Requisito | Estado de esta revisión local |
|---|---|
| Proyecto nuevo y datos sintéticos | La aplicación produce tres patrones tácticos ficticios y acepta sobres de eventos marcados como sintéticos. No usa datos ni imágenes reales de la Premier League. |
| Ingesta | Emite eventos sintéticos en pasos temporizados y puede importar JSON estructurado para reproducirlo como flujo. No hay conexión a un proveedor externo de datos en vivo. |
| Interpretación | Calcula distancia y finalización de pases, dificultad ilustrativa, velocidad estimada de balón y tiro, velocidad máxima de jugador, y señales cualitativas de control, presión y ritmo. |
| Identificación de jugadores | Usa roster sintético con nombre, dorsal y posición. Activa alerta al superar 25 km/h en eventos sintéticos de carrera. No identifica jugadores desde video. |
| Explicación | El respaldo local vincula explicaciones a patrones y métricas observadas. La API agrega una etapa analítica determinista y pide al modelo explicar usando señales y referencias de eventos. |
| Renderizado para pantalla | Reconstrucción visual animada y JSON 1.2 con overlays temporizados, prioridad, texto, jugador y referencias de evento. No está conectado a un mezclador de video o socio de render. |
| Personalización | Fan/Analista, español/inglés, equipo favorito, jugador favorito y métrica seleccionada. |
| Narrativas y resumen | Narrativa de secuencia y recap de los eventos recibidos; no es un resumen de 90 minutos. Narración real de Foundry verificada en Azure con referencias de evidencia validadas. El recap con IA está disponible y queda pendiente mostrarlo en la demo. |
| Explicabilidad táctica | Señales sobre salida ante presión, pase difícil, umbral de velocidad, presión observada y remate/atajada. Las posiciones, umbrales y puntuaciones son ilustrativos. |
| Innovación de datos | Tres secuencias tácticas reproducibles y formato JSON documentado con esquema 1.2. |
| Multiidioma | Interfaz y narración local en español e inglés; el idioma se envía al modelo para la respuesta. |
| Auto-eventing desde video | No implementado. La convocatoria lo presenta como una función a considerar. |
| Azure y tecnologías Microsoft | Azure Static Web Apps aloja la web y Azure Functions sirve `/api/narrate`; Microsoft Foundry con `gpt-5-mini` está configurado en el servidor y respondió en la prueba desplegada. La clave no se entrega al navegador. |
| Verificación técnica | Pruebas de API aprobadas en GitHub Actions antes del despliegue. La web pública en Azure completó una secuencia sintética y mostró la lectura coordinada de dos roles y evidencia verificada. |
| Presentación | Repositorio público actualizado. Pitch bilingüe documentado en `PROJECT_PITCH.md`. Video público y página de entrega siguen pendientes. |

## Lo que falta para afirmar cumplimiento final

La versión actual está desplegada en Azure; se verificó una respuesta real de Foundry desde la interfaz y la coordinación de los dos roles con referencias de evidencia válidas. La aplicación no recibe una transmisión externa ni analiza video. El video de demostración ya está editado en una versión de 1:59; falta publicarlo en una plataforma admitida y añadir su URL pública a la página de entrega del hackathon.

La petición de auto-eventing de video está formulada en la descripción como una función sugerida (“features you should consider incorporating”), no como uno de los cinco pasos centrales requeridos. Si se quisiera añadir, haría falta un video sintético autorizado y un modelo/pipeline de visión; no se debe simular que ya existe esa capacidad.

## Próximos pasos técnicos de la entrega

1. Publicar el video de demostración ya editado (1:59, sin material protegido no autorizado) y copiar su URL pública.
2. Pegar el pitch y los enlaces públicos al repositorio y al video en la página de envío.
3. Antes de grabar, revisar la interfaz en móvil y mostrar el recap y la narración verificada.
