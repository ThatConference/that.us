import gFetch from '$utils/gfetch';

import { log } from '../utilities/error';

const productBaseFieldsFragment = `
	fragment productBaseFields on ProductBase {
		id
		name
		description
		productType: type
		price
		isEnabled
		uiReference
		shortDescription
	}
`;

const coreSessionFields = `
	fragment coreSessionFields on AcceptedSession {
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
	}
`;

const userFragment = `
	fragment memberFields on PublicProfile {
		id
		firstName
		lastName
		company
		jobTitle
		profileImage
		profileSlug
		lifeHack
		interests
		profileLinks {
			isPublic
			linkType
			url
		}
		earnedMeritBadges {
			id
			name
			image
			description
		}    
	}
`;

const coreSpeakerFields = `
	fragment coreSpeakerFields on PublicProfile {
		id
		firstName
		lastName
		bio
		jobTitle
		company
		profileImage
		profileSlug
		earnedMeritBadges {
			id
			name
			image
			description
		}
	}
`;

const eventFieldsFragment = `
	${productBaseFieldsFragment}
	${coreSessionFields}
	${coreSpeakerFields}
	${userFragment}
	fragment eventFields on Event {
		id
		name
		description
		slogan
		type  
		startDate
		endDate
		year
		slug
		community
		isFeatured
		isActive
		logo
		callForSpeakersOpenDate
		callForSpeakersCloseDate
		isCallForSpeakersOpen
		isCallForOnSpeakersOpen
		callForOnSpeakersOpenDate
		callForOnSpeakersCloseDate
		ticketsOnSaleFrom
		
		theme { 
			heroSlug
		}

		venues {
			name
			address
			city
			state
			zip
		}

		products {
			...productBaseFields
		}

		sessions {
			sessions {
				...coreSessionFields
				speakers {
					...coreSpeakerFields
				}
			}
		}

		followers {
			members {
				...memberFields
			}
		}
	}
`;

export const QUERY_EVENTS = `
	${eventFieldsFragment}
	query QUERY_EVENTS {
		events {
			all {
				...eventFields
			}
		}
	}
`;

export const QUERY_EVENT_BY_SLUG = `
	${eventFieldsFragment}
	query QUERY_EVENT_BY_SLUG ($slug: String) {
		events {
			event (findBy: {slug: $slug}) {
				get {
					...eventFields
					milestones {
						title
						description
						dueDate
					}
				}
			}
		}
	}
`;

export const QUERY_THAT_CONFERENCE_EVENT = `
	query QUERY_EVENT_BY_SLUG ($slug: String) {
		events {
			event (findBy: {slug: $slug}) {
				get {
					startDate
					endDate
					venues {
						name
						address
						city
						state
						zip
					}
				}
			}
		}
	}
`;

export const QUERY_EVENT_WITH_FEATURED_SPEAKERS_BY_SLUG = `
	${eventFieldsFragment}
	query QUERY_EVENT_WITH_FEATURED_SPEAKERS_BY_SLUG ($slug: String) {
		events {
			event (findBy: {slug: $slug}) {
				get {
					...eventFields
					milestones {
						title
						description
						dueDate
					}
					featuredSpeakers {
						id
						firstName
						lastName
						jobTitle
						company
						profileImage
						earnedMeritBadges {
							id
							name
							image
							description
						}
						profileSlug
						profileLinks {
							isPublic
							linkType
							url					
						}						
					}
				}
			}
		}
	}
`;


export const QUERY_EVENT_WITH_SPEAKERS_BY_SLUG = `
	${eventFieldsFragment}
	query QUERY_EVENT_WITH_SPEAKERS_BY_SLUG ($slug: String) {
		events {
			event (findBy: {slug: $slug}) {
				get {
					...eventFields
					milestones {
						title
						description
						dueDate
					}
					speakers {
						id
						firstName
						lastName
						jobTitle
						company
						profileImage
						earnedMeritBadges {
							id
							name
							image
							description
						}
						profileSlug
						profileLinks {
							isPublic
							linkType
							url					
						}						
					}
				}
			}
		}
	}
`;


export const QUERY_EVENT_BY_ID = `
	${eventFieldsFragment}
	query QUERY_EVENT_BY_ID ($eventId: ID) {
		events {
			event (findBy: {id: $eventId}) {
				get {
					...eventFields
				}
			}
		}
	}
`;

export const QUERY_EVENT_FOR_CFP = `
	query QUERY_EVENT_FOR_CFP ($slug: String) {
		events {
			event (findBy: {slug: $slug}) {
				get {
					id
					name
					description
					slogan
					type  
					startDate
					endDate
					year
					slug
					logo
					callForSpeakersOpenDate
					callForSpeakersCloseDate
					isCallForSpeakersOpen
					isCallForOnSpeakersOpen
					callForOnSpeakersOpenDate
					callForOnSpeakersCloseDate
					ticketsOnSaleFrom
					
					milestones{
						title
						description
						dueDate
					}
					venues {
						name
						address
						city
						state
						zip
					}
				}
			}
		}
	}
`;

