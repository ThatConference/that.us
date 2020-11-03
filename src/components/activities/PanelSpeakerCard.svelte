<script>
  export let speaker;

  import { Link } from 'yrv';
  import config from '../../config';

  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

  let userProfileImage = speaker.profileImage
    ? `${speaker.profileImage}${imageCrop}`
    : config.defaultProfileImage;
</script>

<div class="w-full h-full flex flex-col">
  <div class="flex items-center justify-center p-3 space-x-3">
    <Link open href="/members/{speaker.profileSlug}" class="flex-shrink-0">
      <span class="inline-block relative">
        <img
          class="w-40 h-40 rounded-full"
          src="{userProfileImage}"
          alt="{`${speaker.firstName} ${speaker.lastName}`}"
        />

        {#if speaker.earnedMeritBadges.length > 0}
          <span class="absolute bottom-0 left-0 block h-15 w-15">
            <img
              src="{speaker.earnedMeritBadges[0].image}"
              alt="{speaker.earnedMeritBadges[0].name}"
            />
          </span>
        {/if}
      </span>
    </Link>
  </div>

  <div class="flex justify-center text-center mt-2">
    <span
      class="text-xl leading-none font-extrabold text-gray-900 sm:text-l
      lg:text-2xl"
    >
      {`${speaker.firstName} ${speaker.lastName}`}
    </span>
  </div>

  <div class="flex flex-col justify-center text-center mt-2">
    <h3 class="text-xl leading-none tracking-tight text-gray-600 sm:text-xl">
      {speaker.jobTitle ? speaker.jobTitle : ''}
    </h3>

    <h3 class="text-xl leading-none tracking-tight text-gray-400 sm:text-xl">
      {speaker.company ? speaker.company : ''}
    </h3>
  </div>
</div>
