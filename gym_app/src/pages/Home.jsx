import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainGrid from '../components/MainGrid';
import Typography from '@mui/material/Typography';

export default function Home() {
    // local state to store the name
    const [name, setName] = React.useState("");

    // retrieve koerperdaten from sessionStorage
    React.useEffect(() => {
        const storedKoerperdaten = localStorage.getItem("koerperdaten");
        if (storedKoerperdaten) {
            const parsedData = JSON.parse(storedKoerperdaten);
            setName(parsedData?.name || "");
        }
    }, []);

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    mx: 1,
                    mt: 10,
                    mb: 10,
                }}
            >
                {/* Centered Box for the welcome message */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            padding: 2,
                            borderRadius: 5,
                            backgroundColor: '#191919',
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h5" color="white"> {/* Smaller text with Typography */}
                            Willkommen, {name || "Gast"}!
                        </Typography>
                    </Box>
                </Box>

                {/* MainGrid remains as is */}
                <MainGrid />
            </Box>
        </>
    );
}
