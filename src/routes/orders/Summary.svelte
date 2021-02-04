<script>
  import { useMachine } from 'xstate-svelte';

  import { debug } from '../../config';

  import Layout from './components/_Layout.svelte';
  import Steps from './components/_Steps.svelte';
  import Cart from './components/_Cart.svelte';

  import summaryMachine from './machines/summary';
  import createStepsMachine from './machines/steps';

  const { state } = useMachine(summaryMachine(createStepsMachine()), {
    devTools: debug.xstate,
  });
</script>

{#if ['waiting', 'ready'].some($state.matches)}
  <Layout>
    <div class="lg:flex lg:justify-between">
      <div>
        <h2
          class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
        >
          Order Summary
        </h2>

        <div class="mt-6">
          <Steps stateMachine="{$state.context.stepsMachine}" />
        </div>
      </div>
    </div>

    <div class="my-12 lg:flex lg:justify-between">
      <Cart />
    </div>
  </Layout>
{/if}
