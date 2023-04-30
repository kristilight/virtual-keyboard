import keyData from './key-data.js';
import createElement from './create.js';

class Keyboard {
  constructor() {
    this.lang = 'en';
    this.caps = 'off';
  }

  saveLang() {
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else {
      localStorage.setItem('lang', this.lang);
    }
  }

  // Add to keyboard
  generateKeyboard() {
    this.saveLang();
    const keyboard = createElement('div', '', 'keyboard');
    for (let i = 0; i < keyData.length; i += 1) {
      const row = createElement('div', '', 'keyboard__row');
      keyData[i].forEach((e) => {
        const keyText = (e.key.ru && e.key.en) ? e.key[this.lang] : e.key;
        const key = createElement('button', keyText, 'key');
        if (e.class) key.classList.add(e.class);
        row.append(key);
        key.dataset.code = e.code;
        if (e.key.ru && e.key.en) {
          key.dataset.ru = e.key.ru;
          key.dataset.en = e.key.en;
        }
        if (e.shift) {
          key.dataset.ruShift = e.shift.ru;
          key.dataset.enShift = e.shift.en;
        }
        if (e.arrow) {
          key.dataset.arrow = e.arrow;
        }
      });
      keyboard.append(row);
    }
    return keyboard;
  }

  capsLock() {
    const { lang } = this;
    const keys = document.querySelectorAll('.key');

    if (this.caps === 'on') {
      this.caps = 'off';
    } else {
      this.caps = 'on';
    }
    for (let i = 0; i < keys.length; i += 1) {
      const e = keys[i];
      if (this.caps === 'on') {
        if (e.dataset.code === 'CapsLock') e.classList.add('active');
        if (e.dataset[lang]) {
          e.innerHTML = e.dataset[lang].toUpperCase();
        }
      } else {
        if (e.dataset.code === 'CapsLock') e.classList.remove('active');
        if (e.dataset[lang]) {
          e.innerHTML = e.dataset[lang].toLowerCase();
        }
      }
    }
  }

  changeLang() {
    if (this.lang === 'en') {
      this.lang = 'ru';
    } else {
      this.lang = 'en';
    }
    localStorage.setItem('lang', this.lang);
    const keys = document.querySelectorAll('.key');
    for (let i = 0; i < keys.length; i += 1) {
      const e = keys[i];
      if (e.dataset[this.lang] && this.caps === 'off') {
        e.innerHTML = e.dataset[this.lang];
      } else if (e.dataset[this.lang] && this.caps === 'on') {
        e.innerHTML = e.dataset[this.lang].toUpperCase();
      }
    }
  }

  shiftUpper() {
    const { lang } = this;
    const keys = document.querySelectorAll('.key');
    this.wasShift = true;

    for (let i = 0; i < keys.length; i += 1) {
      const e = keys[i];
      if (e.dataset[`${lang}Shift`] && this.caps === 'off') {
        e.innerHTML = e.dataset[`${lang}Shift`];
      } else if (e.dataset[`${lang}Shift`] && this.caps === 'on') {
        e.innerHTML = e.dataset[`${lang}Shift`].toLowerCase();
      }
    }
  }

  shiftDrop() {
    const { lang } = this;
    const keys = document.querySelectorAll('.key');
    this.wasShift = false;
    for (let i = 0; i < keys.length; i += 1) {
      const e = keys[i];
      if (e.dataset.code === 'ShiftLeft' || e.dataset.code === 'ShiftRight') e.classList.remove('active');
      if (e.dataset[lang] && this.caps === 'off') {
        e.innerHTML = e.dataset[lang];
      } else if (e.dataset[`${lang}Shift`] && this.caps === 'on') {
        e.innerHTML = e.dataset[lang].toUpperCase();
      }
    }
  }
}

const keyboard = new Keyboard();

export default keyboard;
