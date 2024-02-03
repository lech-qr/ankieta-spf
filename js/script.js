document.addEventListener('DOMContentLoaded', function () {
    // Start
    let slide = 0
    let sIndex = slide.toString()

    // Czas zmiany w ms
    const time = 700

    const article = document.querySelector('.typCery24')
    const section = document.querySelectorAll('article section')
    const button = document.querySelectorAll('.ank_btn')
    const prev = document.querySelector('nav .prev')
    const close = document.querySelector('nav .close')
    const pagination = document.querySelector('.pagination > p')
    console.log(button);

    // Funkcje
    // Następny slajd
    const nextSlide = () => {
        section[slide].style.opacity = '0'
        section[slide].style.zIndex = '0'
        section[slide].style.backgroundImage = ''
        setTimeout(() => {
            article.classList.remove("active", "slide0" + sIndex);
            // podniesienie indexu
            slide = slide + 1
            sIndex = slide.toString();
            console.log(`Aktualny index to ${slide}`);

            article.classList.add("active", "slide0" + sIndex);
            section[slide].style.opacity = '1'
            section[slide].style.zIndex = '1'
            // Wypisz index w paginacji
            pagination.textContent = sIndex
        }, time);
    }

    const toSlide1 = () => {
        nextSlide()
    }
    const toSlide2 = () => {
        nextSlide()
    }

    // Start aplikacji
    const start = () => {
        // Jeśli start jest wywoływany podczas wypełniania ankiety (button close)
        section[slide].style.opacity = '0'
        section[slide].style.zIndex = '0'
        article.classList.remove("active", "slide0" + sIndex);
        // Start właściwy
        setTimeout(() => {
            article.classList.add("active", "slide00");
            section[0].style.opacity = '1'
            section[0].style.zIndex = '1'
            slide = 0
            sIndex = slide.toString()
            console.log(`Aktualny index to ${slide}`);
            // Wypisz index w paginacji
            pagination.textContent = sIndex
        }, time);
    }
    start()

    // Nasłuchiwanie
    close.addEventListener("click", start);
    // Slide 00
    button[0].addEventListener("click", toSlide1);
    // Slide 01
    button[1].addEventListener("click", toSlide2);
    button[2].addEventListener("click", toSlide2);
    button[3].addEventListener("click", toSlide2);
    button[4].addEventListener("click", toSlide2);


});