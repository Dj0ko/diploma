'use strict';

//функция отправки формы

const sendForm = (className, obj) => {
    //создаем сообщения
    const errorMessage = 'Ошибка...',
        loadMessage = 'Идёт отправка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    //получаем форму
    const form = document.querySelector(className);
    // создаём элемент, который будем добавлять на страницу
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem;
                                    color: red;`;

    //функция запроса на сервер
    const postData = (body) => {
        // fetch
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    form.addEventListener('submit', (event) => {
        //отменяем стандартное поведение, для отмены перезагрузки страницы
        event.preventDefault();
        // добавляем элемент
        form.appendChild(statusMessage);
        //добавляем сообщение о начале загрузки
        statusMessage.textContent = loadMessage;
        // создаем объект FormData, считывающий все данные с формы и имеющий аттрибут name
        const formData = new FormData(form);
        //записываем данные в объект
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        //при необходимости соединяем объекты в один
        Object.assign(body, obj);
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                form.reset();
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
                form.reset();
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            });
    });

    // Валидация данных
    //получаем все инпуты формы
    const inputs = form.querySelectorAll('input');
    //перебираем их
    inputs.forEach(elem => {
        elem.addEventListener('input', () => {
            //если инпут с type='text', то запрещаем ввод любых символов кроме Кириллицы и пробелов
            if (elem.type === 'text' && elem.classList.contains('phone-user')) {
                elem.value = elem.value.replace(/[^\+\d]/g, '');
            } else {
                //если инпут с type='tel', то разрешаем ввод только цифр
                elem.value = elem.value.replace(/[^а-яА-Я ]/g, '');
            }
        });
    });
};

export default sendForm;