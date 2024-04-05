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
            content: "give me 5 diverse topics in hebrew About cool and intersting topics that can be passed on to children",
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

const activityPrompt = (subjet, time, amount, age, place) => {
    return {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `You are a Eagle Scout and i want you to create activity for the your gruop. Your subject for the activity is: ${subjet}, The grade of the group is: ${age}, the number of the children in the activiy is: ${amount}, the time of the activiy is: ${time}. the place of the activity is: ${place}. In the begining of the activity add the title of the activity, the number of the children, the time of the activity. Add in the activity tools or things that need to be used to use them for the activity. When creating the activity, consider that the equipment for preparing the activity should be light and simple. Do not omit any information from the activity that would be unclear to the reader of the activity. return me the answer in hebrew languge.`,
        },
      ],
      temperature: 0.7,
    };
};

export async function getActivity (subject, time, amount, age, place) {
    const requestOptions2 = {
        method: "post",
        url: OpenAIUrl,
        data: activityPrompt(subject, time, amount, age, place),
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions2);
        const responseData = response.data.choices?.[0].message.content;
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// - - - - - - activity image prompt section - - - - - - - - - - - -

export async function getImg(activity) {

    const requestOptions = {
        method: "POST",
        url: "https://api.openai.com/v1/images/generations",
        headers: openAiheaders,
        data: {
            model: "dall-e-3",
            prompt: `Create me fully realistic!!! image of Scouting activity about this text: ${activity}`,
            n: 1,
            size: "1024x1024",
        },
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
    }
}