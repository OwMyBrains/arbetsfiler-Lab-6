"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Pether Sand
 */

//Hämtar element från DOM
const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const recipesEL = document.querySelector("#recipe");
const error = document.querySelector("#message");
const strongEl = document.getElementsByName("strong");

//funktion för att hämta API med recept
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
//Funktion för att visa recepten som sökts
async function showRecipes(event) {
  event.preventDefault();

  const data = await getRecipes(inputEl.value);
  console.log(data);

  if (!data) {
    error.innerHTML = `Sök efter ett recept`;
    return;
  }
  //Felmeddelande om det inte hittas några recpet i sökningen
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

                    <h4>Ingredients</h4>
                    <ul>
                      ${recipes.ingredients
                        .map((ingredient) => `<li>${ingredient}</li>`)
                        .join("")}
                    </ul>

                    <h4>Instructions</h4>
                    <ol>
                    ${recipes.instructions
                      .map((instruction) => `<li>${instruction}</li>`)
                      .join("")}
                    </ol>
                    <h4>Instructions</h4>
                    <ol>
                    ${recipes.instructions
                      .map((instruction) => `<li>${instruction}</li>`)
                      .join("")}
                    </ol>
                </article>`;
    error.innerHTML = "";
    console.log(recipes.name);
  });
}

form.addEventListener("submit", showRecipes);
