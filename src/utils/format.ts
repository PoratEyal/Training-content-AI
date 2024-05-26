export const formatWhatsUp = (text: string) => {
    const title = "אני יצרתי את הפעולה הזאת דרך ";
    const br = "\n";
    const result = text.replace(/\*\*/g, "*") + br + br + title;
    return result;
};

export const formatInviteFriend = (text: string) => {
    const title = "אני רוצה לשתף אתכם באפליקציה חדשה שגיליתי https://ActivityWiz.com\n\nהאפליקציה מאפשרת ליצור בקלות פעילויות תוך שימוש בבינה מלאכותית.";
    const br = "\n";
    const result = text.replace(/\*\*/g, "*") + br + br + title;
    return result;
};

export const formatCopy = (text: string) => {
    const result = text.replace(/\**\*/g, "");
    return result;
};
