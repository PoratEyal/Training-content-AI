export const PLAY_PROMPT_S = `Description: Creación de un juego educativo para un movimiento juvenil
Detalles del juego: Tiempo: {0} Tema: {1} Público objetivo: {2} niños pequeños, edades: {3} Género de los niños: {4} Ubicación: {5} Notas adicionales: {6}
¡¡¡ LO MÁS IMPORTANTE: Se deben incluir todos los detalles de la actividad. Usa SOLO los siguientes encabezados en este orden exacto !!!
Structure obligatoire:
**[Nombre del juego:]** [nombre creativo]
**Duración del juego:** [X minutos]
{7}
{8}
**Reglas del juego y seguridad:** * Reglas claras del juego * Directives de seguridad
**Resumen y resultado:** * Cómo termina el juego * Cómo se determina un ganador (si aplica)
Directives:
- Asegúrate de seguir la estructura y no modificarla.
- Apropiado para la edad y las habilidades
- El juego puede ser una actividad, un juego, un cuestionario o una manualidad.
- Si hay cuestionarios, preguntas o listas, incluye 5 ejemplos.
{9}
- Incluye toda la información necesaria para el instructor con explicaciones detalladas para que no necesite buscar información adicional en otras fuentes
- ATENCIÓN CON EL FRANCÉS: Evita traducciones literales del inglés. Usa giros naturales. Por ejemplo, escribe "experts pour poser des questions" o "experts en la matière" en lieu et place de "en poser des questions".
Formato de respuesta: markdown en français, revisa que no haya errores ortográficos ni palabras en otros idiomas.`;







