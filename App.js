import './App.css';
import Navbar from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginSignup from './Pages/LoginSignup';
import ExploreRecipe from './Pages/ExploreRecipe'; // Import ExploreRecipe page
import Recipedaypage from './Pages/Recipedaypage'
import Swap from './Components/Swap/swap';
import WhatCanIMake from './Components/WhatCanIMake/WhatCanIMake';
import Simulation from './Components/Simulation/Simulation';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/Explore Recipe" element={<ExploreRecipe/>} /> 
          <Route path="/Ingredient Swap" element={<Swap/>} />
          <Route path="/What can I make" element={<WhatCanIMake/>} />
          <Route path="/Virtual Dish" element={<Simulation/>} />
          <Route path="/Recipedaypage" element ={<Recipedaypage/>} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
