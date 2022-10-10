import auth0 from '$utils/security/client';
export const load = auth0.withPageAuthRequired();
