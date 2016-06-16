import React from 'react';
import ProfileName from './ProfileName.jsx';

import {expect} from 'chai';
import {mount} from 'enzyme';

describe('ProfileName', () => {

  it('successfully renders', () => {
    const mockFirstName = 'Chuckles';
    const mockLastName = 'McGoober';

    const wrapper = mount(
      <ProfileName
          firstName={mockFirstName}
          lastName={mockLastName}
      />
    );

    expect(wrapper.props().firstName).to.equal(mockFirstName);
    expect(wrapper.props().lastName).to.equal(mockLastName);
    expect(wrapper.find('div').text()).to.equal(mockFirstName + ', ' + mockLastName);
  });

  it('returns null', () => {
    const wrapper = mount(
      <ProfileName/>
    );

    expect(wrapper.find('div')).to.have.length(0);
  });

});
