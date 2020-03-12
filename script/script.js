window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	//модальное окно 1
	const tooglePopUp = () => {
		//получаем необходимые элементы
		const callBtn = document.querySelectorAll('a[class="call-btn"]'),
			popUpCall = document.querySelector('.popup-call');


		// Вешаем обработчик события. Открываем модальное окно при клике на "Перезвоните мне" в хедере и футере
		callBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				popUpCall.style.display = 'block';
			});
		});

		//Обработчик события для закрытия модального окна при клике на крестик или на подложку
		popUpCall.addEventListener('click', (event) => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popUpCall.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popUpCall.style.display = 'none';
				}
			}
		});
	};

	tooglePopUp();




});