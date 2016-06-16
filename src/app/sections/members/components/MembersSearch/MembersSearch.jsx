import R from 'ramda';
import React from 'react';
import { reduxForm } from 'redux-form';
import {
  CALENDAR,
  MEMBERS_SEARCH,
  STATES
} from '../../utils/constants.jsx';

import DatePickerCalendar from '../DatePickerCalendar/DatePickerCalendar.jsx';
import ModalContainer from '../MultiSelector/ModalContainer.jsx';
import MultiSelector from '../MultiSelector/MultiSelector.jsx';

import {
  transformConstantsToFormFields
} from '../../utils/transformList.jsx';

import Header2 from '../Headers/Header2.jsx';

const BS = ReactBootstrap;

const CATEGORY_CONTAINER_STYLE = {
  height: '80px'
};

const CATEGORY_CHILD_CONTAINER_STYLE = {
  padding: 0
};

class MembersSearch extends React.Component {

  renderCategorizedFormFields(list, category) {
    const parentList = R.filter((item) => R.isNil(item.id))(list);
    const childrenList = R.filter((item) => !R.isNil(item.id))(list);
    const content = R.foldlIndexed((acc, parent, index) => {
      const _childrenList = R.filter((item) => item.path.indexOf(parent.path) >= 0)(childrenList);
      const _content = this.renderDropdownList(_childrenList, category);
      const _category = parent.category + (parent.subcategory ? ' - ' + parent.subcategory : '');
      acc.push((
        <div
            className={'col-sm-4'}
            key={parent.category + '-col-' + index}
            style={CATEGORY_CONTAINER_STYLE}
        >
          <div
              className={'container-fluid'}
              style={CATEGORY_CHILD_CONTAINER_STYLE}
          >
            <div className={'row'}>
              <div className={'col-sm-12'}>
                <span className="caps">{_category}</span>
                {_content}
              </div>
            </div>
          </div>
        </div>
      ));

      return acc;
    }, [], parentList);

    return (
      <div className={'container-fluid'}>
        <div className={'row'}>
          {content}
        </div>
      </div>
    );
  }

  renderDropdownFormField(classStyle, selector, onFormInputChange, list) {
    const { onDropdownChange } = this.props;
    const onClick = (value) => {
      onDropdownChange(selector, value);
      onFormInputChange(value);
    };

    return list.map((value) => {
      return (
        <BS.MenuItem
            className={classStyle}
            key={value}
            onClick={() => onClick(value)}
        >
          {value ? value : (<br />)}
        </BS.MenuItem>
      );
    });
  }

  renderDropdownList(list, listName) {
    const { fields } = this.props;

    const itemsPerCol = list.length;

    const content = R.pipe(
      R.foldlIndexed((acc, item, index) => {
        const group = Math.floor(index / itemsPerCol);
        acc[group] = acc[group] || {};
        acc[group][item.label] = R.path(item.path, fields);
        return acc;
      }, []),
      R.mapIndexed((children, index) => {
        return (
          <div
              key={listName + '-' + index}
          >
            <ModalContainer
                icon={"caret dropdownarrow"}
                label="Select"
            >
              <MultiSelector
                  reduxForm={children}
              />
            </ModalContainer>
          </div>
        );
      })
    )(list);

    return (
      <div>
        {content}
      </div>
    );
  }

