function openPhoto(eve) {
    const popup = document.querySelector(".pop-up");
    const popupImg = document.querySelector(".pop-up__img");
    const images = document.querySelectorAll(".furnishing__images-image-img");
    images.forEach(img => {
        if (eve.target === img) {
            popup.style.display = "block";
            setTimeout(()=>{
                popupImg.style = "scale: 1";
            },0)
            popupImg.src = img.getAttribute("src");
        }
    });
    if (eve.target === document.querySelector(".pop-up__close")) {
        popupImg.style = "scale: 0";
        document.querySelector(".pop-up").style.display = "none";
    }
    if (popup.style.display === "block") {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }
}//popup открывает фото из галереи