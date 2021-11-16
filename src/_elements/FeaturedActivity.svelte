<script>
	export let id;
	export let title;
	export let speakers;
	export let startTime;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import config from '$utils/config';

	import buildImageSrc from '$utils/image';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	const host = speakers[0];
	const profileImage = host.profileImage ? host.profileImage : config.defaultProfileImage;

	const userProfileImage = profileImage || config.defaultProfileImage;
	const srcset = buildImageSrc(userProfileImage, ['128', '500']);
</script>

<a href="/activities/{id}/">
	<div
		class="transition duration-500 ease-in-out transform hover:scale-105 w-full h-full py-10 px-6 hover:bg-thatBlue-400 bg-that-blue text-center shadow rounded-lg xl:px-10 xl:text-left"
	>
		<div class="space-y-6 xl:space-y-10">
			<div>
				<img
					class="lazyload mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
					data-sizes="auto"
					data-src={srcset.src}
					data-srcset={srcset.srcset}
					alt={`${host.firstName} ${host.lastName}`}
				/>
			</div>

			<div class="font-medium text-lg leading-6 flex flex-col">
				<h4 class="text-white">{title}</h4>

				<p class="text-thatBlue-200 text-sm italic">
					{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}
				</p>

				<p class="text-thatBlue-200 text-right">
					{`${host.firstName} ${host.lastName}`}
				</p>
			</div>
		</div>
	</div>
</a>
