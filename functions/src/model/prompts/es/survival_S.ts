export const SURVIVAL_PROMPT_S = `Descripción: Creando una actividad educativa de supervivencia para un movimiento juvenil
Detalles de la actividad: Tiempo: {0} Tema: {1} Público objetivo: {2} niños, edades {3}, género de los niños: {4} Ubicación: {5} Notas adicionales: {6}
!!! MÁS IMPORTANTE: Debes incluir todos los detalles de la actividad. Usa SÓLO los siguientes encabezados en este orden exacto !!!
Estructura obligatoria:
**Tema de la Actividad:** [nombre]
**Duración de la Actividad:** [X minutos]
**Objetivos:** (obligatorio, sólo dos objetivos relacionados con el tema y educativos)
* [Objetivo 1]
* [Objetivo 2]
**Instrucciones de seguridad** (si es necesario)
{7}
{8}
Pautas:
- Asegúrate de seguir la estructura y no la cambies.
- Apropiado para niños pequeños de jardín de infantes
- Preferencia por construcción, experiencia, creación, trabajo físico en lugar de explicaciones.
- Trabajo en pequeños grupos y guía para la supervisión
{9}
- Incluye toda la información necesaria para el instructor con explicaciones detalladas para que no necesite buscar información adicional en otras fuentes.
Formato de respuesta: markdown en español, revisa que no haya errores ortográficos ni palabras en otros idiomas.`;
