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
| Narrativas y resumen | Narrativa de la secuencia y recap de los eventos recibidos. No es un resumen completo de 90 minutos. Foundry requiere configuración y prueba real en Azure. |
| Explicabilidad táctica | Señales sobre salida ante presión, pase difícil, umbral de velocidad, presión observada y remate/atajada. Las posiciones, umbrales y puntuaciones son ilustrativos. |
| Innovación de datos | Tres secuencias tácticas reproducibles y formato JSON documentado con esquema 1.2. |
| Multiidioma | Interfaz y narración local en español e inglés; el idioma se envía al modelo para la respuesta. |
| Auto-eventing desde video | No implementado. La convocatoria lo presenta como una función a considerar. |
| Azure y tecnologías Microsoft | Azure Static Web Apps ya aloja la versión anterior. El código local incorpora Azure Functions para Microsoft Foundry y el workflow apunta al API; esta revisión aún no está desplegada. |
| Verificación técnica | Sintaxis, JSON y diff limpios; cuatro pruebas de API pasan con Foundry simulado. No se ha hecho una llamada real al modelo ni una prueba visual automatizada del navegador. |
| Presentación | Repositorio público ya creado. Video y página de entrega siguen pendientes. |

## Pitch provisional

Read the Game convierte eventos sintéticos de fútbol en lecturas tácticas interactivas y bilingües. Una etapa analítica detecta salidas ante presión, pases exigentes, aceleraciones y remates; una etapa generativa prepara narrativas explicables y overlays sincronizados, personalizados para fans y analistas. Usa Azure Static Web Apps y Azure Functions con Microsoft Foundry cuando se configure y valide.

## Lo que falta para afirmar cumplimiento final

La revisión local cubre la tubería funcional con eventos sintéticos, explicaciones, personalización, recap de secuencia y salidas legibles por máquina. No se debe afirmar todavía que todo está listo para entregar: Foundry no se ha probado desde la URL desplegada, Azure sigue sirviendo la versión anterior, la aplicación no recibe una transmisión externa ni analiza video, y faltan las pruebas visuales, el video público de menos de dos minutos y la página del hackathon.

La petición de auto-eventing de video está formulada en la descripción como una función sugerida (“features you should consider incorporating”), no como uno de los cinco pasos centrales requeridos. Si se quisiera añadir, haría falta un video sintético autorizado y un modelo/pipeline de visión; no se debe simular que ya existe esa capacidad.

## Próximos pasos técnicos de la entrega

1. Completar pruebas en navegador, incluida importación y exportación JSON en escritorio y móvil.
2. Desplegar esta revisión aprobada y comprobar la URL pública y /api/narrate.
3. Configurar los secretos de Foundry solo en Azure y confirmar una respuesta real con citas válidas.
4. Publicar el pitch con tecnologías comprobadas, grabar el video bajo dos minutos y completar la página de envío.
