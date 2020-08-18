import ical from 'ical-generator'; // https://github.com/sebbo2002/ical-generator
import dayjs from 'dayjs';

const domain = 'that.us';

function icalWrapper(title) {
  const cal = ical({ domain, name: title });

  function create(session) {
    cal.createEvent({
      uid: `that-${session.id}`,
      start: dayjs(session.startTime).toDate(),
      end: dayjs(session.startTime)
        .add(session.durationInMinutes, 'minutes')
        .toDate(),
      summary: session.title,
      description: session.shortDescription,
      location: 'THAT.us',
      url: `https://that.us/session/${session.id}`,
    });

    return cal.toURL();
  }

  return { create };
}

export default icalWrapper;
