
import React, { useState } from 'react';
import './Simulation.css';

const Simulation = () => {
    const [ingredients, setIngredients] = useState('');
    const [simulationResult, setSimulationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSimulateDish = async () => {
        setLoading(true);
        setError('');
        setSimulationResult(null);

        try {
            // Prepare the prompt with ingredients entered by the user
            const apiKey = "apikey";  // Replace with your OpenAI API key
            const url = "https://api.openai.com/v1/chat/completions";

            const messages = [
                {
                    role: "system",
                    content: "You are a culinary assistant that simulates dishes based on ingredients provided by the user. You should predict the taste profile of the dish, its nutritional content (protein, carbs, fat), and provide a detailed flavor profile."
                },
                {
                    role: "user",
                    content: `
                    I have the following ingredients: ${ingredients}.
                    Predict the following:
                    - A suitable name for the dish
                    - The overall taste profile (e.g., spicy, savory, sweet, sour)
                    - A detailed description of the flavor profile (e.g., spicy with a hint of sweetness)
                    - Protein content (in grams)
                    - Carbohydrate content (in grams)
                    - Fat content (in grams)
                    - A brief description of the dish
                    
                    Please ensure the response is in valid JSON format, like this:
                    {
                        "title": "Dish Name",
                        "tasteProfile": "Taste Profile",
                        "flavorProfile": "Detailed Flavor Profile",
                        "protein": "protein content in grams",
                        "carbs": "carbohydrate content in grams",
                        "fat": "fat content in grams",
                        "description": "Description of the dish",
                        "totalCalories": "total caloric content in calories"
                    }
                    `
                },
            ];

            // Call the ChatGPT API
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);

                const generatedText = data.choices[0]?.message?.content;
                console.log("Generated Text (Raw):", generatedText); // Log the raw GPT response

                // Try to parse the JSON response
                let parsedResult;
                try {
                    parsedResult = JSON.parse(generatedText);
                } catch (jsonError) {
                    console.error("JSON Parsing Error:", jsonError);
                    setError("Failed to parse API response. Please ensure the API provides a valid JSON output.");
                    return;
                }

                // Calculate the total calories based on fat, protein, and carbs
                const protein = parsedResult.protein || 0;
                const carbs = parsedResult.carbs || 0;
                const fat = parsedResult.fat || 0;

                const totalCalories = (protein * 4) + (carbs * 4) + (fat * 9);

                // Add the total calories to the result
                parsedResult.totalCalories = totalCalories;

                if (parsedResult) {
                    setSimulationResult(parsedResult);
                } else {
                    setError("No valid recipe simulation found for the given ingredients.");
                }
            } else {
                const errorData = await response.json();
                console.error("API Error Response:", errorData);
                setError("Failed to fetch simulation. Please check your input or API key.");
            }
        } catch (error) {
            console.error("Network/Fetch Error:", error);
            setError("A network error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="simulation-background">
            <div className="simulation-container">
                <h2>Dish Simulation</h2>
                <p>Enter the ingredients to simulate a dish and predict its taste, flavor, and nutritional profile.</p>
                <textarea
                    placeholder="Enter ingredients (comma-separated): e.g., chicken, garlic, spices"
                    className="simulation-input"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <button className="simulation-button" onClick={handleSimulateDish} disabled={loading}>
                    {loading ? "Simulating..." : "Simulate Dish"}
                </button>

                {error && <div className="error-message">{error}</div>}

                {simulationResult && (
                    <div className="simulation-result">
                        <h3>Simulation Result</h3>
                        <p><strong>Dish Name:</strong> {simulationResult.title}</p>
                        <p><strong>Taste Profile:</strong> {simulationResult.tasteProfile}</p>
                        <p><strong>Flavor Profile:</strong> {simulationResult.flavorProfile}</p>
                        <p><strong>Protein Content:</strong> {simulationResult.protein}g</p>
                        <p><strong>Carbohydrate Content:</strong> {simulationResult.carbs}g</p>
                        <p><strong>Fat Content:</strong> {simulationResult.fat}g</p>
                        <p><strong>Total Calories:</strong> {simulationResult.totalCalories} kcal</p>
                        <p><strong>Description:</strong> {simulationResult.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Simulation;
