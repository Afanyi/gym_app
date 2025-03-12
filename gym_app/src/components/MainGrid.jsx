import Stack from '@mui/material/Stack';
import * as React from 'react';
import CustomHeatmap from './Heatmap';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';

// Main grid component for displaying statistics
export default function MainGrid() {
  return (
    <>
      <Stack spacing={2}>
        <CustomHeatmap />
        <SessionsChart />
        <PageViewsBarChart />
      </Stack>
    </>
  );
}