import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateTrainingData } from './data/trainingData';

const TrainingDataContext = createContext();

export const TrainingDataProvider = ({ children }) => {
    const [trainingData, setTrainingData] = useState([]);

    useEffect(() => {
        const dataGenerated = sessionStorage.getItem('dataGenerated');
        if (dataGenerated) {
            const storedData = sessionStorage.getItem('trainingData');
            if (storedData) {
                setTrainingData(JSON.parse(storedData));
            }
        } else {
            const data = generateTrainingData();
            setTrainingData(data);
            sessionStorage.setItem('trainingData', JSON.stringify(data));
            sessionStorage.setItem('dataGenerated', 'true');
        }
    }, []);

    return (
        <TrainingDataContext.Provider value={{ trainingData }}>
            {children}
        </TrainingDataContext.Provider>
    );
};

export const useTrainingData = () => useContext(TrainingDataContext);