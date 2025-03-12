import React, { useState, useEffect } from "react";
import { Box, Snackbar } from "@mui/material";
import { useExerciseContext } from "../data/ExerciseContext";
import { useNavigate } from "react-router-dom";
import WorkoutControls from "../components/WorkoutControls";
import WorkoutHeader from "../components/WorkoutHeader";
import { calculateElapsedSeconds, formatElapsedTime, calculateElapsedTimeInHours } from "../utils/timeUtils"; // Import utility functions
import RoutineDialog from "../components/RoutineDialog";
import ExerciseCard from "../components/ExerciseCard";

const Workout = () => {
    const {
        exercises,
        setExercises,
        startTime,
        setStartTime,
        routineName,
        setRoutineName,
    } = useExerciseContext();

    const navigate = useNavigate();
    const [workoutDate, setWorkoutDate] = useState(() => localStorage.getItem("workoutDate") || new Date().toISOString().split("T")[0]);
    const [routineDialogOpen, setRoutineDialogOpen] = useState(false);
    const [tempRoutineName, setTempRoutineName] = useState(""); // Temporary input for dialog
    const [error, setError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Initialize workout start time if not already set
    useEffect(() => {
        if (!startTime) {
            setStartTime(new Date());
        }
    }, []);

    // Update elapsed time every second
    useEffect(() => {
        let interval;
        if (startTime) {
            setElapsedSeconds(calculateElapsedSeconds(startTime)); 
            interval = setInterval(() => {
                setElapsedSeconds(calculateElapsedSeconds(startTime)); 
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [startTime]);

    // Handle ending the workout
    const handleEndWorkout = () => {
        const elapsedTimeInHours = calculateElapsedTimeInHours(startTime); // Use utility function

        // Retrieve existing workouts from localStorage
        const existingWorkouts = JSON.parse(localStorage.getItem("completedWorkouts")) || [];
        const lastWorkoutId = existingWorkouts.length > 0
            ? existingWorkouts[existingWorkouts.length - 1].id
            : 0;
        const newWorkoutId = lastWorkoutId + 1;

        // Remove row IDs from exercises before saving
        const updatedExercises = exercises.map((exercise) => ({
            ...exercise,
            rows: exercise.rows.map(({ id, ...rest }) => rest),
        }));

        // Create new workout object
        const newWorkout = {
            id: newWorkoutId,
            date: workoutDate,
            duration: elapsedTimeInHours,
            exercises: updatedExercises,
        };

        // Save new workout object to localStorage
        const updatedWorkouts = [...existingWorkouts, newWorkout];
        localStorage.setItem("completedWorkouts", JSON.stringify(updatedWorkouts));

        // Save routine if a name is provided
        if (routineName.trim()) {
            const existingRoutines = JSON.parse(localStorage.getItem("routines")) || [];
            const newRoutine = {
                id: newWorkoutId,
                name: routineName.trim(),
                date: workoutDate,
                exercises: updatedExercises,
            };
            const updatedRoutines = [...existingRoutines, newRoutine];
            localStorage.setItem("routines", JSON.stringify(updatedRoutines));
        }

        // Reset state and navigate to home
        setExercises([]);
        setRoutineName("");
        setError(false);
        localStorage.removeItem("workoutDate");
        localStorage.removeItem("recommendations"); // Remove recommendations from localStorage
        setStartTime(null);
        navigate("/");
    };

    return (
        <Box sx={{ mx: 1, mt: 10, mb: 15 }}>
            <WorkoutHeader
                elapsedSeconds={elapsedSeconds}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                setRoutineDialogOpen={setRoutineDialogOpen}
                setTempRoutineName={setTempRoutineName}
                workoutDate={workoutDate}
                setWorkoutDate={setWorkoutDate}
                formatElapsedTime={formatElapsedTime}
            />

            {exercises.map((exercise, index) => (
                <ExerciseCard
                    key={index}
                    exercise={exercise}
                    exerciseIndex={index}
                />
            ))}

            <WorkoutControls handleEndWorkout={handleEndWorkout} />

            <RoutineDialog
                open={routineDialogOpen}
                setOpen={setRoutineDialogOpen}
                setRoutineName={setRoutineName}
                tempRoutineName={tempRoutineName}
                setTempRoutineName={setTempRoutineName}
                error={error}
                setError={setError}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Workout;