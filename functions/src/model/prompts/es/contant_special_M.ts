export const CONTANT_SPECIAL_PROMPT_M = `Descripción: Creando una actividad educativa para un movimiento juvenil
Detalles de la actividad: Tiempo: {0} Tema: {1} Público objetivo: {2} niños con necesidades especiales, edades {3}, género de los niños: {4} Ubicación: {5} Notas adicionales: {6}
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
- El grupo incluye niños con diversas necesidades especiales (discapacidades físicas y cognitivas), por lo tanto, debes proporcionar actividades adaptadas y respetuosas, instrucciones simples y claras, evitar juegos competitivos o complejos, utilizar ayudas visuales, considerar el ritmo individual y evitar estímulos sensoriales fuertes como ruidos o movimientos rápidos.
- Preferencia por juegos, actividades o manualidades en lugar de hablar mucho por parte del instructor.
{9}
- Incluye toda la información necesaria para el instructor con explicaciones detalladas para que no necesite buscar información adicional en otras fuentes.
Formato de respuesta: markdown en español, revisa que no haya errores ortográficos ni palabras en otros idiomas.`;
