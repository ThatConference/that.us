import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export function formatActivityInitialInput(currentData) {
  const {
    eventId,
    durationInMinutes,
    startTime,
    title,
    shortDescription,
    tags,
  } = currentData;

  const initDurationInMinutes = durationInMinutes
    ? dayjs
        .utc(dayjs.duration(durationInMinutes, 'minutes').asMilliseconds())
        .format('H:mm')
    : undefined;

  const results = {
    eventId,
    title: title || '',
    shortDescription: shortDescription || '',
    tags: tags || [],
    selectedDay: startTime
      ? dayjs(startTime).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
    selectedTime: startTime ? dayjs(startTime).format('HH:mm') : undefined,
    selectedTimezone: dayjs.tz.guess(),
    selectedDuration: durationInMinutes || initDurationInMinutes,
  };

  return results;
}
