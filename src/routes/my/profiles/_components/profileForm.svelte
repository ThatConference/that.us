<script>
	export let handleSubmit;
	export let profile;
	export let isNewProfile;

	import { session } from '$app/stores';
	import Icon from 'svelte-awesome';
	import {
		linkedin,
		facebook,
		twitter,
		instagram,
		github,
		youtubePlay,
		twitch
	} from '$components/svelte-awesome-icons';
	import { Form, Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
	import { ScaleOut } from 'svelte-loading-spinners';
	import Tags from 'svelte-tags-input';
	import * as yup from 'yup';
	import Checkbox from 'svelte-checkbox';
	import fetch from 'isomorphic-fetch';
	import lodash from 'lodash';
	import omitDeep from 'omit-deep';

	import { Shell } from '$elements/buttons';
	import config from '$utils/config';

	import memberApi from '$dataSources/api.that.tech/members/queries';
	import { Waiting } from '$elements';
	import ErrorNotificaiton from '$components/notifications/Error.svelte';

	const { isEmpty } = lodash;

	const socialLinks = [
		{
			linkType: 'GITHUB',
			name: 'github',
			icon: github,
			slug: 'https://github.com/'
		},
		{
			linkType: 'TWITTER',
			name: 'twitter',
			icon: twitter,
			slug: 'https://twitter.com/'
		},
		{
			linkType: 'LINKEDIN',
			name: 'linkedin',
			icon: linkedin,
			slug: 'https://linkedin.com/in/'
		},
		{
			linkType: 'INSTAGRAM',
			name: 'instagram',
			icon: instagram,
			slug: 'https://instagram.com/'
		},
		{
			linkType: 'FACEBOOK',
			name: 'facebook',
			icon: facebook,
			slug: 'https://facebook.com/'
		},
		{
			linkType: 'YOUTUBE',
			name: 'youtube',
			icon: youtubePlay,
			slug: ['https://youtube.com/channel/', 'https://youtube.com/c/']
		},
		{
			linkType: 'TWITCH',
			name: 'twitch',
			icon: twitch,
			slug: 'https://twitch.com/'
		}
	];

	const { isSlugTaken } = memberApi();

	let initialValues;
	let profileImageUploading;
	let profileImageUrl;
	let slugValues = {};
	let socialLinkValues = {};

	// clear out __typename
	if (profile) omitDeep(profile, ['__typename']);

	function buildSocialLink(linkType, baseAddress, userSlug) {
		return {
			isPublic: true,
			linkType,
			url: `${baseAddress}${userSlug.trim()}`
		};
	}

	let socialLinksState = [];
	function updateLinksInputValues(link, userValue) {
		// clear out the value regardless.
		socialLinksState = socialLinksState.filter((i) => i.linkType !== link.linkType);

		// if we have a value.. add it back
		if (!isEmpty(userValue)) {
			let slug = '';
			if (Array.isArray(link.slug)) slug = slugValues[link.linkType] || link.slug[0];
			else slug = link.slug;

			socialLinksState.push(buildSocialLink(link.linkType, slug, userValue));
		}

		return socialLinksState;
	}

	function getInitialSocialLinkValue(link) {
		let result = '';

		if (!isNewProfile && profile.profileLinks?.length > 0) {
			const [socialLink] = profile.profileLinks.filter((i) => i.linkType === link.linkType);

			if (socialLink) {
				// If link.slugs is an array, match socialLink.url with the proper element
				if (Array.isArray(link.slug)) {
					link.slug.forEach((el) => {
						const [, value] = socialLink.url.split(el);
						if (value) result = value;
					});
				} else {
					const [, value] = socialLink.url.split(link.slug);
					result = value;
				}
			}

			socialLinkValues[link.linkType] = result;
		}

		return result;
	}

	function getInitialSelectValue(link) {
		// initial state should be the first element in slug array
		let result = link.slug[0];

		if (!isNewProfile && profile.profileLinks?.length > 0) {
			const [socialLink] = profile.profileLinks.filter((i) => i.linkType === link.linkType);
			if (socialLink) {
				link.slug.forEach((el) => {
					const [, value] = socialLink.url.split(el);
					if (value) {
						result = el;
						slugValues[link.linkType] = el;
					}
				});
			}
		}

		return result;
	}

	function updateLinkSlugValue(link, userValue) {
		// This is called from blur so we're looking for:
		// 1. Link existed in DB and changing url
		// 2. Already entered/changed slug
		// 3. No value in User Slug - So either removed or never set

		let userSlug = '';
		slugValues[link.linkType] = userValue;

		// get existing link if available
		const existingLink = socialLinksState.filter((l) => l.linkType === link.linkType);
		// clear out the value regardless.
		socialLinksState = socialLinksState.filter((i) => i.linkType !== link.linkType);

		if (existingLink[0]) {
			link.slug.forEach((s) => {
				const [, value] = existingLink[0].url.split(s);
				if (value) {
					userSlug = value;
				}
			});
		}

		if (!isEmpty(userSlug)) {
			socialLinksState.push(buildSocialLink(link.linkType, userValue, userSlug));
		}

		return socialLinksState;
	}

	if (isNewProfile) {
		initialValues = {
			firstName: undefined,
			lastName: undefined,
			email: undefined,
			profileSlug: undefined,
			company: undefined,
			jobTitle: undefined,
			bio: undefined,
			canFeature: false,
			isOver13: false,
			acceptedCodeOfConduct: false,
			acceptedTermsOfService: false,
			acceptedAntiHarassmentPolicy: false,
			acceptedCommitmentToDiversity: false,
			isDeactivated: false,
			profileImage: undefined,
			profileLinks: [],
			interests: [],
			lifeHack: undefined,
			...profile
		};
	} else {
		initialValues = profile;
		profileImageUrl = profile.profileImage;
		socialLinksState = profile.profileLinks;
	}

	let interestsInput;
	let interestsInputValues = initialValues ? initialValues.interests : [];

	yup.addMethod(yup.string, 'validateSlug', function () {
		return this.test({
			name: 'name',
			message: 'Slug is already taken. Try again.',
			test: function (slug) {
				if (!/^[a-zA-Z0-9-_]+$/g.test(slug)) {
					return this.createError({
						message: `Invalid format: use only letters, numbers, dash, and underscore`
					});
				}
				return new Promise((res) =>
					isSlugTaken(slug).then((r) => {
						if (isNewProfile) res(!r);
						res(true);
					})
				);
			}
		});
	});

	const schema = yup.object().shape({
		firstName: yup.string().trim().required('Please enter your first or given name.'),
		lastName: yup.string().trim().required('Please enter your last or family name.'),
		company: yup.string().trim().nullable(),
		jobTitle: yup.string().trim().nullable(),
		email: yup.string().email().trim().required('Please enter your email address.'),
		bio: yup.string().trim().required('We need to know a bit about yourself.'),
		profileSlug: yup
			.string()
			.trim()
			.lowercase()
			.required('You must enter a value to represent your member page.')
			.validateSlug(),
		acceptedCodeOfConduct: yup.boolean().oneOf([true], 'Please accept our Code of Conduct policy.'),
		acceptedCommitmentToDiversity: yup
			.boolean()
			.oneOf([true], 'Please accept our Commitment to Diversity policy.'),
		acceptedAntiHarassmentPolicy: yup
			.boolean()
			.oneOf([true], 'Please accept Anti-Harrasment policy.'),
		acceptedTermsOfService: yup.boolean().oneOf([true], 'Please accept our Terms of Services.'),
		isOver13: yup.boolean().oneOf([true], 'You Must be 13 years or older.'),
		canFeature: yup.boolean(),
		isDeactivated: yup.boolean(),
		profileImage: yup.string().url().nullable(),
		profileLinks: yup.array().nullable(),
		lifeHack: yup.string().trim().nullable(),
		interests: yup.array().of(yup.string())
	});

	const handleReset = () => {
		profile = {};
	};

	const postProfilePicture = async (profilePhoto) => {
		profileImageUploading = true;
		const formData = new FormData();
		formData.append('file', profilePhoto.currentTarget.files[0]);

		const res = await fetch(config.profileImageApi, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${$session.accessToken}`
			},
			body: formData
		});

		if (!res.ok) {
			// TODO drop an error modal saying there was a problem uploading
			return null;
		}

		const json = await res.json();

		profileImageUploading = false;
		profileImageUrl = json.data.url;

		return json.data.url;
	};
</script>

<Form
	{schema}
	{initialValues}
	validateOnBlur={false}
	validateOnChange={false}
	on:submit={handleSubmit}
	on:reset={handleReset}
	let:isSubmitting
	let:isValid
	let:setValue
	let:values
	let:errors
	let:touched>
	<div>
		<div>
			<h2 class="text-xl font-bold leading-6 text-gray-900">Your Profile</h2>

			<p class="mt-4 text-sm leading-5 text-gray-500">
				This information is what we feature about you if you choose to make your profile public.
			</p>

			<p class="mt-4 text-sm leading-5 text-gray-500">
				To submit any type activity, your profile will have to be public.
			</p>
		</div>
		<div class="px-4">
			<div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="first_name" class="block text-sm font-medium leading-5 text-gray-700">
						First or Given Name
					</label>
					<div class="relative">
						<span
							class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<div class="mt-1 rounded-md border shadow-sm">
						<Input
							name="firstName"
							type="text"
							autofocus
							class="form-input block w-full transition duration-150 ease-in-out
                sm:text-sm sm:leading-5" />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="last_name" class="block text-sm font-medium leading-5 text-gray-700">
						Last or Family Name
					</label>
					<div class="relative">
						<span
							class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<div class="mt-1 rounded-md border shadow-sm">
						<Input
							name="lastName"
							class="form-input block w-full transition duration-150 ease-in-out
                sm:text-sm sm:leading-5" />
					</div>
				</div>

				<div class="sm:col-span-4">
					<label for="username" class="block text-sm font-medium leading-5 text-gray-700">
						Member Page Slug
					</label>
					<div class="relative">
						<span
							class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<!-- todo .. shadow doesn't align correctly <div class="mt-1 flex rounded-md shadow-sm"> -->
					<div class="mt-1 flex">
						<span
							class="inline-flex items-center rounded-l-md border border-r-0
                border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
							https://that.us/members/
						</span>

						{#if !isNewProfile}
							<Input
								type="text"
								disabled
								name="profileSlug"
								class="form-input block w-full min-w-0 flex-1 rounded-none rounded-r-md
                  border bg-gray-50 text-gray-500 transition duration-150
                  ease-in-out sm:text-sm sm:leading-5" />
						{:else}
							<Input
								type="text"
								name="profileSlug"
								class="flex-1 form-input block w-full min-w-0 rounded-none
                  rounded-r-md transition duration-150 ease-in-out sm:text-sm
                  sm:leading-5" />
						{/if}
					</div>
				</div>

				<div class="sm:col-span-6">
					<label for="about" class="block text-sm font-medium leading-5 text-gray-700">
						About Yourself
					</label>
					<div class="relative">
						<span
							class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
					<div class="mt-1 rounded-md border shadow-sm">
						<Input
							type="textarea"
							rows="10"
							name="bio"
							multiline={true}
							class="form-textarea block w-full transition duration-150
                ease-in-out sm:text-sm sm:leading-5" />
					</div>
				</div>
				<div class="sm:col-span-3">
					<label for="company" class="block text-sm font-medium leading-5 text-gray-700">
						Company
					</label>
					<div class="mt-1 rounded-md border shadow-sm">
						<Input
							type="text"
							name="company"
							class="form-input block w-full transition duration-150 ease-in-out
                sm:text-sm sm:leading-5" />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="jobTitle" class="block text-sm font-medium leading-5 text-gray-700">
						Job Title
					</label>
					<div class="mt-1 rounded-md border shadow-sm">
						<Input
							name="jobTitle"
							class="form-input block w-full transition duration-150 ease-in-out
                sm:text-sm sm:leading-5" />
					</div>
				</div>

				<div class="sm:col-span-6">
					<label for="photo" class="block text-sm font-medium leading-5 text-gray-700">
						Profile Photo
					</label>

					<div class="mt-2 flex items-center">
						<span class="h-12 w-12 overflow-hidden rounded-full border bg-gray-100">
							{#if profileImageUploading}
								<div class="flex h-full w-full flex-grow justify-center">
									<ScaleOut />
								</div>
							{:else if profileImageUrl}
								<img
									class="h-full w-full"
									src={`${profileImageUrl}?auto=format&fit=facearea&facepad=10&mask=ellipse&h=100&w=100&q=50`}
									alt="" />
							{:else}
								<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904
                    0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0
                    018 0z" />
								</svg>
							{/if}
						</span>
						<span class="ml-5 rounded-md shadow-sm">
							<input
								name="profileImage"
								type="file"
								on:change={(e) => postProfilePicture(e).then((r) => setValue('profileImage', r))}
								accept="image/x-png,image/png,.png,image/jpeg,.jpg,.jpeg,image/gif,.gif"
								class="focus:ring-blue rounded-md border border-gray-300 py-2 px-3
                  text-sm font-medium leading-4 text-gray-700
                  transition duration-150
                  ease-in-out hover:text-gray-500
                  focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800" />
						</span>
					</div>
					<p class="mt-2 text-sm text-gray-500">
						Make sure you
						<strong>hit save</strong>
						to update your profile picture.
					</p>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-200 pt-8">
			<div>
				<h3 class="text-lg font-medium leading-6 text-gray-900">Social Links</h3>
				<p class="mt-1 text-sm leading-5 text-gray-500">
					Where would you like people to follow you?
				</p>
			</div>

			<div class="mt-6">
				<div class="sm:col-span-4">
					{#each socialLinks as link}
						<!-- todo - shadow isn't aligned properly <div class="mt-4 flex rounded-md shadow-sm"> -->
						<div class="mt-4 flex rounded-md border shadow-sm">
							<div
								class="inline-flex w-1/3 items-center rounded-l-md border
                  border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500
                  sm:text-sm">
								<span class="w-6">
									<Icon data={link.icon} />
								</span>
								{#if Array.isArray(link.slug)}
									<select
										class="form-input w-full cursor-pointer border-none bg-transparent p-1 text-gray-500 outline-none sm:text-sm"
										value={getInitialSelectValue(link)}
										on:blur={(e) =>
											setValue('profileLinks', updateLinkSlugValue(link, e.target.value))}>
										{#each link.slug as slug}
											<option value={slug}>{slug}</option>
										{/each}
									</select>
								{:else}{link.slug}{/if}
							</div>
							<Input name="profileLinks" hidden />
							<input
								type="text"
								name={link.name}
								value={getInitialSocialLinkValue(link)}
								on:change={(e) =>
									setValue('profileLinks', updateLinksInputValues(link, e.target.value))}
								class="form-input block w-full min-w-0 flex-1 rounded-none rounded-r-md
                  border transition duration-150 ease-in-out sm:text-sm
                  sm:leading-5" />
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-8 border-t border-gray-200 pt-8">
				<div>
					<h3 class="text-lg font-medium leading-6 text-gray-900">THAT Extras</h3>
					<p class="mt-1 text-sm leading-5 text-gray-500">
						There is more to you than just some social links, tell us a few interesting facts.
					</p>
				</div>

				<div class="mt-6">
					<div class="sm:col-span-4">
						<div class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
							<div class="block text-sm font-medium leading-5 text-gray-700 sm:col-span-4">
								<label for="interests"> What are some things you're interested in? </label>
								<p class="mt-2 text-gray-500">Please note return/enter is the delimiter.</p>

								<div class="tag-form-input mt-1 rounded-md shadow-sm">
									<Tags
										name="interests"
										bind:this={interestsInput}
										tags={interestsInputValues}
										allowBlur={true}
										maxTags={25}
										onlyUnique={true}
										on:tags={({ detail }) => setValue('tags', detail.interests)}
										class="form-input block w-full rounded-md text-sm leading-5 shadow-sm transition duration-150 ease-in-out" />
								</div>
							</div>
						</div>

						<div class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
							<div class="sm:col-span-4">
								<label for="lifeHack" class="block text-sm font-medium leading-5 text-gray-700">
									What is a 1 sentence "life hack" that you'd share with someone?
								</label>
								<div class="mt-1 rounded-md border shadow-sm">
									<Input
										type="text"
										name="lifeHack"
										placeholder="Embrace failure, lean into the journey and if you don't like the road, take the fork."
										class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-8 border-t border-gray-200 pt-8">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">
							Make your profile public(ish).
						</h3>
						<p class="mt-1 text-sm leading-5 text-gray-500">
							By allowing us to feature you, you can...
						</p>
					</div>

					<div class="mt-6">
						<label for="canFeature" class="block text-sm font-medium leading-5 text-gray-700">
							Yes, please feature me.
						</label>

						<div class="mt-2 flex items-start">
							<Checkbox
								name="canFeature"
								checked={profile.canFeature}
								on:change={({ detail }) => setValue('canFeature', detail)}
								size="2.5rem"
								class="flex-none" />

							<div class="ml-3 text-sm leading-5">
								<p class="text-gray-500">
									By selecting this, you're able to submit an activity and THAT can feature your
									profile on that.us or thatconference.com. We don't sell any data.
								</p>
							</div>

							{#if touched['canFeature'] && errors['canFeature']}
								<p>error</p>
							{/if}
						</div>
					</div>
				</div>

				<div class="mt-8 border-t border-gray-200 pt-8">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
					<p class="mt-1 text-sm leading-5 text-gray-500">
						This information is private to THAT and allows us to better connect with you.
					</p>
				</div>

				<div class="px-4">
					<div class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
						<div class="sm:col-span-4">
							<label for="email" class="block text-sm font-medium leading-5 text-gray-700">
								Email address
							</label>
							<div class="relative">
								<span
									class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>
							<div class="mt-1 rounded-md border shadow-sm">
								<Input
									type="email"
									name="email"
									placeholder="e.g. user@example.com"
									class="form-input block w-full transition duration-150
                  ease-in-out sm:text-sm sm:leading-5" />
							</div>
						</div>
					</div>
				</div>

				<div class="mt-8 border-t border-gray-200 pt-8">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">Terms of Service</h3>
						<p class="mt-1 text-sm leading-5 text-gray-500">
							Everyone is awesome, and we want your help in keeping it that way. Also lawyers.
						</p>
					</div>

					<div class="mt-6 px-4">
						<fieldset>
							<legend class="text-base font-medium text-gray-900"> Do you agree to our: </legend>
							<div class="relative">
								<span
									class="absolute top-0 left-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>

							<div class="mt-4">
								<div class="relative flex items-start">
									<Checkbox
										name="acceptedCodeOfConduct"
										checked={profile.acceptedCodeOfConduct}
										on:change={({ detail }) => setValue('acceptedCodeOfConduct', detail)}
										size="2.5rem"
										class="flex-none" />

									<div class="ml-3 text-sm leading-5">
										<label for="comments" class="font-medium text-gray-700">
											<a
												open
												tabindex="-1"
												href="/support/code-of-conduct/"
												class="font-medium text-indigo-600 transition
                        duration-150 ease-in-out hover:text-indigo-500">
												Code of Conduct
											</a>
										</label>
										<p class="text-gray-500">
											Be epic. Together we're a family of geeks and geeklings!
										</p>

										{#if touched['acceptedCodeOfConduct'] && errors['acceptedCodeOfConduct']}
											<p class="italic text-red-600">
												{errors['acceptedCodeOfConduct']}
											</p>
										{/if}
									</div>
								</div>
								<div class="mt-4">
									<div class="relative flex items-start">
										<Checkbox
											name="acceptedAntiHarassmentPolicy"
											checked={profile.acceptedAntiHarassmentPolicy}
											on:change={({ detail }) => setValue('acceptedAntiHarassmentPolicy', detail)}
											size="2.5rem"
											class="flex-none" />

										<div class="ml-3 text-sm leading-5">
											<label for="comments" class="font-medium text-gray-700">
												<a
													open
													tabindex="-1"
													href="/suppoprt/anti-harassment/"
													class="font-medium text-indigo-600 transition
                          duration-150 ease-in-out hover:text-indigo-500">
													Commitment Anti-Harassment
												</a>
											</label>
											<p class="text-gray-500">We do not accept any sort of harassment.</p>
											{#if touched['acceptedAntiHarassmentPolicy'] && errors['acceptedAntiHarassmentPolicy']}
												<p class="italic text-red-600">
													{errors['acceptedAntiHarassmentPolicy']}
												</p>
											{/if}
										</div>
									</div>

									<div class="mt-4">
										<div class="relative flex items-start">
											<Checkbox
												name="acceptedCommitmentToDiversity"
												checked={profile.acceptedCommitmentToDiversity}
												on:change={({ detail }) =>
													setValue('acceptedCommitmentToDiversity', detail)}
												size="2.5rem"
												class="flex-none" />

											<div class="ml-3 text-sm leading-5">
												<label for="comments" class="font-medium text-gray-700">
													<a
														open
														tabindex="-1"
														href="/support/commitment-to-diversity/"
														class="font-medium text-indigo-600
                            transition duration-150 ease-in-out
                            hover:text-indigo-500">
														Commitment to Diversity
													</a>
												</label>
												<p class="text-gray-500">
													Everyone is welcome at THAT! It's our daily responsibility to make our
													industry the best place it can be, regardless of color, gender, location,
													or even tech stack.
												</p>
												{#if touched['acceptedCommitmentToDiversity'] && errors['acceptedCommitmentToDiversity']}
													<p class="italic text-red-600">
														{errors['acceptedCommitmentToDiversity']}
													</p>
												{/if}
											</div>
										</div>

										<div class="mt-4">
											<div class="relative flex items-start">
												<Checkbox
													name="acceptedTermsOfService"
													checked={profile.acceptedTermsOfService}
													on:change={({ detail }) => setValue('acceptedTermsOfService', detail)}
													size="2.5rem"
													class="flex-none" />

												<div class="ml-3 text-sm leading-5">
													<label for="candidates" class="font-medium text-gray-700">
														<a
															open
															tabindex="-1"
															href="/support/terms-of-use/"
															class="font-medium text-indigo-600
                              transition duration-150 ease-in-out
                              hover:text-indigo-500">
															Terms of Use
														</a>
													</label>
													<p class="text-gray-500">Lawyer speak.</p>
													{#if touched['acceptedTermsOfService'] && errors['acceptedTermsOfService']}
														<p class="italic text-red-600">
															{errors['acceptedTermsOfService']}
														</p>
													{/if}
												</div>
											</div>
										</div>

										<div class="mt-4">
											<div class="relative flex items-start">
												<Checkbox
													name="isOver13"
													checked={profile.isOver13}
													on:change={({ detail }) => setValue('isOver13', detail)}
													size="2.5rem"
													class="flex-none" />

												<div class="ml-3 text-sm leading-5">
													<label for="offers" class="font-medium text-gray-700">
														Are you >= to the age of 13?
													</label>
													<p class="text-gray-500">
														I'm sorry, but to have an account on THAT.us or THATConference.com you
														must be at least 13 years old.
													</p>
													{#if touched['isOver13'] && errors['isOver13']}
														<p class="italic text-red-600">
															{errors['isOver13']}
														</p>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<div class="mt-8 border-t border-gray-200 pt-8">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">User Account Maintenance</h3>
						<p class="mt-1 text-sm leading-5 text-gray-500">more to come...</p>
					</div>

					<div class="mt-6">
						<fieldset>
							<legend class="text-base font-medium text-gray-900"> User Account </legend>

							<div class="mt-4">
								<div class="relative flex items-start">
									<Checkbox
										name="isDeactivated"
										checked={profile.isDeactivated}
										on:change={({ detail }) => setValue('isDeactivated', detail)}
										size="2.5rem"
										class="flex-none" />

									<div class="ml-3 text-sm leading-5">
										<label for="comments" class="font-medium text-gray-700">
											<a
												tabindex="-1"
												open
												href="/support/code-of-conduct/"
												class="font-medium text-indigo-600 transition
                        duration-150 ease-in-out hover:text-indigo-500">
												Deactivate my account.
											</a>
										</label>
										<p class="text-gray-500">...</p>

										{#if touched['isDeactivated'] && errors['isDeactivated']}
											<p class="italic text-red-600">
												{errors['isDeactivated']}
											</p>
										{/if}
									</div>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>

			<div class="mt-8 border-t border-gray-200 pt-5">
				<div class="flex justify-end space-x-4">
					<span class="inline-flex rounded-md shadow-sm">
						<button type="submit" disabled={isSubmitting}>
							<Shell>
								<div class="px-8 py-2 text-sm font-medium leading-5">Update Profile</div>
							</Shell>
						</button>
					</span>
					<span class="inline-flex rounded-md shadow-sm">
						<button
							type="reset"
							tabindex="-1"
							class="focus:ring-blue rounded-md border-2 border-gray-300 py-2 px-4
              text-sm font-medium leading-5 text-gray-700
              transition duration-150 ease-in-out
              hover:text-gray-500 focus:border-blue-300 focus:outline-none active:bg-gray-50
              active:text-gray-800">
							Clear
						</button>
					</span>
				</div>
			</div>

			{#if isValid === false}
				<ErrorNotificaiton message="Please correct the errors listed above." />
			{/if}

			{#if isSubmitting}
				<div class="flex flex-grow justify-center py-12">
					<Waiting />
				</div>
			{/if}
		</div>
	</div>
</Form>
