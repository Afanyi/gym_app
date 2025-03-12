import React, {useState} from "react";
import { Card, CardContent, CardHeader, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useExerciseContext } from "./ExerciseContext";
import { Link } from "react-router-dom";

const Workout = () => {
    const { exercises, setExercises, addExercise } = useExerciseContext(); // Übungen aus dem Kontext

    const handleAddRow = (exerciseId) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        rows: [
                            ...exercise.rows,
                            { id: exercise.idCounter, weight: '', reps: '' },
                        ],
                        idCounter: exercise.idCounter + 1,
                    }
                    : exercise
            )
        );
    };

    const handleDeleteRow = (exerciseId) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        rows: exercise.rows.slice(0, -1),
                        idCounter: exercise.idCounter > 1 ? exercise.idCounter - 1 : 1,
                    }
                    : exercise
            )
        );
    };

    const processRowUpdate = (exerciseId, newRow) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        rows: exercise.rows.map((row) =>
                            row.id === newRow.id ? newRow : row
                        ),
                    }
                    : exercise
            )
        );
        return newRow;
    };

    const handleEndWorkout = () => {
        // Hier kannst du Funktionalität für das Beenden des Workouts hinzufügen
        alert('Workout beendet!');
    };

    return (
        <Box sx={{ mx: 1, mt: 10, mb: 10 }}>
            {/* Iterieren über die Übungen und für jede Übung eine Karte anzeigen */}
            {exercises.map((exercise) => (
                <Card key={exercise.id} sx={{ mb: 4 }}>
                    <CardHeader
                        title={exercise.title}
                        sx={{ textAlign: "center", paddingBottom: 0 }}
                    />
                    <CardContent sx={{ p: 2 }}>
                        <DataGrid
                            rows={exercise.rows}
                            columns={[
                                { field: "id", headerName: "Satz", width: 100 },
                                { field: "weight", headerName: "Gewicht (kg)", width: 150, editable: true },
                                { field: "reps", headerName: "Wiederholungen", width: 150, editable: true },
                            ]}
                            editMode="cell"
                            processRowUpdate={(newRow) => processRowUpdate(exercise.id, newRow)}
                            hideFooter
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddRow(exercise.id)}
                            >
                                Neuen Satz hinzufügen
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDeleteRow(exercise.id)}
                            >
                                Letzten Satz entfernen
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
            {/* Container für die Haupt-Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
                <Button
                    variant="contained"
                    color="success"
                    component={Link} // Button, der zur Seite für das Hinzufügen einer Übung führt
                    to="/add-exercise"
                >
                    Neue Übung hinzufügen
                </Button>
                <Button variant="contained" color="error" onClick={handleEndWorkout}>
                    Workout beenden
                </Button>
            </Box>
        </Box>
    );
};

export default Workout;