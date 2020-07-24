export const tagEvent = (event, category, label) => {
  window.gtag('event', event, {
    event_category: category,
    event_label: label,
  });
};
