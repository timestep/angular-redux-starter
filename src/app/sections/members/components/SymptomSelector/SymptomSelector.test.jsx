import React from 'react';
import sinon from 'sinon';
import SymptomSelector from './SymptomSelector.jsx';
import {expect} from 'chai';
import {mount} from 'enzyme';

const SYMPTOMS = [
  'Allergy', 'Asthma', 'Migraine', 'Arthritis'
];

describe('SymptomSelector', () => {

  it('renders the correct list of options ', () => {
    const activeSymptom = 'Allergy';
    const isSearchSelected = false;

    const wrapper = mount(
      <SymptomSelector activeSymptom={activeSymptom}
          isSearchSelected={isSearchSelected}
          options={SYMPTOMS}
      />
    );

    expect(wrapper.props().activeSymptom).to.equal(activeSymptom);
    expect(wrapper.find('li').length).to.equal(SYMPTOMS.length);
  });

  it('selects the current activeSymptom', () => {
    const activeSymptom = 'Asthma';
    const isSearchSelected = false;

    const wrapper = mount(
      <SymptomSelector activeSymptom={activeSymptom}
          isSearchSelected={isSearchSelected}
          options={SYMPTOMS}
      />
    );

    expect(wrapper.props().activeSymptom).to.equal(activeSymptom);
    expect(wrapper.find('a.active').length).to.equal(1);
    expect(wrapper.find('a.active').text()).to.equal(activeSymptom);
  });

  it('responds to click events', () => {
    const activeSymptom = 'Allergy';
    const onSymptomChange = sinon.spy();
    const isSearchSelected = false;

    const wrapper = mount(
      <SymptomSelector activeSymptom={activeSymptom}
          isSearchSelected={isSearchSelected}
          onSymptomChange={onSymptomChange}
          options={SYMPTOMS}
      />
    );
    expect(wrapper.props().activeSymptom).to.equal(activeSymptom);

    // click the asthma button
    wrapper.find('a').findWhere(opt => opt.text() === 'Asthma').simulate('click');
    expect(onSymptomChange.calledOnce).to.equal(true);
  });

  it('doesnt responds to click events if inactive', () => {
    const activeSymptom = 'Allergy';
    const onSymptomChange = sinon.spy();
    const isSearchSelected = false;

    const wrapper = mount(
      <SymptomSelector activeSymptom={activeSymptom}
          isSearchSelected={isSearchSelected}
          onSymptomChange={onSymptomChange}
          options={SYMPTOMS}
      />
    );
    expect(wrapper.props().activeSymptom).to.equal(activeSymptom);

    // click the asthma button
    wrapper.find('a').findWhere(opt => opt.text() === 'Migraine').simulate('click');
    expect(onSymptomChange.calledOnce).to.equal(false);
  });

  it('disables all symptoms when search is selected', () => {
    const activeSymptom = 'Allergy';
    const isSearchSelected = true;

    const wrapper = mount(
      <SymptomSelector activeSymptom={activeSymptom}
          isSearchSelected={isSearchSelected}
          options={SYMPTOMS}
      />
    );

    expect(wrapper.find('a.active').length).to.equal(0);
    expect(wrapper.find('a').length).to.equal(4);
  });

});
