document.addEventListener('DOMContentLoaded', () => {

    // Функция для поиска в хедере на мобилке

    function headerSearch() {
        const trigger = document.querySelector('.header__top__loup'),
              input = document.querySelector('.header__input'),
              logo = document.querySelector('.header__logo'),
              button = document.querySelector('.header__form__button'),
              burger = document.querySelector('.header__burger');

        trigger.addEventListener('click', function() {
            trigger.classList.toggle('header__top__loup--active');
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
                return;
            }
            if (parent.children.length > 0) {
                recurcy(parent.children[i], element);
            }
            
        }
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
              containerMain = document.querySelector('.container-main'),
              menu = document.querySelector('.menu'),
              footer = document.querySelector('.footer'),
              buttonTel = document.querySelector('.button__tel');

        burger.addEventListener('click', () => {
            containerMain.classList.toggle('container-main--active');
            menu.classList.toggle('menu--visible');
            footer.classList.toggle('footer--active');
            buttonTel.classList.toggle('button__tel--active');
            if ( containerMain.classList.contains('container-main--active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });


    }

    burger();

    // Слайдер

    function slider() { 
        const prev = document.querySelector('.slider__button--prev'),
              next = document.querySelector('.slider__button--next'),
              field = document.querySelector('.slider__field'),
              sliderRow = document.querySelector('.slider__row');

        let translate = 0,
            interval;

        next.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.which == 2 || e.which == 3) {
                return;
            }
            
            interval = setInterval(() => {
                if (translate >= (field.scrollWidth + 2 * next.scrollWidth) - sliderRow.scrollWidth) {
                    return;
                }
                field.style.transform = `translateX(-${translate+=20}px)`;
            }, 50);
        });

        next.addEventListener('mouseup', () => {
            clearInterval(interval);
        });
        next.addEventListener('mouseout', () => {
            clearInterval(interval);
        });

        prev.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.which == 2 || e.which == 3) {
                return;
            }

            interval = setInterval(() => {
                if (translate < 0) {
                    return;
                }
                field.style.transform = `translateX(-${translate-=20}px)`;
            }, 50);
        });

        prev.addEventListener('mouseup', () => {
            clearInterval(interval);
        });
        prev.addEventListener('mouseout', () => {
            clearInterval(interval);
        });
    }

    slider();

    // Видео

    function video() {
        const play = document.querySelectorAll('.slider__play'),
              video = document.querySelector('#video'),
              modalVideo = document.querySelector('.modal-video');

        play.forEach(item => {
            item.addEventListener('click', () => {
                modalVideo.classList.add('modal--visible');
                document.body.style.overflow = 'hidden';
            });
        });

        modalVideo.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal--visible')) {
                modalVideo.classList.remove('modal--visible');
                video.pause();
                document.body.style.overflow = '';
            }
        });
    }

    video();

    // Подробнее/скрыть

    function openClose(button, content, buttonActiveClass, buttonText, buttonTextActive) {
        const button_ = document.querySelector(button),
              content_ = document.querySelector(content);

        button_.addEventListener('click', function() {
            this.classList.toggle(buttonActiveClass);
            if (this.classList.contains(buttonActiveClass)) {
                this.textContent = buttonTextActive;
                content_.style.maxHeight = `${content_.scrollHeight}px`;
                this.previousElementSibling.style.display = 'none';
            } else {
                this.textContent = buttonText;
                content_.style.maxHeight = '';
                this.previousElementSibling.style.display = 'block';
            }
        });
    }

    openClose('.description__button--1 span', '.description__text', 'description__button--active', 'подробнее...', 'скрыть');
    openClose('.description__button--2 span', '.news__text', 'description__button--active', 'подробнее...', 'скрыть');


});