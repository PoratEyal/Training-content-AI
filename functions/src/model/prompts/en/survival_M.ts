export const SURVIVAL_PROMPT_M = `Description: Creating an educational survival activity for a youth movement
Activity details: Time: {0} Topic: {1} Target audience: {2} children, ages {3}, children's gender: {4} Location: {5} Additional notes: {6}
!!! MOST IMPORTANT: All activity details must be addressed. Use ONLY the following headings in this exact order !!!
Mandatory structure:
**Activity Topic:** [name]
**Activity Duration:** [X minutes]
**Goals:** (mandatory two goals only, related to the topic and educational)
* [Goal 1]
* [Goal 2]
**Safety instructions** (if needed)
{7}
{8}
Guidelines:
- Make sure you follow the structure and don't change it.
- Appropriate for age and abilities
- Preference for building, experience, creation, physical work rather than explanations.
- Preference for working in small groups
{9}
- Include all necessary information for the instructor with detailed explanations so the instructor won't need to search for additional information from other sources
Response format: markdown in English, double-check that there are no spelling errors or words in other languages.`;
