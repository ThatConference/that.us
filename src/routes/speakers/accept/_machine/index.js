import { goto } from '$app/navigation';
import { createMachine, assign } from 'xstate';

import { log } from '$utils/error';
import speakerMutationsApi from '$dataSources/api.that.tech/speakers/mutations';
import membersMutationApi from '$dataSources/api.that.tech/members/mutations';
import speakerQueryApi from '$dataSources/api.that.tech/speakers/queries';

import config from './config';

function createServices() {
	const { acceptInvitation, orderProducts, acceptRoomCompensation, completeSpeakerEnrollment } =
		speakerMutationsApi();

	const { queryMyOrders } = speakerQueryApi();
	const { updateEmergencyContact } = membersMutationApi();

	return {
		guards: {
			hasAgreedToSpeak: (context) => context.acceptedSpeaker.agreeToSpeak,
			isAcceptedSpeaker: (context) => context.acceptedSpeaker.isAcceptedSpeaker,
			isAtThat: (context) => context.acceptedSpeaker.platform === 'AT_THAT',
			isOnThat: (context) => context.acceptedSpeaker.platform === 'ON_THAT',
			enrollmentNotStarted: (context) => context.acceptedSpeaker.status === 'NOT_STARTED',
			enrollmentInProgress: (context) => context.acceptedSpeaker.status === 'IN_PROGRESS',
			enrollmentHasCompleted: (context) => context.acceptedSpeaker.status === 'COMPLETE',
			hasOrderAllocations: (context) => context.allocations.length > 0,
			hasAllocationsExectionsExceeded: (context) => context.allocationQueryExecuted > 5
		},

		services: {
			stepOneSubmit: (_, { eventSlug, agreeToSpeak, reason = undefined }) =>
				acceptInvitation({ eventSlug, agreeToSpeak, reason }),

			speakerDeclined: (_, { eventSlug, agreeToSpeak, reason = undefined }) =>
				acceptInvitation({ eventSlug, agreeToSpeak, reason }),

			queryMyOrders: (context) =>
				queryMyOrders({ eventSlug: context.eventSlug, orderType: 'SPEAKER' }),
			stepTwoSubmit: (_, { eventSlug, products }) => orderProducts({ eventSlug, products }),

			stepThreeSubmit: (_, __) => Promise.resolve(),
			stepFourSubmit: (_, event) => {
				let modifiedEvent = { ...event };
				delete modifiedEvent.type;

				return updateEmergencyContact(modifiedEvent);
			},
			stepFiveSubmit: (_, event) => {
				let modifiedEvent = { ...event };
				delete modifiedEvent.type;

				return acceptRoomCompensation(modifiedEvent);
			},

			stepSixSubmit: (context) => completeSpeakerEnrollment({ eventSlug: context.eventSlug })
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'speaker accept state machine ended in the error state.',
					extra: { context, event }
				}),

			stepOneSubmitSuccess: assign({
				completed: (context) => ({ ...context.completed, one: true })
			}),

			stepTwoSubmitSuccess: assign({
				completed: (context) => ({ ...context.completed, two: true })
			}),

			queryMyOrdersSuccess: assign({
				orderId: (_, { data }) => (data.length > 0 ? data[0].id : undefined),
				allocations: (_, { data }) => (data.length > 0 ? [...data[0].orderAllocations] : []),
				allocationQueryExecuted: (context) => context.allocationQueryExecuted + 1
			}),

			stepThreeSubmitSuccess: assign({
				completed: (context) => ({ ...context.completed, three: true })
			}),

			stepFourSubmitSuccess: assign({
				completed: (context) => ({ ...context.completed, four: true })
			}),

			stepFiveSubmitSuccess: assign({
				completed: (context) => ({ ...context.completed, five: true })
			}),

			stepSixSubmitSuccess: assign({
				completed: (context) => ({ ...context.completed, six: true })
			}),

			speakerDeclinedSuccess: () => goto('/speakers/declined/')
		}
	};
}

function create(meta) {
	const services = createServices();
	return createMachine({ ...config(meta) }, { ...services });
}

export default create;
