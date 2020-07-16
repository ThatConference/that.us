import config from '../../config';

export const QUERY_PARTNERS = `
  query getEventPartners($slug: String!) {
    events {
      eventBySlug(slug: $slug) {
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
`;

export default (client, slug = config.eventSlug) => {
  function query() {
    const variables = {
      slug,
    };

    return client
      .query(QUERY_PARTNERS, variables)
      .toPromise()
      .then((r) => {
        let results = [];

        if (r.data) {
          const { partners } = r.data.events.eventBySlug;

          const modifiedPartners = partners.map((p) => {
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

  const get = () => query();

  return {
    get,
  };
};
