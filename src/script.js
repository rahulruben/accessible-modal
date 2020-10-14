const btns = document.querySelectorAll('button#modal-btn'),
      modals = document.querySelectorAll('.modal'),
      focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const close = (modalId) => {
  const modal = document.querySelector(`#${modalId}`);
  modal && modal.classList.remove('open');
}

const setModalVisiblity = (modal, visiblity) => {
  modal.setAttribute('aria-hidden', !visiblity);
  !visiblity ? modal.setAttribute('hidden', !visiblity) : modal.removeAttribute('hidden');
}

const isFocusedElementInViewport = (modalBody, _ele) => {
  return _ele.offsetTop < modalBody.clientHeight;
}

const getFirstItemFocusable = (modalBody) => {
  return modalBody.querySelector(focusableElements);
}

const getFirstElement = (modal, modalBody) => {
  const title = modal.querySelector(`#${modal.getAttribute('aria-labelledby')}`);
  if (title) {
    title.setAttribute('tabindex', 0);
    title.focus();
    return title;
  } else {
    const firstFocusable = getFirstItemFocusable(modalBody);
    if (firstFocusable && isFocusedElementInViewport(modalBody, firstFocusable)) {
      firstFocusable.focus();
      return firstFocusable;
    } else {
      const firstLine = modalBody.firstElementChild;
      firstLine.setAttribute('tabindex', 0);
      firstLine.focus();
      return firstLine;
    }
  }
}

const getLastElement = (modalBody) => {
  return modalBody.lastElementChild;
}

const openModal = (e) => {
  const btn = e.target;
  const modal = document.querySelector(`#${btn.getAttribute('target')}`);
  if (modal) {
    setModalVisiblity(modal, true);
    modal.classList.add('open');
    const modalBody = modal.querySelector(`.modal__body`),
          firstElement = getFirstElement(modal, modalBody),
          lastElement = getLastElement(modalBody),
          closeBtn = modal.querySelector('.close');
    modal.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'Tab':
            if (e.target === lastElement && !e.shiftKey) {
              e.preventDefault();
              firstElement.focus();
            }
            if (e.target === firstElement && e.shiftKey) {
              e.preventDefault();
              lastElement.focus();
            } 
        }
    });
    closeBtn.addEventListener('click', _ => {
      modal.classList.remove('open');
      setModalVisiblity(modal, false);
      btn.focus();
    });
  }
}

[...btns].map(btn => {
  btn.addEventListener('click', openModal);
});

[...modals].map(modal => setModalVisiblity(modal, false));