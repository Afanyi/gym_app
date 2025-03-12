import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../dashboard/internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import CustomHeatmap from './Heatmap'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function RoutinesGrid() {

    return (
        <>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Stack spacing={2} direction="row">
                    {/* Nutzt react-router's Link für Navigation */}
                    <Button variant="contained" component={Link} to="/exercise-log">
                        Neue Routine
                    </Button>
                    <Button variant="contained" component={Link} to="/exercise-log">
                        Leeres Workout
                    </Button>
                </Stack>
            </Box>
        </>



    );
}
