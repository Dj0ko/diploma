'use strict';

//отправка модального окна с вопросом
const sendQuestion = () => {
    tooglePopUp('.popup-consultation', '.consultation-btn');
    const bbbt = document.querySelector('.consultation-btn');
    const bbbtInput = document.getElementById('sss');
    bbbt.addEventListener('click', (event) => {
        event.preventDefault();
        let obj = {
            question: bbbtInput.value
        };
        console.log('obj: ', obj);
        sendForm('.capture-form-consultation', obj);
    });
};

export default sendQuestion;