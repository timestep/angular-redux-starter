import NotificationHistoryItem from './NotificationHistoryItem.jsx';
import {expect} from 'chai';
import {mount} from 'enzyme';

describe('NotificationHistoryItem', () => {

  it('renders the Personal Message', () => {
    const props = {
      date: '2012-02-29',
      type: 'Personal Message',
      title: 'Hoopla'
    };

    const wrapper = mount(
      <NotificationHistoryItem
          date={props.date}
          title={props.title}
          type={props.type}
      />
    );

    expect(wrapper.props().date).to.equal(moment(props.date).format('YYYY-MM-DD'));
    expect(wrapper.props().title).to.equal(props.title);
    expect(wrapper.find('.icon-message')).to.have.length(1);

  });

  it('renders the Alert Notification', () => {
    const props = {
      date: '2012-02-29',
      type: 'Alert Notification',
      title: 'Hoopla'
    };

    const wrapper = mount(
      <NotificationHistoryItem
          date={props.date}
          title={props.title}
          type={props.type}
      />
    );

    expect(wrapper.props().date).to.equal(moment(props.date).format('YYYY-MM-DD'));
    expect(wrapper.props().title).to.equal(props.title);
    expect(wrapper.find('.icon-warning')).to.have.length(1);
  });

  it('renders the Quick Chat', () => {
    const props = {
      date: '2012-02-29',
      type: 'Quick Chat',
      title: 'Hoopla'
    };

    const wrapper = mount(
      <NotificationHistoryItem
          date={props.date}
          title={props.title}
          type={props.type}
      />
    );

    expect(wrapper.props().date).to.equal(moment(props.date).format('YYYY-MM-DD'));
    expect(wrapper.props().title).to.equal(props.title);
    expect(wrapper.find('.icon-profile')).to.have.length(1);
  });

  it('renders nothing', () => {
    const props = {
      date: '2012-02-29',
      title: 'Hoopla'
    };

    const wrapper = mount(
      <NotificationHistoryItem
          date={props.date}
          title={props.title}
      />
    );

    expect(wrapper.find('div')).to.have.length(0);
  });

});
