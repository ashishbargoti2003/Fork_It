// Menu.js
import React from 'react';
import './Menu.css';
import DishCard from '../DishCard/DishCard';

const Menu = ({ dishes }) => {
  return (
    <section id="menu" className="menu-container">
      {dishes.map((dish, index) => (
        <DishCard
          key={index}
          image={dish.image}
          name={dish.name}
          description={dish.description}
          type={dish.type}
          protein={dish.protein}
          carbs={dish.carbs}
        />
      ))}
    </section>
  );
};

export default Menu;
