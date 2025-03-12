// ImportExport.jsx
import React, { useRef } from "react";
import Button from "@mui/material/Button";

export default function ImportExport({ trainingData, setTrainingData }) {
    // We'll use a ref to simulate a click on the hidden file input for importing
    const fileInputRef = useRef(null);

    /**
     * Handles exporting the current `trainingData` as a JSON file.
     */
    const handleExport = () => {
        const dataStr = JSON.stringify(trainingData, null, 2); // Pretty-printed JSON
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element to download the file
        const link = document.createElement("a");
        link.href = url;
        link.download = "workout_data.json";
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    /**
     * Opens the file picker to import JSON.
     */
    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simulate a user click on the hidden file input
        }
    };

    /**
     * Reads the selected JSON file and updates `trainingData` in context.
     */
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const importedData = JSON.parse(text);

            // You can decide to replace or merge with existing data:
            // setTrainingData((prev) => [...prev, ...importedData]); // merge
            setTrainingData(importedData); // replace entirely

            alert("Training data successfully imported!");
        } catch (error) {
            console.error("Error importing JSON:", error);
            alert("Failed to import. Please ensure the file is valid JSON.");
        } finally {
            // Reset input so the same file can be selected again if needed
            event.target.value = null;
        }
    };

    return (
        <>
            {/* Export Button */}
            <Button variant="contained" color="primary" onClick={handleExport}>
                Export
            </Button>

            {/* Import Button */}
            <Button variant="outlined" color="primary" onClick={handleImportClick}>
                Import
            </Button>

            {/* Hidden file input (triggered by the Import button) */}
            <input
                type="file"
                accept="application/json"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </>
    );
}