  renderContactInformation() {
    const {
      fields: { CONTACT_INFO },
      stateSelector
    } = this.props;

    const stateOptions = this.renderDropdownFormField(
      '',
      'stateSelector',
      CONTACT_INFO.STATE.onChange,
      [null].concat(STATES.map((state) => state.name))
    );

    return (
      <div className="membersSearch__section">
        <div className="row">
          <div className="col-sm-12">
            <Header2>
              <h2>{'Contact Information'}</h2>
            </Header2>
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="col-sm-12">
            <span>{'Address'}</span>
            <BS.Input
                {...CONTACT_INFO.ADDRESS}
                type="text"
            />
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="col-sm-6">
            <span>{'City'}</span>
            <BS.Input
                {...CONTACT_INFO.CITY}
                type="text"
            />
          </div>
          <div className="col-sm-3">
            {'State'}
            <br/>
            <BS.SplitButton
                id={'stateSelector'}
                title={stateSelector || 'State'}
            >
              {stateOptions}
            </BS.SplitButton>
            <input
                {...CONTACT_INFO.STATE}
                type="hidden"
            />
          </div>
          <div className="col-sm-3">
            <span>{'Zip'}</span>
            <BS.Input
                {...CONTACT_INFO.ZIP_CODE}
                type="text"
            />
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="col-sm-3">
            <span>{'Tel. (Home)'}</span>
            <BS.Input
                {...CONTACT_INFO.TEL___HOME_}
                placeholder={'000-000-0000'}
                type="text"
            />
          </div>
          <div className="col-sm-3">
            <span>{'Tel. (Mobile)'}</span>
            <BS.Input
                {...CONTACT_INFO.TEL___MOBILE_}
                placeholder={'000-000-0000'}
                type="text"
            />
          </div>
          <div className="col-sm-6">
            <span>{'Email'}</span>
            <BS.Input
                {...CONTACT_INFO.EMAIL}
                placeholder={'user@email.com'}
                type="text"
            />
          </div>
        </div>
      </div>
    );
  }

  renderKnownAllergies() {
    return (
      <div className="membersSearch__section">
        <div className="row">
          <div className="col-sm-12">
            <Header2>
              <h2>{'Known Allergies'}</h2>
            </Header2>
          </div>
        </div>
        <div className="row">
          {this.renderKnownAllergiesList()}
        </div>
      </div>
    );
  }

  renderKnownAllergiesList() {
    return this.renderCategorizedFormFields(
      MEMBERS_SEARCH.FORM_FIELDS.MEDICAL_INFO.KNOWN_ALLERGIES,
      'KNOWN_ALLERGIES'
    );
  }

  renderMedicalConditionsList() {
    return this.renderDropdownList(
      MEMBERS_SEARCH.FORM_FIELDS.MEDICAL_INFO.MEDICAL_CONDITIONS,
      'MEDICAL_CONDITIONS'
    );
  }

  renderMedicalInformation() {

    const {
      fields: {
        MEDICAL_INFO
      }
    } = this.props;

    return (
      <div className="membersSearch__section">
        <div className="row">
          <div className="col-sm-12">
            <Header2>
              <h2>{'Medical Information'}</h2>
            </Header2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <span className="caps">{'Severity Test'}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <span className="caps">{'Start Date'}</span>
            <br />
            <DatePickerCalendar
                className={'form-control'}
                dateFormat={'YYYY/MM/DD'}
                defaultValue={null}
                readOnly={false}
                reduxForm={MEDICAL_INFO.SEVERITY_TEST.FIELDS.START_DATE}
            />
          </div>
          <div className="col-sm-4">
            <span className="caps">{'End Date'}</span>
            <br />
            <DatePickerCalendar
                className={'form-control'}
                dateFormat={'YYYY/MM/DD'}
                defaultValue={null}
                readOnly={false}
                reduxForm={MEDICAL_INFO.SEVERITY_TEST.FIELDS.END_DATE}
            />
          </div>
          <div className="col-sm-4">
            <span className="caps">{'Results'}</span>
            {this.renderSeverityTestResultsList()}
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <span className="caps">{'Medical Conditions'}</span>
            {this.renderMedicalConditionsList()}
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <span className="caps">{'Medications'}</span>
          </div>
        </div>
        <div className="row">
          {this.renderMedicationsList()}
        </div>
      </div>
    );
  }

  renderMedicationsList() {
    return this.renderCategorizedFormFields(
      MEMBERS_SEARCH.FORM_FIELDS.MEDICAL_INFO.MEDICATION_TYPES,
      'MEDICATION_TYPES'
    );
  }

