import dayjs from 'dayjs';
import lodash from 'lodash';

import gFetch from '$utils/gfetch';
import config from '$utils/config.public';

import { log } from '../utilities/error';

const { uniqBy } = lodash;
const coreFieldsFragment = `
	fragment coreFieldsFragment on Partner {
		id
		slug
		companyName
		companyLogo
	}
`;

const jobListingsFragment = `
	fragment jobListingsFragment on Partner {
		jobListings {
			id
			slug
			title
			description
			jobType
			experienceLevel
			applyNowLink
			role
		}
	}
`;

const featuredSessionsFragment = `
	fragment featuredSessionsFragment on Partner {
		sessions {
			id
			eventId
			title
			shortDescription
			tags
			type
			status
			startTime
			durationInMinutes
			slug
			communities
			targetLocation
			
			location {
				destination
				isOnline
				url
			}

			event {
				id
				logo
			}

			speakers {
				id
				profileImage
				profileSlug
				firstName
				lastName
				earnedMeritBadges {
					id
					name
					image
					description
				}
			}

			tags
			
		}
	}
`;

const socialLinksFieldsFragment = `
	fragment socialLinksFieldsFragment on Partner {
		linkedIn
		github
		youtube
		instagram
		twitter
		facebook
		twitch
	}
`;

const enumValues = `
	options: enumValues {
		label: description
		value: name
	}
`;

export const QUERY_PARTNER_DROPDOWN_VALUES = `
	query QUERY_PARTNER_DROPDOWN_VALUES {
		jobType: __type(name: "JobType") {
			${enumValues}
		}
		
		experienceLevel: __type(name: "ExperienceLevel") {
			${enumValues}
		}
	}
`;

export const QUERY_PARTNERS = `
	${socialLinksFieldsFragment}
	${coreFieldsFragment}
	query getEventPartners($slug: String!) {
		events {
			event(findBy: { slug: $slug }) {
				get{
					partners {
						...coreFieldsFragment
						level
						...socialLinksFieldsFragment
					}
				}
			}
		}
	}
`;

export const QUERY_PARTNER = `
	${socialLinksFieldsFragment}
	${coreFieldsFragment}
	${jobListingsFragment}
	${featuredSessionsFragment}
	query queryPartner($slug: Slug!) {
		partners {
			partner(findBy: { slug: $slug }) {
				...coreFieldsFragment
				...jobListingsFragment
				...socialLinksFieldsFragment
				...featuredSessionsFragment
				website
				aboutUs
				city
				state
				goals
				callToAction
				callToActionSpotlight
				callToActionUrl
				members {
					id
					firstName
					lastName
					jobTitle
					profileImage
					profileSlug
				}
			}
		}
	}
`;

export const QUERY_FOLLOWERS = `
	query queryPartnerFollowersById($id: ID) {
		partners {
			partner(findBy: {id: $id}) {
				id
				followCount
				followers {
					cursor
					members {
						id
						profileSlug
						profileImage
						firstName
						lastName
					}
				}
			}
		}
	}
`;

export const QUERY_NEXT_FOLLOWERS = `
	query queryPartnerFollowersById($id: ID, $cursor: String) {
		partners {
			partner(findBy: {id: $id}) {
				id
				followers(cursor: $cursor) {
					cursor
					members {
						id
						profileSlug
						profileImage
						firstName
						lastName
					}
				}
			}
		}
	}
`;

export const QUERY_UPCOMING_PARTNERS = `
	${socialLinksFieldsFragment}
	${coreFieldsFragment}
	query QUERY_UPCOMING_PARTNERS {
		events {
			all {
				id
				endDate
				isActive
				partners {
					...coreFieldsFragment
					level
					...socialLinksFieldsFragment
				}
			}
		}
	}
`;

export const QUERY_PAST_PARTNERS = `
	${socialLinksFieldsFragment}
	${coreFieldsFragment}
	query QUERY_PAST_PARTNERS {
		partners {
			all {
				...coreFieldsFragment
				...socialLinksFieldsFragment
			}
		}
	}
`;

export const QUERY_EVENT_PARTNERS = `
	${socialLinksFieldsFragment}
	${coreFieldsFragment}
	query QUERY_EVENT_PARTNERS ($slug: String!) {
		events {
			event (findBy: { slug: $slug }) {
				get {
					logo
					name
					slug
					startDate
					endDate
					venues {
						city
						state
					}
					partners {
						...coreFieldsFragment
						level
						placement
						...socialLinksFieldsFragment
					}
				}
			}
		}
	}
`;

