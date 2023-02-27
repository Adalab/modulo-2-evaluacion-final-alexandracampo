![Mojitos](https://www.shutterstock.com/image-vector/cocktails-word-concept-flat-vector-260nw-1730830228.jpg)

# Módulo 2: Ejercicio de evaluación final.

El ejercicio consiste en desarrollar una aplicación web que contiene un listado de las bebidas y cócteles de todo el mundo, que nos permite des/marcar las bebidas como favoritas
y guardarlas en local storage.

## Herramientas utilizadas:

Hemos utilizado el Adalab Web Starter Kit, una plantilla de proyecto creada con node y gulp, que incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local, entre otras funcionalidades preinstaladas y preconfiguradas.

## 1. Estructura básica del ejercicio:

La aplicación de búsqueda de cócteles consta de dos partes:

- Un campo de texto y un botón para buscar un cóctel por su título.
- Un listado de resultados de búsqueda donde aparece la imagen del cóctel y el nombre.

## 2. Búsqueda:

- Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TheCocktailDB (https://www.thecocktaildb.com/).
- Por cada cóctel contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen del cóctel y el nombre.

## 3. Favoritos:

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestros cócteles favoritos. Para ello, al hacer clic sobre una cóctel debe pasar lo siguiente:

- El color de fondo y el de fuente se intercambian, indicando que es un cóctel favorito.
- Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con los cócteles favoritos.
- Los cócteles favoritos deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

## 4. Almacenamiento local:

Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse.

## Bonus:

- Al hacer clic sobre el icono de una 'x' al lado de cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.

- Poder añadir/quitar como favorito al hacer clic sobre un cóctel del lado de la derecha.

- si realizamos una nueva búsqueda y sale un cóctel que ya es favorito, aparezca ya resaltado en los resultados de búsqueda.

- Al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.

- Maquetación.
