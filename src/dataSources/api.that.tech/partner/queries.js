import { log } from '../utilities/error';

import { stripAuthorizationHeader } from '../utilities';
import config from '../../../config';

const coreFieldsFragment = `
  fragment coreFieldsFragment on Partner {
    id
    slug
    companyName
    companyLogo
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
  query queryPartner($slug: Slug!) {
    partners {
      partner(findBy: { slug: $slug }) {
        ...coreFieldsFragment
        website
        aboutUs
        city
        state
        goals
      
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
        
        members {
          id
          firstName
          lastName
          jobTitle
          profileImage
          profileSlug
        }
        
        ...socialLinksFieldsFragment
      }
    }
  }
`;

export const QUERY_FOLLOWERS = `
  query queryPartnerFollowersById($id: ID) {
    partners {
      partner(findBy: {id: $id}) {
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

function createSocialLinks(partner) {
  const socialLinks = [];

  if (partner.linkedIn)
    socialLinks.push({ href: partner.linkedIn, network: 'LINKEDIN' });
  if (partner.github)
    socialLinks.push({ href: partner.github, network: 'GITHUB' });
  if (partner.youtube)
    socialLinks.push({ href: partner.youtube, network: 'YOUTUBE' });
  if (partner.instagram)
    socialLinks.push({ href: partner.instagram, network: 'INSTAGRAM' });
  if (partner.twitter)
    socialLinks.push({ href: partner.twitter, network: 'TWITTER' });
  if (partner.facebook)
    socialLinks.push({ href: partner.facebook, network: 'FACEBOOK' });
  if (partner.twitch)
    socialLinks.push({ href: partner.twitch, network: 'TWITCH' });

  return socialLinks;
}

export default client => {
  function query(slug) {
    const variables = { slug };
    return client
      .query(QUERY_PARTNERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_partners');

        let results = [];
        if (data) {
          const { partners } = data.events.event.get;

          const modifiedPartners = partners.map(p => ({
            ...p,
            socialLinks: createSocialLinks(p),
          }));

          results = modifiedPartners;
        }

        return results;
      });
  }

  const getEventPartners = (slug = config.eventSlug) => query(slug);
  const getNextEventPartners = (slug = config.eventSlug) => null; // todo stubbed out until we have paged partners

  const getPartner = slug => {
    const variables = { slug };
    return client
      .query(QUERY_PARTNER, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_partners');

        const { partner } = data.partners;
        return partner
          ? { ...partner, socialLinks: createSocialLinks(partner) }
          : null;
      });
  };

  const queryFollowers = id => {
    const variables = { id };
    return client
      .query(QUERY_FOLLOWERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_partners');

        const { partner } = data.partners;
        return partner || null; // followerCount and followers are in partner
      });
  };

  const queryNextFollowers = (id, cursor) => {
    const variables = { id, cursor };
    return client
      .query(QUERY_NEXT_FOLLOWERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(({ data, error }) => {
        if (error) log(error, 'query_partners');

        const { partner } = data.partners;
        return partner ? partner.followers : [];
      });
  };

  return {
    getEventPartners,
    getNextEventPartners,
    getPartner,
    queryFollowers,
    queryNextFollowers,
  };
};
