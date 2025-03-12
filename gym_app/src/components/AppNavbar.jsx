import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Application navigation bar component
export default function AppNavbar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: 'background.paper',
                backgroundImage: 'none',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Toolbar>
                {/* Left-aligned icon */}
                <FitnessCenterIcon
                    fontSize="large"
                    sx={{ color: 'primary.main' }}
                />

                {/* Spacer to push content to the sides */}
                <Box sx={{ flexGrow: 1 }} />

            </Toolbar>
        </AppBar>
    );
}