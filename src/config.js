import { version } from '../package.json';

export default {
  nodeEnv: process.env.NODE_ENV,
  version,
  eventId: 'ByE7Dc7eCGcRFzLhWhuI',
  eventSlug: 'wi/2020',
  api: 'https://gateway-bgydxslf5a-uc.a.run.app',
  profileImageApi: 'https://api.that.tech/profile',
  defaultProfileImage:
    'https://images.that.tech/members/person-placeholder.jpg?auto=format&fit=facearea&facepad=10&mask=ellipse&h=250&w=250&q=50&dpr=2',
  gtag: 'UA-21705613-11',
};

export const securityConfig = {
  domain: 'auth.that.tech',
  client_id: '1ERg68Y2ie7QuO6wnr7EAadWT4Pvbfnm',
  audience: 'https://api.that.tech/graphql',
  scope: 'openid profile email offline_access',
  useRefreshTokens: true,
};

export const logging = {
  dsn:
    'https://15d4b436dc0a4366a0ac388c65772926@o235190.ingest.sentry.io/5357492',
  environment: process.env.NODE_ENV,
  logRocket: 'c59zeb/that-prod',
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

export const debug = {
  xstate: process.env.XSTATE_DEBUG,
};

export const imageCrops = {
  profile: '?mask=ellipse&w=500&h=500&fit=crop',
};
