export const ticketBreakdown = [
	// {
	// 	uiReference: 'WORKSHOPS',
	// 	includes: [
	// 		{
	// 			title: 'Event Access',
	// 			includes: [{ title: 'Monday' }]
	// 		},
	// 		{
	// 			title: 'Food and Beverage',
	// 			includes: [{ title: 'Monday Lunch' }]
	// 		},
	// 		{
	// 			title: 'Social',
	// 			includes: [{ title: 'Welcome Reception' }]
	// 		},
	// 		{
	// 			title: 'Other',
	// 			includes: [{ title: 'Conference Badge' }, { title: 'Wifi Access' }]
	// 		}
	// 	]
	// },
	{
		uiReference: 'CAMPER_NO_FOOD',
		includes: [
			{
				title: 'Event Access',
				includes: [
					{ title: 'Sunday' },
					{ title: 'Monday' },
					{ title: 'Tuesday' },
					{ title: 'Wednesday' }
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
		uiReference: 'CAMPER',
		includes: [
			{
				title: 'Event Access',
				includes: [
					{ title: 'Sunday' },
					{ title: 'Monday' },
					{ title: 'Tuesday' },
					{ title: 'Wednesday' }
				]
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
	}
	// {
	// 	uiReference: 'EVERYTHING_CAMPER',
	// 	includes: [
	// 		{
	// 			title: 'Event Access',
	// 			includes: [
	// 				{ title: 'Monday' },
	// 				{ title: 'Tuesday' },
	// 				{ title: 'Wednesday' },
	// 				{ title: 'Thursday' }
	// 			]
	// 		},
	// 		{
	// 			title: 'Food and Beverage',
	// 			includes: [
	// 				{ title: 'Monday Lunch' },
	// 				{ title: 'Tuesday Breakfast & Lunch' },
	// 				{ title: 'Happy Hour' },
	// 				{ title: 'Wednesday Breakfast & Lunch' },
	// 				{ title: 'Wednesday Pig Roast' },
	// 				{ title: 'Thursday Breakfast & Lunch' },
	// 				{ title: 'Closing Smores Bar' },
	// 				{ title: 'All Day Caffeine & H20' }
	// 			]
	// 		},
	// 		{
	// 			title: 'Social',
	// 			includes: [
	// 				{ title: 'Welcome Reception' },
	// 				{ title: 'Game Night' },
	// 				{ title: 'Water Park Party' }
	// 			]
	// 		},
	// 		{
	// 			title: 'Other',
	// 			includes: [
	// 				{ title: 'Conference Badge' },
	// 				{ title: 'T-Shirt' },
	// 				{ title: 'THAT Gift' },
	// 				{ title: 'Wifi Access' }
	// 			]
	// 		}
	// 	]
	// }
];

const pricingBreakdown = [
	{
		title: 'Event Access',
		includes: [
			{
				title: 'Sunday',
				isIncluded: [true, true]
			},
			{
				title: 'Monday',
				isIncluded: [true, true]
			},
			{
				title: 'Tuesday',
				isIncluded: [true, true]
			},
			{
				title: 'Wednesday',
				isIncluded: [true, true]
			}
		]
	},
	{
		title: 'Food and Beverage',
		includes: [
			{ title: 'Sunday Lunch', isIncluded: [false, true] },
			{
				title: 'Monday Breakfast & Lunch',
				isIncluded: [false, true]
			},
			{ title: 'Monday Happy Hour', isIncluded: [false, true] },
			{
				title: 'Tuesday Breakfast & Lunch',
				isIncluded: [false, true]
			},
			{
				title: 'Tuesday BBQ',
				isIncluded: [false, true]
			},
			{
				title: 'Wednesday Breakfast & Lunch',
				isIncluded: [false, true]
			},
			{
				title: 'Closing Smores Bar',
				isIncluded: [false, true]
			},
			{
				title: 'All Day Caffeine & H20',
				isIncluded: [false, true]
			}
		]
	},

	{
		title: 'Social',
		includes: [
			{
				title: 'Welcome Reception',
				isIncluded: [true, true]
			},
			{ title: 'Game Night', isIncluded: [true, true] },
			{
				title: 'Water Park Party',
				isIncluded: [true, true]
			}
		]
	},

	{
		title: 'Other',
		includes: [
			{
				title: 'Conference Badge',
				isIncluded: [true, true]
			},
			{ title: 'T-Shirt', isIncluded: [true, true] },
			{ title: 'THAT Gift', isIncluded: [true, true] },
			{ title: 'Wifi Access', isIncluded: [true, true] }
		]
	}
];

export default pricingBreakdown;
