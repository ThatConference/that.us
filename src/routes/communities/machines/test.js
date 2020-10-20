import { Machine } from 'xstate';

export const machine = Machine(
  {
    id: 'machine',
    initial: 'inactive',
    context: {
      count: 0,
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: 'active',
            actions: 'log',
          },
        },
      },
      active: {
        on: { TOGGLE: 'inactive' },
      },
    },
  },
  {
    actions: {
      log: (context, event) => console.error({ context, event }),
    },
  },
);
