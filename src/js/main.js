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

btnSearch.addEventListener('click', handleClickSearch);
btnReset.addEventListener('click', handleClickReset)

//funcion recorre el array dataList y pinta los cócteles:
function renderList(dataList) {
    //vaciar lista de cócteles encontrados
    listResults.innerHTML = '';
    // recorrer lista de datos de cócteles encontrados
    for (const drink of dataList) {
        //construye la tarjeta del cóctel con sus datos
        const drinkElement = buildDrinkLi(drink);

        // Añado un listener sobre la bebida que clicamos:
        drinkElement.addEventListener('click', handleClickFav);
        // miro si ya tengo los datos de esta bebida en mi lista de datos de bebidas favoritas. Y si la tengo, le añado la clase fav:
        const isFav = dataListFavs.some((fav) => fav.idDrink === drink.idDrink)
        if (isFav) {
            drinkElement.classList.add('fav-drink');
        }
        // pinto el cóctel en el <ul>
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
    // si el argumento que nos pasan está vacío lo llenamos con la url de un placeholder
    if (!drinkImg) {
        drinkImg = 'https://via.placeholder.com/300x300/ffffff/666666/?text=Cocktail'
    }

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

    return elementLi;
}

// Función para el evento click del buscador:
function handleClickSearch(ev) {
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

        // Creamos el botón de eliminar cóctel favorito:
        const deleteBtn = document.createElement('p');
        deleteBtn.textContent = 'x';
        deleteBtn.setAttribute('id', drinkFav.idDrink);
        deleteBtn.setAttribute('class', 'btn-delete');

        // Añadimos listener en la 'x' para que elimine el cóctel:
        deleteBtn.addEventListener('click', handleClickDeleteFav)

        // Lo añadimos a la card:
        drinkElement.appendChild(deleteBtn);

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
}

// Función manejadora de botón reset:
function handleClickReset(ev) {
    ev.preventDefault();
    // Limpiar lista de datos de favoritos
    dataListFavs = [];
    // Limpiar LocalStorage
    localStorage.removeItem('favourites');
    // Limpiar <ul>
    listResultsFavs.innerHTML = '';
}

function handleClickDeleteFav(ev) {
    ev.preventDefault();
    // Borrar el cóctel de la lista de datos de favoritos
    const deleteBtn = ev.currentTarget;
    const indexFav = dataListFavs.findIndex((drink) => drink.idDrink === deleteBtn.id);
    dataListFavs.splice(indexFav, 1);

    // Actualizar localStorage
    localStorage.setItem("favourites", JSON.stringify(dataListFavs));

    // Borrar el <li> del cóctel que queremos eliminar
    const drinkCardFav = deleteBtn.parentElement;
    drinkCardFav.remove();

    // Vuelvo a renderizar
    renderList(dataList);
}