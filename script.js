const words = ["giraffe", "squirrel", "dolphin", "kangaroo", "mouse"];
let currentWord = "";
let currentCharIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let mistakes = 0;
let timerInterval;
let seconds = 0;
let totalTime = 0;

function setRandomWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    currentCharIndex = 0;
    mistakes = 0;
    document.querySelector(".word").innerHTML = currentWord.split('').map(char => `<span>${char}</span>`).join('');
    document.querySelectorAll(".word span").forEach(span => span.classList.remove("c", "w"));
}

function updateTimer() {
    seconds++;
    totalTime++;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("timer").innerText = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function symbolSuccess() {
    document.querySelectorAll(".word span")[currentCharIndex].classList.remove("w");
    document.querySelectorAll(".word span")[currentCharIndex].classList.add("c");
    currentCharIndex++;
}

function symbolFail() {
    document.querySelectorAll(".word span")[currentCharIndex].classList.remove("c");
    document.querySelectorAll(".word span")[currentCharIndex].classList.add("w");
    mistakes++;
    document.querySelector(".word-mistakes").innerText = mistakes;
}

function handleWordCompletion() {
    if (mistakes > 0) {
        wrongCount++;
        document.querySelector(".wrong-count").innerHTML = wrongCount;
        mistakes = 0;
        document.querySelector(".word-mistakes").innerText = mistakes;
    } else {
        correctCount++;
        document.querySelector(".correct-count").innerText = correctCount;
    }
    setTimeout(setRandomWord, 0);
}

function gameWinAndOver() {
    if (correctCount >= 5) {
        alert(`Победа! Вы ввели правильно 5 слов. Время: ${totalTime} секунд`);
        resetGame();
    }

    if (wrongCount >= 5) {
        alert(`Вы проиграли! Вы ввели неверно 5 слов. Время: ${totalTime} секунд`);
        resetGame();
    }
}

document.addEventListener("keydown", (event) => {
    const inputChar = event.key;
    if (inputChar === currentWord[currentCharIndex]) {
        symbolSuccess();
        if (currentCharIndex === currentWord.length) {
            handleWordCompletion();
        }
    } else {
        symbolFail();
    }
    setTimeout(gameWinAndOver, 0);
});

function resetGame() {
    clearInterval(timerInterval);
    seconds = 0;
    totalTime = 0;
    correctCount = 0;
    wrongCount = 0;
    mistakes = 0;
    document.querySelector(".correct-count").innerText = correctCount;
    document.querySelector(".wrong-count").innerText = wrongCount;
    document.querySelector(".word-mistakes").innerText = mistakes;
    setRandomWord();
    startTimer();
}

setRandomWord();
startTimer();