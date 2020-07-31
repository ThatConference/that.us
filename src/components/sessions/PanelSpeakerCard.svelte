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
  <div class="flex items-center p-3 space-x-3">
    <Link
      open
      href="https://www.thatconference.com/member/{speaker.profileSlug}"
      class="flex-shrink-0"
    >

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

  <div class="mt-4 flex flex-col items-center justify-center text-center">
    <span
      class="text-xl leading-9 font-extrabold text-gray-900 sm:text-l
      sm:leading-10 lg:text-2xl lg:leading-none"
    >

      <span>{`${speaker.firstName} ${speaker.lastName}`}</span>
    </span>

    <span
      class="py-3 text-xl leading-none tracking-tight text-gray-500 sm:text-xl"
    >
      <div class="flex flex-col justify-center">
        <p>{speaker.jobTitle}</p>
        <p>{speaker.company}</p>
      </div>

    </span>
  </div>
</div>
