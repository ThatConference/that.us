import auth0 from '$utils/security/server';
import config from '$utils/config.public';
import { QUERY_ME } from '$dataSources/api.that.tech/me';
import { loadFlashMessage } from 'sveltekit-flash-message/server';

const body = {
	query: `
	${QUERY_ME}
	`,
	variables: {}
};

async function queryMe(accessToken) {
	return await fetch(config.api.direct, {
		method: 'POST',
		headers: {
			credentials: 'include',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
			'that-site': 'that.us'
		},
		body: JSON.stringify(body)
	})
		.then((r) => r.json())
		.then((results) => results.data.members?.me);
}

export const trailingSlash = 'always';

export const load = loadFlashMessage(async (event) => {
	let { request, locals } = event;
	const auth0Session = await auth0.getSession(request);

	let user = {
		isAuthenticated: !!auth0Session?.user,
		baseUser: auth0Session?.user || {},
		profile: auth0Session?.thatProfile || {},
		accessToken: auth0Session?.accessToken || {}
	};

	if (user.isAuthenticated) {
		user.profile = await queryMe(user.accessToken);
	}

	locals.user = user;

	return {
		user
	};
});
