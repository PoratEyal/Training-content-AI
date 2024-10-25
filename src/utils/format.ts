export const formatWhatsUp = (text: string) => {
    const title = "יצרתי את הפעולה הזאת בעזרת:";
    const br = "\n";
    const result = text.replace(/\*\*/g, "*") + br + br + title;
    return result;
};

export const formatInviteFriend = () => {
    return "מצאתי אתר שבונה פעולות בעזרת AI, כדאי לנסות!"
};

export const formatCopy = (text: string) => {
    const result = text.replace(/\**\*/g, "");
    return result;
};
