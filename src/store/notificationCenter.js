import { writable } from 'svelte/store';

export const hasNotifications = writable(false);
export const messages = writable([]);

// todo.. is this a memory leak?
const unsubscribe = messages.subscribe(value => {
  if (value.length > 0) {
    hasNotifications.set(true);
  } else {
    hasNotifications.set(false);
  }
});
