export const VIEW_PROMPT_S = `Description: Creating an educational discussion activity for a youth movement
Activity details: Time: {0} Topic: {1} Target audience: {2} children, ages {3}, children's gender: {4} Location: {5} Additional notes: {6}
!!! MOST IMPORTANT: All activity details must be addressed. Use ONLY the following headings in this exact order !!!
Mandatory structure:
**Activity Topic:** [name]
**Activity Duration:** [X minutes]
**Goals:** (mandatory two goals only, related to the topic and educational)
* [Goal 1]
* [Goal 2]
{7}
{8}
Guidelines:
- Make sure you follow the structure and don't change it.
- Adapt the discussion questions for young children
- Preference for games, quizzes and creating dialogue rather than the instructor talking
- If there are quizzes, questions or lists include 6 examples.
- Avoid violent, offensive or topics that may cause discomfort.
- Include all necessary information for the instructor with detailed explanations so the instructor won't need to search for additional information from other sources
Response format: markdown in English, double-check that there are no spelling errors or words in other languages.`;
