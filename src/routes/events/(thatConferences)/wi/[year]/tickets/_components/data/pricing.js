export const ticketBreakdown = [
	{
		uiReference: 'WORKSHOPS',
		includes: [
			{
				title: 'Event Access',
				includes: [{ title: 'Monday' }]
			},
			{
				title: 'Food and Beverage',
				includes: [{ title: 'Monday Lunch' }]
			},
			{
				title: 'Social',
				includes: [{ title: 'Welcome Reception' }]
			},
			{
				title: 'Other',
				includes: [{ title: 'Conference Badge' }, { title: 'Wifi Access' }]
			}
		]
	},
	{
		uiReference: 'CAMPER_NO_FOOD',
		includes: [
			{
				title: 'Event Access',
				includes: [{ title: 'Tuesday' }, { title: 'Wednesday' }, { title: 'Thursday' }]
			},
			{
				title: 'Social',
				includes: [
					{ title: 'Welcome Reception' },
					{ title: 'Game Night' },
					{ title: 'Water Park Party' }
				]
			},
			{
				title: 'Other',
				includes: [
					{ title: 'Conference Badge' },
					{ title: 'T-Shirt' },
					{ title: 'THAT Gift' },
					{ title: 'Wifi Access' }
				]
			}
		]
	},
	{
		uiReference: 'CAMPER',
		includes: [
			{
				title: 'Event Access',
				includes: [{ title: 'Tuesday' }, { title: 'Wednesday' }, { title: 'Thursday' }]
			},
			{
				title: 'Food and Beverage',
				includes: [
					{ title: 'Tuesday Breakfast & Lunch' },
					{ title: 'Happy Hour' },
					{ title: 'Wednesday Breakfast & Lunch' },
					{ title: 'Wednesday Pig Roast' },
					{ title: 'Thursday Breakfast & Lunch' },
					{ title: 'Closing Smores Bar' },
					{ title: 'All Day Caffeine & H20' }
				]
			},
			{
				title: 'Social',
				includes: [
					{ title: 'Welcome Reception' },
					{ title: 'Game Night' },
					{ title: 'Water Park Party' }
				]
			},
			{
				title: 'Other',
				includes: [
					{ title: 'Conference Badge' },
					{ title: 'T-Shirt' },
					{ title: 'THAT Gift' },
					{ title: 'Wifi Access' }
				]
			}
		]
	},
	{
		uiReference: 'EVERYTHING_CAMPER',
		includes: [
			{
				title: 'Event Access',
				includes: [
					{ title: 'Monday' },
					{ title: 'Tuesday' },
					{ title: 'Wednesday' },
					{ title: 'Thursday' }
				]
			},
			{
				title: 'Food and Beverage',
				includes: [
					{ title: 'Monday Lunch' },
					{ title: 'Tuesday Breakfast & Lunch' },
					{ title: 'Happy Hour' },
					{ title: 'Wednesday Breakfast & Lunch' },
					{ title: 'Wednesday Pig Roast' },
					{ title: 'Thursday Breakfast & Lunch' },
					{ title: 'Closing Smores Bar' },
					{ title: 'All Day Caffeine & H20' }
				]
			},
			{
				title: 'Social',
				includes: [
					{ title: 'Welcome Reception' },
					{ title: 'Game Night' },
					{ title: 'Water Park Party' }
				]
			},
			{
				title: 'Other',
				includes: [
					{ title: 'Conference Badge' },
					{ title: 'T-Shirt' },
					{ title: 'THAT Gift' },
					{ title: 'Wifi Access' }
				]
			}
		]
	}
];

const pricingBreakdown = [
	{
		title: 'Event Access',
		includes: [
			{
				title: 'Monday',
				isIncluded: [true, false, false, true]
			},
			{
				title: 'Tuesday',
				isIncluded: [false, true, true, true]
			},
			{
				title: 'Wednesday',
				isIncluded: [false, true, true, true]
			},
			{
				title: 'Thursday',
				isIncluded: [false, true, true, true]
			}
		]
	},
	{
		title: 'Food and Beverage',
		includes: [
			{ title: 'Monday Lunch', isIncluded: [true, false, false, true] },
			{
				title: 'Tuesday Breakfast & Lunch',
				isIncluded: [false, false, true, true]
			},
			{ title: 'Happy Hour', isIncluded: [false, false, true, true] },
			{
				title: 'Wednesday Breakfast & Lunch',
				isIncluded: [false, false, true, true]
			},
			{
				title: 'Wednesday Pig Roast',
				isIncluded: [false, false, true, true]
			},
			{
				title: 'Thursday Breakfast & Lunch',
				isIncluded: [false, false, true, true]
			},
			{
				title: 'Closing Smores Bar',
				isIncluded: [false, false, true, true]
			},
			{
				title: 'All Day Caffeine & H20',
				isIncluded: [false, false, true, true]
			}
		]
	},

	{
		title: 'Social',
		includes: [
			{
				title: 'Welcome Reception',
				isIncluded: [true, true, true, true]
			},
			{ title: 'Game Night', isIncluded: [false, true, true, true] },
			{
				title: 'Water Park Party',
				isIncluded: [false, true, true, true]
			}
		]
	},

	{
		title: 'Other',
		includes: [
			{
				title: 'Conference Badge',
				isIncluded: [true, true, true, true]
			},
			{ title: 'T-Shirt', isIncluded: [false, true, true, true] },
			{ title: 'THAT Gift', isIncluded: [false, true, true, true] },
			{ title: 'Wifi Access', isIncluded: [true, true, true, true] }
		]
	}
];

export default pricingBreakdown;
