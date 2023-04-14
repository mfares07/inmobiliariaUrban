const hamburguesa = document.querySelector('.fa-bars');
const cruz = document.querySelector('.fa-circle-xmark');
const smartphoneMenu = document.querySelector('.menu');
const links = document.querySelectorAll('.menu li a');

function menuIconos() {
    smartphoneMenu.classList.toggle('menu-js');
    hamburguesa.classList.toggle('fa-bars-js');
    cruz.classList.toggle('fa-circle-xmark-js');
}

hamburguesa.addEventListener('click', menuIconos);
cruz.addEventListener('click', menuIconos);
links.forEach((link) => {
    link.addEventListener('click', menuIconos);
})
