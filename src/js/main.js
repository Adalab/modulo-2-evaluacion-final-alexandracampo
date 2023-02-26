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

const favStored = JSON.parse(localStorage.getItem("favourites"));
if (favStored) { //si encuentra favoritos en LS
    dataListFavs = favStored //Los asigna a la lista de favoritos
    renderListFavs(dataListFavs);
}


//funcion recorre el array dataList y pinta los cócteles con la función "buildDrink":
function renderList(dataList) {
    listResults.innerHTML = '';
    for (const drink of dataList) {
        const drinkElement = buildDrinkLi(drink);

        const isFav = dataListFavs.some((fav) => fav.idDrink === drink.idDrink)
        if (isFav) {
            drinkElement.classList.add('fav-drink');
        }
        listResults.appendChild(drinkElement);
    }
}

// Funcion para construir el <h3> que va dentro de <li>:
function buildDrinkH3(drinkName) {
    const elementH3 = document.createElement('h3');
    elementH3.setAttribute('class', 'js-item-name');
    const textH3 = document.createTextNode(drinkName);
    elementH3.appendChild(textH3);

    return elementH3;
}

// Función para construir la <img> que va dentro de <li>:
function buildDrinkImg(drinkImg) {
    const elementImg = document.createElement('img');
    elementImg.setAttribute('class', "js-img-drink img-drink");
    elementImg.setAttribute('src', drinkImg);
    elementImg.setAttribute('alt', 'Imagen cóctel');

    return elementImg;
}

// Función que construye el código HTML de <li>:
function buildDrinkLi(drink) {
    const elementLi = document.createElement('li');
    elementLi.setAttribute('class', 'card-drink');
    elementLi.setAttribute('id', drink.idDrink);

    //meto en variables ambas llamadas a las funciones
    const elementH3 = buildDrinkH3(drink.strDrink);
    const elementImg = buildDrinkImg(drink.strDrinkThumb);

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

//funcion recorre el array dataListFavs y pinta los cócteles con la función "buildDrink":
function renderListFavs(dataListFavs) {
    listResultsFavs.innerHTML = '';
    for (const drinkFav of dataListFavs) {
        const drinkElement = buildDrinkLi(drinkFav);

        /* const desSelectFav = dataList.some((coctel) => coctel.idDrink !== drinkFav.idDrink)
        if (desSelectFav) {
            drinkElement.classList.remove('fav-drink');
        } */
        // probar con otro método que no sea some??

        listResultsFavs.appendChild(drinkElement);
    }

    localStorage.setItem("favourites", JSON.stringify(dataListFavs));
}

// Función manejadora (evento click) sobre el cóctel seleccionado:
function handleClickFav(ev) {
    ev.preventDefault();
    //Se ha añadido el listener en la función buildDrinkLi, por eso sabemos que el currentTarget es el <li>:
    const drinkCard = ev.currentTarget;
    drinkCard.classList.toggle('fav-drink');

    // Buscamos en la lista de bebidas aquella que coincida el id con el id de la card seleccionada:
    const selectedDrinkData = dataList.find((drink) => drink.idDrink === drinkCard.id);
    // Buscamos si ese mismo elemento existe ya en la lista de favoritos (indica el indice)
    const indexFav = dataListFavs.findIndex((drink) => drink.idDrink === drinkCard.id);

    if (indexFav === -1) { //no está en el listado de favoritos
        //La guardo en el listado de favoritos: push
        dataListFavs.push(selectedDrinkData);
    } else { //si está en el listado de favoritos eliminarlo
        //splice: elimina un elemento a partir de una posición
        dataListFavs.splice(indexFav, 1);
    }

    renderListFavs(dataListFavs);

    console.log(selectedDrinkData);
    console.log(indexFav);
    console.log(dataListFavs);
}

btnSearch.addEventListener('click', handleClick);


/* 
Cuando cargamos favoritos del localS no se marcan con el estilo de favoritos en el listado derecho
+ si lo selecciono para eliminarlo de favs, se marca en verde, que es lo opuesto a lo que debería pasar.

*/