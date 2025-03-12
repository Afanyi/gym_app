import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

function setBodyData(handleSubmit, name, setName, age, setAge, weight, setWeight, height, setHeight) {
    return (
        <Box
            sx={{
                padding: "16px",
                backgroundColor: "#000",
                color: "#fff",
                minHeight: "100vh",
                marginTop: "70px",
            }}
        >
            <Typography variant="h6" align="center">
                Körperdaten eintragen
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "16px", marginTop: "16px" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Alter"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                    label="Gewicht (kg)"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <TextField
                    label="Körpergröße (cm)"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Speichern
                </Button>
            </form>
        </Box>
    );
}

const Koerperdaten = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const koerperdaten = {
            name: name,
            alter: age,
            gewicht: weight,
            groesse: height,
        };
        localStorage.setItem("koerperdaten", JSON.stringify(koerperdaten));
        setIsEditing(false);
    };

    useEffect(() => {
        const storedKoerperdaten = sessionStorage.getItem("koerperdaten");
        if (storedKoerperdaten) {
            const { name, alter, gewicht, groesse } = JSON.parse(storedKoerperdaten);
            setName(name || "");
            setAge(alter || "");
            setWeight(gewicht || "");
            setHeight(groesse || "");
        }
    }, []);

    if (isEditing) {
        return setBodyData(handleSubmit, name, setName, age, setAge, weight, setWeight, height, setHeight);
    }

    return (
        <Box
            sx={{
                padding: "16px",
                backgroundColor: "#000",
                color: "#fff",
                minHeight: "100vh",
                marginTop: "70px",
            }}
        >
            <Typography variant="h6" align="center" sx={{ marginBottom: "16px" }}>
                Körperdaten
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Name: {name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Alter: {age}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Gewicht: {weight}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Körpergröße: {height}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                Bearbeiten
            </Button>
        </Box>
    );
};

export default Koerperdaten;
