import React from "react";
import HeatMap from "react-heatmap-grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import {LineChart} from "@mui/x-charts/LineChart";
import Card from "@mui/material/Card";

export default function CustomHeatmap() {
    const xLabels = new Array(7).fill('');

    const yLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const data = new Array(yLabels.length)
        .fill(0)
        .map(() =>
            new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
        );

    return(
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>


                <div id="container">

                        <HeatMap
                            xLabels={xLabels}
                            yLabels={yLabels}
                            xLabelsLocation={"top"}
                            data={data}
                            height={45}
                            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                            cellStyle={(background, value, min, max, data, x, y) => ({
                                background: `rgb(36, 88, 172, ${1 - (max - value) / (max - min)})`,
                                fontSize: "11.5px",
                                color: "#444"
                            })}


                            cellRender={value => value && <div>{value}</div>}
                        />
                </div>

            </CardContent>
        </Card>


)
}