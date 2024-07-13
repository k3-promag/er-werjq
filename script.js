const questions = [
    {
        question: "E - F = A, A=?",
        answer: [
            { text: "23", correct: false },
            { text: "66", correct: false },
            { text: "76", correct: true },
            { text: "12", correct: false },
        ]
    },
    {
        question: "B + D = M, B=?",
        answer: [
            { text: "-9", correct: true },
            { text: "-7", correct: false },
            { text: "2", correct: false },
            { text: "1", correct: false },
        ]
    },
    {
        question: "Lembaga Kocak Pakai Windows Defender",
        answer: [
            { text: "Gk ada pdn pakai wind def doang", correct: false },
            { text: "None", correct: false },
            { text: "Google", correct: false },
            { text: "K*minf*", correct: true },
        ]
    },
    {
        question: "ff burik?",
        answer: [
            { text: "gak", correct: false },
            { text: "gak", correct: false },
            { text: "Hell Yeah", correct: true },
            { text: "Apa lah", correct: false },
        ]
    },
    {
        question: "Jeruk warna apa",
        answer: [
            { text: "Hitam(nigga)", correct: false },
            { text: "Putih", correct: false },
            { text: "Ungu Thanos", correct: false },
            { text: "orange", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
