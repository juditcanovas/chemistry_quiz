// 1. Define tus preguntas
// Puedes añadir entre 10-15 preguntas aquí. Asegúrate de que cada objeto tenga:
// - question: el texto de la pregunta
// - options: un array con todas las opciones
// - correctAnswer: la opción correcta (debe coincidir exactamente con una de las opciones)

const questions = [
    {
        question: "¿Cuál es la partícula subatómica con carga positiva?",
        options: ["Electrón", "Neutrón", "Protón", "Fotón"],
        correctAnswer: "Protón"
    },
    {
        question: "¿Cuál es el símbolo químico del oro?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: "Au"
    },
    {
        question: "¿Qué elemento es el más abundante en la atmósfera terrestre?",
        options: ["Oxígeno", "Nitrógeno", "Argón", "Dióxido de Carbono"],
        correctAnswer: "Nitrógeno"
    },
    {
        question: "¿Cuál de estos es un gas noble?",
        options: ["Cloro", "Sodio", "Helio", "Oxígeno"],
        correctAnswer: "Helio"
    },
    {
        question: "¿Qué parte de un átomo determina su número atómico?",
        options: ["Número de electrones", "Número de neutrones", "Número de protones", "Masa atómica"],
        correctAnswer: "Número de protones"
    },
    {
        question: "¿Cómo se llama una sustancia que acelera una reacción química sin consumirse en ella?",
        options: ["Inhibidor", "Reactivo", "Producto", "Catalizador"],
        correctAnswer: "Catalizador"
    },
    {
        question: "¿Cuál es el principal componente de las moléculas orgánicas?",
        options: ["Oxígeno", "Nitrógeno", "Carbono", "Hidrógeno"],
        correctAnswer: "Carbono"
    },
    {
        question: "¿Qué tipo de reacción es el proceso de un metal oxidándose en presencia de oxígeno y agua?",
        options: ["Neutralización", "Combustión", "Precipitación", "Corrosión"],
        correctAnswer: "Corrosión"
    },
    {
        question: "¿Cuál es el valor de una mol de cualquier sustancia (Número de Avogadro)?",
        options: [
            "6.022 x 10^22 partículas",
            "6.022 x 10^23 partículas",
            "6.022 x 10^24 partículas",
            "1.0 x 10^23 partículas"
        ],
        correctAnswer: "6.022 x 10^23 partículas"
    },
    {
        question: "¿Qué propiedad de un líquido es una medida de su resistencia a fluir?",
        options: ["Tensión superficial", "Densidad", "Viscosidad", "Capilaridad"],
        correctAnswer: "Viscosidad"
    },
    {
        question: "¿Qué ley establece que a temperatura y presión constantes, el volumen de un gas es directamente proporcional al número de moles del gas?",
        options: ["Ley de Boyle", "Ley de Charles", "Ley de Avogadro", "Ley de Dalton"],
        correctAnswer: "Ley de Avogadro"
    },
    {
        question: "¿Qué concepto describe la cantidad de energía liberada o absorbida en una reacción química a presión constante?",
        options: ["Entropía", "Energía libre de Gibbs", "Entalpía", "Energía de activación"],
        correctAnswer: "Entalpía"
    }
    // Añade más preguntas aquí hasta tener 10-15
];


// 2. Obtén referencias a los elementos HTML
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');

const resultsContainer = document.getElementById('results-container');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionsSpan = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');

// 3. Variables de estado del Quiz
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionButton = null; // Para guardar el botón de la opción seleccionada

// 4. Función para iniciar el Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultsContainer.style.display = 'none'; // Oculta los resultados
    questionContainer.style.display = 'block'; // Muestra las preguntas
    nextButton.style.display = 'block'; // Muestra el botón de siguiente
    nextButton.textContent = 'Siguiente Pregunta'; // Reinicia el texto del botón
    displayQuestion();
}

// 5. Función para mostrar la pregunta actual
function displayQuestion() {
    // Asegúrate de que haya más preguntas
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question; // Muestra el texto de la pregunta

    optionsContainer.innerHTML = ''; // Limpia las opciones anteriores
    selectedOptionButton = null; // Resetea la opción seleccionada

    // Crea un botón para cada opción
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button', 'btn', 'btn-outline-secondary', 'text-start', 'py-3');
        button.onclick = () => selectAnswer(button, option, currentQuestion.correctAnswer);
        optionsContainer.appendChild(button);
    });
}

// 6. Función para manejar la selección de una respuesta
function selectAnswer(button, selectedOption, correctAnswer) {
    // Si ya se seleccionó una opción y el botón siguiente no se ha presionado, no hacer nada (para evitar doble clic)
    if (selectedOptionButton) {
        return;
    }

    selectedOptionButton = button; // Guarda la referencia al botón seleccionado

    // Remueve las clases de "correct" o "incorrect" de todos los botones para una nueva selección (si aplica)
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = true; // Deshabilita todos los botones de opción después de seleccionar uno
    });

    if (selectedOption === correctAnswer) {
        score++;
        button.classList.add('correct'); // Marca como correcta
    } else {
        button.classList.add('incorrect'); // Marca como incorrecta
        // Opcional: Resalta la respuesta correcta
        document.querySelectorAll('.option-button').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Si es la última pregunta, cambia el texto del botón "Siguiente"
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = 'Ver Resultados';
    }
}


// 7. Función para pasar a la siguiente pregunta
function nextQuestion() {
    // Asegurarse de que una opción haya sido seleccionada antes de pasar
    if (!selectedOptionButton && currentQuestionIndex < questions.length) {
        alert('Por favor, selecciona una opción antes de continuar.');
        return;
    }

    currentQuestionIndex++;
    displayQuestion(); // Muestra la siguiente pregunta o los resultados
}

// 8. Función para mostrar los resultados finales
function showResults() {
    questionContainer.style.display = 'none'; // Oculta el contenedor de preguntas
    nextButton.style.display = 'none'; // Oculta el botón de siguiente
    resultsContainer.style.display = 'block'; // Muestra el contenedor de resultados

    finalScoreSpan.textContent = score;
    totalQuestionsSpan.textContent = questions.length;
}

// 9. Asignar Event Listeners a los botones
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startQuiz);

// 10. Inicia el quiz cuando la página carga
startQuiz();