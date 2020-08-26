export const securityConfig = {
  domain: 'auth.that.tech',
  client_id: '1ERg68Y2ie7QuO6wnr7EAadWT4Pvbfnm',
  audience: 'https://api.that.tech/graphql',
  scope: 'openid profile email offline_access',
  useRefreshTokens: true,
};

export default {
  eventId: 'ByE7Dc7eCGcRFzLhWhuI',
  eventSlug: 'wi/2020',
  // api: 'https://api.that.tech',
  api: 'https://gateway-bgydxslf5a-uc.a.run.app',
  profileImageApi: 'https://api.that.tech/profile',
  defaultProfileImage:
    'https://images.that.tech/members/person-placeholder.jpg?auto=format&fit=facearea&facepad=10&mask=ellipse&h=250&w=250&q=50&dpr=2',
  gtag: 'UA-21705613-11',
};

export const events = {
  thatOnline: {
    eventId: 'ByE7Dc7eCGcRFzLhWhuI',
    title: 'THAT Online',
    date: 'August 3rd, 2020',
  },

  thatUs: {
    eventId: 'YWavA70szR8rxSwrLJaL',
    title: 'THAT',
  },
};
