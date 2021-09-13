import { debug } from '$utils/config';
import { useMachine } from '$utils/useMachine';

import create from './cartMachine';

const cartInstance = useMachine(create(), {
	devTools: debug.xstate
});

export default cartInstance;
