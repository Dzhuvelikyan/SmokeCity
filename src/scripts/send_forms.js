//отправка формы
const forms = document.querySelectorAll(".order__form-border-input");
const btnOrder = document.getElementById("order-btn");
const loader = document.getElementById("loader");
const blockThanks = document.querySelector('.order__body-thanks');

function formDefault(form) {
    form.classList.remove("input-done", "input-err");
    form.nextElementSibling.classList.remove("valid-text-err");
}

function formCompleted(form) {
    form.classList.add("input-done");
    form.setAttribute("is-valid", "1");
}

function formErrored(form) {
    form.classList.add("input-err");
    form.setAttribute("is-valid", "0");
    form.nextElementSibling.classList.add("valid-text-err");
}

function formCheck(el) {//валидация согласно регулярному выражению в атрибуте pattern элемента input
    if (el.hasAttribute("pattern")) {
        el.setAttribute("is-valid", "0");// устанавливаем атрибут для проверки валидности 1-валидно 0-невалидно
        const reg = new RegExp(el.getAttribute("pattern"));
        formDefault(el);
        if (reg.test(el.value)) {
            formCompleted(el);
        } else {
            formErrored(el);
        }
        if (el.value === "") {
            formDefault(el);
        }
    }
}

forms.forEach(el => {
    el.addEventListener('keyup', eve => {
        formCheck(eve.target);
    });
});

btnOrder.onblur = function () {// устанавливает исходные значения формы при потере фокуса с кнопки
    for (const form of forms) {
        if (!form.value) {
            formDefault(form);
        }
    }
};

function showThanks(order, thanks, text, time) { // показывает и скрывает блок 'спасибо'
    loader.style.display = "none";
    thanks.innerHTML = text;
    order.classList.add('order__body-none');
    thanks.classList.add('order__body-thanks-show');
    setTimeout(() => {
        order.classList.remove('order__body-none');
        thanks.classList.remove('order__body-thanks-show');
    }, time);
}

async function sendForms() {
    let isFormsValid = [];
    for (const form of forms) {
        if (!form.value) {
            formErrored(form);
        }
        isFormsValid.push(form.getAttribute("is-valid"));
    }
    const isValid = isFormsValid.reduce((acc, current) => {//флаг для отправки формы: если все значения в массиве равны между собой 1 то вернет 1, если нет, то 0
        return +acc && +current;
    })
    if (isValid) {//форма валидна
        let thanksText;
        let user = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
        }
        const body = new URLSearchParams(user).toString();
        let res;
        let result;
        loader.style.display = "flex";
        try {
            res = await fetch("https://testologia.site/checkout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body,
            });
        } catch (err){

        }
        try {
            result = await res.json();
        } catch (err) {
            alert(`Ошибка: ${err.message}`);
            thanksText = `Нет ответа от сервера! Сделайте заказ по телефону.`;
            showThanks(document.querySelector('.order__body'), blockThanks, thanksText, 3000);
            return
        }
        forms.forEach(el => {//очищаем форму
            el.value = '';
            formDefault(el);
        });
        if (result.success) {
            thanksText = `Спасибо <span class="span-nowrap">мы свяжемся с Вами</span> <span class="span-nowrap">в ближайшее время!</span>`;
            showThanks(document.querySelector('.order__body'), blockThanks, thanksText, 3000);
        } else {
            alert(`Ошибка: ${result.message}`);
            thanksText = `"Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ"`;
            showThanks(document.querySelector('.order__body'), blockThanks, thanksText, 3000);
        }
    }
}