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
    console.log(data);

    //console.log(data);

    return data;
  } catch (error) {
    console.error("Något blev fel");
  }
}
getRecipes("Pizza");
