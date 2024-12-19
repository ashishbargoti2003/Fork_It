import React, { useState, useEffect } from 'react';
import './RecipeofDay.css';
import main_b from '../Assets/main-b.jpg';
import { useNavigate } from 'react-router-dom';

const RecipeofDay = () => {
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState(null); // State to store recipe data
    const [recipeTitle, setRecipeTitle] = useState(''); // State to store Recipe_title
    const [recipeId, setRecipeId] = useState(null); // State to store Recipe_id
    const [error, setError] = useState(null); // State to store error messages

    // Automatically fetch the Recipe of the Day when the page loads
    useEffect(() => {
        const fetchRecipeOfTheDay = async () => {
            try {
                const response = await fetch("https://cosylab.iiitd.edu.in/recipe/recipeOftheDay");
                if (!response.ok) {
                    throw new Error("HTTP error! Status: ${response.status}");
                }
                const data = await response.json();
                if (data.success === "true" && data.payload) {
                    setRecipeData(data.payload); // Store the fetched recipe data
                    setRecipeTitle(data.payload.Recipe_title); // Store the Recipe_title
                    setRecipeId(data.payload.Recipe_id); // Store the Recipe_id
                    localStorage.setItem("Recipe_id", data.payload.Recipe_id); // Save Recipe_id in localStorage
                    setError(null); // Clear any error
                } else {
                    setError("No recipe of the day found.");
                }
            } catch (e) {
                setError("Error fetching recipe of the day: ${e.message}");
            }
        };

        fetchRecipeOfTheDay(); // Call the function on page load
    }, []);

    // Fetch the recipe by Recipe_id when the "Check" button is clicked
    const fetchRecipeById = async () => {

        navigate('/Recipedaypage');
        if (recipeId) {
            try {
                const response = await fetch("https://cosylab.iiitd.edu.in/recipe/${recipeId}");
                if (!response.ok) {
                    throw new Error("HTTP error! Status: ${response.status}");
                }
                const data = await response.json();
                setRecipeData(data); // Update the recipe data
                setRecipeTitle(data.Recipe_title); // Update the Recipe_title
                setError(null); // Clear any error
            } catch (e) {
                setError("Error fetching recipe by ID: ${e.message}");
            }
        } else {
            setError("No Recipe ID available to fetch data.");
        }
    };

    return (
        <div className="restaurant-container">
            <div className="text-section">
                <div className="text-wrapper">
                    <h1>Welcome, <br /> Try Our <span style={{ color: 'red' }}>Recipe Of The Day</span></h1>
                    <p>Wake up your taste buds. Discover flavors that you've never experienced before. We are here to redefine your taste journey.</p>
                    {/* <button className="check-button" onClick={fetchRecipeById}>Check</button> */}
                    <button className="check-button" onClick={fetchRecipeById}>Check</button>

                </div>
            </div>
            <div className="image-section">
                <img src={main_b} alt={recipeTitle} className="drink-image" />
                <div className="drink-description">
                    <h3>{recipeTitle || "Loading Recipe..."}</h3>
                    <p>A refreshing blend of citrus and mint to tantalize your senses.</p>
                </div>
            </div>

            {/* Display error message if any */}
            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

            {/* Display fetched recipe data if available
            {recipeData && (
                <div className="recipe-display">
                    <h2>Recipe of the Day: {recipeTitle}</h2>
                    <pre>{JSON.stringify(recipeData, null, 2)}</pre>
                </div>
            )} */}
        </div>
    );
};

export default RecipeofDay;