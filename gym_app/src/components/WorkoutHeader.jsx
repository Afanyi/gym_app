import React from "react";
import { Box, Tooltip, Typography, IconButton, TextField } from "@mui/material";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { useExerciseContext } from "../data/ExerciseContext";

// Component for workout header
const WorkoutHeader = ({
                           elapsedSeconds,
                           setSnackbarMessage,
                           setSnackbarOpen,
                           setRoutineDialogOpen,
                           setTempRoutineName,
                           workoutDate,
                           setWorkoutDate,
                           formatElapsedTime,
                       }) => {
    const {
        routineName,
        setRoutineName,
    } = useExerciseContext();

    return (
        <Box
            sx={{
                textAlign: "center",
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            {/* Display elapsed time */}
            <Box
                sx={{
                    height: "56px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#191919",
                    borderRadius: 1,
                    boxShadow: 2,
                    padding: 2,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ fontSize: 13, color: "#B8B8B8", marginBottom: 0.5 }}
                >
                    Zeit
                </Typography>
                <Typography variant="h7">{formatElapsedTime(elapsedSeconds)}</Typography>
            </Box>

            {/* Display routine name and bookmark icon */}
            <Box
                sx={{
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#191919",
                    borderRadius: 1,
                    boxShadow: 2,
                    paddingX: 2,
                }}
            >
                <Tooltip
                    title={
                        routineName.trim() ? "Routine entfernen" : "als Routine speichern"
                    }
                >
                    <IconButton
                        sx={{ padding: 1 }}
                        onClick={() => {
                            if (routineName.trim()) {
                                setRoutineName("");
                                setSnackbarMessage("Routine wurde entfernt.");
                                setSnackbarOpen(true);
                            } else {
                                setTempRoutineName("");
                                setRoutineDialogOpen(true);
                            }
                        }}
                    >
                        {routineName.trim() ? (
                            <Bookmark style={{ fontSize: "30px" }} color="primary" />
                        ) : (
                            <BookmarkBorder style={{ fontSize: "30px" }} />
                        )}
                    </IconButton>
                </Tooltip>

                {routineName.trim() && (
                    <Typography
                        variant="body1"
                        sx={{ fontSize: 20, marginLeft: 1 }}
                    >
                        {routineName}
                    </Typography>
                )}
            </Box>

            {/* Date picker for workout date */}
            <TextField
                label="Datum"
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
            />
        </Box>
    );
};

export default WorkoutHeader;