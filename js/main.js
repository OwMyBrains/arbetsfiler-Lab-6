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

                </article>`;
    error.innerHTML = "";
    console.log(recipes.name);
  });
}

form.addEventListener("submit", showRecipes);
