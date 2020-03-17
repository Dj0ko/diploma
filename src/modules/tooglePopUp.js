'use strict';

//создаём функцию для открытия и закрытия модальных окон

const tooglePopUp = (popUpClass, btnClass) => {
    //получаем необходимые элементы
    const btn = document.querySelectorAll(btnClass),
        popUp = document.querySelector(popUpClass);


    // Вешаем обработчик события. Открываем модальное окно при клике на "Перезвоните мне" в хедере и футере
    btn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popUp.style.display = 'block';
        });
    });

    //Обработчик события для закрытия модального окна при клике на крестик или на подложку
    popUp.addEventListener('click', (event) => {
        let target = event.target;
        //закрытие на крестик
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            //если кликнули не на модальное окно, то скрываем его
            target = target.closest('.popup-content');

            if (!target) {
                popUp.style.display = 'none';
            }
        }
    });
};

export default tooglePopUp;
