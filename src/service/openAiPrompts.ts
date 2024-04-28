import axios from "axios";
import { DefualtPromptDetails, OpenAIUrl, openAiheaders } from "../models/constants/openAi";

const request = (prompt) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    return {
        method: "post",
        url: OpenAIUrl,
        data: prompt,
        headers: openAiheaders(apiKey),
    };
};


// - - - - - - activity prompt section - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const moreContnentPrompt = (activityDescription) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `Provide a detailed expansion of this activity: ${activityDescription}. Ensure comprehensive coverage of all aspects, including the name and the time of the activity, and any specific instructions or data mentioned in the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. The response should be detailed and in Hebrew.`,
            },
        ],
    };
};

export async function getMoreContent(activityDescription) {
    const response = await axios(request(moreContnentPrompt(activityDescription)));
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - Point of View - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const pointOfViewPrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `You are a scoutmaster who transfers activity to his trainees in a youth movement and i want you to create a 'Point of View Activity' on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. At the begining of the answer write the name of the activity and the time for her. In each part of the activity, you will add his time(in minutes). Ensure comprehensive coverage of all aspects, and any specific instructions for the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. Do not incorporate a presentation or video into your activity. The response should be detailed and in Hebrew.`,
            },
        ],
    };
};

export async function getPointOfView(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(pointOfViewPrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - Content activity - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const contentActivityPrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `You are a scoutmaster who transfers activity to his trainees in a youth movement and i want you to create a 'Content activity Activity' on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. At the begining of the answer write a name for the activity and the time for her. In each part of the activity, you will add his time(in minutes). Ensure comprehensive coverage of all aspects, and any specific instructions for the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. Do not incorporate a presentation or video into your activity. The response should be detailed and in Hebrew.`,
            },
        ],
    };
};

export async function getContentActivity(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(contentActivityPrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - Scouting time - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - -  

const scoutingTimePrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `You are a scoutmaster who transfers activity to his trainees in a youth movement and i want you to create a 'Scouting time Activity' on the topic of ${subject} that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. Come up with a nice name for the activity. At the begining of the answer write the the name of the activity and the time for her. In each part of the activity, you will put his time(in minutes). Do not add a study phase, focus on practice. Ensure comprehensive coverage of all aspects, and any specific instructions for the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. Do not incorporate a presentation or video into your activity. The response should be detailed and in Hebrew.`,
            },
        ],
    };
};

export async function getScoutingTime(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(scoutingTimePrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}


// - - - - - - - - - - playing Time - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const playingTimePrompt = (subject, time, amount, age, gender, place) => {
    return {
        ...DefualtPromptDetails(0.7),
        messages: [
            {
                role: "user",
                content: `You are a scoutmaster who transfers activity to his trainees in a youth movement and i want you to create a "Playing time" activity that related to this topic: ${subject} but not the same game! that will last ${time}, the number of the children in the activity are" ${amount}, the grade of them is: ${age} and the gender of them is ${gender}. The place of the activity will be ${place}. Come up with a nice name for the game. at the begining of the answer write the name of the game and the time(in minutes). In each part of the activity, you will add his time(in minutes). Ensure comprehensive coverage of all aspects, and any specific instructions for the activity. Reflect any direct content like names and times without alteration, but enrich the description with additional relevant details to enhance understanding. Do not incorporate a presentation or video into your activity. The response should be detailed and in Hebrew.`,
            },
        ],
    };
}

export async function getPlayingTime(subject, time, amount, age, gender, place) {
    const response = await axios(
        request(playingTimePrompt(subject, time, amount, age, gender, place)),
    );
    const responseData = response.data.choices?.[0].message.content;
    return responseData;
}
