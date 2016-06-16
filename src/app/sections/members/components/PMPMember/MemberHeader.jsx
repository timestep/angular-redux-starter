import MemberViewTabs from './MemberViewTabs.jsx';
import NotificationButtons from '../Notifications/NotificationButtons.jsx';

export default class MemberHeader extends React.Component {
  render() {
    const {
      activeTabView,
      onTabViewChange,
      tabViewOptions,
      onNotificationButtonClick
    } = this.props;

    return (
      <div className={'container-fluid'}>
        <div className={'row memberHeader__nav'}>
          <div className={'col-sm-12'}>
            <div className={'col-sm-5 memberHeader__nav--tabs'}>
              <MemberViewTabs
                  activeTabView={activeTabView}
                  onTabViewChange={onTabViewChange}
                  tabViewOptions={tabViewOptions}
              />
            </div>
            <div className={'col-sm-7 memberHeader__nav--buttons'}>
              <NotificationButtons
                  onNotificationButtonClick={onNotificationButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
