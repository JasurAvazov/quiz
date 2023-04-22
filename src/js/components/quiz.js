export function init() {
    const questions = document.querySelectorAll('.question');
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');
    const submit = document.querySelector('.reg-submit')

    const counterCurrent = document.querySelectorAll('.question__top-counter-current')
    const counterAll = document.querySelectorAll('.question__top-counter-overall')
    const radios = document.querySelectorAll('input[type=radio]')
    const regInputs = document.querySelectorAll('.reg-input');

    let currentQuestion = 0;

    radios.forEach(el => {
        el.addEventListener("click", () => {
            const parent = el.parentElement
            radios.forEach(all => {
                all.parentElement.classList.remove('active')
            })
            parent.classList.add("active")
        })
    })

    regInputs.forEach(input => {
        input.addEventListener('input', () => {
            let allInputsFilled = true;

            regInputs.forEach(input => {
                if (input.value.trim() === '') {
                    allInputsFilled = false;
                }
            });

            if (allInputsFilled) {
                submit.classList.remove('disabled');
            } else {
                submit.classList.add('disabled');
            }
        });
    });

    counterCurrent.forEach(el => {
        el.innerHTML = 1
    })

    const all = questions.length
    counterAll.forEach(el => {
        el.innerHTML = all
    })

    btnNext.addEventListener('click', () => {
        if (currentQuestion <= 0) {
            btnPrev.classList.remove('disabled')
        }
        
        questions[currentQuestion].classList.remove('active');

        currentQuestion++;
        counterCurrent.forEach(el => {
            el.innerHTML = currentQuestion+1
        })

        const btns = document.querySelector('.btns')
        let length = questions.length - 1
        const quiz = document.querySelector('.quiz')

        if (currentQuestion === length){
            btns.classList.add('hidden')
            quiz.style.paddingBottom = 32+'px'
        }else{
            btns.classList.remove('hidden')
            quiz.style.paddingBottom = 114+'px'
        }

        questions[currentQuestion].classList.add('active');
        const currentAnswer = getSelectedAnswer();

        if (!currentAnswer) {
            btnNext.classList.add('disabled')
            return;
        }

        restoreSelectedAnswer();
    });

    btnPrev.addEventListener('click', () => {
        if (currentQuestion < 2){
            btnPrev.classList.add('disabled')
        }
        btnNext.classList.remove('disabled')
        questions[currentQuestion].classList.remove('active');

        currentQuestion--;
        counterCurrent.forEach(el => {
            el.innerHTML = currentQuestion+1
        })

        questions[currentQuestion].classList.add('active');

        restoreSelectedAnswer();
    });

    submit.addEventListener('click', () => {
        sendData();
        return;
    })

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
        const data = {};
        questions.forEach((question, index) => {
            const radios = question.querySelectorAll('input[type="radio"]');
            const select = question.querySelector('select');
            const answerKey = `question-${index}`;
            const name = document.getElementById('name').value
            const tel = document.getElementById('tel').value
            const email = document.getElementById('email').value

            data["name"] = name;
            data["number"] = tel;
            data["email"] = email;
        
            if (radios.length > 0) {
                radios.forEach((radio) => {
                    if (radio.checked) {
                        data[answerKey] = radio.value;
                    }
                });
            }
        
            if (select && select.value) {
                data[answerKey] = select.value;
            }
        });

        console.log("data =>",data);

        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Данные успешно отправлены!');
                counterCurrent.forEach(el => {
                    el.innerHTML = 1
                })
                currentQuestion = 0;
                questions[currentQuestion].classList.add('active');
                location.reload();
            } else {
                alert('Ошибка отправки данных!');
                counterCurrent.forEach(el => {
                    el.innerHTML = 1
                })
                currentQuestion = 0;
                questions[currentQuestion].classList.add('active');
                location.reload();
            }
        })
        .catch(error => {
            alert('Ошибка отправки данных!');
            console.error(error);
            counterCurrent.forEach(el => {
                el.innerHTML = 1
            })
            currentQuestion = 0;
            questions[currentQuestion].classList.add('active');
            location.reload();
        });
    }

    questions.forEach((question) => {
    const radios = question.querySelectorAll('input[type="radio"]');
    const select = question.querySelector('select');

    if (radios.length > 0) {
        radios.forEach((radio) => {
            radio.addEventListener('change', () => {
                localStorage.setItem(`question-${currentQuestion}`, radio.value);

                btnNext.classList.remove('disabled');
            });
        });
    }

    if (select) {
        select.addEventListener('change', () => {
            localStorage.setItem(`question-${currentQuestion}`, select.value);

            btnNext.classList.remove('disabled');
        });
    }
    });

    questions[currentQuestion].classList.add('active');
}
