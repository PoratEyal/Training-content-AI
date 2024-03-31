import axios from "axios";

const OpenAIUrl = "https://api.openai.com/v1/chat/completions";

const apiKey = process.env.REACT_APP_API_KEY;

const openAiheaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
};

const subjectsPrompt = {
    model: "gpt-4",
    messages: [
        {
            role: "user",
            content: "give me 6 diverse topics.",
        },
    ],
    temperature: 0.7,
    functions: [
        {
            name: "generate_subjects",
            parameters: {
                type: "object",
                properties: {
                    subjectList: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
            },
        },
    ],
};

export const requestOptions = {
    method: "post",
    url: OpenAIUrl,
    data: subjectsPrompt,
    headers: openAiheaders,
};
export async function getSubjects() {
    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        const subjectListString = responseData?.choices?.[0]?.message?.function_call?.arguments;
        const subjectList = JSON.parse(subjectListString);
        return subjectList;
    } catch (error) {
        console.error(error);
        throw error;
    }
}