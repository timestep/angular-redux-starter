import NotificationButtons from '../Notifications/NotificationButtons.jsx';

export default class MembersNavigation extends React.Component {

  render() {
    const {numMembersSelected, onNotificationButtonClick} = this.props;

    return (
      <div className="container-fluid">
        <div className="row membersNavigation__nav">
          <div className="col-xs-12 col-sm-5 membersNavigation__nav--title">
            <h1>{numMembersSelected + ' Members Selected'}</h1>
          </div>
          <div className="col-xs-12 col-sm-7 membersNavigation__nav--buttons">
            <NotificationButtons onNotificationButtonClick={onNotificationButtonClick} />
          </div>
        </div>
      </div>
    );
  }

}
