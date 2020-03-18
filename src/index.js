'use strict';

import tooglePopUp from './modules/tooglePopUp';
import sendForm from './modules/sendForm';
import tabs from './modules/tabs';
import calc from './modules/calc';
import openSentence from './modules/openSentence';
import sendQuestion from './modules/sendQuestion';

//Вызываем функцию открытия/закрытия модального окна при нажатии на "Перезвоните мне"
tooglePopUp('.popup-call', 'a[class="call-btn"]');
sendForm('.capture-form-call');

//Вызываем функцию открытия/закрытия модального окна при нажатии на "Заказать со скидкой" и "Узнать цену со скидкой"
tooglePopUp('.popup-discount', '.discount-btn');
sendForm('.capture-form-calc');

//Вызываем функцию открытия/закрытия модального окна при нажатии на "Получить чек-лист и скидку"
tooglePopUp('.popup-check', '.check-btn');
sendForm('.capture-form-check');

//отправляем формы
sendForm('.capture-form');
sendForm('.main-form');



//откытие табов
tabs('accordion');
tabs('accordion-two');

//калькулятор
calc();

//открытие блоков при нажатии на "Больше..."
openSentence();

//отправка модального окна с вопросом
sendQuestion();