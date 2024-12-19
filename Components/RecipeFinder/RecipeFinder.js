
import React, { useState } from 'react';
import './RecipeFinder.css';
import Menu from '../Menu/Menu';
import searchIcon from '../Assets/search_button.png';
// import Omlette from '../Assets/omlete.png';


const RecipeFinder = () => {
    const [query, setQuery] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [dishes, setDishes] = useState([]);

    // ExampleDishes as fallback data
    const exampleDishes = [
        { name: "Omelette", image: "src\Components\RecipeFinder\Burger.jpeg", description: "A fluffy omelette.", type: "Non-Veg", protein: 15, carbs: 5 },
        { name: "Vegetable Sandwich", image: "", description: "A healthy veggie sandwich.", type: "Veg", protein: 10, carbs: 20 },
        { name: "Pasta Salad", image: "pastaSalad.jpeg", description: "A refreshing pasta salad.", type: "Veg", protein: 5, carbs: 30 },
        { name: "Grilled Chicken", image: "https://bing.com/th?id=OSK.a35995c61b4a74cfc2d7e0733b58b72b", description: "Juicy grilled chicken.", type: "Non-Veg", protein: 30, carbs: 3 },
        { name: "Fruit Salad", image: "https://bing.com/th?id=OSK.2ad51308577f06df5cfd930925a2959c", description: "A vibrant mix of fresh fruits.", type: "Veg", protein: 2, carbs: 25 },
        { name: "Burger", image: "https://th.bing.com/th/id/OIP.ftKC5VkfQAS8d8DhRvxiDQHaHa?rs=1&pid=ImgDetMain", description: "A juicy beef burger with veggies.", type: "Non-Veg", protein: 20, carbs: 30 },
        { name: "Veggie Soup", image: "https://bing.com/th?id=OSK.0c4fb2000f2ca21c447cddcc1e1ca5db", description: "A warm and healthy vegetable soup.", type: "Veg", protein: 7, carbs: 15 },
        { name: "Fried Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEp5Y50RpgvgZNlooh7aHP7YsYOZpMI7zgQ&s", description: "Fried rice with mixed vegetables.", type: "Veg", protein: 8, carbs: 40 },
        { name: "Chicken Wrap", image: "https://bing.com/th?id=OSK.354ee5c2c5142ad47ffe92d01e1aa4ae", description: "A tasty wrap with grilled chicken.", type: "Non-Veg", protein: 25, carbs: 35 }
    ];

    // Function to determine type (Veg/Non-Veg) based on recipe data
    const determineVegStatus = (recipe) => {
        const nonVegKeywords = ["chicken", "fish", "beef", "pork", "lamb", "meat", "shrimp", "bacon", "egg"];
        const title = recipe.Recipe_title.toLowerCase();
        const processes = recipe.Processes ? recipe.Processes.toLowerCase() : "";

        // Check for vegetarian indicators
        if (recipe.vegan === "1.0" || recipe.ovo_vegetarian === "1.0" || recipe.lacto_vegetarian === "1.0" || recipe.ovo_lacto_vegetarian === "1.0") {
            return "Veg";
        }

        // Check for non-veg keywords in title or processes
        for (const keyword of nonVegKeywords) {
            if (title.includes(keyword) || processes.includes(keyword)) {
                return "Non-Veg";
            }
        }

        // Default to "Veg"
        return "Veg";
    };

    // Function to fetch recipes by title and map to exampleDishes format
    const handleSearch = async () => {
        if (!query) {
            // If no input is provided, use hardcoded exampleDishes
            setDishes(exampleDishes);
            setShowMenu(true);
            return;
        }

        try {
            const response = await fetch(`https://cosylab.iiitd.edu.in/recipe-search/recipe?searchText=${query}`);
            const data = await response.json();

            if (data.success === "true" && data.payload) {
                const recipes = data.payload.data || [];
                const mappedDishes = recipes.map((recipe, index) => ({
                    name: recipe.Recipe_title.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
                    image: recipe["img_url"] || exampleDishes[index % exampleDishes.length].image, // Use image from API or fallback
                    description: recipe.description || "A delicious pizza with fresh toppings and a crispy crust.", // Fallback description
                    type: determineVegStatus(recipe), // Determine type dynamically
                    protein: recipe["Protein (g)"] || exampleDishes[index % exampleDishes.length].protein, // Fallback protein
                    carbs: recipe["Carbohydrate, by difference (g)"] || exampleDishes[index % exampleDishes.length].carbs, // Fallback carbs
                }));
                setDishes(mappedDishes);
                setShowMenu(true);

                // Scroll to the Menu section smoothly
                setTimeout(() => {
                    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                alert("No recipes found for the given title.");
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            alert("Failed to fetch recipes. Please try again.");
        }
    };

    return (
        <div>
            {/* Background with search box */}
            <div className="background">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="What's Cooking Today?"
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <img src={searchIcon} alt="Search" />
                    </button>
                </div>
            </div>

            {/* Menu component */}
            {showMenu && <Menu dishes={dishes} />}
        </div>
    );
};

export default RecipeFinder;
