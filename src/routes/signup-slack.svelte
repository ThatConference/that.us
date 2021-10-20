<script>
	import { Form, Input } from 'sveltejs-forms';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import * as yup from 'yup';

	const key = '6LesmZMUAAAAAGgGNT3Svhmogowbh0u6xXgYS6Ru';

	function handleSubmit({ detail: { values, setSubmitting } }) {
		//must be valid bc form component already validates
		//send api call
		//catch any errors
		//finally set submitting to false
		setTimeout(() => {
			console.log(values);
			setSubmitting(false);
		}, 2000);
	}

	const schema = yup.object().shape({
		firstName: yup.string().trim().required('Please fill in your first name.'),
		lastName: yup.string().trim().required('Please fill in your last name.'),
		email: yup
			.string()
			.required('Please fill in your email address.')
			.email('Please provide a valid email address.')
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<Layout>
	<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
		<div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
			<main>
				<h2
					class="text-4xl sm:text-5xl md:text-6xl sm:leading-none leading-10 tracking-tight font-extrabold text-thatBlue-800"
				>
					Join <span class="text-thatOrange-400">THAT</span> Slack!
				</h2>
				<img src="/images/TC-Slack.png" alt="THAT Conference and Slack" />
				<p>
					Fill out the form to get an invite to THAT Slack and be a part of the community
					year-round.
				</p>
				<p>* indicates a required field.</p>
				<Form {schema} on:submit={handleSubmit} let:isSubmitting>
					<Input type="text" name="firstName" label="First Name:*" />
					<Input type="text" name="lastName" label="Last Name:*" />
					<Input type="email" name="email" label="Email:*" />
					<div class="field">
						<label>
							<input type="checkbox" name="isPastCamper" />
							I have attended THAT Conference in the past.
						</label>
					</div>
					<div class="g-recaptcha" data-sitekey={key} />
					<button
						disabled={isSubmitting}
						class="py-2 px-4 border-2 border-thatBlue-500 rounded-md text-sm leading-5 font-medium text-thatBlue-500 bg-white hover:bg-thatBlue-500 hover:text-white focus:outline-none focus:ring-thatBlue-500 focus:bg-thatBlue-500 focus:text-white focus:border-thatBlue-800 active:bg-thatBlue-800 transition duration-150 ease-in-out"
						type="submit">Add Me to Slack!</button
					>
				</Form>
			</main>
		</div>
	</div>
</Layout>

<style>
</style>
