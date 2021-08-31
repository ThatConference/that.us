import gFetch from '$utils/gFetch';

import { log } from '../utilities/error';

const baseSessionFields = `
  fragment baseSessionFields on Base {
    id
    title
  }
`;

export const MUTATION_CREATE_KEYNOTE = `
  ${baseSessionFields}
  mutation createKeynoteSession ($eventId: ID!, $session: KeynoteCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        session: keynote (session: $session) {
          ...baseSessionFields
        }
      }
    }
  }
`;

export const MUTATION_CREATE_OPENSPACE = `
  ${baseSessionFields}
  mutation createOpenSpaceSession ($eventId: ID!, $session: OpenSpaceCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        session: openSpace (session: $session) {
          ...baseSessionFields
        }
      }
    }
  }
`;

export const MUTATION_CREATE_REGULAR = `
  ${baseSessionFields}
  mutation createRegularSession ($eventId: ID!, $session: RegularCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        session: regular (session: $session) {
          ...baseSessionFields
        }
      }
    }
  }
`;

export const MUTATION_CREATE_WORKSHOP = `
  ${baseSessionFields}
  mutation createWorkshopSession ($eventId: ID!, $session: WorkshopCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        session: workshop (session: $session) {
          ...baseSessionFields
        }
      }
    }
  }
`;

export const MUTATION_CREATE_PANEL = `
  ${baseSessionFields}
  mutation createPanelSession ($eventId: ID!, $session: PanelCreateInput!) {
    sessions {
      create(eventId: $eventId) {
        session: panel (session: $session) {
          ...baseSessionFields
        }
      }
    }
  }
`;

// updates

export const MUTATION_UPDATE_KEYNOTE = `
  ${baseSessionFields}
  mutation updateKeynoteSession ($sessionId: ID!, $session: KeynoteUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          session: keynote (session: $session) {
            ...baseSessionFields
          }
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_OPENSPACE = `
  ${baseSessionFields}
  mutation updateOpenSpaceSession ($sessionId: ID!, $session: OpenSpaceUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          session: openSpace (session: $session) {
            ...baseSessionFields
          }
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_REGULAR = `
  ${baseSessionFields}
  mutation updateRegularSession ($sessionId: ID!, $session: RegularUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          session: regular (session: $session) {
            ...baseSessionFields
          }
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_WORKSHOP = `
  ${baseSessionFields}
  mutation updateWorkshopSession ($sessionId: ID!, $session: WorkshopUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          session: workshop (session: $session) {
            ...baseSessionFields
          }
        }
      }
    }
  }
`;

export const MUTATION_UPDATE_PANEL = `
  ${baseSessionFields}
  mutation updatePanelSession ($sessionId: ID!, $session: PanelUpdateInput!) {
    sessions {
      session(id: $sessionId) {
        update {
          session: panel (session: $session) {
            ...baseSessionFields
          }
        }
      }
    }
  }
`;

function mapCreateMutation(type) {
	let mutation;

	switch (type) {
		case 'KEYNOTE':
			mutation = MUTATION_CREATE_KEYNOTE;
			break;

		case 'OPEN_SPACE':
			mutation = MUTATION_CREATE_OPENSPACE;
			break;

		case 'REGULAR':
			mutation = MUTATION_CREATE_REGULAR;
			break;

		case 'WORKSHOP':
			mutation = MUTATION_CREATE_WORKSHOP;
			break;

		case 'PANEL':
			mutation = MUTATION_CREATE_PANEL;
			break;

		default:
			throw new Error('Session Type not mapped thus no mutation found.');
	}

	return mutation;
}

function mapUpdateMutation(type) {
	let mutation;

	switch (type) {
		case 'KEYNOTE':
			mutation = MUTATION_UPDATE_KEYNOTE;
			break;

		case 'OPEN_SPACE':
			mutation = MUTATION_UPDATE_OPENSPACE;
			break;

		case 'REGULAR':
			mutation = MUTATION_UPDATE_REGULAR;
			break;

		case 'WORKSHOP':
			mutation = MUTATION_UPDATE_WORKSHOP;
			break;

		case 'PANEL':
			mutation = MUTATION_UPDATE_PANEL;
			break;

		default:
			throw new Error('Session Type not mapped thus no mutation found.');
	}

	return mutation;
}

export default () => {
	const client = gFetch();

	function createSession(eventId, sessionType, session) {
		const variables = { eventId, session };
		const mutation = mapCreateMutation(sessionType);

		return client
			.mutation(mutation, variables)
			.toPromise()
			.then(({ data, error }) => {
				if (error) log(error, mutation);

				return data.sessions.create.session;
			});
	}

	function updateSession(sessionId, sessionType, session) {
		const variables = { sessionId, session };
		const mutation = mapUpdateMutation(sessionType);

		return client
			.mutation(mutation, variables)
			.toPromise()
			.then(({ data, error }) => {
				if (error) log(error, mutation);
				return data.sessions.session.update.session;
			});
	}

	return { createSession, updateSession };
};
