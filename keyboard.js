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
                if (e.key.ru && e.key.en) {
                    key.dataset.ru = e.key.ru;
                    key.dataset.en = e.key.en;
                }
                else if (e.shift) {
                    key.dataset.ruShift = e.shift.ru;
                    key.dataset.enShift = e.shift.en;
                }
            });
            keyboard.append(row);
        }
        return keyboard;
    }


}

const keyboard = new Keyboard();

const createHeader = () => {
    const header = createDomNode('div', '', 'header');
    header.append(createDomNode('h1', 'Virtual Keyboard', 'header__title'));
    header.append(createDomNode('p', 'Change Language: Shift + Alt', 'subhead__text'));
    header.append(createDomNode('p', 'Made for: Windows', 'subhead__text'));
    body.append(header);
};


createHeader();
body.append(textField);
body.append(keyboard.generateKeyboard());


export default keyboard;