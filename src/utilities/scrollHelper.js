import dayjs from "dayjs";

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
    case 'object':
      element = elementOrSelector;
      break;
  }

  if (!element) {
    return;
  }

  try {
    element.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.warn(error); // just warn on this, no need to display error
  }
}

export const getTimeStampId = date => dayjs(date).format('a-hh-mm');