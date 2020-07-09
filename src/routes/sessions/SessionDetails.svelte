<script>
  import { fade } from 'svelte/transition';
  import Icon from 'svelte-awesome';
  import { Link } from 'yrv';
  import { heart, signIn } from 'svelte-awesome/icons';

  import { LinkButton } from '../../elements';

  export let title;
  export let shortDescription;
  export let speakers;
  export let sessionId;
  export let id;
  export let tags;
  export let __typename;

  let host = speakers[0];

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<div>
  <!--header-->
  <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <div
      class="-ml-4 -mt-4 flex justify-between items-center flex-wrap
      sm:flex-no-wrap"
    >

      <div class="ml-4 mt-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h-12 w-12 rounded-full"
              src="{`${host.profileImage}${imageCrop}`}"
              alt=""
            />
          </div>
          <div class="ml-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {`${host.firstName} ${host.lastName}`}
            </h3>
          </div>
        </div>
      </div>
      <div class="ml-4 mt-4 flex-shrink-0 flex">
        <span class="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            class="relative inline-flex items-center px-4 py-2 border
            border-gray-300 text-sm leading-5 font-medium rounded-md
            text-gray-700 bg-white hover:text-gray-500 focus:outline-none
            focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50
            active:text-gray-800"
          >
            <Icon data="{heart}" class="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            <span>Favorite</span>
          </button>
        </span>

        <span class="ml-3 inline-flex rounded-md shadow-sm">
          <a
            type="button"
            href="/join/{sessionId}"
            class="relative inline-flex items-center px-4 py-2 border
            border-gray-300 text-sm leading-5 font-medium rounded-md
            text-gray-700 bg-white hover:text-gray-500 focus:outline-none
            focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50
            active:text-gray-800"
          >

            <Icon data="{signIn}" class="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            <span>Join In</span>
          </a>
        </span>
      </div>
    </div>
  </div>

  <!-- body -->

  <div class="sm:text-center lg:text-left">
    <h2
      class="text-2xl sm:text-3xl md:text-4xl tracking-tight leading-10
      font-extrabold text-gray-900 sm:leading-none "
    >
      {title}
    </h2>
    <p
      class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5
      md:text-xl lg:mx-0"
    >
      {shortDescription}
    </p>
  </div>

  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
      <LinkButton href="/sessions" text="Return to Sessions" />
    </span>
  </div>
</div>
