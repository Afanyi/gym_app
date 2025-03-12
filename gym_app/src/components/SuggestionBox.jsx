import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Snackbar } from '@mui/material';
import { getRecommendedExcercises } from '../utils/decisionSupport.js';
import { useExerciseContext } from '../data/ExerciseContext';
import { useNavigate } from 'react-router-dom';

export default function SuggestionBox() {
    const initialRecommendations = getRecommendedExcercises();
    const [recommendations, setRecommendations] = useState(() => {
        const savedRecommendations = localStorage.getItem('recommendations');
        return savedRecommendations ? JSON.parse(savedRecommendations) : initialRecommendations;
    });
    const { addExercise } = useExerciseContext();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    // Function to add an exercise to the workout
    const handleAddExercise = (exercise, muscleGroup) => {
        addExercise({ title: exercise, muscleGroup });
        const updatedRecommendations = recommendations.filter(rec => rec.exercise !== exercise);
        setRecommendations(updatedRecommendations);
        localStorage.setItem('recommendations', JSON.stringify(updatedRecommendations));
        setSnackbarMessage(`Übung "${exercise}" wurde hinzugefügt.`);
        setSnackbarOpen(true);
        navigate('/workout'); 
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mt: 4,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    p: 2,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: '500px', 
                    margin: 'auto',
                }}
            >
                <Typography 
                    variant="h6" 
                    component="div" 
                    gutterBottom
                    sx={{ color: '#90ee90' }} 
                >
                    Empfehlungen
                </Typography>
                {recommendations.map((recommendation, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 2,
                            mb: 2,
                            width: '100%',
                            borderRadius: 2,
                            cursor: 'pointer', 
                        }}
                        onClick={() => handleAddExercise(recommendation.exercise, recommendation.muscleGroup)} 
                    >
                        <Typography variant="body1">
                            <strong>Übung:</strong> {recommendation.exercise}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Muskelgruppe:</strong> {recommendation.muscleGroup}
                        </Typography>
                    </Paper>
                ))}
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
}
