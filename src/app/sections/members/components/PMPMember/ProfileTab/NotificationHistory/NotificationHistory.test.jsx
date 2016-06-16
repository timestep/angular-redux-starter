import { expect } from 'chai';
import { shallow } from 'enzyme';

import NotificationHistory from './NotificationHistory.jsx';
import NotificationHistoryItem from './NotificationHistoryItem.jsx';


describe('NotificationHistory', () => {

  it('renders null', () => {
    const wrapper = shallow(
      <NotificationHistory />
    );

    expect(wrapper.find('div')).to.have.length(0);
  });

  it('renders 3 notifcation items', () => {
    const mockNotifications = [
      {
        title: 'ok',
        type: 'Personal Message',
        sendTimestamp: '0'
      },
      {
        title: 'ssdf',
        type: 'Personal',
        sendTimestamp: '0'
      },
      {
        title: 'mhmm',
        type: 'chuck',
        sendTimestamp: '0'
      }
    ];
    const wrapper = shallow(
      <NotificationHistory
          notifications={mockNotifications}
      />
    );

    expect(wrapper.find(NotificationHistoryItem)).to.have.length(3);
  });

  it('renders 2 notifcation items', () => {
    const mockNotifications = [
      {
        title: 'ok',
        type: 'Personal Message',
        sendTimestamp: '0'
      },
      {
        title: 'ssdf',
        type: 'Personal',
        sendTimestamp: '0'
      }
    ];
    const wrapper = shallow(
      <NotificationHistory
          notifications={mockNotifications}
      />
    );

    expect(wrapper.find(NotificationHistoryItem)).to.have.length(2);
  });

  it('renders 3 notifcation items despite 4', () => {
    const mockNotifications = [
      {
        title: 'ok',
        type: 'Personal Message',
        sendTimestamp: '0'
      },
      {
        title: 'ssdf',
        type: 'Personal',
        sendTimestamp: '0'
      },
      {
        title: 'ok',
        type: 'Personal Message',
        sendTimestamp: '0'
      },
      {
        title: 'ssdf',
        type: 'Personal',
        sendTimestamp: '0'
      }
    ];
    const wrapper = shallow(
      <NotificationHistory
          notifications={mockNotifications}
      />
    );

    expect(wrapper.find(NotificationHistoryItem)).to.have.length(3);
  });

  it('renders null', () => {
    const wrapper = shallow(
      <NotificationHistory />
    );

    expect(wrapper.find('div')).to.have.length(0);
  });
});
