// 1st approach
// (function() {
//   const keys = document.querySelectorAll('div.key');

//   keys.forEach(function (key) {
//     key.addEventListener('click', handleClick);
//     key.addEventListener('transitionend', removeTransition);
//   });

//   document.addEventListener('keydown', handleKeyPress);

//   function playSound (code) {
//     const audio = document.querySelector(`audio[data-key='${code}']`);
//     const key = document.querySelector(`div[data-key='${code}']`);
//     const drum = document.querySelector(`g[data-key='${code}']`);

//     if (!audio) return;
//     if (!key) return;
//     if (!drum) return;

//     audio.currentTime = 0;
//     audio.play();
//     key.classList.add('playing');
//     drum.classList.add('animation');
//   }

//   function handleClick(e) {
//     let code;
//     if (this === e.target) {
//       code = this.getAttribute('data-key');
//     }
//     else {
//       code = e.target.parentElement.getAttribute('data-key');
//     }
//     playSound(code);
//   }

//   function handleKeyPress(e) {
//     let code = e.keyCode;
//     playSound(code);
//   }

//   function removeTransition(e) {
//     this.className = 'key';
//   }
// }());

// 2nd approach
(function drum(window) {
  function oneTimeEventHandlerOnToggle(classAttribute) {
    let element = this;
    return function addHandler(eventName) {
      element.classList.add(classAttribute);
      element.addEventListener(eventName, function removeHandler(event) {
        event.currentTarget.classList.remove(classAttribute);
        event.currentTarget.removeEventListener(event.type, removeHandler);
      });
    };
  }

  function syncTheDrum(code) {
    const audio = document.querySelector(`audio[data-key='${code}']`);
    const key = document.querySelector(`div[data-key='${code}']`);
    const drum = document.querySelector(`g[data-key='${code}']`);

    if (!key) return;
    if (!audio) return;
    if (!drum) return;

    audio.currentTime = 0;
    audio.play();

    oneTimeEventHandlerOnToggle.call(key, 'playing')('transitionend');
    oneTimeEventHandlerOnToggle.call(drum, 'animation')('animationend');
  }

  function handleClick(e) {
    let code;
    if (e.srcElement.localName === 'kbd' || e.srcElement.localName === 'span') {
      code = e.srcElement.parentElement.getAttribute('data-key');
    }
    else {
      code = e.srcElement.getAttribute('data-key');
    }
    syncTheDrum(code);
  }

  function handleKeyPress(e) {
    let code = e.keyCode;
    syncTheDrum(code);
  }

  window.addEventListener('keydown', handleKeyPress);
  window.addEventListener('click', handleClick);
})(window);
