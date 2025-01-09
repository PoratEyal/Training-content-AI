// formatStaticActivity.ts

export function formatStaticActivity(content: string): string {
  let text = content;

  // 1) המרה של הרצף הטקסטואלי "\n" למעבר שורה אמיתי
  //    אם יש רווחים אחריו (למשל "\n  "), נמחק אותם גם כן.
  text = text.replace(/\\n\s*/g, "\n");

  // 2) unify newlines – החלפת \r\n או \r ב־ \n
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // 3) הסרת כוכביות (אם אינך זקוק להן כהדגשה)
  text = text.replace(/\*/g, "");

  // 4) המרה של סעיפים ממוספרים בסגנון "2. " → "2) "
  //    (נעשה זאת לפני שננתח שורות, כדי לאחד את הפורמט של סעיפים ממוספרים)
  text = text.replace(/^(\d+)\.\s/gm, "$1) ");

  // 5) עכשיו נטפל בשורות – נפרק, נסדר רווחים
  let lines = text.split("\n");
  lines = lines.map((line) => line.trimEnd()); // מוחק רווחים בסוף השורה
  text = lines.join("\n");

  // 6) יש מצבים שבהם אנשים כותבים "1) ... 2) ..." באותה שורה.
  //    נבצע שבירה לפני כל "X) " אם הוא לא בתחילת שורה (כלומר אם יש תו לפניו שאינו \n).
  //    כך נוודא שכל סעיף ממוספר יתחיל בשורה חדשה.
  text = text.replace(/([^\n])(\d+\)\s)/g, "$1\n$2");

  // 7) גם לגבי מקפים, נרצה להחליף ל־"• " ולהוסיף שורה חדשה
  //    אם הם מופיעים באמצע משפט. תחילה נהפוך מקפים שמתחילים שורה לבולט:
  text = text.replace(/^\s*-\s/gm, "• ");
  //    אם מופיע "- " שלא בתחילת שורה, נוסיף שבירת שורה לפניו.
  text = text.replace(/([^\n])-\s/g, "$1\n• ");

  // 8) ייתכן שנרצה לאחד מעברי שורה מרובים (3+) לשניים
  text = text.replace(/\n{3,}/g, "\n\n");

  // 9) הסרה סופית של רווחים בקצוות
  text = text.trim();

  return text;
}
