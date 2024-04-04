import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [data, setData] = useState({
        subjects: [],
        activity: '',
        mainSubject: '',
        grade: '',
        time: '',
        amount: 0,
        place: ''
    });

    const updateDetails = (grade, time, amount, place) => {
        setData((prevData) => ({
            ...prevData,
            grade: grade,
            time: time,
            amount: amount,
            place: place,
        }));
    }

    const updateSubjects = (newSubjects) => {
        setData((prevData) => ({
            ...prevData,
            subjects: newSubjects,
        }));
    };

    const updateMainSubject = (subject) => {
        setData((prevData) => ({
            ...prevData,
            mainSubject: subject,
        }));
    };

    const updateActivity = (activity) => {
        setData((prevData) => ({
            ...prevData,
            activity: activity,
        }));
    };

    return (
        <ContentContext.Provider value={{ data, setData, updateMainSubject, updateSubjects, updateDetails, updateActivity }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContentContext = () => useContext(ContentContext);

export default ContentContext;
