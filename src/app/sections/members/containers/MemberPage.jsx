import {
  List,
  Map
} from 'immutable';

import { connect } from 'react-redux';
import React, {
  Component,
  PropTypes
} from 'react';

import {
  getMemberProfile,
  changeMemberPageTab,
  saveMemberToApi
} from '../reducers/active-member.jsx';

import {
  TABLE_ROUTE,
  changeRoute
} from '../reducers/router.jsx';

import { showNotificationHandler } from '../reducers/notifications.jsx';
import BasicInfo from '../components/PMPMember/BasicInfo/BasicInfo.jsx';
import MemberBody from '../components/PMPMember/MemberBody.jsx';
import MemberHeader from '../components/PMPMember/MemberHeader.jsx';
import MemberNav from '../components/PMPMember/MemberNav.jsx';

const mapStateToProps = state => {
  return {
    activeTabView: state.activeMember.get('activeTabView'),
    authorization: state.activeMember.get('authorization'),
    clinic: state.activeMember.get('clinic'),
    dates: state.activeMember.get('dates'),
    notifications: state.activeMember.get('notifications'),
    photo: state.activeMember.get('photo'),
    profile: state.activeMember.get('profile'),
    tabViewOptions: state.activeMember.get('tabViewOptions'),
    username: state.activeMember.get('username')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    apiGetMemberProfile: () => dispatch(getMemberProfile()),
    goBackToTablePage: () => dispatch(changeRoute(TABLE_ROUTE)),
    onMemberPageSaveClick: () => dispatch(saveMemberToApi()),
    onNotificationButtonClick: (type) => dispatch(showNotificationHandler(type)),
    onTabViewChange: (tab) => dispatch(changeMemberPageTab(tab))
  };
};

class MemberPage extends Component {

  componentDidMount() {
    const { apiGetMemberProfile } = this.props;
    apiGetMemberProfile();
  }

  render() {
    const {
      activeTabView,
      authorization,
      clinic,
      dates,
      goBackToTablePage,
      notifications,
      onMemberPageSaveClick,
      onNotificationButtonClick,
      onTabViewChange,
      photo,
      profile,
      tabViewOptions,
      username
    } = this.props;

    if (!profile.size) {
      return null;
    }

    return (
      <div className="container-fluid">
        <div className="row memberNav">
          <MemberNav
              goBackToTablePage={goBackToTablePage}
          />
        </div>
        <div className="row basicInfo">
          <BasicInfo
              photo={photo}
              profile={profile}
          />
        </div>
        <div className="row memberHeader">
          <MemberHeader
              activeTabView={activeTabView}
              onNotificationButtonClick={onNotificationButtonClick}
              onTabViewChange={onTabViewChange}
              tabViewOptions={tabViewOptions}
          />
        </div>
        <div className="row memberBody">
          <MemberBody
              activeTabView={activeTabView}
              authorization={authorization}
              clinic={clinic}
              dates={dates}
              notifications={notifications}
              photo={photo}
              profile={profile}
              saveButton={onMemberPageSaveClick}
              username={username}
          />
        </div>
      </div>
    );
  }
}

MemberPage.propTypes = {
  activeTabView: PropTypes.string.isRequired,
  apiGetMemberProfile: PropTypes.func.isRequired,
  clinic: PropTypes.instanceOf(Map).isRequired,
  goBackToTablePage: PropTypes.func.isRequired,
  onTabViewChange: PropTypes.func.isRequired,
  photo: PropTypes.string.isRequired,
  profile: PropTypes.instanceOf(Map).isRequired,
  tabViewOptions: PropTypes.instanceOf(List).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberPage);
