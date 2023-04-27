import keyboard from './Keyboard.js';
import createElement from './create.js';

const body = document.body;

const createHeader = () => {
    const header = createElement('div', '', 'header');
    header.append(createElement('h1', 'Virtual Keyboard', 'header__title'));
    header.append(createElement('p', 'Change Language: Ctrl + Alt', 'subhead__text'));
    header.append(createElement('p', 'Made for: Windows', 'subhead__text'));
    body.append(header);
};

createHeader();

const textField = createElement('textarea', '', 'text-field');
body.append(textField);
body.append(keyboard.generateKeyboard());


document.addEventListener('keydown', (event) => {
    textField.focus();
    if (event.code === 'CapsLock') keyboard.capsLock(event);
    if (event.altKey && event.ctrlKey) keyboard.changeLang(event);
    if (event.shiftKey) {
        keyboard.upper(event);
    }
    const pressBtn = document.querySelector(`[data-code=${event.code}]`);
    if (pressBtn) {
        pressBtn.classList.add('active')
    }
});

document.addEventListener('keyup', (event) => {

    if (keyboard.wasShift) {
        keyboard.drop(event);
    }

    const pressBtn = document.querySelector(`[data-code=${event.code}]`);
    if (pressBtn) {
        pressBtn.classList.remove('active')
    }
});

function keyboardClick() {


    const keys = document.querySelectorAll('.key');
    for (let e of keys) {
        e.addEventListener('click', () => {
            if (e.dataset.ru) textField.value += e.textContent;
            else if (e.dataset.code === 'Backspace') textField.value = textField.value.slice(0, -1);
            else if (e.dataset.code === 'Tab') textField.value += '    ';
            else if (e.dataset.code === 'Enter') textField.value += '\n';
        })
    }
}

setTimeout(keyboardClick, 1000);