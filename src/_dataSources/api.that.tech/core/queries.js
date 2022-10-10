import gFetch from '$utils/gfetch';
import { log } from '../utilities/error';

const enumValues = `
	options: enumValues {
		label: description
		value: name
	}
`;

export const QUERY_DROPDOWN_VALUES = `
	query QUERY_DROPDOWN_VALUES {
		duration: __type(name: "Duration") {
			${enumValues}
		}

		targetAudience: __type(name: "TargetAudience") {
			${enumValues}
		}
		
		assetLinkType: __type(name: "AssetLinkType") {
			${enumValues}
		}
		
		category: __type(name: "Category") {
			${enumValues}
		}
		
		entityType: __type(name: "EntityType") {
			${enumValues}
		}
		
		mentorship: __type(name: "Mentorship") {
			${enumValues}
		}
		
		sessionCategory: __type(name: "SessionCategory") {
			${enumValues}
		}

		sessionLocationDestinations: __type(name: "SessionLocationDestination") {
			${enumValues}
		}
		
		sessionType: __type(name: "SessionType") {
			${enumValues}
		}
		
		status: __type(name: "Status") {
			${enumValues}
		}
		
		targetAudience: __type(name: "TargetAudience") {
			${enumValues}
		}
		
		targetLocation: __type(name: "TargetLocation") {
			${enumValues}
		}
		
		tShirtSizes: __type(name: "TShirtSize") {
			${enumValues}
		}

		hoodieSizes: __type(name: "HoodieSize") {
			${enumValues}
		}
		
		dietaryRequirements: __type(name: "DietaryRequirement") {
			${enumValues}
		}

		countryCode: __type(name: "CountryCode") {
			${enumValues}
		}

		jobType: __type(name: "JobType") {
			${enumValues}
		}
		
		experienceLevel: __type(name: "ExperienceLevel") {
			${enumValues}
		}
	}
`;

export default () => {
	const client = gFetch();

	function queryDropDownValues() {
		const variables = {};

		return client.query({ query: QUERY_DROPDOWN_VALUES, variables }).then(({ data, errors }) => {
			if (errors) log({ errors, tag: 'QUERY_DROPDOWN_VALUES' });

			return data;
		});
	}

	return { queryDropDownValues };
};
