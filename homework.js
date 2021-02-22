'use strict';

//task 1 start Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
const btn1 = document.querySelector('.task1');
const arrowEmpty = document.querySelector('.bi-arrow-down-left-circle');
const arrowFill = document.querySelector('.bi-arrow-down-left-circle-fill');
let status = false;
btn1.addEventListener('click', e => {
	if (status === false) {
		status = true;
		arrowEmpty.style.display = 'none';
		arrowFill.style.display = 'inline-block';
	} else {
		status = false;
		arrowEmpty.style.display = 'inline-block';
		arrowFill.style.display = 'none';
	}
});
//task 1 end

//task 2 start Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.
const btn2 = document.querySelector('.task2');
btn2.addEventListener('click', (e) => {
	alert(`Width:${window.innerWidth}. Height:${window.innerHeight}`);
});

// task 2 end

// task 3 start Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
// Добавить в чат механизм отправки гео-локации
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией
const wsUri = 'wss://echo.websocket.org/';
const btnSend = document.querySelector('.task3-control__btn-send');
const btnStart = document.querySelector('.task3_btn-start');
btnStart.style.display = 'block';
const btnGeo = document.querySelector('.task3-control__btn-geo');
const input = document.querySelector('.task3-control__input');
const chat = document.querySelector('.task3-chat');
let websocket;


const writeToScreen = (message) => {
	let pre = document.createElement('p');
	pre.innerHTML = message;
	chat.append(pre);
};

btnSend.addEventListener('click', (e) => {
	writeToScreen(`SENT: ${input.value}`)
	websocket.send(input.value)
});

btnStart.addEventListener('click', (e) => {
	websocket = new WebSocket(wsUri);
	websocket.onopen = function (evt) {
		writeToScreen('Connected');
	};
	websocket.onmessage = function (evt) {
		writeToScreen(`Response: ${evt.data}`)
	};
	websocket.onerror = function (evt) {
		writeToScreen(`ERROR: ${evt.data}`)
	}
});

btnGeo.addEventListener('click', (e) => {
	const map = 'https://www.openstreetmap.org/#map=17/'
	navigator.geolocation.getCurrentPosition(function(position) {
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;
		websocket.send(`Your position: ${map}${lat}/${lng}`);
	});
});
//task 3 end