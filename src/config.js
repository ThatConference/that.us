export const securityConfig = {
  domain: 'auth.that.tech',
  client_id: '1ERg68Y2ie7QuO6wnr7EAadWT4Pvbfnm',
  redirect_uri: 'http://localhost:5000/sessions',
  audience: 'https://api.that.tech/graphql',
  scope: 'openid profile email offline_access',
  useRefreshTokens: true,
};

export default {
  eventId: 'ByE7Dc7eCGcRFzLhWhuI',
  eventSlug: 'wi/2020',
  api: 'https://api.that.tech',
  profileImageApi: 'https://api.that.tech/profile',
  defaultProfileImage:
    'https://images.that.tech/members/person-placeholder.jpg?auto=format&fit=facearea&facepad=10&mask=ellipse&ixlib=react-9.0.2&h=250&w=250&q=50&dpr=2',
};
