'use strict';

//функция переключения табов
const tabs = (id) => {
    const accordion = document.getElementById(id),
        panelHeading = accordion.querySelectorAll('.panel-heading'),
        panelContent = accordion.querySelectorAll('.panel-collapse'),
        btn = accordion.querySelectorAll('.construct-btn');

    // функция для показа/скрытие выбранных табов
    const toogleTabContent = (index) => {
        for (let i = 0; i < panelContent.length; i++) {
            if (index === i) {
                panelContent[i].classList.add('in');
            } else {
                panelContent[i].classList.remove('in');
            }
        }
    };

    accordion.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        if (target) {
            panelHeading.forEach((item, i) => {
                if (item === target.closest('.panel-heading')) {
                    toogleTabContent(i);
                }
            });
            btn.forEach((item, i) => {
                if (item === target.closest('.construct-btn') && i !== 3) {
                    toogleTabContent(i + 1);
                }
            });
        }
    });

};

export default tabs;