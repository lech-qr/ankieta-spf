document.addEventListener('DOMContentLoaded', function () {
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

    // Czas zmiany w ms
    const time = 700

    const article = document.querySelector('.typCery24')
    const section = document.querySelectorAll('article section')
    const prev = document.querySelector('nav .prev')
    const close = document.querySelector('nav .close')
    const pagination = document.querySelector('.pagination > p')

    const button = document.querySelectorAll('.ank_btn')
    const btnSucha = document.querySelectorAll('[data-id="sucha"]')
    const btnNormalna = document.querySelectorAll('[data-id="normalna"]')
    const btnTlusta = document.querySelectorAll('[data-id="tlusta"]')
    const btnMieszana = document.querySelectorAll('[data-id="mieszana"]')

    const resultList = document.querySelectorAll('.result li')

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
        console.log(result);
    }
    const normalnaOpt = () => {
        result['normalna'] = result['normalna'] + 1
        console.log(result);
    }
    const tlustaOpt = () => {
        result['tlusta'] = result['tlusta'] + 1
        console.log(result);
    }
    const mieszanaOpt = () => {
        result['mieszana'] = result['mieszana'] + 1
        console.log(result);
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
    const prevSlide = () => {
        hideSlide()
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
        let type = 'sucha'
        if (result['normalna'] > greatest) {
            greatest = result['normalna'];
            type = 'normalna'
        }
        if (result['tlusta'] > greatest) {
            greatest = result['tlusta'];
            type = 'tłusta'
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
    button[0].addEventListener("click", nextSlide);
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

});