import { exercises } from "./exercises";
import dayjs from "dayjs";

// Function to get a random number within a range
const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

// Function to get the muscle group for a given exercise name
const getMuscleGroup = (exerciseName) => {
    for (const [muscleGroup, groupExercises] of Object.entries(exercises)) {
        if (groupExercises.includes(exerciseName)) {
            return muscleGroup;
        }
    }
    return "unknown";
};

// Function to generate progressive exercise data for a given day index
const generateExerciseDataProgressive = (exerciseName, dayIndex) => {
    const workouts = [];
    const sets = Math.floor(getRandomInRange(3, 5)); // 3 to 5 sets
    let baseWeight = 20 + dayIndex * 0.3; // Weight increases progressively (0.3 per day)
    for (let i = 0; i < sets; i++) {
        const reps = Math.floor(getRandomInRange(6, 12) + dayIndex * 0.05); // Reps increase slightly (max +3 reps over 2 months)
        const weight = Math.floor(baseWeight + i * 2); // Weight increases slightly per set
        workouts.push({ reps, weight });
    }
    return {
        title: exerciseName,
        muscleGroup: getMuscleGroup(exerciseName),
        rows: workouts,
    };
};

// Function to generate progressive completed workouts data for the past 60 days
const generateCompletedWorkoutsProgressive = () => {
    const completedWorkouts = [];
    const today = dayjs();
    let startDate = today.subtract(2, "month"); // Start date is 2 months ago
    let workoutId = 1; // Initialize workout ID counter

    for (let i = 0; i < 60; i++) { // Generate data for 60 days
        const workoutDate = startDate.format("YYYY-MM-DD");

        // Select 3-4 random exercises per day
        const availableExercises = Object.values(exercises).flat();
        const numExercises = Math.floor(getRandomInRange(3, 4));
        const dailyExercises = [];
        for (let j = 0; j < numExercises; j++) {
            const randomExerciseIndex = Math.floor(getRandomInRange(0, availableExercises.length - 1));
            const exercise = availableExercises.splice(randomExerciseIndex, 1)[0];
            dailyExercises.push(generateExerciseDataProgressive(exercise, i)); // Progressive day index
        }

        // Training duration between 1-2 hours (slight focus on efficiency)
        const duration = getRandomInRange(1, 2);

        // Create workout object
        const workout = {
            id: workoutId++,
            date: workoutDate,
            duration,
            exercises: dailyExercises,
        };

        completedWorkouts.push(workout);
        startDate = startDate.add(1, "day"); // Move to the next day
    }

    return completedWorkouts;
};

// Generate and store the mock data in localStorage
const mockData = generateCompletedWorkoutsProgressive();
localStorage.setItem("completedWorkouts", JSON.stringify(mockData));