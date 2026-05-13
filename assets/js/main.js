import Typewriter from 'typewriter-effect/dist/core';

(function () {
    pagination(false);
})();

const el = document.getElementById('typewriter-target');
if (el) {
    const title = el.getAttribute('data-title');

    // Reserve full-text height before animating to prevent layout shift
    el.textContent = title;
    el.style.minHeight = el.offsetHeight + 'px';
    el.textContent = '';

    new Typewriter(el, {
        loop: true,
        delay: 50,
        deleteSpeed: 40,
    })
    .typeString(title)
    .pauseFor(1500)
    .deleteAll()
    .pauseFor(500)
    .start();
}
