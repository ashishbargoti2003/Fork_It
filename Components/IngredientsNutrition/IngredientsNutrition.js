import React from "react";
import "./IngredientsNutrition.css";

const IngredientsNutrition = () => {
  return (
    <div className="ingredients-nutrition-container">
      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <ul>
          <li>Chicken patty</li>
          <li>Cheddar cheese</li>
          <li>Fresh lettuce</li>
          <li>Ripe tomatoes</li>
          <li>Soft burger bun</li>
          <li>Mayonnaise</li>
          <li>Ketchup</li>
        </ul>
      </div>
      <div className="nutrition-section">
        <h2>Nutritional Value (per serving)</h2>
        <table>
          <tr>
            <td>Calories</td>
            <td>550 kcal</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>30g</td>
          </tr>
          <tr>
            <td>Carbs</td>
            <td>45g</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>25g</td>
          </tr>
          <tr>
            <td>Fiber</td>
            <td>5g</td>
          </tr>
          <tr>
            <td>Sodium</td>
            <td>700mg</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default IngredientsNutrition;
