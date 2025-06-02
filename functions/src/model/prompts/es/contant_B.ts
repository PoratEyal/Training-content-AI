export const CONTANT_PROMPT_B = `Descripción: Creando una actividad educativa para un movimiento juvenil
Detalles de la actividad: Tiempo: {0} Tema: {1} Público objetivo: {2} niños, edades {3}, género de los niños: {4} Ubicación: {5} Notas adicionales: {6}
!!! MÁS IMPORTANTE: Debes incluir todos los detalles de la actividad. Usa SÓLO los siguientes encabezados en este orden exacto !!!
Estructura obligatoria:
**Tema de la Actividad:** [nombre]
**Duración de la Actividad:** [X minutos]
**Objetivos:** (obligatorio, sólo dos objetivos relacionados con el tema y educativos)
* [Objetivo 1]
* [Objetivo 2]
{7}
{8}
Pautas:
- Apropiado para la edad y las capacidades
- Preferencia por juegos, actividades, cuestionarios o manualidades en lugar de hablar mucho por parte del instructor
- Si hay cuestionarios, preguntas o listas, incluye 5 ejemplos
{9}
- Incluye toda la información necesaria para el instructor con explicaciones detalladas para que no necesite buscar información adicional en otras fuentes
Formato de respuesta: markdown en español, revisa que no haya errores ortográficos ni palabras en otros idiomas.`;
