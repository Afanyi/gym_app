import React from "react";
import HeatMap from "react-heatmap-grid";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const getLast5Weeks = () => {
    const weeks = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7)); // Set to the last Monday

    for (let i = -21; i < 14; i++) { // Last 3 weeks, this week, and next week
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        weeks.push({
            weekday: date.toLocaleDateString("de-DE", { weekday: "short" }),
            date: date.toISOString().split("T")[0],
            muscleGroup: getMuscleGroupForDate(date),
            intensity: getIntensityForDate(date),
            weekNumber: getWeekNumber(date)
        });
    }
    return weeks;
};

const getMuscleGroupForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const completedWorkouts = JSON.parse(localStorage.getItem("completedWorkouts") || "[]");
    const muscleGroupCount = completedWorkouts.reduce((count, workout) => {
        if (workout.date === dateString) {
            workout.exercises.forEach(exercise => {
                count[exercise.muscleGroup] = (count[exercise.muscleGroup] || 0) + 1;
            });
        }
        return count;
    }, {});
    return Object.keys(muscleGroupCount).reduce((a, b) => muscleGroupCount[a] > muscleGroupCount[b] ? a : b, "unknown");
};

const getIntensityForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const completedWorkouts = JSON.parse(localStorage.getItem("completedWorkouts") || "[]");
    return completedWorkouts.reduce((total, workout) => {
        if (workout.date === dateString) {
            const totalWeight = workout.exercises.reduce((exerciseTotal, exercise) => {
                return exerciseTotal + exercise.rows.reduce((rowTotal, row) => rowTotal + row.reps * row.weight, 0);
            }, 0);
            total += totalWeight / (workout.duration || 1.5); // Assume 1.5 hours if duration is missing
        }
        return total;
    }, 0);
};

const getColorForIntensity = (intensity) => {
    return `rgba(0, 0, 255, ${Math.min(1, intensity / 5000)})`;
};

const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + (firstDayOfYear.getDay() || 7) - 1) / 7);
};

export default function CustomHeatmap() {
    const yLabels = ["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.", "So."];
    const days = getLast5Weeks();
    const year = new Date(days[0].date).getFullYear();
    const xLabels = Array.from(new Set(days.map(day => `KW ${day.weekNumber}`)));
    const data = yLabels.map((_, dayIndex) =>
        xLabels.map((_, weekIndex) => days[weekIndex * 7 + dayIndex] || { weekday: "", date: "", muscleGroup: "unknown", intensity: 0, weekNumber: 0 })
    ).filter(day => day.length === xLabels.length);

    const navigate = useNavigate();

    const handleCellClick = (x, y) => {
        const { date, muscleGroup } = data[y][x];
        if (muscleGroup !== "unknown") {
            navigate(`/workout/${date}`);
        }
    };

    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>{year}</Typography>
                <HeatMap
                    xLabels={xLabels}
                    yLabels={yLabels}
                    xLabelsLocation="top"
                    data={data}
                    height={45}
                    onClick={handleCellClick}
                    cellStyle={(background, value) => ({
                        background: value ? getColorForIntensity(value.intensity) : "transparent",
                        fontSize: "11.5px",
                        color: "#FFF",
                        cursor: value && value.muscleGroup !== "unknown" ? "pointer" : "default",
                    })}
                    cellRender={(value) => value && (
                        <div title={value.muscleGroup}>
                            {`${new Date(value.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}`}
                        </div>
                    )}
                />
            </CardContent>
        </Card>
    );
}