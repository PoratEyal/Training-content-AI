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


// - - - - - - activity prompt section - - - - - - - - - - - -

const activityPrompt = (time, amount, age, place) => {
    return {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `You are a Eagle Scout and i want you to create activity for the your gruop. The grade of the group is: ${age}, the number of the children in the activiy is: ${amount}, the time of the activiy is: ${time}, the place is ${place}. in the begining of the activity add the title of the activity, the number of the children, the time of the activity. return me the answer in hebrew languge.`,
        },
      ],
      temperature: 0.7,
    };
};

export const requestOptions2 = {
    method: "post",
    url: OpenAIUrl,
    data: activityPrompt,
    headers: openAiheaders,
};

export async function getActivity (time, amount, age, place) {
    try {
        const response = await axios(requestOptions2);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};