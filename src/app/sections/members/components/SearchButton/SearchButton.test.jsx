import SearchButton from './SearchButton.jsx';
import {expect} from 'chai';
import {shallow} from 'enzyme';

const defaultStyle = 'color:#5A9EEE';
const activeStyle = 'color:#FFF';

// bit of a hacky test - we have to use shallow rendering for ReactBootstrap components
// so I don't have access to checking if the Modal is properly being rendered.

describe('SearchButton', () => {

  it('the button should not be selected', () => {
    const selected = false; // this dictates if the button was seleceted

    const wrapper = shallow(
      <SearchButton
          selected={selected}
      />
    );

    const targetNode = 'Search';
    const node = wrapper.find('a');
    if (node.text().indexOf(targetNode) >= 0) {
      expect(node.html().indexOf(defaultStyle)).to.not.equal(-1);
      expect(node.html().indexOf(activeStyle)).to.equal(-1);
    }
  });

  it('the button should be selected', () => {
    const selected = true; // this dictates if the button was seleceted

    const wrapper = shallow(
      <SearchButton
          selected={selected}
      />
    );

    const targetNode = 'Search';
    const node = wrapper.find('a');
    if (node.text().indexOf(targetNode) >= 0) {
      expect(node.html().indexOf(defaultStyle)).to.not.equal(-1);
      expect(node.html().indexOf(activeStyle)).to.equal(-1);
    }
  });

});
