import { stripAuthorizationHeader } from '../utilities';
import config from '../../../config';

export const QUERY_PARTNERS = `
  query getEventPartners($slug: String!) {
    events {
      event(findBy: { slug: $slug }) {
        get{
          partners {
            id
            level
            companyName
            companyLogo
            slug
            linkedIn
            github
            youtube
            instagram
            twitter
            facebook
            twitch
          }
        }
      }
    }
  }
`;

export default (client, slug = config.eventSlug) => {
  function query() {
    const variables = {
      slug,
    };

    return client
      .query(QUERY_PARTNERS, variables, {
        fetchOptions: { headers: { ...stripAuthorizationHeader(client) } },
      })
      .toPromise()
      .then(r => {
        let results = [];

        if (r.data) {
          const { partners } = r.data.events.event.get;

          const modifiedPartners = partners.map(p => {
            const socialLinks = [];
            if (p.linkedIn)
              socialLinks.push({ href: p.linkedIn, network: 'LINKEDIN' });
            if (p.github)
              socialLinks.push({ href: p.github, network: 'GITHUB' });
            if (p.youtube)
              socialLinks.push({ href: p.youtube, network: 'YOUTUBE' });
            if (p.instagram)
              socialLinks.push({ href: p.instagram, network: 'INSTAGRAM' });
            if (p.twitter)
              socialLinks.push({ href: p.twitter, network: 'TWITTER' });
            if (p.facebook)
              socialLinks.push({ href: p.facebook, network: 'FACEBOOK' });
            if (p.twitch)
              socialLinks.push({ href: p.twitch, network: 'TWITCH' });

            return {
              ...p,
              socialLinks,
            };
          });

          results = modifiedPartners;
        }

        return results;
      });
  }

  const getEventPartners = () => query();

  // todo stubbed out until we have paged partners
  const getNextEventPartners = () => null;

  return {
    getEventPartners,
    getNextEventPartners,
  };
};
