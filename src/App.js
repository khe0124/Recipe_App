import React, { useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {

  const APP_ID = 'f19f5a66';
  const APP_KEY = '97df9c59869a1149d02924314a4178fb';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes(); 
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search)
}

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="">SEARCH</button>
      </form>
      <div className="recipes">      
      {recipes.map(recipe => (
        <Recipe 
        key= {recipe.recipe.label}
        title={recipe.recipe.label} 
        caLories={recipe.recipe.caLories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
