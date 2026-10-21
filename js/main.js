"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Pether Sand
 */

//Hämtar element från DOM
const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const recipesEL = document.querySelector("#recipe");
const error = document.querySelector("#error");
const errorSearch = document.querySelector("#message");
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

    return data;
  } catch (error) {
    errorSearch.innerHTML = "";
    recipesEL.innerHTML = "";
  }
}
//Funktion för att visa recepten som sökts
async function showRecipes(event) {
  event.preventDefault();

  // kollar så det är något skrivet i sökfältet
  if (inputEl.value.trim() === "") {
    error.innerHTML = "Skriv in ett sökord för att hitta ett recept!";
    errorSearch.innerHTML = "";
    recipesEL.innerHTML = "";
    return;
  }

  //Väntar på data som sedan skrivs ut om det finns något som matchar sökningen
  const data = await getRecipes(inputEl.value);

  if (!data) {
    error.innerHTML = `Något gick fel, försök igen`;
    return;
  }
  //Felmeddelande om det inte hittas några recpet i sökningen
  if (data.recipes.length === 0) {
    errorSearch.innerHTML = `Kan inte hitta något recept som matchar sökningen.`;
    error.innerHTML = "";
  }
  //ForEach loop som skriver ut recept som hittats.
  recipesEL.innerHTML = "";
  data.recipes.forEach((recipes) => {
    recipesEL.innerHTML = `
     <article>
                    <h3>${recipes.name}</h3>

                    <img src="${recipes.image}" alt="${recipes.name}">

                    <div class="recipe-info">
                        <p><strong>Servings: </strong>${recipes.servings}</p>
                        <p><strong>Prep time: </strong>${recipes.prepTimeMinutes} min</p>
                        <p><stong>Cooking time: </strong>${recipes.cookTimeMinutes} min</p>
                        <p><stong>Difficulty: </strong>${recipes.difficulty}</p>
                        <p><stong>Rating: </strong>${recipes.rating}</p>
                        <p><stong>Review count: </strong>${recipes.reviewCount}</p>
                        <p><stong>Calories per serving: </strong>${recipes.caloriesPerServing}</p>
                        <p><stong>Cuisine: </strong>${recipes.cuisine}</p>
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
                </article>`;
    error.innerHTML = "";
    errorSearch.innerHTML = "";
  });
}
//Eventlistener för sökningen av recept.
form.addEventListener("submit", showRecipes);
