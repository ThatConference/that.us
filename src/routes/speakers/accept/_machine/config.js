function create(meta) {
	return {
		id: 'speaker_accept_machine',
		initial: 'init',
		context: {
			completed: {
				one: false,
				two: false,
				three: false,
				four: false,
				five: false,
				six: false
			},
			allocations: [],
			allocationQueryExecuted: 0,
			...meta
		},

		states: {
			init: {
				always: [
					{
						cond: 'enrollmentNotStarted',
						target: '#speaker_accept_machine.step_one'
					},
					{
						cond: 'enrollmentHasCompleted',
						target: '#speaker_accept_machine.step_seven'
					},
					{
						cond: 'enrollmentInProgress',
						target: '#speaker_accept_machine.step_two'
					}
				]
			},
			step_one: {
				initial: 'init',
				states: {
					init: {
						always: [
							{
								cond: 'isAcceptedSpeaker',
								target: 'pending'
							},
							{
								target: '#speaker_accept_machine.submit_failed'
							}
						]
					},

					pending: {
						on: {
							SUBMIT: {
								target: 'submitting'
							},
							DECLINED: {
								target: 'declining'
							}
						}
					},

					submitting: {
						invoke: {
							src: 'stepOneSubmit',
							onDone: [
								{
									actions: ['stepOneSubmitSuccess'],
									target: '#speaker_accept_machine.step_two'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					},

					declining: {
						invoke: {
							src: 'speakerDeclined',
							onDone: [
								{
									actions: ['speakerDeclinedSuccess'],
									target: '#speaker_accept_machine.speaker_declined'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					}
				}
			},

			step_two: {
				initial: 'pending',

				states: {
					pending: {
						on: {
							SUBMIT: {
								target: 'submitting'
							}
						}
					},

					submitting: {
						invoke: {
							src: 'stepTwoSubmit',
							onDone: [
								{
									actions: ['stepTwoSubmitSuccess'],
									target: '#speaker_accept_machine.step_three'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					}
				}
			},

			step_three: {
				initial: 'queryMyOrders',

				states: {
					queryMyOrders: {
						invoke: {
							src: 'queryMyOrders',
							onDone: [
								{
									actions: ['queryMyOrdersSuccess'],
									target: 'queryMyOrdersSuccess'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					},

					queryMyOrdersSuccess: {
						always: [
							{
								cond: 'hasAllocationsExectionsExceeded',
								target: '#speaker_accept_machine.submit_failed'
							},
							{
								cond: 'hasOrderAllocations',
								target: 'pending'
							},
							{
								target: 'queryMyOrders'
							}
						]
					},

					pending: {
						on: {
							SUBMIT: {
								target: 'submitting'
							}
						}
					},

					submitting: {
						invoke: {
							src: 'stepThreeSubmit',
							onDone: [
								{
									actions: ['stepThreeSubmitSuccess'],
									target: '#speaker_accept_machine.step_four'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					}
				}
			},
			step_four: {
				initial: 'init',
				states: {
					init: {
						always: [
							{
								cond: 'isAtThat',
								target: 'pending'
							},
							{
								target: '#speaker_accept_machine.step_five'
							}
						]
					},
					pending: {
						on: {
							SUBMIT: {
								target: 'submitting'
							}
						}
					},

					submitting: {
						invoke: {
							src: 'stepFourSubmit',
							onDone: [
								{
									actions: ['stepFourSubmitSuccess'],
									target: '#speaker_accept_machine.step_five'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					}
				}
			},
			step_five: {
				initial: 'init',
				states: {
					init: {
						always: [
							{
								cond: 'isAtThat',
								target: 'pending'
							},
							{
								target: '#speaker_accept_machine.step_six'
							}
						]
					},

					pending: {
						on: {
							SUBMIT: {
								target: 'submitting'
							}
						}
					},

					submitting: {
						invoke: {
							src: 'stepFiveSubmit',
							onDone: [
								{
									actions: ['stepFiveSubmitSuccess'],
									target: '#speaker_accept_machine.step_six'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					}
				}
			},
			step_six: {
				initial: 'pending',

				states: {
					pending: {
						on: {
							SUBMIT: {
								target: 'submitting'
							}
						}
					},

					submitting: {
						invoke: {
							src: 'stepSixSubmit',
							onDone: [
								{
									actions: ['stepSixSubmitSuccess'],
									target: '#speaker_accept_machine.step_seven'
								}
							],
							onError: '#speaker_accept_machine.submit_failed'
						}
					}
				}
			},
			step_seven: {},

			submit_failed: {
				entry: 'logError',
				type: 'final'
			},

			speaker_declined: {
				type: 'final'
			}
		}
	};
}

export default create;
