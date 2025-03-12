import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Box,
    Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useExerciseContext } from "../data/ExerciseContext";

// Component for displaying an exercise card
function ExerciseCard({ exercise, exerciseIndex }) {
    const {
        setExercises,
        toggleRowCheck,
    } = useExerciseContext();

    // Handle adding a new row to the exercise
    const handleAddRow = (exerciseIndex) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise, index) =>
                index === exerciseIndex
                    ? {
                        ...exercise,
                        rows: [
                            ...exercise.rows,
                            { id: exercise.rows.length + 1, reps: "", weight: "", checked: false },
                        ],
                    }
                    : exercise
            )
        );
    };

    // Handle deleting the last row from the exercise
    const handleDeleteRow = (exerciseIndex) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise, index) =>
                index === exerciseIndex
                    ? { ...exercise, rows: exercise.rows.slice(0, -1) }
                    : exercise
            )
        );
    };

    // Process row updates in the exercise
    const processRowUpdate = (exerciseIndex, newRow) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise, index) =>
                index === exerciseIndex
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

    return (
        <Card sx={{ mb: 4 }}>
            <CardHeader
                title={exercise.title}
                sx={{ textAlign: "center", paddingBottom: 0 }}
            />
            <CardContent sx={{ p: 2 }}>
                <DataGrid
                    rows={exercise.rows}
                    columns={[
                        {
                            field: "checked",
                            headerName: "",
                            width: 62,
                            renderCell: (params) => (
                                <Checkbox
                                    checked={params.row.checked || false}
                                    onChange={() => toggleRowCheck(exerciseIndex, params.row.id)}
                                    color="primary"
                                />
                            ),
                        },
                        { field: "id", headerName: "Satz", width: 100 },
                        {
                            field: "weight",
                            headerName: "Gewicht (kg)",
                            width: 150,
                            editable: true,
                        },
                        {
                            field: "reps",
                            headerName: "Wiederholungen",
                            width: 150,
                            editable: true,
                        },
                    ]}
                    editMode="cell"
                    processRowUpdate={(newRow) => processRowUpdate(exerciseIndex, newRow)}
                    hideFooter
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddRow(exerciseIndex)}
                    >
                        Satz hinzufügen
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteRow(exerciseIndex)}
                    >
                        Satz entfernen
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ExerciseCard;