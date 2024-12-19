// DishCard.jsx
import React from 'react';
import './DishCard.css';
import food from '../Assets/food.jpg';

const DishCard = ({ image, name, description, type, protein, carbs }) => {
    return (
        <div className="dish-card">
            <img src={food} alt={name} className="dish-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p><strong>Type:</strong> {type} | <strong>Protein:</strong> {protein}g | <strong>Carbs:</strong> {carbs}g</p>
        </div>
    );
};

export default DishCard;
