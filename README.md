# Virtual keyboard

## Description

The Virtual Keyboard Project provides an interactive interface for text input, supporting both physical and virtual keyboard interactions. The structure of the code is designed to create a fluid user experience by combining dynamic DOM manipulation with event-driven input handling.

### Getting Started
**Deploy: [here](https://kristilight.github.io/virtual-keyboard/)**

## Code Overview:
1. Keyboard Initialization and Language Persistence:
- The keyboard's language setting is stored and persisted using localStorage, ensuring that the user's language choice is remembered across sessions.

2. Dynamic Keyboard Layout:
- The layout of the keyboard is dynamically generated based on the current language setting, pulling data from a predefined key configuration. Each key's content is determined by the active language and shift/caps lock state.

3. Caps Lock and Shift Logic:
- The caps lock functionality toggles between uppercase and lowercase letters, with visual feedback on the keyboard itself. The shift key modifies the characters dynamically, switching between default and shifted characters, depending on whether caps lock is active.

4. Language Switching:
- The keyboard supports switching between multiple languages (e.g., English and Russian). The language change is triggered by a key combination, and the displayed characters update accordingly, reflecting the selected language.
  
5. Interactive Keys:
- Both virtual and physical key presses are handled seamlessly, with event listeners updating the keyboard interface to reflect the correct state. This includes pressing special keys like CapsLock, Shift, Enter, and Backspace, which affect the input behavior in the text field.

6. State Management:
- The keyboard maintains state variables (e.g., caps and lang) to keep track of the current configuration. These states influence how the keyboard renders and responds to user input.
This structure ensures that the virtual keyboard behaves consistently and intuitively, providing an efficient input method for both virtual and physical key interactions.

