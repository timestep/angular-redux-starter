import { convertNotificationFormTypeToDatabaseType } from '../utils/convertNotificationFormTypeToDatabaseType.jsx';

export function sendNotifications(selectedMembers, data) {

  const link = data.LINK.value;
  const title = data.TITLE.value;
  const message = data.MESSAGE.value;
  const template = (data.VIEW_TEMPLATE &&
    data.VIEW_TEMPLATE.value) ?
    data.VIEW_TEMPLATE.value : 'Text';

  const type = convertNotificationFormTypeToDatabaseType(data.TYPE.value);

  const image = typeof data.VIEW_TEMPLATE.value !== 'undefined' &&
    data.VIEW_TEMPLATE.value !== 'Text' ?
    document.getElementById('img-preview').src : false;

  const opts = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: window.localStorage.Authorization
    },
    body: JSON.stringify({
      link: link,
      title: title,
      message: message,
      template: template,
      type: type,
      image: image,
      selectedMembers: selectedMembers
    })
  };

  return fetch('/api/pmp/notifications/alerts', opts)
    .then((response) => {
      return response.json();
    }).catch((error) => {
      console.log('error sending notifications:', error);
    });
}
