import React from 'react';
import './CSS/Recipedaypage.css';
// import RecipeBook from '../Components/RecipeBook/RecipeBook'
import RecipeBook from '../Components/RecipeBook/RecipeBook';


const Recipedaypage = () => {
  return (
    <div className="recipe-day-container">
      <h1 className="recipe-day-heading">Recipe of the Day</h1>
      <RecipeBook /> {/* RecipeBook component placed below the heading */}
    </div>
  );
};

export default Recipedaypage;
