import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [data, setData] = useState({
        pointOfView: {
            use: false,
            data: ''
        },
        contentActivity: {
            use: false,
            data: ''
        },
        scoutingTime: {
            use: false,
            data: ''
        },
        playingTime: {
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

    const updateContentActivity = (data) => {
        setData((prevData) => ({
            ...prevData,
            contentActivity: {
                use: true,
                data: data
            }
        }));
    };

    // - - - - - - Point Of View - - - - - - - - - - - - - - -

    const updatePointOfView = (data) => {
        setData((prevData) => ({
            ...prevData,
            pointOfView: {
                use: true,
                data: data
            }
        }));
    };

    // - - - - - - Scouting Time - - - - - - - - - - - - - - -

    const updateScoutingTime = (data) => {
        setData((prevData) => ({
            ...prevData,
            scoutingTime: {
                use: true,
                data: data
            }
        }));
    };

     // - - - - - - playing Time - - - - - - - - - - - - - - -

    const updatePlayingTime = (data) => {
        setData((prevData) => ({
            ...prevData,
            playingTime: {
                use: true,
                data: data
            }
        }));
        console.log(data.pointOfView);
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
