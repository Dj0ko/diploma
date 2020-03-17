'use strict';

import tooglePopUp from './tooglePopUp';
import sendForm from './sendForm';

//отправка модального окна с вопросом
const sendQuestion = () => {
    tooglePopUp('.popup-consultation', '.consultation-btn');
    const btn = document.querySelector('.consultation-btn');
    const btnInput = document.getElementById('sss');
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        let obj = {
            question: btnInput.value
        };
        sendForm('.capture-form-consultation', obj);
    });

    btnInput.addEventListener('input', () => {
        btnInput.value = btnInput.value.replace(/[a-zA-Z\d]/g, '');
    });
};

export default sendQuestion;