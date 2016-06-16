import R from 'ramda';

export default class NotificationHistoryItem extends React.Component {

  render() {
    const {
      date,
      type,
      title
    } = this.props;

    if (R.isNil(type)) {
      return null;
    }

    let icon = '';
    switch (type) {
      case 'Personal Message':
        icon = 'icon-message';
        break;
      case 'Alert Notification':
        icon = 'icon-warning';
        break;
      case 'Quick Chat':
        icon = 'icon-profile';
        break;
      default:
        icon = 'icon-warning';
    }

    return (
      <div>
        <div className="row">
          <span className="col-xs-1">
            <i className={icon} />
          </span>
          <div className="col-xs-10">
            <div className="col-xs-12 col-sm-12 col-md-7 padding-x-reset memberBody__notification--title">
              {type}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-5 padding-x-reset memberBody__notification--date">
              {date}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-7 padding-x-reset">
              {title}
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}
