import { exercises } from '../exercises';

const generateTrainingData = () => {
    const trainingData = [];
    const splits = ['Push', 'Pull', 'Legs'];
    const exerciseCategories = {
        Push: ['chest', 'shoulder', 'arm'],
        Pull: ['back', 'arm'],
        Legs: ['leg', 'abdominal']
    };

    const favoriteExercises = ["Bench Press", "Pull Up", "Squat", "Shoulder Press"]; // Example favorites
    let id = 1;

    for (let week = 1; week <= 4; week++) {
        for (let day = 1; day <= 5; day++) {
            const date = new Date();
            date.setDate(date.getDate() + (week - 1) * 7 + (day - 1));
            const formattedDate = date.toISOString().split('T')[0];
            const split = splits[(day - 1) % splits.length];

            const selectedExercises = [];
            exerciseCategories[split].forEach((category) => {
                const categoryExercises = exercises[category];
                // Shuffle and select 2-3 exercises per muscle group
                categoryExercises.sort(() => 0.5 - Math.random());
                // 30% chance to pick a favorite exercise
                if (Math.random() < 0.3) {
                    const favoriteSubset = categoryExercises.filter((ex) => favoriteExercises.includes(ex));
                    if (favoriteSubset.length > 0) {
                        const randomFavorite = favoriteSubset[Math.floor(Math.random() * favoriteSubset.length)];
                        selectedExercises.push(randomFavorite);
                        return; // Skip normal exercise selection if a favorite is chosen
                    }
                }

                const normalExercise = categoryExercises[0]; // Take the first shuffled exercise
                selectedExercises.push(normalExercise);
            });

            selectedExercises.forEach((exercise) => {
                trainingData.push({
                    id: id++,
                    exercise,
                    sets: Math.floor(Math.random() * 3) + 3, // 3 to 5 sets
                    reps: Math.floor(Math.random() * 6) + 8, // 8 to 13 reps
                    weight: Math.floor(Math.random() * 50) + 20, // 20 to 70 kg
                    duration: `${Math.floor(Math.random() * 60) + 30}s`, // 30 to 90 seconds rest
                    date: formattedDate,
                });
            });
        }
    }

    return trainingData;
};

export { generateTrainingData };