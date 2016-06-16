import SeveritySelector from './SeveritySelector.jsx';
import {expect} from 'chai';
import {shallow} from 'enzyme';

const categories = [
  'ALL', 'OUT OF CONTROL', 'VERY HIGH', 'HIGH', 'MODERATE', 'LOW'
];
const numHigh = 0;

const activeStyle = 'color:#FFF';
const defaultStyle = 'color:#5A9EEE';

describe('SeveritySelector', () => {

  it('renders the correct amount of options', () => {
    const wrapper = shallow(
      <SeveritySelector
          categories={categories}
      />
    );

    expect(wrapper.find('a').length).to.equal(categories.length);
  });

  it('selects the proper option', () => {
    const activeSeverity = 'HIGH';
    const targetNode = activeSeverity + '(' + numHigh + ')';

    const wrapper = shallow(
      <SeveritySelector activeSeverity={activeSeverity}
          categories={categories}
      />
    );

    const aTags = wrapper.find('a');
    aTags.forEach((node) => {
      if (node.text() === targetNode) {
        expect(node.html().indexOf(defaultStyle)).to.equal(-1);
        expect(node.html().indexOf(activeStyle)).to.not.equal(-1);
      } else {
        expect(node.html().indexOf(defaultStyle)).to.not.equal(-1);
        expect(node.html().indexOf(activeStyle)).to.equal(-1);
      }
    });
  });

});
