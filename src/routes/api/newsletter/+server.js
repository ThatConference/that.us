import { superValidate, actionResult } from 'sveltekit-superforms/server';
import dayjs from 'dayjs';
import { newsletterConfig } from '$utils/config.private';

import newsletterSchema from '$lib/formSchemas/newsletter';

const hsFormPostUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${newsletterConfig.portalId}/${newsletterConfig.formId}`;

export const POST = async ({ request, fetch, url }) => {
	const formData = await request.formData();
	const form = await superValidate(formData, newsletterSchema);

	const token = formData.get('recaptchaToken');

	// Convenient validation check:
	if (!form.valid) {
		return actionResult('failure', { form }, 400);
	}

	const scoreResults = await fetch('/api/recaptcha', {
		method: 'POST',
		body: JSON.stringify({ token })
	});

	if (scoreResults.ok) {
		let score = await scoreResults.json();

		if (!score.isPassed) {
			return actionResult('redirect', '/newsletter/verify-your-humanity', {
				message: {
					message: 'Please verify your humanity.',
					type: 'error'
				},
				status: 400
			});
		}
	}

	let payloadBody = {
		submittedAt: dayjs().millisecond,
		fields: [
			{
				objectTypeId: '0-1', // Contact Record
				name: 'email',
				value: form.data.email
			}
		],
		context: {
			pageUri: url.searchParams.get('ref')
		}
	};

	let successMessage;

	try {
		const hubspotResults = await fetch(hsFormPostUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payloadBody)
		});

		if (hubspotResults.ok) {
			const r = await hubspotResults.json();
			successMessage = r.inlineMessage;
			if (r.errors) {
				return actionResult('failure', { form }, r.errors, 400);
			}
		}
	} catch (e) {
		return actionResult('error', { form }, { message: 'e.message', status: 500 });
	}

	// success
	return actionResult('redirect', '/newsletter/what-now', {
		message: {
			message: successMessage,
			type: 'success'
		},
		status: 303
	});
};
