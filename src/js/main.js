'use strict';

// VARIABLES:
const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-search-btn');
const listResults = document.querySelector('.js-list');
const listResultsFavs = document.querySelector('.js-list-favs');
const btnReset = document.querySelector('.js-reset-btn');

let dataList = [];
let dataListFavs = [];

// Traer de la API la info de los cócteles por default:
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then((data) => {
        dataList = data.drinks;
        renderList(dataList);
    })

//funcion recorre el array datalList y los pinta con la función "renderEveryDrink". Pinta el listado de la búsqueda que hayamos hecho:
function renderList(dataList) {
    listResults.innerHTML = '';
    for (const drink of dataList) {
        const drinkElement = buildDrink(drink);
        listResults.appendChild(drinkElement);
    }
}

// Función que pinta el código de cada cóctel (cada <li>):
function buildDrink(drink) {
    /*  let html = `<li class="card-drink select-item" id=${drink.idDrink}"> 
     <h3 class="js-item-name"> ${drink.strDrink} </h3>
     <img class="js-img-drink img-drink" src=${drink.strDrinkThumb} alt="Imagen cóctel">
     </li>`;
     return html; */
    const elementLi = document.createElement('li');
    elementLi.setAttribute('class', 'card-drink');
    elementLi.setAttribute('class', 'select-item');
    elementLi.setAttribute('id', drink.idDrink);


    const elementH3 = document.createElement('h3');
    elementH3.setAttribute('class', 'js-item-name');
    const textH3 = document.createTextNode(drink.strDrink);
    elementH3.appendChild(textH3);
    elementLi.appendChild(elementH3);


    const elementImg = document.createElement('img');
    elementImg.setAttribute('class', 'js-img-drink');
    elementImg.setAttribute('class', 'img-drink');
    elementImg.setAttribute('src', drink.strDrinkThumb);
    elementImg.setAttribute('alt', 'Imagen cóctel');
    elementLi.appendChild(elementImg);

    // Añado un listener sobre li:
    elementLi.addEventListener('click', handleClickFav)

    return elementLi;
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


// FAVORITOS:
/*
1. evento click sobre coctel
2. al hacer click
 -se activa class="select-item" css
 -se pinta en el listado de favoritos (nuevo array)
 -se almacena en localstorage
*/

// Función manejadora evento click sobre el cóctel favorito:
function handleClickFav(ev) {
    ev.preventDefault();
    console.log(ev.target);
    console.log(ev.currentTarget);
}

btnSearch.addEventListener('click', handleClick);
