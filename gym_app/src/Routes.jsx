import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './pages/App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Routines from "./pages/Routines";
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import AddExercise from "./pages/AddExercise";
import theme from "./theme";
import Workout from "./pages/Workout";
import Settings from './pages/Settings';
import Koerperdaten from './pages/Koerperdaten';
import WorkoutDetails from './pages/WorkoutDetails';
import { ExerciseProvider } from "./data/ExerciseContext";

import "./data/MockDataGenerator";

// Get the root element from the DOM
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the application
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ExerciseProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<><App /><Outlet /></>}>
                            <Route index element={<Home />} />
                            <Route path="routinen" element={<Routines />} />
                            <Route path="workout" element={<Workout />} />
                            <Route path="workout/add-exercise" element={<AddExercise />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="koerperdaten" element={<Koerperdaten />}  />
                            <Route path="workout/:date" element={<WorkoutDetails />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ExerciseProvider>
        </ThemeProvider>
    </React.StrictMode>
);