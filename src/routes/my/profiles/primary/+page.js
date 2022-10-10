import lodash from 'lodash';
import meApi from '$dataSources/api.that.tech/me';

const { isNil, isEmpty } = lodash;

export async function load({ fetch, parent }) {
	const { queryMe } = meApi(fetch);
	const me = await queryMe();

	let isNewProfile, currentProfile;
	let { user } = await parent();

	if (user || me) {
		if (!isNil(me) && !isEmpty(me)) {
			currentProfile = me;
			isNewProfile = false;
		} else {
			currentProfile = {
				firstName: user.baseUser?.given_name ? user.baseUser.given_name : '',
				lastName: user.baseUser?.family_name ? user.baseUser.family_name : '',
				profileSlug: user.baseUser?.nickname ? user.baseUser.nickname : '',
				email: user.baseUser?.email ? user.baseUser.email : ''
			};
			isNewProfile = true;
		}
	}

	return {
		currentProfile,
		isNewProfile
	};
}
