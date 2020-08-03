import dayjs from 'dayjs';

/**
 * Scrolls the given element into view
 * @param {string | HTMLElement} elementOrSelector
 */
export const scrollIntoView = (elementOrSelector) => {
  if (!elementOrSelector) {
    return;
  }

  let element = null;
  switch (typeof elementOrSelector) {
    case 'string':
      element = document.querySelector(elementOrSelector);
      break;
    default:
      element = elementOrSelector;
      break;
  }

  if (!element) {
    return;
  }

  if (typeof element.scrollIntoView === 'function') {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const getTimeStampId = (date) => dayjs(date).format('a-hh-mm');
