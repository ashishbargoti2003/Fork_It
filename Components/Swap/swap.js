import React, { useState } from 'react';
import './swap.css';

const Swap = () => {
    const [dishName, setDishName] = useState('');
    const [missingIngredient, setMissingIngredient] = useState('');
    const [alternatives, setAlternatives] = useState([]);

    const handleFind = async () => {
        const apiKey = "key";
        const url = "https://api.openai.com/v1/chat/completions";

        const prompt = `dont explain just give list: I want to make ${dishName} but I don't have ${missingIngredient}. What can I use instead?`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: prompt },
                    ],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const parsedAlternatives = data.choices[0].message.content.split(',').map((alt) => alt.trim());
                setAlternatives(parsedAlternatives);
            } else {
                alert('Error fetching data. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="swap-background">
            <div className="swap-container">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Enter Dish Name"
                        className="swap-input"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Missing Ingredient"
                        className="swap-input"
                        value={missingIngredient}
                        onChange={(e) => setMissingIngredient(e.target.value)}
                    />
                    <button className="swap-button" onClick={handleFind}>
                        Find
                    </button>
                </div>
                {alternatives.length > 0 && (
                    <div className="swap-alternatives">
                        <h3>Ingredient Alternatives:</h3>
                        <ul className="alternative-list">
                            {alternatives.map((alternative, index) => (
                                <li key={index} className="alternative-item">
                                    {alternative}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Swap;
