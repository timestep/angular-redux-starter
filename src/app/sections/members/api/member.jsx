const Q = require('q');

const getHeaders = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: window.localStorage.Authorization
  };
};

const getProfile = (username) => {
  return fetch('/api/' + username + '/profile', {
    headers: getHeaders()
  })
  .then((resp) => {
    return resp.json();
  });
};

const getProfilePhoto = (username) => {
  return fetch('/api/profile-photo/' + username, {
    headers: getHeaders()
  })
  .then((resp) => resp.text())
  .then(null, ()=> null);
};

const getMemberClinic = (clinicName) => {
  return fetch('/api/organization/' + clinicName, {
    headers: getHeaders()
  })
  .then((resp) => {
    return resp.json();
  });
};


export const getUserNotifications = (username) => {
  const opts = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: window.localStorage.Authorization
    }
  };
  return fetch('/api/notifications/alerts/' + username, opts)
    .then((response) => {
      return response.json();
    }).catch((error) => {
      console.log('error sending notifications:', error);
    });
};

export const getMember = (username) => {
  let promises = [
    getProfile(username),
    getProfilePhoto(username),
    getUserNotifications(username)
  ];

  return Q.all(promises)
    .then((responses) => {

      // strangely - the 'return resp.text()' call above doesn't evaluate the promise
      // until we reach the Q.all resolve function. So I have to do some error checking here...
      // the profile-photo is either a b64 string, or an object with an error
      // in string form...
      let profilePhotoB64 = '';
      try {
        JSON.parse(responses[1]); // if this doesn't throw an error, we return an empty string as the photo.
      } catch (e) {
        // it's a b64 string
        profilePhotoB64 = 'data:image/jpg;base64,' + responses[1];
      }

      const clinicName = R.path('0.organizationName', responses);

      if (clinicName) {
        return getMemberClinic(clinicName)
          .then((clinic) => {
            return {
              clinic: clinic.value,
              notifications: responses[2],
              photo: profilePhotoB64,
              profile: responses[0]
            };
          })
          .catch((err) => {
            console.error('Error getting clinic:', err);
          });
      }

      return {
        clinic: {},
        notifications: responses[2],
        photo: profilePhotoB64,
        profile: responses[0]
      };

    })
    .catch((err) => {
      console.error('Error getting profile:', err);
    });
};

export const postMember = (username, data) => {
  return fetch(`/api/${username}/profile`, {
    headers: getHeaders(),
    method: 'put',
    body: JSON.stringify(data)
  })
  .then((response) => response.text())
  .catch((error) => {
    console.log('error sending updated profile:', error);
  });
};
