export const PLAY_SPECIAL_PROMPT_M = `Description: Creating an educational game for a youth movement
Game details: Time: {0} Topic: {1} Target audience: {2} children with special needs ages: {3} Children's gender: {4} Location: {5} Additional notes: {6}
!!! MOST IMPORTANT: All activity details must be addressed. Use ONLY the following headings in this exact order !!!
Mandatory structure:
**[Game name:]** [creative name]
**Game duration:** [X minutes]
{7}
{8}
**Game rules and safety:** * Clear game rules * Safety guidelines
**Summary and outcome:** * How the game ends * How to determine a winner (if applicable)
Guidelines:
- Make sure you follow the structure and don't change it.
- The group includes children with diverse special needs (physical and cognitive disabilities), therefore be careful to provide adapted and respectful activities, simple and clear instructions, avoid competitive or complex games, use visual aids, consider individual pace, and prevent strong sensory stimuli such as noises and rapid movements.
- The game can be an activity, game or craft.
{9}
- Include all necessary information for the instructor with detailed explanations so the instructor won't need to search for additional information from other sources
Response format: markdown in English, double-check that there are no spelling errors or words in other languages.`;
