import { writable } from 'svelte/store';
import { interpret } from 'xstate';

export function useMachine(machine, options) {
	const stateStore = writable(null); // this should really be readable
	const service = interpret(machine, options);

	stateStore.set(service.initialState);

	service.onTransition((newState) => {
		stateStore.set(newState);
	});

	service.start(); // when do we stop it?

	return {
		state: stateStore,
		send: service.send,
		service
	};
}
