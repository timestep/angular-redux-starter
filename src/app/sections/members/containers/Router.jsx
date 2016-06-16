import React,
  {
    Component,
    PropTypes
  } from 'react';

import { connect } from 'react-redux';

import LoadingOverlay from '../components/Overlays/Loading/LoadingOverlay.jsx';
import MemberPage from './MemberPage.jsx';
import MembersPage from './MembersPage.jsx';
import NotificationOverlay from '../components/NotificationOverlay/NotificationOverlay.jsx';

import {
  hideNotificationHandler,
  sendNotificationHandler
} from '../reducers/notifications.jsx';

import {
  TABLE_ROUTE,
  PROFILE_ROUTE
} from '../reducers/router.jsx';

function mapStateToProps(state) {
  return {
    route: state.router.get('route'),
    routeIsLoading: state.loading.get('loading'),
    showNotificationOverlay: state.notification.get('showNotificationOverlay'),
    selectedMembers: state.activeMembers.get('selectedMembers'),
    viewingMemberUserName: state.activeMember.get('username')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCancelNotificationClick: () => dispatch(hideNotificationHandler()),
    onSendNotificationClick: () => dispatch(sendNotificationHandler())
  };
}

class Router extends Component {

  renderLoadingOverlay() {

    const { routeIsLoading } = this.props;

    if (!routeIsLoading) {
      return null;
    }

    return (<LoadingOverlay />);
  }

  renderNotificationOverlay() {
    const {
      onCancelNotificationClick,
      onSendNotificationClick,
      selectedMembers,
      showNotificationOverlay,
      viewingMemberUserName
    } = this.props;

    if (!showNotificationOverlay) {
      return null;
    }

    return (
      <NotificationOverlay
          onCloseHandler={onCancelNotificationClick}
          onSubmitHandler={onSendNotificationClick}
          recipients={viewingMemberUserName || selectedMembers}
      />
    );
  }

  render() {

    const { route } = this.props;

    let currentRoute = null;

    switch (route) {
      case TABLE_ROUTE:
        currentRoute = <MembersPage />;
        break;

      case PROFILE_ROUTE:
        currentRoute = <MemberPage />;
        break;

      default:
        currentRoute = 'table';
    }

    return (
      <div>
        {this.renderLoadingOverlay()}

        {this.renderNotificationOverlay()}

        <div
            className="container-fluid site pmp__body"
        >
          {currentRoute}
        </div>
      </div>
    );
  }
}

Router.propTypes = {
  onSendNotificationClick: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  routeIsLoading: PropTypes.bool.isRequired,
  showNotificationOverlay: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
