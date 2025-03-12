import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

// Component for workout controls
const WorkoutControls = ({ handleEndWorkout }) => {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 50,
                left: 0,
                right: 0,
                padding: 1,
                display: "flex",
                justifyContent: "center",
                py: 1,
                gap: 2,
                backgroundColor: "background.paper",
                boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
                borderRadius: 2,
                maxWidth: "fit-content",
                margin: "0 auto",
            }}
        >
            {/* Button to add a new exercise */}
            <Button
                variant="contained"
                color="success"
                component={Link}
                to="add-exercise"
            >
                Neue Übung hinzufügen
            </Button>
            {/* Button to end the workout */}
            <Button variant="contained" color="error" onClick={handleEndWorkout}>
                Workout beenden
            </Button>
        </Box>
    );
};

export default WorkoutControls;