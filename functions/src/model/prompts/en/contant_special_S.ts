export const CONTANT_SPECIAL_PROMPT_S = `Description: Creating an educational activity for a youth movement
Activity details: Time: {0} Topic: {1} Target audience: {2} children with special needs, ages {3}, children's gender: {4} Location: {5} Additional notes: {6}
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
- The group includes children with diverse special needs (physical and cognitive disabilities), therefore be careful to provide adapted and respectful activities, simple and clear instructions, avoid competitive or complex games, use visual aids, consider individual pace, and prevent strong sensory stimuli such as noises and rapid movements.
- Preference for games, activities or crafts rather than the instructor talking.
{9}
- Include all necessary information for the instructor with detailed explanations so the instructor won't need to search for additional information from other sources
Response format: markdown in English, double-check that there are no spelling errors or words in other languages.`;