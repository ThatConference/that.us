import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const format = values => {
  const {
    selectedDay,
    selectedTime,
    selectedTimezone,
    selectedDuration,
  } = values;

  const parsedStartTime = dayjs(`${selectedDay} ${selectedTime}`).tz(
    selectedTimezone,
  );

  const parsedDuration = dayjs(selectedDuration, 'H:mm');

  const { title, shortDescription, tags } = values;
  const newActivity = {
    title,
    shortDescription,
    tags,
    status: 'ACCEPTED',
    durationInMinutes: dayjs
      .duration({
        hour: parsedDuration.hour(),
        minute: parsedDuration.minute(),
      })
      .asMinutes(),
    startTime: parsedStartTime,
  };

  return newActivity;
};
