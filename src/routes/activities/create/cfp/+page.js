export async function load({ url, parent }) {
	//todo: we need to get this from some config somewhere or better yet an api
	const upNextHybridEvent = `OlyDhUyrp2DI9babqZO9`;

	let { events } = await parent();
	const eventId = url.searchParams.has('event') ? url.searchParams.get('event') : upNextHybridEvent;
	const selectedEvent = events.find((i) => i.id === eventId);

	const activeEvents = {
		daily: [],
		online: [],
		hybrid: [],
		backdoor: selectedEvent
	};

	return {
		activeEvents,
		eventId,
		isCallForSpeakersOpen: selectedEvent.isCallForSpeakersOpen
	};
}
