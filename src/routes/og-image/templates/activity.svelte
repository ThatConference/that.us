<script context="module">
	import gFetch from '$utils/gfetch';

	const QUERY_SESSION_BY_ID = `
		query QUERY_SESSION_BY_ID($id: ID!) {
				sessions {
					session (sessionId: $id) {  
						title
						startTime
						speakers {
							firstName
							lastName
							profileImage
						}
					}
				}
			}
	`;

	export async function load({ page, fetch: sfetch, session, context }) {
		const fetch = gFetch(sfetch);

		const id = page.query.get('id');
		const variables = { id };

		const results = await fetch
			.query({ query: QUERY_SESSION_BY_ID, variables })
			.then(({ data, error }) => {
				// if (error) logMessage(error, 'QUERY_MY_SESSION_BY_ID');

				return data.sessions?.session;
			});

		return {
			props: {
				activityDetails: {
					title: results.title,
					startTime: results.startTime
				},
				member: {
					...results.speakers[0]
				}
			}
		};
	}
</script>

<script>
	export let activityDetails;
	export let member;

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	import LogoWide from './_components/logo-wide.svelte';
	import Trees from './_components/trees.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
</script>

<div class="font-og min-h-screen grid place-items-center p-4">
	<div id="og-image" class="relative w-[640px] h-[360px] bg-gray-50 overflow-hidden">
		<Trees
			classes="opacity-80 text-thatBlue-500 absolute w-[500px] -right-2 -top-10 -mt-8 -mr-10"
		/>

		<!-- Top-left circle -->
		<div
			class="absolute -top-16 -left-12 w-[200px] h-[200px] rounded-full grid place-content-center"
		/>

		<!-- Right big circle -->
		<div
			class="absolute w-[512px] h-[512px] opacity-25 bg-thatBlue-300 rounded-full top-0 -left-60"
		/>
		<!-- Images -->
		<div class="absolute top-10 right-8">
			<img
				src={`${member.profileImage}?w=500&h=500&fit=crop`}
				alt=""
				class="bg-white w-64 h-36 object-cover rounded-2xl shadow-2xl rotate-3 translate-y-4"
			/>
		</div>

		<img
			src="/images/characters/bear-pig.png"
			alt=""
			class="flip h-64 absolute -bottom-28 right-0 -mr-8"
		/>

		<!-- Content -->
		<div class="relative p-8 flex flex-col justify-end h-full space-y-4 w-4/5">
			<div>
				<p class="uppercase font-extrabold text-xs text-thatRed-500 tracking-wider">
					{`${member.firstName} ${member.lastName}`}
				</p>
				<p class="uppercase font-extrabold text-xs text-thatRed-500 tracking-wider">
					{dayjs(activityDetails.startTime).format('dddd, MMMM D, YYYY - h:mm A z')}
				</p>
			</div>
			<h1 class="text-4xl font-extrabold text-gray-900">{activityDetails.title}</h1>

			<div class="w-36">
				<LogoWide />
			</div>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
	.flip {
		transform: scaleX(-1);
	}
</style>
