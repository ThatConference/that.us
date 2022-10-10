import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

export const CREATE_NEWS_POST = `
  mutation MUTATION_ALLOCATE_TICKET($url: URL!, $description: String!, $tags: [String]! ) {
    news {
      create(newsPost: { url: $url, description: $description, tags: $tags }) {
        id
      }
    }
  }
`;

export default () => {
	const client = gFetch();

	function create({ url, description, tags }) {
		const variables = {
			url,
			description,
			tags
		};

		return client.mutation({ mutation: CREATE_NEWS_POST, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'CREATE_NEWS_POST' });

			let results;

			if (data) {
				const { create } = data.news;
				results = create;
			}

			return results;
		});
	}

	return {
		create
	};
};
