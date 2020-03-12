window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	//модальное окно 1

	//получаем необходимые элементы
	const callBtn = document.querySelectorAll('a[class="call-btn"]'),
		popUpCall = document.querySelector('.popup-call');

	// Вешаем обработчик события. Открываем модальное окно при клике на "Перезвоните мне" в хедере и футере
	callBtn.forEach((elem) => {
		elem.addEventListener('click', () => {
			popUpCall.style.display = 'block';
		});
	});




});