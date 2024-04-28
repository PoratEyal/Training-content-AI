import { DataType } from "../models/types/context";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const importWhatsUp = (path: string, data: string) => {
    const title = `*${path}*\n`;
    const message = encodeURIComponent(title + data);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.location.href = whatsappUrl;
};

export const importDocx = (path: string, text: string) => {
    const doc = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "headerStyle",
                    name: "Header Style",
                    basedOn: "Heading3", // Use Heading3 as the base for size and other attributes
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        bold: true, // Make the text bold
                        size: 32, // Font size, where 32 is equivalent to 16pt
                        font: {
                            name: "Arial", // Ensuring the font is a commonly supported sans-serif
                        },
                    },
                    paragraph: {
                        spacing: {
                            after: 200, // Spacing after the paragraph to separate from the next
                        },
                    },
                },
            ],
        },
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        text: path,
                        style: "headerStyle",
                        bidirectional: true,
                    }),
                    new Paragraph({
                        style: "Normal",
                        bidirectional: true,
                        children: [
                            new TextRun({
                                text,
                                rightToLeft: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
    const fileName = `פעילות - ${path}.docx`;
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, fileName);
    });
};
