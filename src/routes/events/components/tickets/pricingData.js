export const ticketBreakdown = [
  {
    uiReference: 'WORKSHOPS',
    includes: [
      {
        title: 'Event Access',
        includes: [{ title: 'Monday 7/26' }],
      },
      {
        title: 'Food and Beverage',
        includes: [{ title: 'Monday Lunch' }],
      },
      {
        title: 'Other ???',
        includes: [{ title: 'Welcome Reception' }],
      },
      {
        title: 'Other',
        includes: [{ title: 'Conference Badge' }, { title: 'Wifi Access' }],
      },
    ],
  },
  {
    uiReference: 'VIRTUAL_CAMPER',
    includes: [
      {
        title: 'Event Access',
        includes: [
          { title: 'Tuesday 7/27' },
          { title: 'Wednesday 7/28' },
          { title: 'Thursday 7/29' },
        ],
      },
      {
        title: 'Other',
        includes: [{ title: 'T-Shirt' }],
      },
    ],
  },
  {
    uiReference: 'CAMPER_NO_FOOD',
    includes: [
      {
        title: 'Event Access',
        includes: [
          { title: 'Tuesday 7/27' },
          { title: 'Wednesday 7/28' },
          { title: 'Thursday 7/29' },
        ],
      },
      {
        title: 'Other ???',
        includes: [
          { title: 'Welcome Reception' },
          { title: 'Game Night' },
          { title: 'Water Park Party' },
        ],
      },
      {
        title: 'Other',
        includes: [
          { title: 'Conference Badge' },
          { title: 'T-Shirt' },
          { title: 'THAT Gift' },
          { title: 'Wifi Access' },
        ],
      },
    ],
  },
  {
    uiReference: 'CAMPER',
    includes: [
      {
        title: 'Event Access',
        includes: [
          { title: 'Tuesday 7/27' },
          { title: 'Wednesday 7/28' },
          { title: 'Thursday 7/29' },
        ],
      },
      {
        title: 'Food and Beverage',
        includes: [
          { title: 'Tuesday Breakfast & Lunch' },
          { title: 'Happy Hour' },
          { title: 'Wednesday Breakfast & Lunch' },
          { title: 'Wednesday Hog Roast' },
          { title: 'Thursday Breakfast & Lunch' },
          { title: 'Closing Smores Bar' },
          { title: 'All Day Caffeine & H20' },
        ],
      },
      {
        title: 'Other ???',
        includes: [
          { title: 'Welcome Reception' },
          { title: 'Game Night' },
          { title: 'Water Park Party' },
        ],
      },
      {
        title: 'Other',
        includes: [
          { title: 'Conference Badge' },
          { title: 'T-Shirt' },
          { title: 'THAT Gift' },
          { title: 'Wifi Access' },
        ],
      },
    ],
  },
  {
    uiReference: 'EVERYTHING_CAMPER',
    includes: [
      {
        title: 'Event Access',
        includes: [
          { title: 'Monday 7/26' },
          { title: 'Tuesday 7/27' },
          { title: 'Wednesday 7/28' },
          { title: 'Thursday 7/29' },
        ],
      },
      {
        title: 'Food and Beverage',
        includes: [
          { title: 'Monday Lunch' },
          { title: 'Tuesday Breakfast & Lunch' },
          { title: 'Happy Hour' },
          { title: 'Wednesday Breakfast & Lunch' },
          { title: 'Wednesday Hog Roast' },
          { title: 'Thursday Breakfast & Lunch' },
          { title: 'Closing Smores Bar' },
          { title: 'All Day Caffeine & H20' },
        ],
      },
      {
        title: 'Other ???',
        includes: [
          { title: 'Welcome Reception' },
          { title: 'Game Night' },
          { title: 'Water Park Party' },
        ],
      },
      {
        title: 'Other',
        includes: [
          { title: 'Conference Badge' },
          { title: 'T-Shirt' },
          { title: 'THAT Gift' },
          { title: 'Wifi Access' },
        ],
      },
    ],
  },
];

const pricingBreakdown = [
  {
    title: 'Event Access',
    includes: [
      {
        title: 'Monday 7/26',
        isIncluded: [true, false, false, false, true],
      },
      {
        title: 'Tuesday 7/27',
        isIncluded: [false, true, true, true, true],
      },
      {
        title: 'Wednesday 7/28',
        isIncluded: [false, true, true, true, true],
      },
      {
        title: 'Thursday 7/29',
        isIncluded: [false, true, true, true, true],
      },
    ],
  },
  {
    title: 'Food and Beverage',
    includes: [
      { title: 'Monday Lunch', isIncluded: [true, false, false, false, true] },
      {
        title: 'Tuesday Breakfast & Lunch',
        isIncluded: [false, false, false, true, true],
      },
      { title: 'Happy Hour', isIncluded: [false, false, false, true, true] },
      {
        title: 'Wednesday Breakfast & Lunch',
        isIncluded: [false, false, false, true, true],
      },
      {
        title: 'Wednesday Hog Roast',
        isIncluded: [false, false, false, true, true],
      },
      {
        title: 'Thursday Breakfast & Lunch',
        isIncluded: [false, false, false, true, true],
      },
      {
        title: 'Closing Smores Bar',
        isIncluded: [false, false, false, true, true],
      },
      {
        title: 'All Day Caffeine & H20',
        isIncluded: [false, false, false, true, true],
      },
    ],
  },

  {
    title: 'Other ???',
    includes: [
      {
        title: 'Welcome Reception',
        isIncluded: [true, false, true, true, true],
      },
      { title: 'Game Night', isIncluded: [false, false, true, true, true] },
      {
        title: 'Water Park Party',
        isIncluded: [false, false, true, true, true],
      },
    ],
  },

  {
    title: 'Other',
    includes: [
      {
        title: 'Conference Badge',
        isIncluded: [true, false, true, true, true],
      },
      { title: 'T-Shirt', isIncluded: [false, true, true, true, true] },
      { title: 'THAT Gift', isIncluded: [false, false, true, true, true] },
      { title: 'Wifi Access', isIncluded: [true, false, true, true, true] },
    ],
  },
];

export default pricingBreakdown;
