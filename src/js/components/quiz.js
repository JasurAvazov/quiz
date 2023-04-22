export function init() {
    const questions = document.querySelectorAll('.question');
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');
    const counterCurrent = document.querySelectorAll('.current')
    const counterAll = document.querySelectorAll('.all')

    counterCurrent.forEach(el => {
        el.innerHTML = 1
    })

    const all = questions.length
    counterAll.forEach(el => {
        el.innerHTML = all
    })

    let currentQuestion = 0;

    btnNext.addEventListener('click', () => {
        if (currentQuestion > 0){
            // тут нужно выключить btnPrev
        }

        const currentAnswer = getSelectedAnswer();

        if (!currentAnswer) {
            return;
        }
        questions[currentQuestion].classList.remove('active');

        currentQuestion++;
        counterCurrent.forEach(el => {
            el.innerHTML = currentQuestion+1
        })

        if (currentQuestion === questions.length) {
            sendData();
            return;
        }
        questions[currentQuestion].classList.add('active');

        restoreSelectedAnswer();
    });

    btnPrev.addEventListener('click', () => {
        if (currentQuestion < 2){
            btnPrev.setAttribute('disabled', '');
        }

        questions[currentQuestion].classList.remove('active');

        currentQuestion--;
        counterCurrent.forEach(el => {
            el.innerHTML = currentQuestion+1
        })

        questions[currentQuestion].classList.add('active');

        restoreSelectedAnswer();
    });

    function getSelectedAnswer() {
        const currentQuestionElement = questions[currentQuestion];

        const radios = currentQuestionElement.querySelectorAll('input[type="radio"]');
        const select = currentQuestionElement.querySelector('select');

        if (radios.length > 0) {
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    return radios[i].value;
                }
            }
        }

        if (select) {
            return select.value;
        }

        return null;
    }

    function restoreSelectedAnswer() {
        const currentQuestionElement = questions[currentQuestion];
        const prevQuestionElement = questions[currentQuestion - 1];
    
        if (!prevQuestionElement) {
            return;
        }
    
        const radios = prevQuestionElement.querySelectorAll('input[type="radio"]');
    
        if (radios.length > 0) {
            const prevAnswer = localStorage.getItem(`question-${currentQuestion-1}`);
            if (prevAnswer) {
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].value === prevAnswer) {
                radios[i].checked = true;
                break;
                }
            }
            }
        }
    
        const select = prevQuestionElement.querySelector('select');
    
        if (select) {
            const prevAnswer = localStorage.getItem(`question-${currentQuestion-1}`);
            if (prevAnswer) {
            select.value = prevAnswer;
            }
        }
    }

    function sendData() {
        // Здесь можно использовать fetch или XMLHttpRequest для отправки данных на сервер
        
        alert('Данные успешно отправлены!');
        counterCurrent.forEach(el => {
            el.innerHTML = 1
        })
        currentQuestion = 0;
        questions[currentQuestion].classList.add('active');
    }

    questions.forEach((question) => {
    const radios = question.querySelectorAll('input[type="radio"]');
    const select = question.querySelector('select');

    if (radios.length > 0) {
        radios.forEach((radio) => {
            radio.addEventListener('change', () => {
                localStorage.setItem(`question-${currentQuestion}`, radio.value);

                btnNext.removeAttribute('disabled');
            });
        });
    }

    if (select) {
        select.addEventListener('change', () => {
            localStorage.setItem(`question-${currentQuestion}`, select.value);

            btnNext.removeAttribute('disabled');
        });
    }
    });

    questions[currentQuestion].classList.add('active');
}
