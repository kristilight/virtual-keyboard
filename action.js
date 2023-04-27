import keyboard from './Keyboard.js';


document.addEventListener('keydown', (event) => {
    if (event.code === 'CapsLock') keyboard.capsLock(event);
    if (event.altKey && event.ctrlKey) keyboard.changeLang(event);
    if (event.shiftKey) keyboard.upper(event);
});

document.addEventListener('keyup', (event) => {
    if (event.shiftKey) {
        keyboard.removeShift(event);
        keyboard.upper(event);
    }

});
