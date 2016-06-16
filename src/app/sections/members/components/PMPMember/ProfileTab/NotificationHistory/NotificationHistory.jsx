import NotificationHistoryItem from './NotificationHistoryItem.jsx';
import R from 'ramda';

export default class NotificationHistory extends React.Component {

  renderNotification(notification, index) {
    const date = moment(notification.sendTimestamp).format('YYYY-MM-DD');
    return (
      <NotificationHistoryItem
          date={date}
          key={index}
          title={notification.title}
          type={notification.type}
      />
    );
  }

  render() {
    const {
      notifications
    } = this.props;

    if (R.isNil(notifications)) {
      return null;
    }

    const rows =
      R.pipe(
        R.slice(0, 3),
        R.mapIndexed(this.renderNotification)
      )(notifications);

    return (
      <div className="row">
        <div className="col-xs-12">
          {rows}
        </div>
      </div>
    );
  }
}
