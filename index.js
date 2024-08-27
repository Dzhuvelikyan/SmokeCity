
document.getElementById("header").addEventListener("click", function (eve) {
    function toggleMenu() {
        const backFon = document.querySelector('.back-fon');
        const burgerLine = document.querySelector('.burger__line');
        burgerLine.classList.toggle('burger__line-active');
        document.querySelector('.header__nav').classList.toggle('header__nav-active');
        backFon.classList.toggle('back-fon-active');
        if (burgerLine.classList.contains('burger__line-active')) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    }

    if (eve.target.classList.contains("burger") || eve.target.closest(".burger")) {
        toggleMenu();
    }
    if (eve.target.classList.contains("menu__item-link") && eve.target.closest(".header__nav-active")) {
        toggleMenu();
    }

});// включение выключение мобильного меню

mySlider(document.querySelector(".masters .slider"));// включается слайдер с персоналом

mySlider(document.querySelector(".sale .slider"), 760);//включается слайдер с акциями на размере экрана 760px и меньше

mySlider(document.querySelector(".furnishing .slider"), 600);//включается слайдер с фотографиями на размере экрана 600px и меньше

assortmentMenu.addEventListener("click", showAssortment);//переключение меню(барной карты)

document.querySelector(".furnishing").addEventListener("click", openPhoto);//popup открывает фото из галереи

btnOrder.addEventListener("click", sendForms);//отправка формы


