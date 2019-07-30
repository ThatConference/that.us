import micro, { send } from 'micro';
import { get, post, router } from 'microrouter';

import sandbar from './index';

const server = micro(
  router(get('/graph', sandbar), post('/graph', sandbar), (req, res) =>
    send(res, 404, 'not found')
  )
);

server.listen(3000);
