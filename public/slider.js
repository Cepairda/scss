var DELAY = 1000;
var CURRENT_SLIDE = 1;
var ANIMATION_DELAY = 7000;

var slider = document.querySelector('.slider');

slider.addEventListener('click', function (event) {
    if (!event.target.classList.contains('slider__icon')) {
        return;
    }

    CURRENT_SLIDE = +event.target.getAttribute('data-id');
    showSliderId(CURRENT_SLIDE);
});

function showSliderId(id) {
    var current = slider.querySelector('[data-slide="' + id + '"]');

    slider.querySelectorAll('.slider__slide').forEach(function (slide) {
        slide.style.opacity = 0;
        
        setTimeout(function () {
            slide.classList.add('hide');
        }, DELAY);
    });

    setTimeout(function () {
        current.classList.remove('hide');
        current.style.opacity = 1;
    }, 5000);
}

function initSlider() {
    setInterval(function () {
        showSliderId(getSliderId())
    }, ANIMATION_DELAY);
}

function getSliderId() {
    CURRENT_SLIDE++;
    CURRENT_SLIDE = CURRENT_SLIDE % 4 === 0 ? 1 : CURRENT_SLIDE;

    return CURRENT_SLIDE;
}

initSlider();