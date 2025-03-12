import React, { createContext, useContext, useState } from "react";

// Create a context for exercises
const ExerciseContext = createContext();

// Provider component to wrap the application and provide exercise-related state
export const ExerciseProvider = ({ children }) => {
    const [exercises, setExercises] = useState([]); // State to store the list of exercises
    const [startTime, setStartTime] = useState(null); // State to store the start time of the workout
    const [workoutStarted, setWorkoutStarted] = useState(null); // State to indicate if the workout has started
    const [routineName, setRoutineName] = useState(""); // State to store the name of the routine

    // Function to add a new exercise to the list
    const addExercise = (exercise) => {
        setExercises((prevExercises) => [
            ...prevExercises,
            {
                title: exercise.title,
                muscleGroup: exercise.muscleGroup,
                rows: [], // Initialize with empty rows
            },
        ]);
    };

    // Function to toggle the checked state of a row in an exercise
    const toggleRowCheck = (exerciseIndex, rowId) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise, index) =>
                index === exerciseIndex
                    ? {
                        ...exercise,
                        rows: exercise.rows.map((row) =>
                            row.id === rowId
                                ? { ...row, checked: !row.checked } // Toggle checked state
                                : row
                        ),
                    }
                    : exercise
            )
        );
    };

    return (
        // Provide the exercise-related state and functions to the rest of the application
        <ExerciseContext.Provider
            value={{
                exercises,
                setExercises,
                addExercise,
                startTime,
                setStartTime,
                toggleRowCheck,
                workoutStarted,
                setWorkoutStarted,
                routineName,
                setRoutineName,
            }}
        >
            {children}
        </ExerciseContext.Provider>
    );
};

// Custom hook to use the ExerciseContext
export const useExerciseContext = () => useContext(ExerciseContext);