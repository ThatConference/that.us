<script>
  import { getClient } from '@urql/svelte';

  import { login } from '../../utilities/security';
  import MemberCard from '../../components/members/MemberCard.svelte';
  import membersApi from '../../dataSources/api.that.tech/members/queries';

  const { queryMembers } = membersApi(getClient());
</script>

<section class="relative py-12 lg:py-16 z-0">
  <div class="hidden lg:block lg:absolute lg:inset-0 overflow-x-hidden">
    <svg
      class="absolute top-0 right-1/2 transform -translate-x-64 translate-y-64"
      width="640"
      height="784"
      fill="none"
      viewBox="0 0 640 784"
    >
      <defs>
        <pattern
          id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
          x="118"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-thatBlue-100"
            fill="currentColor"
          ></rect>
        </pattern>
      </defs>
      <rect
        y="72"
        width="640"
        height="640"
        class="text-thatBlue-100 opacity-25"
        fill="currentColor"
      ></rect>
      <rect
        x="118"
        width="404"
        height="784"
        fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
      ></rect>
    </svg>
  </div>

  <div class="max-w-screen-xl mx-auto px-8">
    <div class="relative py-20 text-left">
      <h3
        class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900
        sm:text-4xl sm:leading-10"
      >
        Welcome to THAT family!
      </h3>
      <p class="mt-4 text-xl leading-7 text-gray-500">
        Please join us in welcoming our newest members to THAT. Not a member
        yet?
        <button
          class="text-thatOrange-400 hover:text-thatOrange-500"
          on:click="{() => login(document.location.pathname, true)}"
        >
          Join today!
        </button>
      </p>
    </div>

    {#await queryMembers(10) then { members }}
      <ul
        class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5"
      >
        {#each members as m (m.id)}
          <li class="col-span-1">
            <MemberCard {...m} />
          </li>
        {/each}
      </ul>
    {/await}
  </div>
</section>
