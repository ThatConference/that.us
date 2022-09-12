import { debug } from '$utils/config';
// import { useMachine } from '@xstate/svelte';
import { useMachine } from '$utils/useMachine';

import create from './cartMachine';

const cartMachine = new useMachine(create(), {
	devTools: debug.xstate
});

export default cartMachine;
