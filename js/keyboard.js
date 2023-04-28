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
        if (e.key.ru && e.key.en && e.shift) {
          key.dataset.ru = e.key.ru;
          key.dataset.en = e.key.en;
          key.dataset.ruShift = e.shift.ru;
          key.dataset.enShift = e.shift.en;
        } else {
          key.dataset.noType = 'true';
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
        if (e.dataset[lang]) e.innerHTML = e.dataset[lang].toUpperCase();
      } else if (e.dataset[lang]) e.innerHTML = e.dataset[lang].toLowerCase();
    }
  }

  changeLang(event) {
    if (this.lang === 'en') {
      this.lang = 'ru';
    } else {
      this.lang = 'en';
    }
    localStorage.setItem('lang', this.lang);
    this.upper(event);
  }

  upper() {
    const { lang } = this;
    const keys = document.querySelectorAll('.key');
    this.wasShift = true;
    for (let i = 0; i < keys.length; i += 1) {
      const e = keys[i];
      if (lang === 'en') {
        if (e.dataset.enShift) e.innerHTML = e.dataset.enShift;
      } else if (e.dataset.ruShift) e.innerHTML = e.dataset.ruShift;
    }
  }

  shiftDrop() {
    const { lang } = this;
    const keys = document.querySelectorAll('.key');
    this.wasShift = false;
    for (let i = 0; i < keys.length; i += 1) {
      const e = keys[i];
      if (lang === 'en') {
        if (e.dataset.en) e.innerHTML = e.dataset.en;
      } else if (e.dataset.ru) e.innerHTML = e.dataset.ru;
    }
  }
}

const keyboard = new Keyboard();

export default keyboard;
