/* hover index */

var item1 = document.querySelector(".lista-index1 .item-depeche");
var item2 = document.querySelector(".lista-index1 .item-circle");
var item3 = document.querySelector(".lista-index1 .item-cure");
var item4 = document.querySelector(".lista-index1 .item-one");
var item5 = document.querySelector(".lista-index1 .item-boris");
var item6 = document.querySelector(".lista-index1 .item-nafta");
var fondo = document.querySelector(".fondo2-index");

/*depeche mode*/

item1.addEventListener("mouseover", function() {
fondo.classList.add("fondo-depeche");
fondo.classList.remove("fondo2-index");

});

item1.addEventListener("mouseout", function() {
fondo.classList.add("fondo2-index");
fondo.classList.remove("fondo-depeche");

});

/*perfect circle*/

item2.addEventListener("mouseover", function() {

fondo.classList.add("fondo-circle");
fondo.classList.remove("fondo2-index");
    
});
    
item2.addEventListener("mouseout", function() {
fondo.classList.add("fondo2-index");
fondo.classList.remove("fondo-circle");

});

/*the cure*/

item3.addEventListener("mouseover", function() {

fondo.classList.add("fondo-cure");
fondo.classList.remove("fondo2-index");
    
});
    
item3.addEventListener("mouseout", function() {
fondo.classList.add("fondo2-index");
fondo.classList.remove("fondo-cure");

});

/*and one*/

item4.addEventListener("mouseover", function() {

fondo.classList.add("fondo-one");
fondo.classList.remove("fondo2-index");
    
});
    
item4.addEventListener("mouseout", function() {
fondo.classList.add("fondo2-index");
fondo.classList.remove("fondo-one");

});

/*boris brejcha*/

item5.addEventListener("mouseover", function() {

fondo.classList.add("fondo-boris");
fondo.classList.remove("fondo2-index");
    
});
    
item5.addEventListener("mouseout", function() {
fondo.classList.add("fondo2-index");
fondo.classList.remove("fondo-boris");

});

/*nafta*/

item6.addEventListener("mouseover", function() {

fondo.classList.add("fondo-nafta");
fondo.classList.remove("fondo2-index");
    
});
    
item6.addEventListener("mouseout", function() {
fondo.classList.add("fondo2-index");
fondo.classList.remove("fondo-nafta");

});

/*animacion index*/
document.addEventListener("DOMContentLoaded", function() {
    const imagen = document.querySelector('.imagenIndex');
    const titulo = document.querySelector('.tituloMusicfy');
    const subTitulo = document.querySelector('.subTitulo');
    const artistasPopulares = document.querySelectorAll('.artistas-populares'); // Selecciona todos los elementos con la clase
    const items = document.querySelectorAll('.item-index'); // Selecciona todos los elementos con la clase

    // Animación de la imagen (de izquierda a derecha)
    setTimeout(() => {
        imagen.classList.add('aparecer-imagen');
    }, 10); // Retraso para que la imagen aparezca primero

    // Animación de desvanecimiento para el título "Musicfy"
    setTimeout(() => {
        titulo.classList.add('aparecer-titulo');
    }, 500); // Inicia después de que la imagen termine

    // Animación de desvanecimiento para el subtítulo
    setTimeout(() => {
        subTitulo.classList.add('aparecer-titulo');
    }, 600); // Inicia después del título "Musicfy"

    // Animación de desvanecimiento para todos los elementos "Artistas Populares" uno por uno
    setTimeout(() => {
        artistasPopulares.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = 1;
            }, index * 500); // Retraso escalonado de 500ms entre cada elemento
        });
    }, 1000); // Inicia después del subtítulo

    // Retraso antes de iniciar la animación de los elementos con .item-index
    setTimeout(() => {
        items.forEach((item, index) => {
            item.style.setProperty('--delay', `${index * 0.1}s`);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aparecer');
                    }
                });
            });
            observer.observe(item);
        });
    }, 1000); // Inicia después de la animación de los elementos ".artistas-populares" (2 segundos)
});


