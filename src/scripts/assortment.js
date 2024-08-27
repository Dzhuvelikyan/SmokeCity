const assortmentMenu = document.querySelector('.assortment__menu');
const assortmentLinks = document.querySelectorAll('.assortment .menu__item-link');
const assortmentItems = document.querySelectorAll('.assortment__items');

function showAssortment(eve) {
    if (eve.target !== this ) {
        assortmentLinks.forEach(link => {
            link.classList.remove('menu__item-link-active');
            if (eve.target.id === link.id) {
                eve.preventDefault();
                assortmentItems.forEach(item => {
                    item.style.opacity = '0';
                    item.classList.remove('assortment__items-active');
                    if (link.id.includes(item.id)) {
                        link.classList.add('menu__item-link-active');
                        item.classList.add('assortment__items-active');
                        setTimeout(()=>{
                            item.style.opacity = '1';
                        },0)
                    }
                });
            }
        });
    }
}