  renderPersonalInformation() {
    const {
      birthMonthSelector,
      birthYearSelector,
      fields: { PERSONAL_INFO }
    } = this.props;

    const birthMonthOptions = this.renderDropdownFormField(
      '',
      'birthMonthSelector',
      PERSONAL_INFO.BIRTH_MONTH.onChange,
      [null].concat(CALENDAR.MONTH_LABELS)
    );

    const birthYearOptions = this.renderDropdownFormField(
      '',
      'birthYearSelector',
      PERSONAL_INFO.BIRTH_YEAR.onChange,
      [null].concat(CALENDAR.LAST_HUNDRED_YEARS)
    );

    return (
      <div className="membersSearch__section">
        <div className="row">
          <div className="col-sm-12">
            <Header2>
              <h2>{'Personal Information'}</h2>
            </Header2>
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="col-sm-6">
            <span>{'Last Name'}</span>
            <BS.Input
                {...PERSONAL_INFO.LAST_NAME}
                type="text"
            />
          </div>
          <div className="col-sm-6">
            <span>{'First Name'}</span>
            <BS.Input
                {...PERSONAL_INFO.FIRST_NAME}
                type="text"
            />
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <span>{'Gender'}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <input
                    {...PERSONAL_INFO.GENDER}
                    defaultChecked="true"
                    type="radio"
                    value=""
                /> {'Both'}
              </div>
              <div className="col-sm-4">
                <input
                    {...PERSONAL_INFO.GENDER}
                    type="radio"
                    value="Male"
                /> {'Male'}
              </div>
              <div className="col-sm-4">
                <input
                    {...PERSONAL_INFO.GENDER}
                    type="radio"
                    value="Female"
                /> {'Female'}
              </div>
            </div>
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <span className="caps">{'Age Range'}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                {'Minimum'}
                <BS.Input
                    {...PERSONAL_INFO.MINIMUM_BIRTH_AGE}
                    max="100"
                    min="0"
                    type="number"
                />
              </div>
              <div className="col-sm-3">
                {'Maximum'}
                <BS.Input
                    {...PERSONAL_INFO.MAXIMUM_BIRTH_AGE}
                    max="100"
                    min="0"
                    type="number"
                />
              </div>

              <div className="col-sm-3">
                {'Birth Month'}
                <br />
                <BS.SplitButton
                    id={'birthMonthSelector'}
                    title={birthMonthSelector || 'Month'}
                >
                  {birthMonthOptions}
                </BS.SplitButton>
                <input
                    {...PERSONAL_INFO.BIRTH_MONTH}
                    type="hidden"
                />
              </div>

              <div className="col-sm-3">
                {'Birth Year'}
                <br />
                <BS.SplitButton
                    id={'birthYearSelector'}
                    title={birthYearSelector || 'Year'}
                >
                  {birthYearOptions}
                </BS.SplitButton>
                <input
                    {...PERSONAL_INFO.BIRTH_YEAR}
                    type="hidden"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <span>{'Physician*'}</span>
                <BS.Input
                    {...PERSONAL_INFO.PHYSICIAN}
                    type="text"
                />
              </div>
              <div className="col-sm-6">
                <span>{'Pharmacy*'}</span>
                <BS.Input
                    {...PERSONAL_INFO.PHARMACIST}
                    type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row membersSearch__row">
          <div className="col-sm-12">
            {'* Separate multiple search items with semi-colons.'}
          </div>
        </div>
      </div>
    );
  }

  renderSeverityTestResultsList() {
    return this.renderDropdownList(
      MEMBERS_SEARCH.FORM_FIELDS.MEDICAL_INFO.SEVERITY_TEST.RESULTS,
      'SEVERITY_TEST_RESULTS'
    );
  }

  render() {

    const {
      handleSubmit,
      onFormReset,
      onFormSubmit
    } = this.props;

    return (
      <form
          className="container-fluid"
          onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="row membersSearch__body">
          <div className="container-fluid">
            <div className="membersSearch__header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    <h1>{'Filters'}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="row membersSearch__body">
              <div className="col-sm-12 col-md-6 membersSearch__column">
                <div className="container-fluid">
                  {this.renderPersonalInformation()}
                  {this.renderContactInformation()}
                </div>
              </div>
              <div className="col-sm-12 col-md-6 membersSearch__column">
                <div className="container-fluid">
                  {this.renderMedicalInformation()}
                  {this.renderKnownAllergies()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row membersSearch__footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <BS.Button
                    type="submit"
                >
                  {'Submit'}
                </BS.Button>
                <BS.Button
                    onClick={()=>onFormReset('membersSearch')}
                    type="reset"
                >
                  {'Reset'}
                </BS.Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

}

MembersSearch.propTypes = { };

export default MembersSearch = reduxForm(
  {
    fields: transformConstantsToFormFields(MEMBERS_SEARCH.FORM_FIELDS),
    form: 'membersSearch',
    getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
  }
)(MembersSearch);
