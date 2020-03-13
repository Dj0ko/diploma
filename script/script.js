window.addEventListener('DOMContentLoaded', function () {
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

	//Вызываем функцию открытия/закрытия модального окна при нажатии на "Перезвоните мне"
	tooglePopUp('.popup-call', '.call-btn');

	//Вызываем функцию открытия/закрытия модального окна при нажатии на "Заказать со скидкой" и "Узнать цену со скидкой"
	tooglePopUp('.popup-discount', '.discount-btn');

	//Вызываем функцию открытия/закрытия модального окна при нажатии на "Получить чек-лист и скидку"
	tooglePopUp('.popup-check', '.check-btn');

	//функция отправки формы
	const sendForm = (className) => {
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
				})
				.finally(() => {
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
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
					elem.value = elem.value.replace(/[^\d]/g, '');
				} else {
					//если инпут с type='tel', то разрешаем ввод только цифр и знака "+"
					elem.value = elem.value.replace(/[^а-яА-Я ]/g, '');
				}
			});
		});
	};

	sendForm('.capture-form');
	sendForm('.main-form');

});