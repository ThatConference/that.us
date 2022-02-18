<script context="module">
	import auth0 from '$utils/security';

	export const load = auth0.withPageAuthRequired();
</script>

<script>
	import { session } from '$app/stores';
	import lodash from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Warning } from '$elements/svgs';

	import SubmitForm from './_components/submitForm.svelte';
	import newsMutationApi from '$dataSources/api.that.tech/news/mutations';

	const { create } = newsMutationApi();
	const { isEmpty } = lodash;

	function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
		return create({ ...values })
			.then(() => {
				setSubmitting(false);
				resetForm();
			})
			.catch(() => {
				setSubmitting(false);
				resetForm();
			});
	}

	const metaTags = ((title = "Submit what you've found on THAT community curated news.") => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				url: `https://that.us/news/submit/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="overflow-hidden py-20">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<header>
			<h1
				class="pb-16 text-4xl font-extrabold leading-10 tracking-tight
				text-thatBlue-800 sm:text-center sm:text-5xl sm:leading-none
				md:text-6xl lg:text-left"
			>
				Community Curated News
			</h1>
		</header>

		{#if !isEmpty($session.thatProfile)}
			<SubmitForm {handleSubmit} />
		{:else}
			<div class="mt-8">
				<div class="flex items-center">
					<div class="mr-4">
						<Warning classes="h-12 w-12 text-red-500" />
					</div>

					<h2 class="prose-xl text-gray-500">Please complete your user profile.</h2>
				</div>
			</div>
		{/if}
	</div>
</div>
