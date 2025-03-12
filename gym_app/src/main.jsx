// src/main.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routines from './Routines';
import { Outlet } from 'react-router-dom';
import Home from './dashboard/Home';
import AddExercise from './AddExercise';
import theme from './theme';
import ExerciseLogBook from './Workout';
import TrainingDataPage from './TrainingDataPage';
import { ExerciseProvider } from './ExerciseContext';
import { TrainingDataProvider } from './TrainingDataContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ExerciseProvider>
                <TrainingDataProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<><App /><Outlet /></>}>
                                <Route index element={<Home />} />
                                <Route path="routinen" element={<Routines />} />
                                <Route path="exercise-log" element={<ExerciseLogBook />} />
                                <Route path="add-exercise" element={<AddExercise />} />
                                <Route path="training-data-example" element={<TrainingDataPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TrainingDataProvider>
            </ExerciseProvider>
        </ThemeProvider>
    </React.StrictMode>
);