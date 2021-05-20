import * as yup from 'yup';

const baseValidation = {
  eventId: yup.string().required('Please select an event.'),
  title: yup.string().trim().required('Please enter a title.'),
  shortDescription: yup
    .string()
    .ensure()
    .trim()
    .required('Please add a short description.'),

  tags: yup.array().ensure().of(yup.string()),

  /* 
    activity resources
  */
  takeaways: yup.array().ensure().of(yup.string()),

  supportingArtifacts: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .trim()
        .required('Please add a title for this resource.'),
      url: yup.string().url().required('Please add a url for this resource.'),
      description: yup.string().trim(),
    }),
  ),
};

const scheduleValidation = {
  selectedDay: yup.string().required('Please select a day.'),
  selectedTime: yup.string().required('Please select a starting time.'),
  selectedTimezone: yup
    .string()
    .required('Please select the appropiate timezone.'),
  selectedDuration: yup
    .string()
    .required('Please select an estimated duration.'),
};

const extendedValidation = {
  /* 
    The What
  */
  longDescription: yup
    .string()
    .ensure()
    .trim()
    .required('Please add a full description.'),

  /*
    Activity Attributes
  */
  targetLocation: yup
    .string()
    .ensure()
    .required('Please select your desired location.'),

  category: yup.string().ensure().trim().required('Please add a target track.'),

  type: yup
    .string()
    .ensure()
    .trim()
    .required('Please select what type of activity this is.'),

  primaryCategory: yup
    .string()
    .ensure()

    .required('Please add a primary category.'),

  secondaryCategory: yup.array().nullable(),

  /* 
    target audience
  */
  targetAudience: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select your intended audience.'),

  prerequisites: yup.string().trim(),

  /*
    help us help you
  */
  whyAreYou: yup
    .string()
    .trim()
    .required('Please tell us why you are the best to host this activity.'),

  mentorship: yup
    .string()
    .required('Please tell us if you need any help preparing.'),

  canRecord: yup
    .boolean()
    .required('Please tell us if you would like to be recoreded.'),

  isMinor: yup
    .boolean()
    .required('Please indicate if you are under 18 years old.'),

  otherComments: yup.string().trim(),
};

const workshopValidation = {
  /*
    Workshop Details
  */
  agenda: yup
    .string()
    .ensure()
    .trim()
    .required('Please add an agenda category.'),

  duration: yup
    .string()
    .ensure()
    .required('Please select the appromiate duration.'),

  prerequisites: yup
    .string()
    .ensure()
    .required('What things should folks know or do before they get arrive.'),
};

export const openSpaces = yup.object().shape({
  ...baseValidation,
  ...scheduleValidation,
});

export const standard = yup.object().shape({
  ...baseValidation,
  ...extendedValidation,
});

export const workshop = yup.object().shape({
  ...baseValidation,
  ...extendedValidation,
  ...workshopValidation,
});

export const online = yup.object().shape({
  ...baseValidation,
  ...scheduleValidation,
});
