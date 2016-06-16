import DateSelector from './DateSelector.jsx';
import sinon from 'sinon';
import {expect} from 'chai';
import {shallow} from 'enzyme';

const DATES = [
  '1', '2', '3', 'a', 'b', 'c'
];

describe('DateSelector', () => {

  it('renders an option for each date', () => {
    const wrapper = shallow(
      <DateSelector
          dates={DATES}
      />
    );

    expect(wrapper.find(ReactBootstrap.MenuItem)).to.have.length(DATES.length);
  });

  it('sets the activeDate correctly', () => {
    const activeDate = 'b';

    const wrapper = shallow(
      <DateSelector activeDate={activeDate}
          dates={DATES}
      />
    );

    const selectedNode = wrapper.find(ReactBootstrap.MenuItem).findWhere(opt => opt.hasClass('active'));

    expect(selectedNode.length).to.equal(1);
    expect(selectedNode.children().text()).to.equal(activeDate);
  });

  it('responds to click events', () => {
    const activeDate = '2';
    const onDateChange = sinon.spy();

    const wrapper = shallow(
      <DateSelector activeDate={activeDate}
          dates={DATES}
          onDateChange={onDateChange}
      />
    );

    const selectedNode = wrapper.find(ReactBootstrap.MenuItem).findWhere(opt => opt.hasClass('active'));
    selectedNode.simulate('click');

    expect(selectedNode.length).to.equal(1);
    expect(selectedNode.children().text()).to.equal(activeDate);
    expect(onDateChange.calledOnce).to.equal(true);
  });

});
