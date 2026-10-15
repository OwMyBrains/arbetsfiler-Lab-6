"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Pether Sand
 */

const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const recipesEL = document.querySelector("#recipe");
const error = document.querySelector("#message");
const strongEl = document.getElementsByName("strong");

async function getRecipes(searchText) {
  try {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchText}`,
    );
    if (!response.ok) {
      throw new Error("Fel");
    }
    const data = await response.json();
    //console.log(data);

    return data;
  } catch (error) {
    console.error("Något blev fel");
  }
}

async function showRecipes(event) {
  event.preventDefault();

  const data = await getRecipes(inputEl.value);
  console.log(data);

  if (!data) {
    error.innerHTML = `Sök efter ett recept`;
  }
  if (data.recipes.length === 0) {
    error.innerHTML = `Kan inte hitta något recept som matchar sökningen.`;
  }
  recipesEL.innerHTML = "";
  data.recipes.forEach((recipes) => {
    recipesEL.innerHTML += `
     <article>
                    <h3>${recipes.name}</h3>

                    <img src="${recipes.image}" alt="${recipes.name}">

                    <div class="recipe-info">
                        <p>Servings: ${recipes.servings}</p>
                        <p>Prep time: ${recipes.prepTimeMinutes} min</p>
                        <p>Cooking time: ${recipes.cookTimeMinutes} min</p>
                        <p>Difficulty: ${recipes.difficulty}</p>
                        <p>Rating: ${recipes.rating}</p>
                        <p>Review count: ${recipes.reviewCount}</p>
                        <p>Calories per serving: ${recipes.caloriesPerServing}</p>
                        <p>Cuisine: ${recipes.cuisine}</p>
                    </div>


                </article>`;
    error.innerHTML = "";
    console.log(recipes.name);
  });
}

form.addEventListener("submit", showRecipes);
