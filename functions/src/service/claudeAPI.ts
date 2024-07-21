// import Anthropic from "@anthropic-ai/sdk";

// const anthropic = new Anthropic({
//   apiKey: "my_api_key", // defaults to process.env["ANTHROPIC_API_KEY"]
// });

// const msg = await anthropic.messages.create({
//   model: "claude-3-sonnet-20240229",
//   max_tokens: 1503,
//   temperature: 0.4,
//   system: "אתה מדריך תנועת נוער ל10 ילדים בגילאים 14-15 ממין זכר",
//   messages: [
//     {
//       "role": "user",
//       "content": [
//         {
//           "type": "text",
//           "text": "צור לי פעולה של חצי שעה\nנושא הפעולה הוא איכות הסביבה.\nמיקום הפעולה יהיה במקום סגור.\n- מבנה הפעולה: \n+ שם הפעולה\n+ זמן הפעולה\n+ 2 מטרות הקשורות לנושא\n+ ציוד נדרש אם ישנו - ללא חומרי גלם יקרים, מצגת או וידאו \n+ חלקי הפעולה + זמן נדרש לכל חלק\n++ פתיחה קצרה\n++ חלקי הפעילות - עד 3 חלקים עם הוראות מפורטות והסברים המשרתים את מטרות הפעולה:\n+++ חלק שבו המדריך פחות מדבר ויש יותר משחקים, חידונים, תחרות או יצירה על נושא הפעולה.\n+++ חלק שבו יש משחק, חידון, תחרות או יצירה הקשור לנושא הפעולה.\n++ סיכום קצר\n- תוודא שאתה עובד לפי המבנה ואל תשנה אותו.\n- חשוב שהפעולות והמשחקים יתאימו לגיל הילדים!.\n- אל תכלול משחקים או פעולות מסוכנות או בעלי אופי אלים\n- במקרה ויש דמויות, מקומות או אירועים בפעולה, כלול הסברים מפורטים כך שהמדריך לא יצטרך לחפש מידע נוסף ממקורות אחרים.\n- במקרה ויש חידונים, שאלות או רשימות, תכלול 4 דוגמאות.\n- התשובה צריכה להיות מפורטת ובעברית בלבד, וודא שאין שגיאות כתיב או מילים בשפות אחרות.\n- הסבר את הפעולה בצורה פשוטה וקצרה שכל ילד בן 10 יבין.\n- תחזיר לי את התשובה בפורמט של markdown style."
//         }
//       ]
//     }
//   ]
// });
// console.log(msg);