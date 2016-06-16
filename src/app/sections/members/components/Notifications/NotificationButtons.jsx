import NotificationButton from './NotificationButton.jsx';
import { NOTIFICATIONS } from '../../utils/constants.jsx';

const buttons = [
  {
    icon: NOTIFICATIONS.ICON_TYPES.PERSONAL_MESSAGE,
    text: NOTIFICATIONS.ICON_LABELS.PERSONAL_MESSAGE
  }, {
    icon: NOTIFICATIONS.ICON_TYPES.ALERT,
    text: NOTIFICATIONS.ICON_LABELS.ALERT
  }, {
    icon: NOTIFICATIONS.ICON_TYPES.QUICK_CHAT,
    text: NOTIFICATIONS.ICON_LABELS.QUICK_CHAT
  }
];

export default class NotificationButtons extends React.Component {

  render() {
    const { onNotificationButtonClick } = this.props;

    const buttonsJsx = buttons.map((btn) => {
      return (
        <NotificationButton
            icon={btn.icon}
            key={btn.text}
            onNotificationButtonClick={onNotificationButtonClick}
            text={btn.text}
        />
      );
    });

    return (
      <div>
        {buttonsJsx}
      </div>
    );
  }
}
