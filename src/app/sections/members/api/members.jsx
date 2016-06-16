import { LOCAL_STORAGE_KEY } from '../utils/constants.jsx';

export function getMembersApi(symptom, startDate) {
  const authToken = window.localStorage[LOCAL_STORAGE_KEY.USER_AUTHORIZATION_TOKEN];

  return fetch('/api/pmp/category-numbers/' + symptom + '?startDate=' + startDate, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .catch((err) => console.log('Error fetching members: ', err));
}

export function searchMembersApi(organization, filter, offset, limit) {
  const authToken = window.localStorage[LOCAL_STORAGE_KEY.USER_AUTHORIZATION_TOKEN];
  const body = R.compose(
      JSON.stringify,
      R.mixin(filter)
    )({
      offset: offset || 0,
      limit: limit || 25
    });

  return fetch('/api/organization/:orgId/members'.replace(/:orgId/g, organization), {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    },
    body: body
  })
    .then((response) => response.json())
    .catch((err) => console.log('Error fetching search-members: ', err));
}
