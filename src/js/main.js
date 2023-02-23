'use strict';

// VARIABLES:
const inputElement = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search-btn');
const listResults = document.querySelector('.js-list');
const listResultsFavs = document.querySelector('.js-list-favs');

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

let dataList = [];
let dataListFavs = [];

// Traer de la API la info de los cócteles por default:
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        dataList = data.drinks;
        renderList(dataList);
    })

//funcion recorre el array datalList y lo pinta con cada "drink": 
function renderList(dataList) {
    for (const drink of dataList) {
        listResults.innerHTML += renderEveryDrink(drink);
    }
}

// Función que pinta el código de cada cóctel (cada <li>):
function renderEveryDrink(drink) {
    let html = `<li> 
    <article class="js-item-id" id=${drink.idDrink}">
    <h3 class="js-item-name"> ${drink.strDrink} </h3>
    <img src=${drink.strDrinkThumb} alt="Image de un cóctel">
    </li>`;
    return html;
}





//const cocktailsStored = JSON.parse(localStorage.getItem("drinks"));
//localStorage.setItem("palettes", JSON.stringify(listPalettesData));


/* const elementLi = document.createElement('li');
const elementH2 = document.createElement('h2');
const elementImg = document.createElement('img');
elementLi.setAttribute('class', "js-item");
elementLi.appendChild(listResults);
elementH2.setAttribute('class', "js-item-name");
elementImg.setAttribute('class', "js-item-img"); */
