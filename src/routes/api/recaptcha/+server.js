import { recaptchaConfig } from '$utils/config.private';
import { recaptcha } from '$utils/config.public';
import { json } from '@sveltejs/kit';

const { projectId, apiKey } = recaptchaConfig;
const { siteKey, threshold } = recaptcha;
const enterpriseRecaptchaUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

export const POST = async ({ request, fetch }) => {
	const body = await request.json();
	const { token, userAction } = body;
	const payload = {
		event: {
			token,
			siteKey,
			expectedAction: userAction
		}
	};

	let captchaScore;
	let tokenProperties;
	let isPassed = false;
	try {
		const response = await fetch(enterpriseRecaptchaUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		if (response.ok) {
			const r = await response.json();
			captchaScore = r?.riskAnalysis?.score ?? 0;
			tokenProperties = r?.tokenProperties ?? {};
			isPassed = captchaScore >= threshold;
		}
	} catch (e) {
		// need some type of error handling here or default result
		console.error(e);
		return;
	}

	return json({
		score: captchaScore,
		isPassed,
		tokenProperties
	});
};