export const QUERY_PARTNER_JOB_LISTING = `
	${socialLinksFieldsFragment}
	query QUERY_PARTNER_JOB_LISTING ($partner: Slug, $slug: String!) {
		partners {
			partner (findBy: { slug: $partner }) {
				id
				companyName
				companyLogo
				website
				city
				state
				...socialLinksFieldsFragment
				jobListing(slug: $slug) {
					id
					title
					description
					jobType
					experienceLevel
					applyNowLink
					remote
					role
					datePosted
				}
			}
		}
	}
`;

function createSocialLinks(partner) {
	const socialLinks = [];

	if (partner.linkedIn) socialLinks.push({ href: partner.linkedIn, network: 'LINKEDIN' });
	if (partner.github) socialLinks.push({ href: partner.github, network: 'GITHUB' });
	if (partner.youtube) socialLinks.push({ href: partner.youtube, network: 'YOUTUBE' });
	if (partner.instagram) socialLinks.push({ href: partner.instagram, network: 'INSTAGRAM' });
	if (partner.twitter) socialLinks.push({ href: partner.twitter, network: 'TWITTER' });
	if (partner.facebook) socialLinks.push({ href: partner.facebook, network: 'FACEBOOK' });
	if (partner.twitch) socialLinks.push({ href: partner.twitch, network: 'TWITCH' });

	return socialLinks;
}

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const getPartner = (slug) => {
		const variables = { slug };
		return client.query({ query: QUERY_PARTNER, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'query_partners' });

			const { partner } = data.partners;

			return partner ? { ...partner, socialLinks: createSocialLinks(partner) } : null;
		});
	};

	const queryFollowers = (id) => {
		const variables = { id };
		return client.query({ query: QUERY_FOLLOWERS, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'query_partners' });

			const { partner } = data.partners;
			return partner || null; // followerCount and followers are in partner
		});
	};

	const queryNextFollowers = (id, cursor) => {
		const variables = { id, cursor };
		return client.query({ query: QUERY_NEXT_FOLLOWERS, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'query_partners' });

			const { partner } = data.partners;
			return partner ? partner.followers : [];
		});
	};

	function getUpcomingPartners() {
		return client.query({ query: QUERY_UPCOMING_PARTNERS }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_UPCOMING_PARTNERS' });

			let results = [];
			if (data) {
				const { all } = data.events;

				results = uniqBy(
					all
						.filter((e) => e.isActive)
						.filter((e) => dayjs().isBefore(dayjs(e.endDate).add(30, 'day'), 'day'))
						.reduce((acc, current) => [...acc, ...current.partners], [])
						.map((p) => ({
							...p,
							socialLinks: createSocialLinks(p)
						})),
					'id'
				);
			}

			return results;
		});
	}

	function getPastPartners() {
		return client.query({ query: QUERY_PAST_PARTNERS }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_PAST_PARTNERS' });

			let results = [];
			if (data) {
				const { all } = data.partners;
				results = uniqBy(
					all.map((p) => ({
						...p,
						socialLinks: createSocialLinks(p)
					})),
					'id'
				);
			}

			return results;
		});
	}

	function getEventPartners(slug = config.eventSlug) {
		const variables = { slug };

		return client.query({ query: QUERY_EVENT_PARTNERS, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_EVENT_PARTNERS' });

			let results = [];
			if (data) {
				const { get } = data.events.event;
				const { partners } = get;

				const modifiedPartners = partners.map((p) => ({
					...p,
					socialLinks: createSocialLinks(p)
				}));

				results = modifiedPartners;

				results = {
					...get,
					partners: [...modifiedPartners]
				};
			}

			return results;
		});
	}

	function queryPartnerDropDownValues() {
		const variables = {};

		return client
			.query({ query: QUERY_PARTNER_DROPDOWN_VALUES, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_PARTNER_DROPDOWN_VALUES' });

				return data;
			});
	}

	function queryPartnerJobListing(partnerSlug, jobSlug) {
		const variables = { partner: partnerSlug, slug: jobSlug };

		return client
			.query({ query: QUERY_PARTNER_JOB_LISTING, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_PARTNER_JOB_LISTING' });

				const { partner } = data.partners;
				return {
					...partner,
					socialLinks: createSocialLinks(partner)
				};
			});
	}

	return {
		getPastPartners,
		getUpcomingPartners,
		getEventPartners,
		getPartner,
		queryFollowers,
		queryNextFollowers,
		queryPartnerDropDownValues,
		queryPartnerJobListing
	};
};
