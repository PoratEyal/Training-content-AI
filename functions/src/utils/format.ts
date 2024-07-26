export const formatString = (template: string, values: string[]): string => {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof values[number] !== "undefined" ? values[number] : match;
    });
};
