<script>
  import { getClient } from '@urql/svelte';

  import { Circle2 } from 'svelte-loading-spinners';
  import WideListItem from '../elements/WideListItem.svelte';
  import Action from '../elements/Action.svelte';

  const QUERY_SESSIONS = `
      query getSessions {
        sessions {
          id
          title
          shortDescription
          startingDateTime
          host {
            id
            firstName
            lastName
            profileImage
          }
          attendees {
            id
            firstName
            lastName
            profileImage
          }
        }
      }
    `;

  const executeQuery = getClient()
    .query(QUERY_SESSIONS)
    .toPromise();
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-md">
  {#await executeQuery}
    <div class="flex items-center justify-center">
      <Circle2 size="60" color="#FF3E00" unit="px" />
    </div>
  {:then result}
    {#if !result.data.sessions}
      <Action />
    {:else}
      <ul>
        {#each result.data.sessions as session}
          <li>
            <WideListItem {...session} />
          </li>
        {/each}
      </ul>
    {/if}
  {:catch error}
    <p>Error: {error}</p>
  {/await}

</div>
