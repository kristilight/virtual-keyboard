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

function keyOn(code) {
  let cursorStart = textField.selectionStart;
  const cursorEnd = textField.selectionEnd;
  let textBeforeCursor = textField.value.slice(0, cursorStart);
  let textAfterCursor = textField.value.slice(cursorEnd);

  if (code === 'Backspace') {
    if (cursorStart === cursorEnd) {
      textBeforeCursor = textBeforeCursor.slice(0, -1);
      const offset = (cursorStart > 0) ? 2 : 1;
      cursorStart -= offset;
    } else cursorStart -= 1;
    textField.value = textBeforeCursor + textAfterCursor;
    textField.setSelectionRange(cursorStart + 1, cursorStart + 1);
  }

  if (code === 'Enter') {
    textField.value = `${textBeforeCursor}\n${textAfterCursor}`;
    textField.setSelectionRange(cursorStart + 1, cursorStart + 1);
  }

  if (code === 'Tab') {
    textField.value = `${textBeforeCursor}    ${textAfterCursor}`;
    textField.setSelectionRange(cursorStart + 4, cursorStart + 4);
  }

  if (code === 'Delete') {
    if (cursorStart === cursorEnd) {
      textAfterCursor = textAfterCursor.slice(1);
    }
    cursorStart -= 1;
    textField.value = textBeforeCursor + textAfterCursor;
    textField.setSelectionRange(cursorStart + 1, cursorStart + 1);
  }

  const keys = document.querySelectorAll('.key');
  for (let i = 0; i < keys.length; i += 1) {
    const e = keys[i];
    if ((code === e.dataset.code && e.dataset.ru)
            || (code === e.dataset.code && e.dataset.arrow)) {
      textField.value = textBeforeCursor + e.textContent + textAfterCursor;
      textField.setSelectionRange(cursorStart + 1, cursorStart + 1);
    }
  }
}

document.addEventListener('keydown', (event) => {
  textField.focus();

  if (event.code === 'CapsLock') {
    event.preventDefault();
    keyboard.capsLock(event);
  }
  if (event.code === 'Tab') {
    event.preventDefault();
    keyOn(event.code);
  }
  if (event.altKey && event.ctrlKey) keyboard.changeLang(event);
  if (event.shiftKey) {
    keyboard.shiftUpper(event);
  }

  const keys = document.querySelectorAll('.key');
  for (let i = 0; i < keys.length; i += 1) {
    const e = keys[i];

    if ((event.code === e.dataset.code && e.dataset.ru && e.dataset.en)
            || (event.code === e.dataset.code && e.dataset.arrow)) {
      event.preventDefault();
      keyOn(event.code);
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
        textField.focus();
        keyOn(e.dataset.code);
        keyboard.shiftDrop();
      });
    } else if (e.dataset.code === 'Backspace' || e.dataset.code === 'Delete' || e.dataset.code === 'Tab'
            || e.dataset.code === 'Space' || e.dataset.code === 'Enter') {
      e.addEventListener('click', () => {
        textField.focus();
        keyOn(e.dataset.code);
        keyboard.shiftDrop();
      });
    } else if (e.dataset.code === 'ShiftLeft' || e.dataset.code === 'ShiftRight') {
      e.addEventListener('click', () => {
        e.classList.add('active');
        if (!keyboard.wasShift) {
          keyboard.shiftUpper();
        } else keyboard.shiftDrop();
      });
    } else if (e.dataset.code) {
      e.addEventListener('click', () => {
        keyboard.shiftDrop();
      });
    }
  }
}

setTimeout(virtualKeyClick, 200);
