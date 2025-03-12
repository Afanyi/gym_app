import { exercises } from "../data/exercises"; // Import exercises data
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useExerciseContext } from "../data/ExerciseContext";
import { useNavigate } from "react-router-dom";
import SuggestionBox from "../components/SuggestionBox";
import Chip from "@mui/material/Chip";

// Component for selecting muscle group
function MusclegroupSearch({ selectedGroup, setSelectedGroup }) {
    const options = Object.keys(exercises); // Get muscle groups from exercises data

    return (
        <Autocomplete
            options={options}
            value={selectedGroup}
            onChange={(event, newValue) => {
                setSelectedGroup(newValue);
            }}
            renderOption={(props, option) => (
                <Box
                    {...props}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingX: 1,
                        paddingY: 0.5,
                        gap: 1,
                    }}
                >
                    {/* Display muscle group as a chip */}
                    <Chip
                        label={option}
                        color="primary"
                        sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize", // Capitalize first letter
                        }}
                    />
                </Box>
            )}
            getOptionLabel={(option) => option} // Display muscle group name
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Muskelgruppe (optional)"
                    variant="outlined"
                />
            )}
        />
    );
}

// Component for selecting exercise
function ExerciseSearch({ selectedGroup, selectedExercise, setSelectedExercise, error }) {
    // Collect exercises with muscle groups
    const options = selectedGroup
        ? (exercises[selectedGroup] || []).map((exercise) => ({ exercise, muscleGroup: selectedGroup }))
        : Object.entries(exercises).flatMap(([group, exerciseList]) =>
            exerciseList.map((exercise) => ({ exercise, muscleGroup: group }))
        );

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.exercise}
            value={
                selectedExercise
                    ? options.find((option) => option.exercise === selectedExercise) || null
                    : null
            }
            onChange={(event, newValue) => {
                setSelectedExercise(newValue ? newValue.exercise : "");
            }}
            renderOption={(props, option) => (
                <Box
                    {...props}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingX: 1,
                        paddingY: 0.5,
                        gap: 1,
                    }}
                >
                    {/* Display exercise name */}
                    <span>{option.exercise}</span>
                    {/* Display muscle group as a chip */}
                    <Chip
                        label={option.muscleGroup}
                        color="primary"
                        size="small"
                        sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize", // Capitalize first letter
                        }}
                    />
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Übung"
                    variant="outlined"
                    error={error} // Set error state
                    helperText={error ? "Bitte wähle eine Übung aus!" : ""}
                />
            )}
        />
    );
}


export default function AddExercise() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedExercise, setSelectedExercise] = useState(""); 
    const [exerciseError, setExerciseError] = useState(false); 
    const { addExercise } = useExerciseContext(); 
    const navigate = useNavigate();


    const handleAddExercise = () => {
        if (selectedExercise) {
            setExerciseError(false); // Reset error state

            // Find muscle group based on selected exercise
            const muscleGroup = Object.keys(exercises).find(group =>
                exercises[group].includes(selectedExercise)
            );

            // Save exercise and muscle group in context
            addExercise({ title: selectedExercise, muscleGroup });

            navigate("/workout");
        } else {
            setExerciseError(true); // Set error state
        }
    };

    return (
        <Stack
            spacing={5}
            sx={{
                justifyContent: "flex-start",
                mx: 5,
                mt: 10,
                mb: 10,
                position: "relative",
            }}
        >
            <SuggestionBox />
            {/* Optional muscle group text field */}
            <MusclegroupSearch
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
            />
            {/* Exercise selection */}
            <ExerciseSearch
                selectedGroup={selectedGroup}
                selectedExercise={selectedExercise}
                setSelectedExercise={setSelectedExercise}
                error={exerciseError} // Forward error state
            />
            {/* Add button */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddExercise}
                >
                    Hinzufügen
                </Button>
            </Box>
        </Stack>
    );
}