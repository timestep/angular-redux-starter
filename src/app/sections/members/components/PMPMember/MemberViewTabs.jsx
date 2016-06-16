import { List } from 'immutable';
import React, { PropTypes } from 'react';

const defaultTab = {
  backgroundColor: 'transparent',
  borderBottom: 'none',
  borderLeft: '0.35rem solid transparent',
  borderRadius: '0',
  borderRight: '0.35rem solid transparent',
  borderTop: '0.35rem solid transparent',
  outline: 'none',
  position: 'relative'
};

const activeTab = {
  backgroundColor: 'transparent',
  borderBottom: 'none',
  borderLeft: '0.35rem solid silver',
  borderRadius: '0',
  borderRight: '0.35rem solid silver',
  borderTop: '0.35rem solid silver',
  outline: 'none',
  position: 'relative'
};

export default class MemberViewTabs extends React.Component {
  render() {
    const {
      activeTabView,
      onTabViewChange,
      tabViewOptions
    } = this.props;

    const MemberTabs = tabViewOptions.map((tab) => {
      const isSelected = activeTabView === tab;
      const defLiClassName = 'nav nav-tabs';
      const liClassName = activeTabView === tab ? 'active ' + defLiClassName : defLiClassName;
      return (
        <li
            className={liClassName}
            key={tab}
        >
          <a
              onClick={() => onTabViewChange(tab)}
              style={isSelected ? activeTab : defaultTab}
          >
            {tab}
          </a>
        </li>
      );
    });
    return (
      <ul
          className={'nav nav-tabs memberHeader__nav--tabs'}
      >
        {MemberTabs}
      </ul>
    );
  }
}

MemberViewTabs.propTypes = {
  activeTabView: PropTypes.string.isRequired,
  onTabViewChange: PropTypes.func.isRequired,
  tabViewOptions: PropTypes.instanceOf(List).isRequired
};
