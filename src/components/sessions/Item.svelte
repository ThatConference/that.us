<script>
  import { Link } from 'yrv';

  import { Avatars, Image } from '../../elements';

  export let id;
  export let title;
  export let shortDescription;
  export let startTime;
  export let speakers;
  export let status;
  export let __typename;
  export let attendees = [];

  let host = speakers[0];

  console.log({ host });
</script>

<Link
  href="/sessions/{id}"
  class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition
  duration-150 ease-in-out"
>
  <div class="flex items-center px-4 py-4 sm:px-6">
    <div class="min-w-0 flex-1 flex items-center">

      <div class="flex-shrink-0">
        <Image
          class="h-12 w-12 rounded-full"
          src="{`${host.profileImage}?w=300&amp;h=500&amp;fit=crop&amp;crop=right`}"
          alt="{`${host.firstName} ${host.lastName}`}"
        />
      </div>

      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
        <div>
          <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
            {host.firstName} {host.lastName}
          </div>

          <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
            <span>
              Starts @
              <time datetime="{startTime}">{startTime}</time>
            </span>
          </div>
        </div>
        <div class="hidden md:block">
          <div>
            <div class="text-sm leading-5 text-gray-900">{title}</div>
            <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
              {shortDescription}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Avatars {host} {attendees} />
    </div>

    <div>
      <svg
        class="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0
          011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</Link>
