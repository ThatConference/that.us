import { log } from '../utilities/error';
import { stripAuthorizationHeader } from '../utilities';

const productBaseFieldsFragment = `
  fragment productBaseFields on ProductBase {
    id
    name
    description
    productType: type
    price
    isEnabled
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
    
    theme { 
      heroSlug
    }

    venues {
      city
      state
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
        }
      }
    }
  }
`;

export const QUERY_EVENTS_BY_COMMUNITY = `
  ${eventFieldsFragment}
  query QUERY_EVENTS_BY_COMMUNITY ($slug: Slug) {
    communities {
      community (findBy: {slug: $slug}) {
        get {
          events {
            ...eventFields
          }  
        }
      }
    }
  }
`;

export default client => {
  function queryEventBySlug(slug) {
    const variables = { slug };

    return client
      .query(QUERY_EVENT_BY_SLUG, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_EVENT_BY_SLUG');

        const { event } = data.events;
        return event ? event.get : null;
      });
  }

  function queryEvents() {
    const variables = {};

    return client
      .query(QUERY_EVENTS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_EVENTS');

        const { all } = data.events;
        return all || [];
      });
  }

  function queryEventsByCommunity(slug = 'that') {
    const variables = { slug };

    return client
      .query(QUERY_EVENTS_BY_COMMUNITY, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'QUERY_EVENTS');

        const { community } = data.communities;
        return community ? community.get.events : [];
      });
  }

  return { queryEvents, queryEventsByCommunity, queryEventBySlug };
};
