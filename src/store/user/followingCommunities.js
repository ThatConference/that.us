import { writable } from 'svelte/store';

import meQueryApi from '../../dataSources/api.that.tech/me/queries';

const { queryMeCommunityFollows } = meQueryApi();

const store = writable([]);

function create() {
  async function get() {
    const results = await queryMeCommunityFollows();

    store.set(results);
    return store;
  }

  // function refresh() {
  //   return get();
  // }

  // function add(id) {
  //   favoriteStore.update(current => [...current, id]);
  // }

  // function remove(id) {
  //   favoriteStore.update(current => current.filter(c => current !== c.id));
  // }

  return {
    get,
    // refresh,
    // add,
    // remove,
  };
}

export default create;
