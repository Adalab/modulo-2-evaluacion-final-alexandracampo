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

//funcion recorre el array dataList y pinta los cócteles con la función "buildDrink":
function renderList(dataList) {
    listResults.innerHTML = '';
    for (const drink of dataList) {
        const drinkElement = buildDrinkLi(drink);
        listResults.appendChild(drinkElement); // esto de hacerle un appendchild a listResults sigo sin verlo
    }
}

// Funcion para construir el <h3> que va dentro de <li>:
function buildDrinkH3(drink) {
    const elementH3 = document.createElement('h3');
    elementH3.setAttribute('class', 'js-item-name');
    const textH3 = document.createTextNode(drink.strDrink);
    elementH3.appendChild(textH3);

    return elementH3;
}

// Funcion para construir la <img> que va dentro de <li>:
function buildDrinkImg(drink) {
    const elementImg = document.createElement('img');
    elementImg.setAttribute('class', "js-img-drink img-drink");
    elementImg.setAttribute('src', drink.strDrinkThumb);
    elementImg.setAttribute('alt', 'Imagen cóctel');

    return elementImg;
}

// Función que construye el código HTML de <li>:
function buildDrinkLi(drink) {
    const elementLi = document.createElement('li');
    elementLi.setAttribute('class', 'card-drink select-item');
    elementLi.setAttribute('id', drink.idDrink);

    //meto en variables ambas llamadas a las funciones
    const elementH3 = buildDrinkH3(drink);
    const elementImg = buildDrinkImg(drink);

    // Indico que ambas son child de <li>
    elementLi.appendChild(elementH3);
    elementLi.appendChild(elementImg);

    // Añado un listener sobre <li>:
    elementLi.addEventListener('click', handleClickFav);

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











/*  let html = `<li class="card-drink select-item" id=${drink.idDrink}">
    <h3 class="js-item-name"> ${drink.strDrink} </h3>
    <img class="js-img-drink img-drink" src=${drink.strDrinkThumb} alt="Imagen cóctel">
    </li>`;
    return html; */