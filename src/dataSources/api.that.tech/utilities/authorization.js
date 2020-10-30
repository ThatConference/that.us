export function stripAuthorizationHeader(client) {
  const newHeaders = {
    ...client.fetchOptions().headers,
  };

  delete newHeaders.authorization;
  return newHeaders;
}
