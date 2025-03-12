import React from 'react';
import { useTrainingData } from './TrainingDataContext';

const TrainingDataPage = () => {
    const { trainingData } = useTrainingData();

    return (
        <div>
            <h1>Training Data</h1>
            <ul>
                {trainingData.map((entry) => (
                    <li key={entry.id}>
                        {entry.date}: {entry.exercise} - {entry.sets} sets of {entry.reps} reps at {entry.weight} kg
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainingDataPage;