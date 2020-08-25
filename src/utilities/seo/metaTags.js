/*
  <meta name="twitter:creator" content="@thatconference" />
  <meta name="twitter:site" content="https://that.us" />
  <meta name="twitter:title" content="THAT @ THAT.us" />
  <meta name="twitter:description" content="TODO: default" />

  <meta property="og:title" content="THAT" />
  <meta property="og:description" content="TODO" />
  <meta property="og:url" content="https://that.us/" />

  <meta property="og:site_name" content="THAT" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />

  <meta property="og:image" content="https://that.us/images/og-logo.png" />
*/

const create = (metaData) => {
  const results = [];

  const noindex = metaData ? metaData.noindex : false;
  const nofollow = metaData ? metaData.nofollow : false;

  const robotsContent = `${noindex ? 'noindex' : 'index'},${
    nofollow ? 'nofollow' : 'follow'
  }`;

  // defaults
  results.push({ name: 'robots', content: robotsContent });
  results.push({ name: 'googlebot', content: robotsContent });

  // if we didn't get anything, return out after the defaults
  if (!metaData) return results;

  if (metaData.description)
    results.push({ name: 'description', content: metaData.description });

  // twitter components
  if (metaData.title)
    results.push({ name: 'twitter:title', content: metaData.title });

  if (metaData.description)
    results.push({
      name: 'twitter:description',
      content: metaData.description,
    });

  if (metaData.twitter) {
    if (metaData.twitter.creator)
      results.push({
        name: 'twitter:creator',
        content: metaData.twitter.userName,
      });

    if (metaData.image) {
      results.push({ name: 'twitter:image', content: metaData.image });
      results.push({ name: 'twitter:image:alt', content: metaData.image });
    }
  }

  // open graph components
  if (metaData.title)
    results.push({ name: 'og:title', content: metaData.title });

  if (metaData.description)
    results.push({
      name: 'og:description',
      content: metaData.description,
    });

  if (metaData.openGraph.url || metaData.canonical)
    results.push({
      name: 'og:url',
      content: metaData.openGraph.url || metaData.canonical,
    });

  if (metaData.openGraph.type)
    results.push({
      name: 'og:type',
      content: metaData.openGraph.type.toLowerCase(),
    });

  return results;
};

export default create;
