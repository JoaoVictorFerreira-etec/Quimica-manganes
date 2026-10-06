const quizData = [
    {
        question: "Qual é o número atômico do manganês?",
        options: ["25", "54", "7", "4"],
        correct: 0
    },
    {
        question: "Quem isolou o manganês metálico em 1774?",
        options: ["Johan Gottlieb Gahn", "Antoine Lavoisier", "Dmitri Mendeleev", "Robert Boyle"],
        correct: 0
    },
    {
        question: "Qual mineral é rico em dióxido de manganês (MnO₂)?",
        options: ["Pirolusita", "Hematita", "Bauxita", "Galena"],
        correct: 0
    },
    {
        question: "Qual é o principal uso industrial do manganês?",
        options: ["Produção de aço", "Fabricação de vidro", "Produção de papel", "Refino de petróleo"],
        correct: 0
    },
    {
        question: "Qual é o estado de oxidação mais comum do manganês?",
        options: ["+2", "+4", "+7", "-1"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');

function loadQuestion() {
    answered = false;
    const q = quizData[currentQuestion];
    questionEl.textContent = `Pergunta ${currentQuestion + 1}/${quizData.length}: ${q.question}`;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => selectOption(index, btn));
        optionsEl.appendChild(btn);
    });
}

function selectOption(index, btn) {
    if (answered) return;
    answered = true;

    const q = quizData[currentQuestion];
    const allButtons = optionsEl.querySelectorAll('button');

    allButtons.forEach((b, i) => {
        b.disabled = true;
        if (i === q.correct) {
            b.classList.add('correct');
        } else if (i === index) {
            b.classList.add('wrong');
        }
    });

    if (index === q.correct) {
        score++;
        feedbackEl.textContent = '✅ Resposta correta!';
        feedbackEl.style.color = '#28a745';
    } else {
        feedbackEl.textContent = `❌ Resposta incorreta. A correta é: ${q.options[q.correct]}`;
        feedbackEl.style.color = '#dc3545';
    }

    if (currentQuestion < quizData.length - 1) {
        nextBtn.style.display = 'inline-block';
    } else {
        feedbackEl.textContent += ` | Pontuação final: ${score}/${quizData.length}`;
        if (score === quizData.length) {
            feedbackEl.textContent += ' 🏆 Parabéns!';
        }
        nextBtn.textContent = 'Recomeçar Quiz';
        nextBtn.style.display = 'inline-block';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
    } else {

        currentQuestion = 0;
        score = 0;
    }
    loadQuestion();
});

loadQuestion();

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.textContent = '↑';
backToTop.setAttribute('aria-label', 'Voltar ao topo');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});