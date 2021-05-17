import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

function formatDuration(selectedDuration) {
  const parsedDuration = dayjs(selectedDuration, 'H:mm');

  return dayjs
    .duration({
      hour: parsedDuration.hour(),
      minute: parsedDuration.minute(),
    })
    .asMinutes();
}

function cleanValues(values) {
  const newValues = values;

  delete newValues.selectedDay;
  delete newValues.selectedTime;
  delete newValues.selectedTimezone;
  delete newValues.selectedDuration;
  delete newValues.eventId;
  delete newValues.type;

  return newValues;
}

function cleanValuesForUpdate(values) {
  const newValues = values;

  delete newValues.selectedDay;
  delete newValues.selectedTime;
  delete newValues.selectedTimezone;
  delete newValues.selectedDuration;

  return newValues;
}

function formatStartTime({ selectedTime, selectedDay, selectedTimezone }) {
  const formattedSelectedDay = dayjs(selectedDay).format('YYYY-MM-DD');
  const parsedStartTime = dayjs(`${formattedSelectedDay} ${selectedTime}`).tz(
    selectedTimezone,
  );

  if (!parsedStartTime.isValid()) {
    throw new Error('invalid date/time');
  }

  return parsedStartTime;
}

function formatForType(activity) {
  const newActivity = activity;

  const {
    selectedDay,
    selectedTime,
    selectedTimezone,
    selectedDuration,
  } = newActivity;

  switch (newActivity.type) {
    case 'KEYNOTE':
      newActivity.status = 'SUBMITTED';
      newActivity.durationInMinutes = 90;
      delete newActivity.prerequisites;
      break;

    case 'REGULAR':
      newActivity.status = 'SUBMITTED';
      newActivity.durationInMinutes = 60;

      break;

    case 'WORKSHOP':
      newActivity.status = 'SUBMITTED';

      switch (newActivity.duration) {
        case 'QUARTER_DAY':
          newActivity.durationInMinutes = 120;
          break;

        case 'HALF_DAY':
          newActivity.durationInMinutes = 240;
          break;

        case 'FULL_DAY':
          newActivity.durationInMinutes = 480;
          break;
        default:
          break;
      }

      break;

    case 'PANEL':
      newActivity.status = 'SUBMITTED';
      newActivity.durationInMinutes = 60;
      break;

    case 'OPEN_SPACE':
    default:
      newActivity.status = 'ACCEPTED';
      newActivity.startTime = formatStartTime({
        selectedTime,
        selectedDay,
        selectedTimezone,
      });
      newActivity.durationInMinutes = formatDuration(selectedDuration);
      newActivity.type = 'OPEN_SPACE';
      break;
  }

  return newActivity;
}

export const formatCreate = values => {
  const formattedActivity = formatForType(values);
  const { type } = formattedActivity;

  const cleanedActivity = {
    ...cleanValues(formattedActivity),
  };

  return { activity: cleanedActivity, type };
};

export const formatUpdate = values => {
  const formattedActivity = {
    ...cleanValuesForUpdate(formatForType(values)),
  };

  return { activity: formattedActivity, type: formattedActivity.type };
};
