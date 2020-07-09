import { initClient } from '@urql/svelte';

const client = initClient({ url: 'http://localhost:9090/graphql' });

export { client };
