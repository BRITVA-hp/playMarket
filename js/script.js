document.addEventListener('DOMContentLoaded', () => {

    // Функция для поиска в хедере на мобилке

    function headerSearch() {
        const trigger = document.querySelector('.header__top__loup'),
              input = document.querySelector('.header__input'),
              logo = document.querySelector('.header__logo'),
              button = document.querySelector('.header__form__button'),
              burger = document.querySelector('.header__burger');

        trigger.addEventListener('click', function() {
            this.classList.toggle('header__top__loup--active');
            input.classList.toggle('visible');
            logo.classList.toggle('visible');
            button.classList.toggle('visible');
            burger.classList.toggle('visible');
        });
    }

    headerSearch();

    // Переменная - флаг для рекурсивной функции

    let a = 0;

    // Рекурсивная функция для определения дочерних элементов родителя

    function recurcy(parent, element) {
        for(let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === element) {
                a = 1;
            }
            if (parent.children.length > 0) {
                recurcy(parent.children[i], element);
            }
            
        }
        return false;
    }

    // Функция для ховера в меню на десктопе

    function hoverMenu() {
        const hoverTrigger = document.querySelector('.header__bottom__menu__hover'),
              hoverElement = document.querySelector('.header__bottom__menu__add'),
              content = document.querySelector('.header__bottom__menu__top'),
              apps = document.querySelector('.header__bottom__apps'),
              menu = document.querySelector('.header__bottom__menu');


        hoverTrigger.addEventListener('mouseenter', () => {
            hoverElement.classList.add('header__bottom__menu__add--hover');
            content.classList.add('header__bottom__menu__top--hover');
        });

        menu.addEventListener('mouseleave', (e) => {
            if (e.relatedTarget !== apps) {
                hoverElement.classList.remove('header__bottom__menu__add--hover');
                content.classList.remove('header__bottom__menu__top--hover');
            }
        });

        apps.addEventListener('mouseleave', (e) => {
            recurcy(hoverElement, e.relatedTarget);
            if (e.relatedTarget !== hoverElement && a == 0) {
                hoverElement.classList.remove('header__bottom__menu__add--hover');
                content.classList.remove('header__bottom__menu__top--hover');
            }
            a = 0;
        });
    }

    hoverMenu();

    // Функция для бургера на мобилке

    function burger() {

        const burger = document.querySelector('.header__burger'),
              main = document.querySelector('.main'),
              menu = document.querySelector('.menu');

        burger.addEventListener('click', () => {
            main.classList.toggle('main--active');
            menu.classList.toggle('menu--visible');
            if ( menu.classList.contains('menu--visible')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });


    }

    burger();


});