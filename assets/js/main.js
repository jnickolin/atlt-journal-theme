import Typewriter from 'typewriter-effect/dist/core';

(function () {
    pagination(false);
})();

const el = document.getElementById('typewriter-target');
if (el) {
    new Typewriter(el, {
        loop: true,
        delay: 50,
        deleteSpeed: 40,

    })
    .typeString(el.getAttribute('data-title'))
    .pauseFor(1500) // pause after typing, before deleting
    .deleteAll()
    .pauseFor(500) // pause after deleting, before retyping
    .start();
}
