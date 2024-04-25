import axios from "axios";

const OpenAIUrl = "https://api.openai.com/v1/chat/completions";

const apiKey = process.env.REACT_APP_API_KEY;

const openAiheaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
};

const subjectsPrompt = {
    model: "gpt-3.5-turbo",
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

const moreContnentPrompt = (activityDescription) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Provide a detailed expansion of this activity: ${activityDescription}. Ensure comprehensive coverage of all aspects, including the name and the time of the activity, and any specific instructions or data mentioned in the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. The response should be detailed and in Hebrew.`,
            },
        ],
        temperature: 0.7,
    };
}; 

export async function getMoreContent (activityDescription) {
    const requestOptions2 = {
        method: "post",
        url: OpenAIUrl,
        data: moreContnentPrompt(activityDescription),
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

// - - - - - - - - - - Point of View - - - - - - - - - - - - - - - - - - 

const pointOfViewPrompt = (subject, time, amount, age, gender, place) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `A "point of view activity" is an activity that the instructor does with his mentees, focusing on a certain topical issue. You are a scoutmaster and i want you to create a Point of View Activity on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. At the begining of the answer write the the name of the activity and the time for her. In eac part of the activity, you will put his time. Return the answer in Hebrew! For example, I will scatter sentences on the floor to help participants understand the situation (if the activity is delivered online, the sentences can be shown on the screen in a presentation): - The glaciers are melting faster and losing 31% more snow and ice per year compared to the situation 15 years ago. - The glaciers in the mountains lose more than 328 billion tons of ice and snow every year. - The water from the melted glaciers flows into the sea, and as a result, the sea level rises. - Between the years 2015 and 2019, the melting rate of the glaciers is 78 billion tons more than the rate between 2000 and 2004. - By the end of the 21st century, the sea level is expected to rise by one meter, turning a billion people into refugees. Questions for discussion: - How does that happen? - Why is it happening? - How can this be prevented? - Why is it important to prevent it?`
        }],
        temperature: 0.7,
    };
};

export async function getPointOfView (subject, time, amount, age, gender, place) {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: pointOfViewPrompt(subject, time, amount, age, gender, place),
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data.choices?.[0].message.content;
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const pointOfViewSubjectPrompt = {
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: "בכל פעם שאני שואל, מצא לי נושא חדש אקטואלי ופשוט שמתאים להעברת פעילות בתנועות נוער ומתאים לדיון עם ילדים בגילאים 8-18. הפעם אני מחפש משהו שלא הצגת לפני כן. אל תביא/תציע לי סרטונים ומצגות בפעילות. תביא לי את הנושא בלי גרשיים. נושא בפחות מ-70 תווים נא להחזיר את התשובה בעברית, תשמור על עברית תקינה ובלי שגיאות כתיב! התשובה צריכה להיות פשוטה ומובנת לילדים.",
        },
    ],
    temperature: 0.9,
    max_tokens: 70,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
};


export async function getPointOfViewSubject() {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: pointOfViewSubjectPrompt,
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        const subjectListString = responseData.choices[0].message.content;
        return subjectListString;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// - - - - - - - - - - Content activity - - - - - - - - - - - - - - - - - - 

const contentActivityPrompt = (subject, time, amount, age, gender, place) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `A content activity is an activity that the instructor does with his mentees. You are a scoutmaster and i want you to create a "content activity" on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. At the begining of the answer write the the name of the activity and the time for her. In eac part of the activity, you will put his time. Return the answer in Hebrew! For example, an activity might involve sharing a screen with the group to display photos of Yitzhak Rabin, which can be sourced from the internet or an attached appendix. Dont suggest me videos or Presentation in the activity. Participants are asked to select a photo that attracts or interests them, discussing what the photograph suggests about Rabin's character and why they chose that particular picture. Responses are compiled on a common page. After the discussion, the guide elaborates on Rabin's life and character. It's beneficial to add various photos to the appendix to highlight different aspects of Rabin's personality, such as being a family man, a man of peace, a military strategist, a statesman, and a leader. The activity encourages contributions from the participants, but guides can help conceptualize Rabin's features at the discussion's end. Guides are recommended to read up on Rabin's life beforehand and to be mindful of the diverse political opinions participants might have. For inspiration, guides can consult the Rabin Center website and read about Rabin's work.`
            }
        ],
        temperature: 0.7,
    };
};

export async function getContentActivity (subject, time, amount, age, gender, place) {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: contentActivityPrompt(subject, time, amount, age, gender, place),
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data.choices?.[0].message.content;
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const contentActivitySubjectPrompt = {
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: "בכל פעם שאני שואל, מצא לי נושא חדש ופשוט שמתאים להעברת פעילות בתנועות נוער ומתאים לדיון עם ילדים בגילאים 8-18. הפעם אני מחפש משהו שלא הצגת לפני כן. תביא לי את הנושא בלי גרשיים. נושא בפחות מ-70 תווים נא להחזיר את התשובה בעברית, תשמור על עברית תקינה ובלי שגיאות כתיב, התשובה צריכה להיות פשוטה ומובנת לילדים.",
        },
    ],
    temperature: 0.9,
    max_tokens: 70,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
};

export async function getContentActivitySubject() {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: contentActivitySubjectPrompt,
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        const subjectListString = responseData.choices[0].message.content;
        return subjectListString;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// - - - - - - - - - - Scouting time - - - - - - - - - - - - - - - - - - 

const scoutingTimePrompt = (subject, time, amount, age, gender, place) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `A Scouting time focuses on scouting skills and experiences, where the instructor teaches a scouting skill or imparts scouting experiences. You are a scoutmaster and i want you to create a Scouting time on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. Come up with a nice name for the activity. At the begining of the answer write the the name of the activity and the time for her. In each part of the activity, you will put his time. Do not add a study phase, focus on practice. Return the answer in Hebrew! For example, The trainees are divided into two groups, in front of each group will be placed an (identical) heavy object - the object can be a large rock or anything you can imagine as long as it is not dangerous. Dont suggest me video or Presentation in the activity. The goal of the teams is to connect to the object with a Spanish block, and drag it a distance of four to five meters to the end point that will be marked with a rope. The first team to reach the finish point wins!`
        }],
        temperature: 0.7,
    };
};

export async function getScoutingTime (subject, time, amount, age, gender, place) {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scoutingTimePrompt(subject, time, amount, age, gender, place),
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data.choices?.[0].message.content;
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const scoutingSkillSubjectPromptHebrew = {
    model: "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user",
            "content": "תן לי דוגמא אחת בלבד למיומנויות שלומדים בתנועת נוער צופים, דוגמאות לתשובות רצויות: הדלקת מדורה, הכנת אוהל. תביא לי את התשובה בעברית."
        }
    ],
    "temperature": 0.5,
    "max_tokens": 70,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
}


export async function getScoutingTimeSubject() {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: scoutingSkillSubjectPromptHebrew,
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        const subjectListString = responseData.choices[0].message.content;
        return subjectListString;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// - - - - - - - - - - playing Time - - - - - - - - - - - - - - - - - - 

const playingTimePrompt = (subject, time, amount, age, gender, place) => {
    return {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `You are a scoutmaster and i want you to create a "Playing time" activity on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. Come up with a nice name for the game. at the begining of the answer write the name of the game and the time. Dont suggest me video or Presentation in the activity. Return the answer in Hebrew! For example, Every time I tell the trainees a fact about me, and they have to guess whether it is true or false.`
        }],
        temperature: 0.7,
    };
};

export async function getPlayingTime (subject, time, amount, age, gender, place) {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: playingTimePrompt(subject, time, amount, age, gender, place),
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data.choices?.[0].message.content;
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const playingTimeSubjectPrompt = {
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: "בכל פעם שאני שואל, מצא לי משחק חברה לפעילות לילדים בתנועות נוער. הפעם אני מחפש משהו שלא הצגת לפני כן. תחזיר לי הסבר קצר עד 6 מילים על המשחק. נא להחזיר את התשובה בעברית. תשמור על עברית תקינה ובלי שגיאות כתיב..",
        },
    ],
    temperature: 0.9,
    max_tokens: 70,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
};

export async function getPlayingTimeSubject() {
    const requestOptions = {
        method: "post",
        url: OpenAIUrl,
        data: playingTimeSubjectPrompt,
        headers: openAiheaders,
    };

    try {
        const response = await axios(requestOptions);
        const responseData = response.data;
        const subjectListString = responseData.choices[0].message.content;
        return subjectListString;
    } catch (error) {
        console.error(error);
        throw error;
    }
}