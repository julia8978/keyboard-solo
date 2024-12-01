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
    document.getElementById("word-container").innerHTML = currentWord.split('').map(char => `<span>${char}</span>`).join('');
    document.querySelectorAll("#word-container span").forEach(span => span.classList.remove("c", "w"));
}

function updateTimer() {
    seconds++;
    totalTime++;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("timer").innerText = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 300);
}

document.addEventListener("keydown", (event) => {
    const inputChar = event.key;
    if (inputChar === currentWord[currentCharIndex]) {
        document.querySelectorAll("#word-container span")[currentCharIndex].classList.remove("w");
        document.querySelectorAll("#word-container span")[currentCharIndex].classList.add("c");
        currentCharIndex++;
        event.target.value = "";
        if (mistakes == 0 && currentCharIndex === currentWord.length) {
            correctCount++;
            document.querySelector(".correct-count").innerText = correctCount;
            setTimeout(() => {
                setRandomWord();
            }, 300);
        }

    } else {
        document.querySelectorAll("#word-container span")[currentCharIndex].classList.remove("c");
        document.querySelectorAll("#word-container span")[currentCharIndex].classList.add("w");
        mistakes++;
        document.querySelector(".word-mistakes").innerText = mistakes;
    }

    if (mistakes > 0 && currentCharIndex === currentWord.length) {
        wrongCount++;
        document.querySelector(".wrong-count").innerHTML = wrongCount;
        mistakes = 0;
        document.querySelector(".word-mistakes").innerText = mistakes;
        setTimeout(() => {
            setRandomWord();
        }, 300);
    }

    if (correctCount >= 5) {
        setTimeout(() => {
            alert(`Победа! Вы ввели правильно 5 слов. Время: ${totalTime} секунд`);
            resetGame();
        }, 300);
        
    }

    if (wrongCount >= 5) {
        setTimeout(() => {
            alert(`Вы проиграли! Вы ввели неверно 5 слов. Время: ${totalTime} секунд`);
            resetGame();
        }, 300);
    }

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