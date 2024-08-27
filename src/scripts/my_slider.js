function mySlider(slider, breakpoint = 1 / 0) {
    const sliderLine = slider.querySelector('.slider__line');
    const slides = slider.querySelectorAll('.slider__line-slide');
    const styleSliderLine = window.getComputedStyle(sliderLine);
    const nav = slider.nextElementSibling;
    const parentDots = nav.querySelector(".dots");
    let dots;
    let widthSlider;
    let count;

    addDots();
    initSlider();
    window.addEventListener('resize', function () {
        initSlider();
    });
    nav.addEventListener('click', function (eve) {
        if (eve.target.classList.contains("arrows__prev")) {
            --count;
            if (count < 0) {
                count = slides.length - 1;
            }
            goSlider();
        } else if (eve.target.classList.contains("arrows__next")) {
            ++count;
            if (count >= slides.length) {
                count = 0;
            }
            goSlider();
        }
        sliderDot(eve.target, dots);
    });

    function addDots() {
        if (dots) {
            return
        }

        function newDot() {
            let dot = document.createElement("li");
            dot.classList.add("dots__dot");
            return dot
        }

        for (let i = 0; i <= slides.length - 1; i++) {
            parentDots.appendChild(newDot());
        }
        dots = nav.querySelectorAll(".dots__dot");
    }

    function initSlider() {
        widthSlider = slider.offsetWidth;
        (screen.width <= 425) ? count = 0 : count = 1;
        if (screen.width <= breakpoint) {
            sliderLine.style.width = (widthSlider * slides.length) + (parseInt(styleSliderLine.gap) * slides.length) + "px";
            slides.forEach((el) => {
                el.style.width = widthSlider + "px";
            });
            goSlider();
        } else {
            sliderLine.style.width = "100%";
            sliderLine.style.transform = `translateX(0)`
            slides.forEach((el) => {
                el.style.width = "100%";
            });
        }
    }

    function goSlider() {
        const gap = parseInt(styleSliderLine.gap);
        sliderLine.style.transform = `translateX(-${count * (widthSlider + gap)}px)`;
        thisDot(count);
    }

    function thisDot(i) {
        dots.forEach(el => {
            el.classList.remove("dots__dot-active")
        });
        dots[i].classList.add('dots__dot-active');
    }

    function sliderDot(dot, arrDots) {
        if (dot.classList.contains('dots__dot')) {
            arrDots.forEach((el, index) => {
                if (el === dot) {
                    count = index;
                    goSlider();
                }
            });
        }
    }
}// слайдер
