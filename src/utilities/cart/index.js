import { writable } from 'svelte/store';

import createMachine from './cartMachine';

export const cart = writable();

(function init() {
  cart.set(createMachine());
})();
