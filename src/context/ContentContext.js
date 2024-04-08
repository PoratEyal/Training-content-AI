import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [data, setData] = useState({
        pointOfView: {
            subject: '',
            time: '',
            use: false,
            data: ''
        },
        contentActivity: {
            subject: '',
            time: '',
            use: false,
            data: ''
        },
        scoutingTime: {
            subject: '',
            time: '',
            use: false,
            data: ''
        },
        playingTime: {
            subject: '',
            time: '',
            use: false,
            data: ''
        },
        other: {
            use: false,
        },
        activity: '',
        grade: '',
        gender: '',
        amount: 0,
        place: '',
        img: ''
    });

    const updateDetails = (grade, amount, place, gender) => {
        setData((prevData) => ({
            ...prevData,
            grade: grade,
            amount: amount,
            place: place,
            gender: gender
        }));
    }

    const updateActivity = (activity) => {
        setData((prevData) => ({
            ...prevData,
            activity: activity,
        }));
    };

    const updateImage = (url) => {
        setData((prevData) => ({
            ...prevData,
            img: url,
        }));
    };

    // - - - - - - Content Activity - - - - - - - - - - - - - - -

    const updateContentActivity = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            contentActivity: { subject, time, use: true, data: result }
        }));
    };

    // - - - - - - Point Of View - - - - - - - - - - - - - - -

    const updatePointOfView = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            pointOfView: { subject, time, use: true, data: result }
        }));
    };

    // - - - - - - Scouting Time - - - - - - - - - - - - - - -

    const updateScoutingTime = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            scoutingTime: { subject, time, use: true, data: result }
        }));
    };

     // - - - - - - playing Time - - - - - - - - - - - - - - -

     const updatePlayingTime = (subject, time, result) => {
        setData((prevData) => ({
            ...prevData,
            playingTime: { subject, time, use: true, data: result }
        }));
    };

    return (
        <ContentContext.Provider value={{
                data,
                setData,
                updateDetails,
                updateActivity,
                updateImage, 
                updatePointOfView, 
                updateContentActivity, 
                updateScoutingTime, 
                updatePlayingTime
            }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContentContext = () => useContext(ContentContext);

export default ContentContext;
