import React from "react";
import "./RecipeBook.css";
import img from "../Assets/burger_img.png";
import IngredientsNutrition from "../IngredientsNutrition/IngredientsNutrition";

const RecipeBook = () => {
  return (
    <div className="recipe-page">
      {/* Recipe Content Section */}
      <div className="recipe-content">
        <div className="left-section">
          <h1 className="recipe-title">American Cheese Burger</h1>
          <p className="recipe-description">
            A deliciously juicy chicken patty topped with melted cheese, fresh lettuce, and ripe tomatoes, all nestled in a soft, toasted bun. Perfect for a quick and satisfying meal!
          </p>
          <button className="order-now-btn">Order Now Online</button>
        </div>
        <div className="right-section">
          <img src={img} alt="burger" className="background-image" />
        </div>
      </div>
      
      {/* Ingredients and Nutritional Section */}
      <div className="ingredients-nutrition-wrapper">
        <IngredientsNutrition />
      </div>

      {/* Video Section */}
      <div className="video-section">
        <h2 className="video-title">Watch Our Recipe Video</h2>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"  // Replace with your video link
          title="Recipe Video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default RecipeBook;
