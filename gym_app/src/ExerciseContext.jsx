import React, { createContext, useContext, useState, useEffect } from "react";
import { generateTrainingData } from "./data/trainingData";

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
    // Separate states for exercises and trainingData
    const [exercises, setExercises] = useState([]);
    const [trainingData, setTrainingData] = useState([]);

    const addExercise = (exercise, isFavorite = false) => {
        const newExerciseId = exercises.length + 1;
        setExercises((prevExercises) => [
            ...prevExercises,
            { id: newExerciseId, title: exercise, isFavorite: isFavorite,  rows: [], idCounter: 1 },
        ]);
    };

    useEffect(() => {
        const dataGenerated = sessionStorage.getItem("dataGenerated");

        if (dataGenerated) {
            const storedData = sessionStorage.getItem("trainingData");
            if (storedData) {
                // Parse string from session storage and set to state
                const parsedData = JSON.parse(storedData);
                setTrainingData(parsedData);

                // Save directly to localStorage (avoid double stringification)
                localStorage.setItem("trainingData", storedData);
            }
        } else {
            // Generate new data and store in session/local storage
            const data = generateTrainingData();
            const dataString = JSON.stringify(data);

            setTrainingData(data);
            sessionStorage.setItem("trainingData", dataString);
            sessionStorage.setItem("dataGenerated", "true");
            localStorage.setItem("trainingData", dataString);

            console.log("TrainingDataProvider: data generated and stored.");
        }
    }, []);

    return (
        <ExerciseContext.Provider
            value={{
                exercises,
                setExercises,
                addExercise,
                trainingData
            }}
        >
            {children}
        </ExerciseContext.Provider>
    );
};

export const useExerciseContext = () => useContext(ExerciseContext);
