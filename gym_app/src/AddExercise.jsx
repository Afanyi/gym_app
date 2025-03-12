// Importiere die Übungen-Daten aus exercises.jsx
import { exercises } from "./exercises"; // Passe den Pfad entsprechend an
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useExerciseContext } from "./ExerciseContext";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function MusclegroupSearch({ selectedGroup, setSelectedGroup }) {
    const options = Object.keys(exercises); // Muskelgruppen
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    return (
        <Autocomplete
            options={options}
            value={value}
            inputValue={inputValue}
            onChange={(event, newValue) => {
                setValue(newValue);
                setSelectedGroup(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
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

function ExerciseSearch({ selectedGroup, selectedExercise, setSelectedExercise }) {
    const options = selectedGroup
        ? exercises[selectedGroup]?.map((exercise) => `${exercise} (${selectedGroup})`) || []
        : Object.entries(exercises).flatMap(([group, exerciseList]) =>
            exerciseList.map((exercise) => `${exercise} (${group})`)
        );

    return (
        <Autocomplete
            options={options}
            value={selectedExercise}
            onChange={(event, newValue) => {
                setSelectedExercise(newValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Übung (optional)" variant="outlined" />
            )}
        />
    );
}

export default function AddExercise() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");
    // NEW: Track favorite status
    const [isFavorite, setIsFavorite] = useState(false);

    const { addExercise } = useExerciseContext();
    const navigate = useNavigate();

    const handleAddExercise = () => {
        if (selectedExercise) {
            // Pass isFavorite to addExercise
            addExercise(selectedExercise, isFavorite);
            alert(`Übung ${selectedExercise} wurde hinzugefügt!`);
            navigate("/exercise-log");
        } else {
            alert("Bitte wähle eine Übung aus!");
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
            {/* Muskelgruppen-Textfeld */}
            <MusclegroupSearch
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
            />

            {/* Übungen-Textfeld */}
            <ExerciseSearch
                selectedGroup={selectedGroup}
                selectedExercise={selectedExercise}
                setSelectedExercise={setSelectedExercise}
            />

            {/* NEW: Favorite Checkbox */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isFavorite}
                        onChange={(e) => setIsFavorite(e.target.checked)}
                        color="primary"
                    />
                }
                label="Als Favorit markieren"
            />

            {/* Hinzufügen-Button */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                }}
            >
                <Button variant="contained" color="primary" onClick={handleAddExercise}>
                    Hinzufügen
                </Button>
            </Box>
        </Stack>
    );
}
