const questions = [
	{
		question: "О ёпти, ты кто?",
		answers: ["Люся", "Петя", "Юрий", "Хрен в пальто"],
		correct: 4,
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
		question: "Что делать дальше?",
		answers: [
			"Выбрать вариант ответа",
			"Идти на хер",
			"Хорошенько подумать",
			"А я, то откуда знаю",
		],
		correct: 1,
	},
	{
		question: "Ну чё бля, понравилось?",
		answers: ["Да ты ахуел", "Да сэр", "Ну не знаю", "Круууто"],
		correct: 2,
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

function showResults () {

	const resultsTemplate = `
					<h2 class="title">%title%</h2>
					<h3 class="summary">%message%</h3>
					<p class="result">%result%</p>
				`;
	
	let title, message;
	// Варианты заголовков и текста
	if (score === questions.length) {
		title = 'Мои поздравления! 🎉';
		message = 'Ну ты молоток или кувалда, ответил на все вопросы правильно! 😎💪👍';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Ну вроде не плохо! 😜';
		message = 'У тебя больше половины правильных ответов 🧐👍👀';
	} else {
		title = 'Эх ты, давай ещё разок! 🤨💩😱👎';
		message = 'Ёпти, это ж меньше половины правильных ответов 👅👶🙉';
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