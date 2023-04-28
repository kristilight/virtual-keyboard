import keyboard from './keyboard.js';
import createElement from './create.js';

const { body } = document;

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
  if (event.code === 'CapsLock') {
    keyboard.capsLock(event);
  }
  if (event.altKey && event.ctrlKey) keyboard.changeLang(event);
  if (event.shiftKey) keyboard.shiftUpper(event);

  const keys = document.querySelectorAll('.key');
  for (let i = 0; i < keys.length; i += 1) {
    const e = keys[i];
    if (event.code === e.dataset.code) {
      event.preventDefault();
    }
    if ((event.code === e.dataset.code && e.dataset.ru && e.dataset.en)
        || (event.code === e.dataset.code && e.dataset.arrow)) {
      textField.value += e.textContent;
    }
  }

  const pressKey = document.querySelector(`[data-code=${event.code}]`);
  if (pressKey && event.code !== 'CapsLock') {
    pressKey.classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  if (keyboard.wasShift) {
    keyboard.shiftDrop(event);
  }
  const pressKey = document.querySelector(`[data-code=${event.code}]`);
  if (pressKey && event.code !== 'CapsLock') {
    pressKey.classList.remove('active');
  }
});

function virtualKeyClick() {
  const keys = document.querySelectorAll('.key');

  const pressCaps = document.querySelector('[data-code=CapsLock]');
  pressCaps.addEventListener('click', () => {
    keyboard.capsLock();
  });

  for (let i = 0; i < keys.length; i += 1) {
    const e = keys[i];
    if (e.dataset.ru || e.dataset.arrow) {
      e.addEventListener('click', () => {
        textField.value += e.textContent;
        keyboard.shiftDrop();
      });
    } else if (e.dataset.code === 'Backspace' || e.dataset.code === 'Delete') {
      e.addEventListener('click', () => {
        textField.value = textField.value.slice(0, -1);
      });
    } else if (e.dataset.code === 'Tab') {
      e.addEventListener('click', () => {
        textField.value = '    ';
      });
    } else if (e.dataset.code === 'Space') {
      e.addEventListener('click', () => {
        textField.value = ' ';
      });
    } else if (e.dataset.code === 'Enter') {
      e.addEventListener('click', () => {
        textField.value = '\n';
      });
    } else if (e.dataset.code === 'ShiftLeft' || e.dataset.code === 'ShiftRight') {
      e.addEventListener('click', () => (!keyboard.wasShift ? keyboard.shiftUpper() : keyboard.shiftDrop()));
    }
  }
}

setTimeout(virtualKeyClick, 200);
