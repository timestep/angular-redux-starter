
import { NOTIFICATIONS } from '../../utils/constants.jsx';

export default class NotificationTypes extends React.Component {

  render() {
    const { reduxFormTypes } = this.props;

    const notificationTypes = [
      { name: NOTIFICATIONS.ICON_LABELS.PERSONAL_MESSAGE },
      { name: NOTIFICATIONS.ICON_LABELS.ALERT },
      { name: NOTIFICATIONS.ICON_LABELS.QUICK_CHAT }
    ];

    // Need to find a way to pre-select this, or reset on close
    const notificationTypesJSX = notificationTypes.map((type) => {
      return (
        <option
            key={type.name}
            value={type.name}
        >
          {type.name}
        </option>
      );
    });

    return (
      <div className="form-group">
        <label className="col-xs-4 control-label">{'Type'}</label>
        <div className="col-xs-8">
          <select
              {...reduxFormTypes}
              value={reduxFormTypes.value || reduxFormTypes.initialValue}
          >
            {notificationTypesJSX}
          </select>
        </div>
      </div>
    );
  }
}
