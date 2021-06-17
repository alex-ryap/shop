const btnMenu = document.querySelector('.navigation__btn');
const btnMenuClose = document.querySelector('.menu__btn_close');
const menu = document.querySelector('.menu');

console.log(menu);

btnMenu.addEventListener('click', () => {
  menu.classList.toggle('menu__open');
});

btnMenuClose.addEventListener('click', () => {
  menu.classList.remove('menu__open');
});
