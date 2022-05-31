import { cart } from './cart.js';

function setEvent() {
    const cartDeleteBtn = $(".cart__delete");

    cartDeleteBtn.each((index, btn) => {
        $(btn).on("click", function() {
            const idx = $(btn).parents().data('index');

            cart.delete(idx);
            render();
        })
    })
}

function setItem(block, item, index, img) {
    const itemElement = getInnerItem(index, item.name, item.author, item.price, img);

    block.append(itemElement);
}

function getInnerItem(index, text, subtitle, price, img) {
    return `
    <div class="cart__item" data-index=${index}>
        <img src="../assets/img/${img}.jpeg" alt="" class="cart__logo">
        <div class="cart__content">
            <div class="cart__header">
                <div class="cart__text">${text}</div>
                <div class="cart__subtitle">${subtitle}</div>
            </div>
            <div class="cart__price-info">
                <span class="cart__count">1 item:</span>
                <span class="cart__price">$${price}</span>
            </div>
        </div>
        <button class="cart__delete"></button>
    </div>`;
}

function render() {
    setCardValues();
    const cartBlock = $('.cart__col');
    cartBlock.html('');
    setCount(cart.getSize());
    checkCount();

    if (!cart.getSize()) {
        const message = $(document.createElement('div'));
        const messageText = $(document.createElement('div'));

        message.addClass('message');
        messageText.addClass('messageText');

        messageText.html("Cart is empty");

        message.append(messageText);

        return cartBlock.append(message);
    }

    cart.getData().forEach((item, index) => {
        const img = `${item.author.split(' ').join('-')}_${item.name.split(' ').join('-')}`;

        setItem(cartBlock, item, index, img);
    })

    setEvent();
}

function getPrices() {
    const arrayPrices = []
    cart.getData().forEach((item) => {
        arrayPrices.push(parseFloat(item.price));
    });

    return arrayPrices;
}

function setCardValues() {
    const arrayPrices = getPrices();

    const price = arrayPrices.reduce((acc, item) => acc + item, 0).toFixed(2);
    const discount = 0.0;
    const totalPrice = price - discount;

    $('.card__total-gross .card__price').html(`$${price}`);
    $('.card__discount .card__price').html(`-$${discount}`);
    $('.card__total .card__price').html(`$${totalPrice}`);
}

function checkCount() {
    if(cart.getSize() === 0) {
        return $('.count').addClass('hide');
    }

    return $('.count').removeClass('hide');
}

function setCount(size) {
    $('.count').html(size);
}

$('#nav-toggle').on('click', function() {
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
});

function setValuesToModal() {
    const [count, price] = getValuesToModal();

    $("#modal__count").html(`Total items: ${count}`);
    $("#modal__price").html(`Total items: ${price}$`);
}

function getValuesToModal() {
    const arrayPrices = getPrices();
    const price = arrayPrices.reduce((acc, item) => acc + item, 0).toFixed(2);
    return [cart.getSize(), price];
}

function openModal() {
    $(".modal")
        .css("display", "flex")
        .hide()
        .fadeIn();
    $(".close__btn").on('click', function() {
        $(".modal").fadeOut();
    })

    $(".modal").on('click', function(event) {
        if ($(event.target).closest('.modal__inner').length === 0) {
            $(this).fadeOut();
        }
    })

    setValuesToModal();
}

$("#buy-btn").on('click', function(event) {
    event.preventDefault();
    openModal();
});

$('[data-scroll]').on('click', function(event) {
    event.preventDefault();

    const idScroll = $(this).data('scroll');
    const blockOffset = $(`#${idScroll}`).offset().top;

    $("html, body").animate({
        scrollTop: blockOffset
    }, 500);
});

render();
