import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Link from "@mui/material/Link";
import FolderIcon from '@mui/icons-material/Folder';
import {useNavigate} from "react-router-dom";

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState('home');
    const navigate = useNavigate(); // React Router Hook to navigate programmatically

    const handleChange = (event, newValue) => {
        setValue(newValue); // Update the value state
        if (newValue === 'workout') {
            navigate('/routinen'); // Navigate to the "Favorites" route
        } else if (newValue === 'home') {
            navigate('/');
        }
        }

    return (
        <BottomNavigation  sx={{ zIndex: 1300, position: 'fixed', bottom: 0, width: 1.0 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                label="Workout"
                value="workout"
                icon={<FavoriteIcon />}
            />
        </BottomNavigation>
    );
}