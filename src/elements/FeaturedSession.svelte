<script>
  export let id;
  export let title;
  export let speakers;
  export let startTime;

  import { Link } from 'yrv';
  import dayjs from 'dayjs';

  import config from '../config';

  let host = speakers[0];
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  let userProfileImage = host.profileImage
    ? `${host.profileImage}${imageCrop}`
    : config.defaultProfileImage;
</script>

<Link href="/sessions/{id}">
  <div
    class="w-full h-full py-10 px-6 hover:bg-thatBlue-400 bg-that-blue
    text-center shadow rounded-lg xl:px-10 xl:text-left"
  >
    <div class="space-y-6 xl:space-y-10">

      <img
        class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
        src="{userProfileImage}"
        alt="{`${host.firstName} ${host.lastName}`}"
      />

      <div class="space-y-2 xl:flex xl:items-center xl:justify-between">
        <div class="w-full font-medium text-lg leading-6 space-y-1">
          <h4 class="text-white">{title}</h4>
          <p class="text-thatBlue-200 text-sm italic">
            {dayjs(startTime).format('dddd MMMM D, YYYY - h:mm A')}
          </p>
          <p class="text-thatBlue-200 text-right">
            {`${host.firstName} ${host.lastName}`}
          </p>
        </div>
      </div>

    </div>
  </div>
</Link>
