import keyData from './key-data.js';

const createDomNode = (element, innerHTML, ...classes) => {
    const node = document.createElement(element);
    node.classList.add(...classes);
    node.innerHTML = innerHTML;
    return node;
};

const body = document.body;
const textField = createDomNode('textarea', '', 'text-field');

class Keyboard {
    constructor() {
        this.lang = 'en';
        this.caps = 'off';
        this.shift = false;
    }

    generateKeyboard() {
        const keyboard = createDomNode('div', '', 'keyboard');
        for (let i = 0; i < keyData.length; i++) {
            const row = createDomNode('div', '', 'keyboard__row');
            keyData[i].forEach((e) => {
                const keyText = (e.key.ru && e.key.en) ? e.key[this.lang] : e.key;
                const key = createDomNode('button', keyText, 'key');
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

    capsLock(event) {
        if (this.caps === 'on') {
            this.caps = 'off';
        } else {
            this.caps = 'on';
        }
        this.upper(event);
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

    upper(event) {
        const {lang} = this;
        const keys = document.querySelectorAll('.key');
        if (event.shiftKey || this.shift) {
            if (lang === 'en') {
                keys.forEach((e) => {
                    if (e.dataset.enShift) e.innerHTML = e.dataset.enShift;
                });
            } else {
                keys.forEach((e) => {
                    if (e.dataset.ruShift) e.innerHTML = e.dataset.ruShift;
                });
            }
        } else {
            keys.forEach((e) => {
                if (e.dataset[lang]) e.innerHTML = e.dataset[lang];
            });
        }
    }

    removeShift(event) {
        if (this.shift) {
            this.shift = !this.shift;
            this.upper(event);
        }
    }

}

const keyboard = new Keyboard();

const createHeader = () => {
    const header = createDomNode('div', '', 'header');
    header.append(createDomNode('h1', 'Virtual Keyboard', 'header__title'));
    header.append(createDomNode('p', 'Change Language: Ctrl + Alt', 'subhead__text'));
    header.append(createDomNode('p', 'Made for: Windows', 'subhead__text'));
    body.append(header);
};


createHeader();
body.append(textField);
body.append(keyboard.generateKeyboard());


export default keyboard;