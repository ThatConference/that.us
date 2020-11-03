<script>
  export let members = [];

  import { Link } from 'yrv';

  let imageCrop = '?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
</script>

<div class="bg-that-offWhite bg-opacity-50">
  <div class="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
      <div class="space-y-5 sm:space-y-4">
        <h2
          class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl"
        >
          Meet our team
        </h2>
        <p class="text-xl leading-7 text-gray-500">
          Here are just some of the great folks you can find chat with around
          THAT.
        </p>
      </div>
      <div class="lg:col-span-2">
        <ul
          class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
        >
          {#each members as member}
            <li class="transform hover:scale-110 cursor-pointer">
              <Link href="/members/{member.profileSlug}">
                <div class="flex items-center space-x-4 lg:space-x-6">
                  <img
                    class="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                    src="{member.profileImage}{imageCrop}"
                    alt="{`${member.firstName} ${member.lastName}`}"
                  />
                  <div class="font-medium text-lg leading-6 space-y-1">
                    <h4>{`${member.firstName} ${member.lastName}`}</h4>
                    <p class="text-that-orange">{member.jobTitle}</p>
                  </div>
                </div>
              </Link>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
