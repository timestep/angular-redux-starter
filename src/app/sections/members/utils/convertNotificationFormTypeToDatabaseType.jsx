import { NOTIFICATIONS } from './constants.jsx';

export const convertNotificationFormTypeToDatabaseType = (formType) => {
  let dbType = NOTIFICATIONS.REQUEST_TYPES.PERSONAL_MESSAGE;

  if (formType === NOTIFICATIONS.ICON_LABELS.PERSONAL_MESSAGE) {
    dbType = NOTIFICATIONS.REQUEST_TYPES.PERSONAL_MESSAGE;
  } else if (formType === NOTIFICATIONS.ICON_LABELS.ALERT) {
    dbType = NOTIFICATIONS.REQUEST_TYPES.ALERT;
  } else if (formType === NOTIFICATIONS.ICON_LABELS.QUICK_CHAT) {
    dbType = NOTIFICATIONS.REQUEST_TYPES.QUICK_CHAT;
  }

  return dbType;
};
