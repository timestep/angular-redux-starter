import React from 'react';
import MemberViewTabs from './MemberViewTabs.jsx';
import {expect} from 'chai';
import {mount} from 'enzyme';
import sinon from 'sinon';

const TABS = ['PROFILE', 'ALLER-RHYTHM'];
describe('MemberViewTabs', () => {

  it('renders the correct list of tabs', () => {
    const activeTabView = '';
    const onTabViewChange = () => {};
    const wrapper = mount(
      <MemberViewTabs
          activeTabView={activeTabView}
          onTabViewChange={onTabViewChange}
          tabViewOptions={TABS}
      />
    );

    expect(wrapper.props().tabViewOptions).to.be.an('array');
    expect(wrapper.props().tabViewOptions).to.equal(TABS);
    expect(wrapper.find('li').length).to.equal(TABS.length);
  });

  it('selects the correct active tab', () => {
    const activeTabView = TABS[1];
    const onTabViewChange = () => {};
    const wrapper = mount(
      <MemberViewTabs activeTabView={activeTabView}
          onTabViewChange={onTabViewChange}
          tabViewOptions={TABS}
      />
    );

    expect(wrapper.props().activeTabView).to.be.a('string');
    expect(wrapper.find('li.active').length).to.equal(1);
    expect(wrapper.find('li.active').text()).to.equal(TABS[1]);

  });

  it('responds to click event with the correct argument', () => {
    const activeTabView = TABS[0];
    const onTabViewChange = sinon.spy();

    const wrapper = mount(
      <MemberViewTabs activeTabView={activeTabView}
          onTabViewChange={onTabViewChange}
          tabViewOptions={TABS}
      />
    );
    expect(wrapper.props().activeTabView).to.equal(activeTabView);
    wrapper.find('a').findWhere(opt => opt.text() === TABS[1]).simulate('click');
    expect(onTabViewChange.calledOnce).to.equal(true);
    expect(onTabViewChange.calledWith(TABS[1])).to.equal(true);
  });

});
