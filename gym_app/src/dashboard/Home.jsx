import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import AppTheme from '../shared-theme/AppTheme';
import FixedBottomNavigation from '../components/CustomBottomNavBar'

import Link from "@mui/material/Link";



export default function Home(props) {
  return (

<>
      <CssBaseline enableColorScheme />



       {/* <AppNavbar title="Home"/>
          <FixedBottomNavigation />*/}

        <Box sx={{
            mx: 1,
            mt: 10,
            mb: 10,
        }}>
            <MainGrid />
        </Box>
</>
  );
}
