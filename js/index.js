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
    const artistasPopulares = document.querySelectorAll('.artistas-populares'); 
    const items = document.querySelectorAll('.item-index'); 

    setTimeout(() => {
        imagen.classList.add('aparecer-imagen');
    }, 10);

    setTimeout(() => {
        titulo.classList.add('aparecer-titulo');
    }, 500); 

    setTimeout(() => {
        subTitulo.classList.add('aparecer-titulo');
    }, 600); 

    setTimeout(() => {
        artistasPopulares.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = 1;
            }, index * 500);
        });
    }, 1000);

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
    }, 1000);
});


