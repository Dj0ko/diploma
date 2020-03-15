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
	tooglePopUp('.popup-call', 'a[class="call-btn"]');
	// tooglePopUp('.popup-call', '.call-btn');

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

	//функция переключения табов
	const tabs = (id) => {
		const accordion = document.getElementById(id),
			panelHeading = accordion.querySelectorAll('.panel-heading'),
			panelContent = accordion.querySelectorAll('.panel-collapse'),
			btn = accordion.querySelectorAll('.construct-btn');

		const asd = document.getElementById('headingTwo-two');
		// console.log('asd: ', asd);

		// let count = -100;
		// const openTabs = (elem) => {
		// 	count++;
		// 	elem.style.top = count + 'px';
		// 	setTimeout(openTabs, 10);
		// };
		// функция для показа/скрытие выбранных табов
		const toogleTabContent = (index) => {
			for (let i = 0; i < panelContent.length; i++) {
				if (index === i) {
					panelContent[i].classList.add('in');
					// openTabs(panelContent[i]);
					// panelContent[i].style.display = 'block';
					// panelContent[i].style.top = 300 + 'px';
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
					if (item === target.closest('.construct-btn')) {
						toogleTabContent(i + 1);
					}
				});
			}
		});

	};

	tabs('accordion');
	tabs('accordion-two');

	//калькулятор
	const calc = () => {
		//получаем необходимые элементы
		const accordion = document.getElementById('accordion'),
			onoffswitchLabel = document.querySelectorAll('.onoffswitch-label'),
			checkBox = document.querySelectorAll('.onoffswitch-checkbox'),
			secondSection = document.getElementById('second-section'),
			formControl = document.querySelectorAll('.form-control'),
			calcResult = document.getElementById('calc-result');

		const countSum = () => {
			let total = 10000;

			const obj = {
				firstDiameter: formControl[0].options[formControl[0].selectedIndex].textContent,
				firstAmount: formControl[1].options[formControl[1].selectedIndex].textContent,
				secondDiameter: formControl[2].options[formControl[2].selectedIndex].textContent,
				secondAmount: formControl[3].options[formControl[3].selectedIndex].textContent
			};

			if (checkBox[0].checked) {
				if (obj.firstDiameter === '2 метра') {
					total *= 1.2;
				}

				if (obj.firstAmount === '2 штуки') {
					total *= 1.3;
				} else if (obj.firstAmount === '3 штуки') {
					total *= 1.5;
				}

				if (checkBox[1].checked) {
					total += 1000;
				}
			} else {
				total = 2 * 15000;

				if (obj.firstDiameter === '2 метра') {
					total *= 1.2;
				}

				if (obj.firstAmount === '2 штуки') {
					total *= 1.3;
				} else if (obj.firstAmount === '3 штуки') {
					total *= 1.5;
				}

				if (obj.secondDiameter === '2 метра') {
					total *= 1.2;
				}

				if (obj.secondAmount === '2 штуки') {
					total *= 1.3;
				} else if (obj.secondAmount === '3 штуки') {
					total *= 1.5;
				}

				if (checkBox[1].checked) {
					total += 2000;
				}
			}
			calcResult.value = total;
		};

		accordion.addEventListener('click', (event) => {
			const target = event.target;

			onoffswitchLabel.forEach((item, i) => {
				if (item === target.closest('.onoffswitch-label')) {
					if (checkBox[i].checked) {
						checkBox[i].removeAttribute('checked');
					} else {
						checkBox[i].setAttribute('checked', true);
					}
				}

				if (!checkBox[0].checked) {
					secondSection.style.display = 'block';
				} else {
					secondSection.style.display = 'none';
				}
			});

			countSum();

		});
	};

	calc();

	// кнопка "Больше"
	const openSentence = () => {
		const sentenceBtn = document.querySelector('.add-sentence-btn'),
			sentence = document.querySelector('.sentence'),
			sentenceBlocks = sentence.querySelectorAll('.col-xs-12');

		sentenceBtn.addEventListener('click', () => {
			sentenceBlocks.forEach((elem) => {
				if (elem.classList.contains('visible-sm-block')) {
					elem.classList.remove('visible-sm-block');
				} else if (elem.classList.contains('hidden')) {
					elem.classList.remove('hidden');
				}
			});
			sentenceBtn.style.display = 'none';
		});
	};

	openSentence();
});