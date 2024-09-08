const questions = [
	{
		question: "Как называется самое глубокое место на Земле?",
		answers: [
			"Бермудский треугольник",
			"Марианская впадина",
			"Мертвое море",
			"Тихоокеанский желоб"
		],
		correct: 2,
	},
	{
		question: "Кто такой кукусик?",
		answers: [
			"Название семечек",
			"Маменькин сынок",
			"Гражданин похожий на гопника",
			"кукус-пупус, только ещё маленький",
		],
		correct: 2,
	},
	{
		question: "Как называется художественный стиль, связанный с Сальвадором Дали?",
		answers: [
			"Кубизм",
			"Реализм",
			"Сюрреализм",
			"Абстракционизм",
		],
		correct: 3,
	},
	{
		question: "Какая планета в Солнечной системе самая большая?",
		answers: ["Земля", "Венера", "Юпитер", "Сатурн"],
		correct: 3,
	},
];

// Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {

	// Вопрос	
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	// Варианты ответов
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {

	// Находим выбранную радио кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	console.log(checkedRadio);

	// Если ответ не выбран - ничего не делаем, выходим из функции
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	// Узнаём номер ответа пользоваеля
	const userAnswer = parseInt(checkedRadio.value);

	// Если ответил верно - увеличиваем счёт
	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}

}

function showResults() {

	const resultsTemplate = `
					<h2 class="title">%title%</h2>
					<h3 class="summary">%message%</h3>
					<p class="result">%result%</p>
				`;

	let title, message;
	// Варианты заголовков и текста
	if (score === questions.length) {
		title = 'Мои поздравления! 🎉';
		message = 'Вы молодец, ответили на все вопросы правильно! 😎💪👍';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Хороший результат! 😜';
		message = 'У Вас больше половины правильных ответов 🧐👍👀';
	} else {
		title = 'Уверен, Вы можете лучше! 🤨😱';
		message = 'У Вас меньше половины правильных ответов 👶';
	}

	// Результат
	let result = `${score} из ${questions.length}`;

	// Финальный ответ, подставляем данные в шаблон
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	// Меняем кнопку на "Играть снова"
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => history.go();

}