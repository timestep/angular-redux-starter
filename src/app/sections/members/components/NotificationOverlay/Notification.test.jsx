import React from 'react';
import NotificationImage from './NotificationImage.jsx';
import NotificationLinks from './NotificationLinks.jsx';
import NotificationMessage from './NotificationMessage.jsx';
import NotificationTitle from './NotificationTitle.jsx';
import NotificationTypes from './NotificationTypes.jsx';
import NotificationViewTemplate from './NotificationViewTemplate.jsx';
import {expect} from 'chai';
import {mount} from 'enzyme';

describe('NotificationForm', () => {

  describe('Image', () => {

    it('does not render if the link is set to \'Edit Profile\'', () => {
      const reduxFormImage = {value: 'test'};
      const reduxFormLinks = {value: 'Edit Profile'};
      const reduxFormViewTemplate = {value: 'test'};

      const wrapper = mount(
        <NotificationImage
            reduxFormImage={reduxFormImage}
            reduxFormLinks={reduxFormLinks}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.html()).to.equal(null);
    });

    it('does not render if the template is set to \'Text\'', () => {
      const reduxFormImage = {value: 'test'};
      const reduxFormLinks = {value: 'test'};
      const reduxFormViewTemplate = {value: 'Text'};

      const wrapper = mount(
        <NotificationImage
            reduxFormImage={reduxFormImage}
            reduxFormLinks={reduxFormLinks}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.html()).to.equal(null);
    });

    it('successfully renders with valid props', () => {
      const reduxFormImage = {value: ''};
      const reduxFormLinks = {value: ''};
      const reduxFormViewTemplate = {value: ''};

      const wrapper = mount(
        <NotificationImage
            reduxFormImage={reduxFormImage}
            reduxFormLinks={reduxFormLinks}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.find('input[type="file"]')).to.have.length(1);
    });

    it('renders an error msg when needed', () => {
      const reduxFormImage = {value: '', touched: true, error: 'Test Error Msg'};
      const reduxFormLinks = {value: ''};
      const reduxFormViewTemplate = {value: ''};

      const wrapper = mount(
        <NotificationImage
            reduxFormImage={reduxFormImage}
            reduxFormLinks={reduxFormLinks}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      // will match the div we want, as well as all parents, so we match for >= 1
      expect(wrapper.find('div').findWhere((div) => div.text() === reduxFormImage.error).length).to.not.equal(0);
    });

  });

  describe('Links', () => {

    it('renders all link choices with no errors', () => {
      const reduxFromLinks = {value: '', touched: false, error: false};

      const wrapper = mount(
        <NotificationLinks
            reduxFormLinks={reduxFromLinks}
        />
      );

      expect(wrapper.find('input[type="radio"]')).to.have.length(3);
      expect(wrapper.find('div').findWhere((div) => div.text() === 'Required')).to.have.length(0);
    });

    it('renders an error msg when needed', () => {
      const reduxFromLinks = {value: '', touched: true, error: 'error msg'};

      const wrapper = mount(
        <NotificationLinks
            reduxFormLinks={reduxFromLinks}
        />
      );

      expect(wrapper.find('input[type="radio"]')).to.have.length(3);
      expect(wrapper.find('div').findWhere((div) => div.text() === 'Required')).to.have.length(1);
    });

  });

  describe('Message', () => {

    it('does not render when the link is set to \'Edit Profile\'', () => {
      const reduxFormLinks = {value: 'Edit Profile'};
      const reduxFormMessage = {value: ''};
      const reduxFormViewTemplate = {value: ''};

      const wrapper = mount(
        <NotificationMessage
            reduxFormLinks={reduxFormLinks}
            reduxFormMessage={reduxFormMessage}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.html()).to.equal(null);
    });

    it('does not render when the template is set to \'Image\'', () => {
      const reduxFormLinks = {value: ''};
      const reduxFormMessage = {value: ''};
      const reduxFormViewTemplate = {value: 'Image'};

      const wrapper = mount(
        <NotificationMessage
            reduxFormLinks={reduxFormLinks}
            reduxFormMessage={reduxFormMessage}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.html()).to.equal(null);
    });

    it('successfully renders with valid props', () => {
      const reduxFormLinks = {value: ''};
      const reduxFormMessage = {value: ''};
      const reduxFormViewTemplate = {value: ''};

      const wrapper = mount(
        <NotificationMessage
            reduxFormLinks={reduxFormLinks}
            reduxFormMessage={reduxFormMessage}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('div').findWhere((div) => div.text() === 'Required')).to.have.length(0);
    });

    it('renders an error msg when needed', () => {
      const reduxFormLinks = {value: ''};
      const reduxFormMessage = {value: '', touched: true, error: 'test error msg'};
      const reduxFormViewTemplate = {value: ''};

      const wrapper = mount(
        <NotificationMessage
            reduxFormLinks={reduxFormLinks}
            reduxFormMessage={reduxFormMessage}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('div').findWhere((div) => div.text() === reduxFormMessage.error)).to.not.have.length(0);
    });

  });

  describe('Title', () => {

    it('renders a text box with no errors', () => {
      const reduxFormTitle = {value: ''};

      const wrapper = mount(
        <NotificationTitle
            reduxFormTitle={reduxFormTitle}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('div').findWhere((div) => div.text() === 'Required')).to.have.length(0);
    });

    it('renders an error msg when needed', () => {
      const reduxFormTitle = {value: '', touched: true, error: 'custom error msg'};

      const wrapper = mount(
        <NotificationTitle
            reduxFormTitle={reduxFormTitle}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('div').findWhere((div) => div.text() === reduxFormTitle.error)).to.not.have.length(0);
    });

  });

  describe('Types', () => {
    const notificationTypes = [
      {
        name: 'Personal Message'
      }, {
        name: 'Warning'
      }, {
        name: 'Quick Chat'
      }
    ];

    it('renders a select box with each option', () => {
      const reduxFormTypes = {value: '', onChange: () => {}};

      const wrapper = mount(
        <NotificationTypes
            reduxFormTypes={reduxFormTypes}
        />
      );

      expect(wrapper.find('select')).to.have.length(1);
      expect(wrapper.find('option')).to.have.length(notificationTypes.length);
    });

  });

  describe('ViewTemplate', () => {
    const templateTypes = [
      {
        name: 'Text'
      }, {
        name: 'Image'
      }, {
        name: 'Text+Image'
      }
    ];

    it('does not render of the link is set to \'Edit Profile\'', () => {
      const reduxFormLinks = {value: 'Edit Profile'};
      const reduxFormViewTemplate = {};

      const wrapper = mount(
        <NotificationViewTemplate
            reduxFormLinks={reduxFormLinks}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.html()).to.equal(null);
    });

    it('renders a select box with each option', () => {
      const reduxFormLinks = {value: ''};
      const reduxFormViewTemplate = {};

      const wrapper = mount(
        <NotificationViewTemplate
            reduxFormLinks={reduxFormLinks}
            reduxFormViewTemplate={reduxFormViewTemplate}
        />
      );

      expect(wrapper.find('select')).to.have.length(1);
      expect(wrapper.find('option')).to.have.length(templateTypes.length);
    });

  });

});
