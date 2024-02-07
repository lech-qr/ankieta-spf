﻿document.addEventListener('DOMContentLoaded', function () {
    // Start
    let slide = 0
    let sIndex = slide.toString()

    // Wynik
    let result = {
        sucha: 0,
        normalna: 0,
        tlusta: 0,
        mieszana: 0
    }
    let option = []

    // Typ cery
    type = 'nieznany'
    // Ilość kosmetyków
    let howMany = 'nieznana'

    // Czas zmiany w ms
    const time = 700

    const article = document.querySelector('.typCery24')
    const section = document.querySelectorAll('article section')
    const prev = document.querySelector('nav .prev')
    const close = document.querySelector('nav .close')
    const pagination = document.querySelector('.pagination > p')

    const buttons = document.querySelectorAll('.ank_btn')
    const btnSucha = document.querySelectorAll('[data-id="sucha"]')
    const btnNormalna = document.querySelectorAll('[data-id="normalna"]')
    const btnTlusta = document.querySelectorAll('[data-id="tlusta"]')
    const btnMieszana = document.querySelectorAll('[data-id="mieszana"]')

    const getResult = document.querySelectorAll('button.result');
    const resultH2 = document.querySelector('section.slide08 h2');
    const resultPe = document.querySelector('section.slide08 p');
    const resultA1 = document.querySelector('section.slide08 a:nth-of-type(1)');
    const resultA2 = document.querySelector('section.slide08 a:nth-of-type(2)');

    // Funkcje
    // Ukryj slajd
    const hideSlide = () => {
        section[slide].style.opacity = '0'
        section[slide].style.zIndex = '0'
    }
    const showSlide = () => {
        section[slide].style.opacity = '1'
        section[slide].style.zIndex = '1'
    }
    const indexUp = () => {
        // podniesienie indexu
        slide = slide + 1
        sIndex = slide.toString()
        console.log(`Aktualny index to ${slide}`)
    }
    // Wybór
    const suchaOpt = () => {
        result['sucha'] = result['sucha'] + 1
        option.push('sucha')
        console.log(result, option)
    }
    const normalnaOpt = () => {
        result['normalna'] = result['normalna'] + 1
        option.push('normalna')
        console.log(result, option)
    }
    const tlustaOpt = () => {
        result['tlusta'] = result['tlusta'] + 1
        option.push('tlusta')
        console.log(result, option)
    }
    const mieszanaOpt = () => {
        result['mieszana'] = result['mieszana'] + 1
        option.push('mieszana')
        console.log(result, option)
    }

    // Następny slajd
    const nextSlide = () => {
        hideSlide()
        setTimeout(() => {
            article.classList.remove("active", "slide0" + sIndex);
            if (slide === 5) {
                if ((result['sucha'] !== 0 && (result['sucha'] === result['normalna'] || result['sucha'] === result['tlusta'] || result['sucha'] === result['mieszana'])) ||
                    (result['normalna'] !== 0 && (result['normalna'] === result['tlusta'] || result['normalna'] === result['mieszana'])) ||
                    (result['tlusta'] !== 0 && (result['tlusta'] === result['mieszana']))) {
                    console.log('Brak jednoznacznego wyniku')
                    article.classList.add("active", "slide06")
                    section[6].style.opacity = '1'
                    section[6].style.zIndex = '1'
                    slide = 6
                    sIndex = slide.toString()
                    console.log(`Aktualny index to ${slide} i pół 😉`)
                    pagination.textContent = '5.5'
                } else {
                    // Na piątym pytaniu nie ma wątpliwości co do odpowiedzi - idziemy do slide 07
                    slide = 7
                    sIndex = slide.toString()
                    console.log(`Aktualny index to ${slide}`)
                    pagination.textContent = '6'
                    article.classList.add("active", "slide0" + sIndex)
                    showSlide()
                }
            } else {
                // Podstawowa obsługa przejścia do kolejnego slajdu
                indexUp()
                // Wypisz index w paginacji
                pagination.textContent = sIndex
                article.classList.add("active", "slide0" + sIndex)
                showSlide()
            }
            if (slide === 7) {
                pagination.textContent = '6'
                // Ustal wynik
                findGreatest(result)
            }
        }, time)
    }
    // Powrót do poprzedniego slajdu
    const subtract = () => {
        if (option[option.length - 1] == 'sucha') {
            result['sucha'] = result['sucha'] - 1
            option.pop()
        } else if (option[option.length - 1] == 'normalna') {
            result['normalna'] = result['normalna'] - 1
            option.pop()
        } else if (option[option.length - 1] == 'tlusta') {
            result['tlusta'] = result['tlusta'] - 1
            option.pop()
        } else if (option[option.length - 1] == 'mieszana') {
            result['mieszana'] = result['mieszana'] - 1
            option.pop()
        }
        console.log(result, option)
    }
    const prevSlide = () => {
        hideSlide()
        subtract()
        setTimeout(() => {
            article.classList.remove("slide0" + sIndex)
            slide = slide - 1
            sIndex = slide.toString()
            console.log(`Aktualny index to ${slide}`)
            pagination.textContent = sIndex
            article.classList.add("active", "slide0" + sIndex)
            showSlide()
        }, time)
    }

    // Ustal typ cery
    const findGreatest = (result) => {
        let greatest = result['sucha']
        type = 'sucha'
        if (result['normalna'] > greatest) {
            greatest = result['normalna'];
            type = 'normalna'
        }
        if (result['tlusta'] > greatest) {
            greatest = result['tlusta'];
            type = 'tlusta'
        }
        if (result['mieszana'] > greatest) {
            greatest = result['mieszana'];
            type = 'mieszana'
        }
        console.log(`Ostateczny wynik ${type}`);
    }

    // Start aplikacji
    const start = () => {
        // Jeśli start jest wywoływany podczas wypełniania ankiety (button close)
        hideSlide()
        article.classList.remove("active", "slide0" + sIndex);
        option = []
        result = {
            sucha: 0,
            normalna: 0,
            tlusta: 0,
            mieszana: 0
        }
        // Start właściwy
        setTimeout(() => {
            article.classList.add("active", "slide00");
            slide = 0
            sIndex = slide.toString()
            console.log(`Aktualny index to ${slide}`);
            showSlide()
            // Wypisz index w paginacji
            pagination.textContent = sIndex
        }, time);
    }
    start()

    // Nasłuchiwanie
    // Nav > close
    close.addEventListener("click", start);
    // Nav > prev
    prev.addEventListener("click", prevSlide);
    // Slide 00
    buttons[0].addEventListener("click", nextSlide);
    // Slide od 01 do 05
    // Sucha
    btnSucha.forEach(button => {
        button.addEventListener('click', function () {
            suchaOpt()
            nextSlide()
        });
    })
    // Normalna
    btnNormalna.forEach(button => {
        button.addEventListener('click', function () {
            normalnaOpt()
            nextSlide()
        });
    })
    // Tłusta
    btnTlusta.forEach(button => {
        button.addEventListener('click', function () {
            tlustaOpt()
            nextSlide()
        });
    })
    // Mieszana
    btnMieszana.forEach(button => {
        button.addEventListener('click', function () {
            mieszanaOpt()
            nextSlide()
        });
    })
    // Losuj kolejność pytań
    buttons.forEach(function (element) {
        let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        // element.style.order = randomNumber;
    });

    // Generowanie wyniku
    const prntResult = () => {
        console.log(`Typ cery to ${type}, a ilość kroków to ${howMany}`);
        if (type === 'sucha') {
            resultPe.textContent = 'Twoja skóra wymaga dogłębnego nawilżenia. W kosmetykach oprócz składników typowo nawilżających szukaj również takich, które ograniczą TEWL (transepidermalą utratę wody) i odbudują barierę hydrolipidową Twojej cery. Nie zapominaj także o ochronie przeciwsłonecznej i stosowaniu składników anti-aging, ponieważ Twoja skóra stosunkowo szybko ulega procesom starzenia.'
        } else if (type === 'normalna') {
            resultPe.textContent = 'Twoja skóra jest w dobrej kondycji, prawda? Mimo to, pamiętaj o odpowiedniej pielęgnacji. Wybieraj kosmetyki, które ochronią Twoją cerę przed negatywnym wpływem wolnych rodników, promieniowania UV i innych czynników zewnętrznych. Dzięki odpowiedniej pielęgnacji będziesz latami cieszyć się piękną i zdrową cerą.'
        } else if (type === 'tlusta') {
            resultPe.textContent = 'Twoja skóra wytwarza nadmiar sebum na całej powierzchni twarzy. Mimo to, może być jednocześnie przesuszona. Intensywnie wysuszające kosmetyki, które mają pomóc Ci doraźnie zmatowić cerę, w perspektywie czasu doprowadzają do jeszcze większej produkcji sebum oraz przesuszenia. W swojej pielęgnacji, zamiast składników agresywnie wysuszających postaw na te, które nawilżą skórę oraz zadziałają seboregulująco.'
        } else if (type === 'mieszana') {
            resultPe.textContent = 'Twoja skóra wytwarza nadmiar sebum w strefie T (czoło, nos, broda). Pozostałe partie (policzki, skronie, okolica oczu i ust) mogą być normalne lub przesuszone. Twoja pielęgnacja musi być wielokierunkowa. Na całą powierzchnię twarzy stosuj kosmetyki nawilżające i odbudowujące barierę hydrolipidową skóry, natomiast w strefie T stosuj dodatkowo produkty seboregulujące. Pamiętaj, że intensywnie wysuszające kosmetyki, które mają pomóc Ci doraźnie zmatowić cerę, w perspektywie czasu doprowadzają do jeszcze większej produkcji sebum i silnego przesuszenia.'
        }
        // Pokaż slide z wynikiem
        article.classList.add(type)
        resultH2.textContent = 'Cera ' + type
        resultA1.href = advice[type]
        // resultA2.href = list[type]
        nextSlide()
    }

    getResult[0].addEventListener("click", function () {
        howMany = 'do 3'
        advice = {
            sucha: '/Cera-Sucha-poznaj-porade-Eksperta-3-ccms-pol-129.html',
            normalna: '/Cera-Normalna-poznaj-porade-Eksperta-3-ccms-pol-138.html',
            tlusta: '/Cera-Tlusta-poznaj-porade-Eksperta-3-ccms-pol-132.html',
            mieszana: '/Cera-Mieszana-poznaj-porade-Eksperta-3-ccms-pol-135.html'
        }
        prntResult()
    })
    getResult[1].addEventListener("click", function () {
        howMany = 'między 3 a 6'
        advice = {
            sucha: '/Cera-Sucha-poznaj-porade-Eksperta-6-ccms-pol-130.html',
            normalna: '/Cera-Normalna-poznaj-porade-Eksperta-6-ccms-pol-139.html',
            tlusta: '/Cera-Tlusta-poznaj-porade-Eksperta-6-ccms-pol-133.html',
            mieszana: '/Cera-Mieszana-poznaj-porade-Eksperta-6-ccms-pol-136.html'
        }
        prntResult()
    })
    getResult[2].addEventListener("click", function () {
        howMany = '6 i więcej'
        advice = {
            sucha: '/Cera-Sucha-poznaj-porade-Eksperta-9-ccms-pol-131.html',
            normalna: '/Cera-Normalna-poznaj-porade-Eksperta-9-ccms-pol-140.html',
            tlusta: '/Cera-Tlusta-poznaj-porade-Eksperta-9-ccms-pol-134.html',
            mieszana: '/Cera-Mieszana-poznaj-porade-Eksperta-9-ccms-pol-137.html'
        }
        prntResult()
    })
});