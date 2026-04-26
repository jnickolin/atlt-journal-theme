import Typewriter from 'typewriter-effect/dist/core';

(function () {
    pagination(false);
})();

const el = document.getElementById('typewriter-target');
if (el) {
    new Typewriter(el, {
        strings: [el.getAttribute('data-title')],
        autoStart: true,
        loop: false
    });
}
