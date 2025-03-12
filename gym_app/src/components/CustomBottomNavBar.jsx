import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useExerciseContext } from "../data/ExerciseContext";

// Custom bottom navigation bar component
export default function LabelBottomNavigation() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { startTime } = useExerciseContext();

    // Determine the navigation value based on the current path
    const getValueFromPath = (path) => {
        switch (path) {
            case "/":
                return "home";
            case "/routinen":
                return "workout";
            case "/workout":
                return "workout";
            case "/settings":
                return "settings";
            case "/koerperdaten":
                return "settings";
            case "/workout/add-exercise":
                return "workout";
            default:
                return "home"; // Fallback to home
        }
    };

    const [value, setValue] = React.useState(getValueFromPath(location.pathname));

    // Synchronize value with the current path when location changes
    React.useEffect(() => {
        setValue(getValueFromPath(location.pathname));
    }, [location.pathname]);

    // Handle navigation change
    const handleChange = (event, newValue) => {
        setValue(newValue); 
        if (newValue === "workout") {
            if (startTime) {
                console.log("Exercises detected, navigating to /workout:", startTime);
                navigate("/workout");
            } else {
                navigate("/routinen");
            }
        } else if (newValue === "home") {
            navigate("/");
        } else if (newValue === "settings") {
            navigate("/settings");
        }
    };

    return (
        <BottomNavigation
            sx={{ zIndex: 1300, position: "fixed", bottom: 0, width: 1.0 }}
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Workout" value="workout" icon={<FitnessCenterIcon />} />
            <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
    );
}