export const QUERY_EVENTS_BY_COMMUNITY = `
	query QUERY_EVENTS_BY_COMMUNITY ($slug: Slug) {
		communities {
			community (findBy: {slug: $slug}) {
				get {
					events {
						id
						name
						description
						slogan
						type  
						startDate
						endDate
						year
						slug
						community
						isFeatured
						isActive
						logo
						callForSpeakersOpenDate
						callForSpeakersCloseDate
						isCallForSpeakersOpen
						isCallForOnSpeakersOpen
						callForOnSpeakersOpenDate
						callForOnSpeakersCloseDate
						ticketsOnSaleFrom
						
						theme { 
							heroSlug
						}

						venues {
							name
							address
							city
							state
							zip
						}
					}  
				}
			}
		}
	}
`;

export const QUERY_EVENT_FOR_ACCEPTED_SPEAKER = `
	query QUERY_EVENT_FOR_ACCEPTED_SPEAKER ($eventSlug: String!) {
		events {
			event(findBy: {slug: $eventSlug}) {
				get {
					id
					name
					startDate
					endDate
					slug
					logo
					venues {
						name
						address
						city
						state
						zip
					}
				}
			}
		}
	}
`;

export const QUERY_CAN_ACCESS_EVENT = `
	query QUERY_CAN_ACCESS_EVENT ($eventId: ID!) {
		events {
			me {
				access (eventId: $eventId) {
					hasAccess
				}
			}
		}
	}
`;

export const QUERY_CAN_ADD_SESSION = `
	query QUERY_CAN_ADD_SESSION ($eventId: ID!) {
		events {
			me {
				access (eventId: $eventId) {
					addSession
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function queryThatConferenceEvent(slug) {
		const variables = { slug };

		return client
			.query({ query: QUERY_THAT_CONFERENCE_EVENT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_THAT_CONFERENCE_EVENT' });

				const { event } = data.events;
				return event ? event.get : null;
			});
	}

	function queryEventBySlug(slug) {
		const variables = { slug };

		return client.query({ query: QUERY_EVENT_BY_SLUG, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_EVENT_BY_SLUG' });

			const { event } = data.events;
			return event ? event.get : null;
		});
	}

	function queryEventWithFeaturedSpeakersBySlug(slug) {
		const variables = { slug };

		return client
			.query({ query: QUERY_EVENT_WITH_FEATURED_SPEAKERS_BY_SLUG, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_EVENT_WITH_FEATURED_SPEAKERS_BY_SLUG' });

				const { event } = data.events;
				return event ? event.get : null;
			});
	}

	function queryEventWithSpeakersBySlug(slug) {
		const variables = { slug };

		return client
			.query({ query: QUERY_EVENT_WITH_SPEAKERS_BY_SLUG, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_EVENT_WITH_SPEAKERS_BY_SLUG' });

				const { event } = data.events;
				return event ? event.get : null;
			});
	}

	function queryEventById(eventId) {
		const variables = { eventId };

		return client.query({ query: QUERY_EVENT_BY_ID, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_EVENT_BY_ID' });

			const { event } = data.events;
			return event ? event.get : null;
		});
	}

	function queryEventForCfp(slug) {
		const variables = { slug };

		return client.query({ query: QUERY_EVENT_FOR_CFP, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_EVENT_FOR_CFP' });

			const { event } = data.events;
			return event ? event.get : null;
		});
	}

	function queryEvents() {
		const variables = {};
		return client.query({ query: QUERY_EVENTS, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_EVENTS' });

			const { all } = data.events;
			return all || [];
		});
	}

	function queryEventsByCommunity(slug = 'that') {
		const variables = { slug };

		return client
			.query({ query: QUERY_EVENTS_BY_COMMUNITY, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_EVENTS_BY_COMMUNITY' });

				const { community } = data.communities;
				return community ? community.get.events : [];
			});
	}

	function queryEventForAcceptedSpeaker(eventSlug) {
		const variables = { eventSlug };

		return client
			.query({ query: QUERY_EVENT_FOR_ACCEPTED_SPEAKER, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_EVENT_FOR_ACCEPTED_SPEAKER' });

				return data?.events?.event?.get || null;
			});
	}

	function canAddSession(eventId) {
		const variables = { eventId };

		return client
			.secureQuery({ query: QUERY_CAN_ADD_SESSION, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_CAN_ADD_SESSION' });

				const { addSession } = data.events.me.access;
				return addSession || false;
			});
	}

	function canAccessEvent(eventId) {
		const variables = { eventId };

		return client
			.secureQuery({ query: QUERY_CAN_ACCESS_EVENT, variables })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_CAN_ACCESS_EVENT' });

				const { hasAccess } = data.events.me.access;
				return hasAccess || false;
			});
	}

	return {
		queryEvents,
		queryEventsByCommunity,
		queryEventBySlug,
		queryEventWithSpeakersBySlug,
		queryEventWithFeaturedSpeakersBySlug,
		queryEventById,
		queryEventForCfp,
		queryEventForAcceptedSpeaker,
		canAddSession,
		canAccessEvent,
		queryThatConferenceEvent
	};
};
