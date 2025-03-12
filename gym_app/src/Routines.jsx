// Routines.jsx
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useExerciseContext } from "./ExerciseContext";
import RoutinesGrid from "./components/RoutinesGrid";

// Import the new component
import ImportExport from "./ImportExport";

export default function Routines() {
    // Destructure from context
    const { trainingData, setTrainingData } = useExerciseContext();

    // Filter out favorite items if you have this field
    const favoriteTraining = trainingData.filter(item => item.isFavorite);

    return (
        <>
            <CssBaseline enableColorScheme />

            {/* Top Buttons for Export/Import */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mx: 2,
                    mt: 2
                }}
            >
                {/* Provide the data and setter to the ImportExport component */}
                <ImportExport
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 5,
                        mx: 2,
                        mt: 2,
                        p : 4
                    }}

                    trainingData={trainingData}
                    setTrainingData={setTrainingData}
                />
            </Box>

            {/* Your existing routines grid (optional) */}
            <Box sx={{ mx: 1, mt: 10, mb: 10 }}>
                <RoutinesGrid />
            </Box>

            {/* Favorite Training Section */}
            <Box sx={{ mx: 1, mt: 10, mb: 10 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                        Favorite Training
                    </Typography>
                    <Stack spacing={2}>
                        {favoriteTraining.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                No favorite training found.
                            </Typography>
                        ) : (
                            favoriteTraining.map(workout => (
                                <Box
                                    key={workout.id}
                                    sx={{
                                        p: 2,
                                        border: 1,
                                        borderRadius: 2,
                                        borderColor: "divider",
                                        boxShadow: 1,
                                        backgroundColor: "background.paper"
                                    }}
                                >
                                    <Typography variant="body1">{workout.exercise}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Muscle Group: {workout.muscleGroup}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Weight: {workout.weight} kg
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Reps: {workout.repetition}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date: {workout.date}
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </Stack>
                </Box>

                {/* All Training Section */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                        All Training
                    </Typography>
                    <Stack spacing={2}>
                        {trainingData.map(workout => (
                            <Box
                                key={workout.id}
                                sx={{
                                    p: 2,
                                    border: 1,
                                    borderRadius: 2,
                                    borderColor: "divider",
                                    boxShadow: 1,
                                    backgroundColor: "background.paper"
                                }}
                            >
                                <Typography variant="body1">{workout.exercise}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {workout.isFavorite ? "Favorite" : "Standard"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Muscle Group: {workout.muscleGroup}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Weight: {workout.weight} kg
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Reps: {workout.repetition}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date: {workout.date}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
