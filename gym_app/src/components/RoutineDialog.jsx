import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

// Dialog component for saving a routine
const RoutineDialog = ({
                           open,
                           setOpen,
                           setRoutineName,
                           tempRoutineName,
                           setTempRoutineName,
                           setSnackbarMessage,
                           setSnackbarOpen,
                           error,
                           setError,
                       }) => {
    return (
        <Dialog open={open} disableEscapeKeyDown hideBackdrop>
            <DialogTitle>Routine speichern</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name der Routine"
                    value={tempRoutineName}
                    onChange={(e) => setTempRoutineName(e.target.value)}
                    error={error}
                    helperText={error ? "Bitte einen Namen eingeben!" : ""}
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setError(false);
                        setTempRoutineName("");
                        setOpen(false)
                    }}
                >
                    Abbrechen
                </Button>
                <Button
                    onClick={() => {
                        if (!tempRoutineName.trim()) {
                            setError(true);
                        } else {
                            setError(false);

                            setRoutineName(tempRoutineName.trim());
                            setTempRoutineName("");
                            setSnackbarMessage("Routine wurde hinzugefügt.");
                            setSnackbarOpen(true);
                            setOpen(false)
                        }
                    }}
                    color="primary"
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoutineDialog;