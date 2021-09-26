<script context="module">
	import lodash from 'lodash';
	import partnerNetworkApi from '$dataSources/api.that.tech/partner/leads/queries';

	const { sortBy } = lodash;
	export async function load({ fetch }) {
		const { queryMyNetwork } = partnerNetworkApi(fetch);

		const contacts = await queryMyNetwork().then((r) => sortBy(r, 'createdAt').reverse());

		return {
			props: {
				contacts
			}
		};
	}
</script>

<script>
	export let contacts;

	import dayjs from 'dayjs';

	import seoMetaTags from '$utils/seo/metaTags';
	import { csvGenerator } from '$utils/csv';
	import Seo from '$components/Seo.svelte';
	import { Shell } from '$elements/buttons';
	import ProfileLayout from '$elements/layouts/Profile.svelte';

	const metaTags = ((title = 'Partner Network - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: 'https://that.us/my/partners/my-network'
			},
			noindex: true,
			nofollow: true
		})
	}))();

	async function downloadHandler() {
		const tableData = await queryNetwork().then((i) => {
			return i.map((y) => ({
				id: y.id,
				event: y.event.name,
				createdAt: y.createdAt,
				pinNumber: y.partnerPin,
				partnerFirstName: y.partnerContact?.firstName ? y.partnerContact?.firstName : '',
				partnerLastName: y.partnerContact?.lastName ? y.partnerContact.lastName : '',
				firstName: y.member.firstName,
				lastName: y.member.lastName,
				email: y.member.email,
				partnersNotes: y.partnersNotes ? y.partnersNotes : ''
			}));
		});

		let tableHeader = [
			'Id',
			'Event',
			'Created At',
			'Pin Number',
			'Partner First Name',
			'Partner Last Name',
			'Attendee First Name',
			'Attendee Last Name',
			'Attendee Email',
			'Partners Notes'
		];

		let tableKeys = Object.keys(tableData[0]);

		csvGenerator(tableData, tableKeys, tableHeader, 'THAT-My-Network.csv');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ProfileLayout>
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div
				class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none flex items-center justify-between"
			>
				<h2 class="text-3xl leading-9 font-extrabold text-thatBlue-800 tracking-tight sm:text-4xl">
					My Network
				</h2>

				<div class="flex">
					<Shell>
						<button
							class="w-full py-4 px-8 text-sm leading-5 font-medium"
							on:click={downloadHandler}
						>
							<span class="text-lg">Download</span>
						</button>
					</Shell>
				</div>
			</div>

			<div class="bg-white shadow overflow-hidden sm:rounded-md">
				<ul class="divide-y divide-gray-200">
					{#each contacts as c}
						<li>
							<div class="flex items-center px-4 py-4 sm:px-6">
								<div class="min-w-0 flex-1 flex items-center">
									<div class="flex-shrink-0">
										<img class="h-12 w-12" src={c.event.logo} alt="" />
									</div>
									<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
										<div>
											<p class="text-sm font-medium text-thatBlue-800 truncate">
												{c.member.firstName}
												{c.member.lastName}
											</p>
											<p class="mt-2 flex items-center text-sm text-gray-500">
												<svg
													class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
													/>
													<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
												</svg>
												<span class="truncate">{c.member.email}</span>
											</p>
										</div>
										<div class="hidden md:block">
											<div>
												<p class="text-sm text-gray-900">
													<time datetime="2020-01-07"
														>{dayjs(c.createdAt).format('dddd, MMMM D, YYYY - h:mm A')}</time
													>
												</p>
												<p class="mt-2 flex items-center text-sm text-gray-500">
													<svg
														class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fill-rule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
															clip-rule="evenodd"
														/>
													</svg>
													Contact exchanged
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<svg
										class="h-5 w-5 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</ProfileLayout>
