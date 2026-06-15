export const CONTENT_PROMPT_M = `Description: Creating an educational activity for a youth movement
Activity details: Time: {0}, Topic: {1}, Target audience: A group of {2} children aged {3}, Gender of the children: {4}, Location: {5}, Additional notes: {6}
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
- Appropriate for age and abilities
- Preference for games, activities, quizzes or crafts rather than the instructor talking
- If there are quizzes, questions or lists include 3 examples
{9}
- Include all necessary information for the instructor with detailed explanations so the instructor won't need to search for additional information from other sources
Response format: markdown in English, double-check that there are no spelling errors or words in other languages.`;
