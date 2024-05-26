export const formatWhatsUp = (text: string) => {
    const title = "אני יצרתי את הפעולה הזאת דרך ";
    const br = "\n";
    const result = text.replace(/\*\*/g, "*") + br + br + title;
    return result;
};

export const formatInviteFriend = () => {
    return "קבלו איזה אתר מטורף, מצאתי אתר שבונה פעולות בעזרת בינה מלאכותית";
};

export const formatCopy = (text: string) => {
    const result = text.replace(/\**\*/g, "");
    return result;
};
