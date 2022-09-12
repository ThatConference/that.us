import { debug } from '$utils/config';
import { useMachine } from '$utils/useMachine';

import create from './machine';

const claimTicketMachine = new useMachine(create(), {
	devTools: debug.xstate
});

export default claimTicketMachine;
