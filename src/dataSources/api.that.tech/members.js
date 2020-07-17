import config from '../../config';

const pageSize = 50;

const userFragment = `
  fragment memberFields on PublicProfile {
    id
    firstName
    lastName
    company
    jobTitle
    profileImage
    profileSlug
    profileLinks {
      linkType
      url
    }    
  }
`;

export const QUERY_MEMBERS_INITAL = `
    ${userFragment}
    query getAllMembersPaged($pageSize: Int) {
      members {
        members (pageSize: $pageSize, orderBy:CREATEDAT) {
          cursor
          members {
            ...memberFields
          }
        }
      }
    }
`;

export const QUERY_MEMBERS_NEXT = `
    ${userFragment}
    query getAllMembersPaged($pageSize: Int, $after: String) {
      members {
        members (pageSize: $pageSize, after: $after, orderBy:CREATEDAT) {
          cursor
          members {
            ...memberFields
          }
        }
      }
    }
`;

function reformatResults(results) {
  const { members } = results.data.members;
  return members;
}

export default (client) => {
  const queryMembers = () => {
    const variables = { pageSize };
    return client
      .query(QUERY_MEMBERS_INITAL, variables)
      .toPromise()
      .then(reformatResults);
  };

  const queryMembersNext = (after) => {
    const variables = { pageSize, after };
    return client
      .query(QUERY_MEMBERS_NEXT, variables)
      .toPromise()
      .then(reformatResults);
  };

  return { queryMembers, queryMembersNext };
};
