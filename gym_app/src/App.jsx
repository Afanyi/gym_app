import * as React from 'react';


import CssBaseline from '@mui/material/CssBaseline';

import AppNavbar from './components/AppNavbar.jsx';

import AppTheme from './shared-theme/AppTheme.tsx';
import FixedBottomNavigation from './components/CustomBottomNavBar.jsx'


export default function App(props) {
    return (
<>

            <CssBaseline enableColorScheme />



             <AppNavbar title="Home"/>
          <FixedBottomNavigation />

</>

    );
}
