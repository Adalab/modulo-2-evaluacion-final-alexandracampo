'use strict';

// VARIABLES:
const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search-btn');
const listResults = document.querySelector('.js-list');
const listResultsFavs = document.querySelector('.js-list-favs');

let dataList = [];
let dataListFavs = [];

// Traer de la API la info de los cócteles por default:
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then((data) => {
        dataList = data.drinks;
        renderList(dataList);
    })

//funcion recorre el array datalList y los pinta con la función "renderEveryDrink": 
function renderList(dataList) {
    listResults.innerHTML = ' ';
    for (const drink of dataList) {
        listResults.innerHTML += renderEveryDrink(drink);
    }
}

// Función que pinta el código de cada cóctel (cada <li>):
function renderEveryDrink(drink) {
    let html = `<li class="js-card-drink card-drink" id="hidden"> 
    <article id=${drink.idDrink}">
    <h3 class="js-item-name"> ${drink.strDrink} </h3>
    <img class="js-img-drink img-drink" src=${drink.strDrinkThumb} alt="Image de un cóctel">
    </li>`;
    return html;
}

// Función para el evento click del buscador:
function handleClick(ev) {
    ev.preventDefault();
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            dataList = data.drinks;
            renderList(dataList);
        })
}

btnSearch.addEventListener('click', handleClick);

// FAVORITOS:






//const cocktailsStored = JSON.parse(localStorage.getItem("drinks"));
//localStorage.setItem("palettes", JSON.stringify(listPalettesData));


/* const elementLi = document.createElement('li');
const elementH2 = document.createElement('h2');
const elementImg = document.createElement('img');
elementLi.setAttribute('class', "js-item");
elementLi.appendChild(listResults);
elementH2.setAttribute('class', "js-item-name");
elementImg.setAttribute('class', "js-item-img"); */
