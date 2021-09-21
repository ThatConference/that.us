import { goto } from '$app/navigation';
import auth0 from '$utils/security';

const afterCallback = (req, res, session, state) => {
	console.log('in after callback', session, state);
	if (session.user.email_verified) {
		res.redirect('/verify-account');
	}

	return session;
};

export async function get(req, res) {
	console.log('in callback');

	const results = await auth0.handleCallback(req, res, { afterCallback });

	return results;
}
