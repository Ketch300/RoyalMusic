import { cart } from './cart.js';

$(function() {
    let countDisplaying = 6;
    let stepDisplaying = 6;
    unDisplayingProducts();
    disableBtn();
    setCount(cart.getSize());
    checkCount();


    $('.show-more').on('click', () => {
        $('.products__item').each((index, item) => {
            if (index >= countDisplaying && index < countDisplaying + stepDisplaying) {
                $(item).fadeIn();
            }
        })
        countDisplaying += stepDisplaying;

        if ($(".products__item").length <= countDisplaying) {
            $('.show-more').css('display', 'none');
        }
    })

    function unDisplayingProducts() {
        $(".products__item").each((index, item) => {
            if (index >= countDisplaying) {
                $(item).css('display', 'none');
            }
        });
    }

    $('.btn__buy').on('click', function() {
        const index = $(this).parents('.products__item').data('index');
        const name = $(this).parents('.products__item').data('name');
        const author = $(this).parents('.products__item').data('author');
        const price = $(this).parents('.products__item').data('price');

        let product = {
            name,
            author,
            price,
        }

        cart.add(index, product);
        $(this).prop('disabled', true);
        setCount(cart.getSize());
        checkCount();
    });

    function checkCount() {
        if(cart.getSize() === 0) {
            return $('.count').addClass('hide');
        }

        return $('.count').removeClass('hide');
    }

    function setCount(size) {
        $('.count').html(size);
    }

    function disableBtn() {
        $('.products__item').each(function() {
            if (cart.getData().has($(this).data('index'))) {
                $(this).find('.btn__buy').prop('disabled', true);
            }
        });
    }

    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();

        const idScroll = $(this).data('scroll');
        const blockOffset = $(`#${idScroll}`).offset().top;

        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);
    });

    let currentDemo = null;
    let demoAudio = null;

    $('.btn').on('click', function() {
        const author = $(this).parents('.products__item').
                        data('author').split(' ').join('-');
        const name = $(this).parents('.products__item').
                        data('name').split(' ').join('-');

        if (demoAudio) {
            demoAudio.pause();
            $(currentDemo).find('img').attr('src', 'assets/img/play.png');
            if (currentDemo !== this) {
                demoAudio = null;
                [demoAudio, currentDemo] = playAduio(this, author, name);
                return;
            }
            currentDemo = null;
            return;
        }

        [demoAudio, currentDemo] = playAduio(this, author, name);
    })

    function playAduio(btn, author, name) {
        let demoAudio = new Audio(`/assets/music/${author}_${name}.mp3`);
        demoAudio.play();

        let currentDemo = btn;
        $(currentDemo).find('img').attr('src', 'assets/img/pause.png');
        return [demoAudio, currentDemo];
    }

    let scrollOffset = $(window).scrollTop();
    let productHeight = $('.products').innerHeight();
    checkScroll(scrollOffset);

    $(window).on('scroll', function() {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= productHeight) {
            $('.arrow-up').fadeIn().removeClass('hide');
        } else {
            $('.arrow-up').fadeOut().addClass('hide');
        }
    }

    $('.arrow-up').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        });
    });

    $('#nav-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
    });
});
