export const OpenAIUrl = "https://api.openai.com/v1/chat/completions";

export const openAiheaders = (apiKey) => {
    return {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };
};

export const DefualtPromptDetails = (temperature = 0.7) => {
    return { model: "gpt-3.5-turbo", temperature };
};
