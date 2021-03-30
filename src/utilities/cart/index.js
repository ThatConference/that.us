import { debug } from '../../config';
import { useMachine } from '../useMachine';
import create from './cartMachine';

const cartInstance = useMachine(create(), {
  devTools: debug.xstate,
});

export default cartInstance;
