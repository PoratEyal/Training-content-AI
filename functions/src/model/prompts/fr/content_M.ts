export const CONTENT_PROMPT_M = `Description: Creando una actividad educativa para un movimiento juvenil
Détails de l'activité: Tiempo: {0}, Tema: {1}, Público objetivo: Grupo de {2} participantes de edad {3}, Género de los niños: {4}, Ubicación: {5}, Notas adicionales: {6}
!!! MÁS IMPORTANTE: Debes incluir todos los detalles de la actividad. Usa SÓLO los siguientes encabezados en este orden exacto !!!
Structure obligatoire:
**Thème de l'activité:** [nombre]
**Durée de l'activité:** [X minutos]
**Objectifs:** (obligatorio, sólo dos objetivos relacionados con el tema y educativos)
* [Objetivo 1]
* [Objetivo 2]
{7}
{8}
Directives:
- Apropiado para la edad y las capacidades
- Preferencia por juegos, actividades, cuestionarios o manualidades en lugar de hablar mucho por parte del instructor
- Si hay cuestionarios, preguntas o listas, incluye 3 ejemplos
{9}
- Incluye toda la información necesaria para el instructor con explicaciones detalladas para que no necesite buscar información adicional en otras fuentes
- ATENCIÓN CON EL FRANCÉS: Evita traducciones literales del inglés. Usa giros naturales. Por ejemplo, escribe "experts pour poser des questions" o "experts en la matière" en lieu et place de "en poser des questions".
Formato de respuesta: markdown en français, revisa que no haya errores ortográficos ni palabras en otros idiomas.`;
