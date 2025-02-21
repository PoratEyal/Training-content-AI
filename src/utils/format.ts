import { WEBSITE_URL } from "../models/constants";

export const formatWhatsUp = (text: string | undefined) => {
    if (!text) return "מצאתי אתר שבונה פעולות בעזרת AI, כדאי לנסות!"
    const title = "יצרתי את הפעולה הזאת בעזרת:";
    const br = "\n";
    const result = text.replace(/\**\*/g, "*") + br + br + title;
    return result;
};

export const formatCopy = (text: string) => {
    const title = "יצרתי את הפעולה הזאת בעזרת:";
    const br = "\n";
    const result = text.replace(/\**\*/g, "") + br + br + title + br + WEBSITE_URL;
    return result;
};

export const  convertContentToHTML = (text: string) => {
    // Split the text into lines for processing
    const lines = text.split('\n');
    let html = [];
    let currentList = [];
    let isInList = false;

    // Process each line
    lines.forEach((line, index) => {
        line = line.trim();
        
        // Skip empty lines
        if (!line) {
            if (isInList) {
                // Close the current list if we have one
                html.push('<ul>\n' + currentList.join('\n') + '\n</ul>');
                currentList = [];
                isInList = false;
            }
            return;
        }

        // First handle bold text (text between **)
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Then handle bullet points
        if (line.startsWith('*')) {
            isInList = true;
            currentList.push(`    <li>${line.substring(1).trim()}</li>`);
        } else {
            // If we were in a list, close it before adding non-list content
            if (isInList) {
                html.push('<ul>\n' + currentList.join('\n') + '\n</ul>');
                currentList = [];
                isInList = false;
            }
            
            // Add as paragraph
            html.push(`<p>${line}</p>`);
        }
    });

    // Close any remaining list
    if (currentList.length > 0) {
        html.push('<ul>\n' + currentList.join('\n') + '\n</ul>');
    }

    // Wrap everything in a RTL div for Hebrew text
    return `<div dir="rtl">\n${html.join('\n')}\n</div>`;
}

export const convertHTMLToContent = (html: string) => {
    // First normalize <br> tags and replace them with newlines
    html = html.replace(/<br\s*\/?>/gi, '\n');
    
    // Handle ordered (numbered) lists
    html = html.replace(/<ol>\s*([\s\S]*?)\s*<\/ol>/g, (match, listContent) => {
        // Convert each list item to a numbered point
        const items = listContent.match(/<li>([\s\S]*?)<\/li>/g) || [];
        return '\n' + items
            .map((item, index) => `${index + 1}. ` + item.replace(/<li>([\s\S]*?)<\/li>/, '$1').trim() + '\n')
            .join('') + '\n';
    });

    // Handle unordered lists
    html = html.replace(/<ul>\s*([\s\S]*?)\s*<\/ul>/g, (match, listContent) => {
        // Convert each list item to a bullet point
        const items = listContent.match(/<li>([\s\S]*?)<\/li>/g) || [];
        return '\n' + items
            .map(item => '* ' + item.replace(/<li>([\s\S]*?)<\/li>/, '$1').trim() + '\n')
            .join('') + '\n';
    });

    // Handle paragraphs
    html = html.replace(/<p>([\s\S]*?)<\/p>/g, '$1\n\n');

    // Handle strong tags
    html = html.replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**');

    // Remove RTL div
    html = html.replace(/<div[^>]*>\s*([\s\S]*?)\s*<\/div>/, '$1\n');

    // Clean up extra whitespace and line breaks
    html = html
        .replace(/\n{3,}/g, '\n\n')  // Replace multiple line breaks with double line breaks
        .replace(/^\s+|\s+$/g, '')    // Trim start and end
        .replace(/ +$/gm, '')         // Remove trailing spaces from each line
        .replace(/([^\n])$/, '$1\n'); // Ensure there's a newline at the end if not present

    return html;
}

export const compareNormalizedStrings = (text1: string, text2: string): boolean => {
    // Function to normalize a string by trimming and removing special characters
    const normalizeString = (str: string): string => {
        return str
            .trim() // Remove leading/trailing whitespace
            .replace(/[?!.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove special characters
            .replace(/\s+/g, ""); // Remove all whitespace
    };

    // Normalize both strings and compare them
    const normalized1 = normalizeString(text1);
    const normalized2 = normalizeString(text2);
    
    return normalized1 === normalized2;
};
