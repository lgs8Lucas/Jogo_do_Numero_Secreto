const attempEl = document.querySelector("input");
const restartBtn = document.querySelector("#reiniciar");
const changeTagText = (tag, text) => {
	document.querySelector(tag).innerHTML = text;
	responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
};

function printInitialMsg() {
	changeTagText("h1", "Jogo do número secreto");
	changeTagText(
		"p",
		`Escolha um número entre 1 e ${maxNum}.
		Erros: ${trys}`
	);
}

let sortedNums = [];
let maxNum = 10;
let trys = 0;
function genRandomNum(maxNum) {
	let n = parseInt(Math.random() * maxNum + 1);
	/*
	let qtdSorted = sortedNums.length;
	if (qtdSorted >= parseInt(maxNum / 2)) {
		sortedNums = [];
	}
	*/
	if (sortedNums.includes(n)) {
		n = genRandomNum(maxNum);
	}
	sortedNums.push(n);
	return n;
}
printInitialMsg();
let randNum = genRandomNum(maxNum);

function checkAttempt() {
	restartBtn.removeAttribute("disabled");
	let attemp = attempEl.value;
	attempEl.value = "";
	let msg = "";
	if (attemp == randNum) {
		msg = `Você acertou o número secreto é ${randNum}! Você subiu de nível!`;
		maxNum += 10;
		randNum = genRandomNum(maxNum);
	} else {
		trys++;
		msg = `O número secreto é ${
			attemp > randNum ? "menor" : "maior"
		} que ${attemp}`;
	}
	changeTagText("h1", msg);
	changeTagText(
		"p",
		`Escolha um número entre 1 e ${maxNum}. Erros: ${trys}`
	);
}

function restartGame() {
	maxNum = 10;
	trys = 0;
	randNum = genRandomNum(maxNum);
	printInitialMsg();
	restartBtn.setAttribute("disabled", true);
}
