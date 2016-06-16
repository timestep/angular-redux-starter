import React from 'react';
import Age from './Age.jsx';

import {expect} from 'chai';
import {mount} from 'enzyme';

describe('Age', () => {

  it('successfully renders', () => {
    const mockAge = 123;

    const wrapper = mount(
      <Age
          value={mockAge}
      />
    );
    expect(wrapper.props().value).to.equal(mockAge);
    expect(wrapper.find('input.memberView__input')).to.have.length(1);
  });

  it('returns null', () => {
    const wrapper = mount(
      <Age/>
    );
    expect(wrapper.find('input.memberView__input')).to.have.length(0);
  });

});
