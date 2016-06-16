import MembersNavigation from './MembersNavigation.jsx';
import {expect} from 'chai';
import {mount} from 'enzyme';

describe('MembersNavigation', () => {

  it('renders the table header with correct number of Members selected', () => {
    const numMembersSelected = 50;

    const wrapper = mount(
      <MembersNavigation numMembersSelected={numMembersSelected}/>
    );

    expect(wrapper.props().numMembersSelected).to.equal(50);
    expect(wrapper.find('h1').text()).to.equal('50 Members Selected');
  });

  it('renders the NotificationButtons component', () => {

    const wrapper = mount(
      <MembersNavigation/>
    );

    expect(wrapper.find('NotificationButtons')).to.have.length(1);
  });

});
