import {
  scrubObj
} from './toolbox.jsx';
import { medicalConditionsList } from './medicalConditionsList.jsx';
import { knownAllergiesList} from './knownAllergiesList.jsx';
import { medicationTypesList} from './medicationTypesList.jsx';
import { householdPets } from './householdPets.jsx';

import R from 'ramda';

// exported for testing only.
export const formatBasicInfo = ({ BASIC_INFO: basicInfo }) => {
  const dobForm = R.path('DOB.value', basicInfo);
  const genderForm = R.path('GENDER.value', basicInfo);

  let tempObj = {
    cell: R.path('CELL_PHONE.value', basicInfo),
    email: R.path('EMAIL.value', basicInfo),
    height: R.path('HEIGHT.value', basicInfo),
    phone: R.path('HOME_PHONE.value', basicInfo),
    weight: R.path('WEIGHT.value', basicInfo)
  };

  if (!R.isNil(genderForm)) {
    tempObj.gender = genderForm.toLowerCase();
  }

  if (!R.isNil(dobForm)) {
    tempObj.birthdayDay = moment(dobForm).date();
    tempObj.birthdayMonth = moment(dobForm).month() + 1; // months start at 0
    tempObj.birthdayYear = moment(dobForm).year();
  }

  return scrubObj(tempObj);
};

const formatPharmacyInfo = ({ PHARMACY: pharamacy }) => {
  if (pharamacy) {
    let tempObj = {
      email: R.path('EMAIL.value', pharamacy),
      name: R.path('NAME.value', pharamacy),
      phone: R.path('PHONE.value', pharamacy)
    };
    return scrubObj(tempObj);
  }
  return;
};

const formatPetInfo = ({ HOUSE_PETS: pets }) => {
  let tempObj = {};
  if (pets) {
    R.pipe(
      R.keys,
      R.map(function (key) {
        R.map(function (condition) {
          if (condition.label === key) {
            tempObj[condition.label] = pets[key].value;
          }
        }, householdPets);
      })
    )(pets);
  }
  return scrubObj(tempObj);
};

const formatCategoryList = (category) => {
  return [].concat(...category.map(item => item.list));
};

const formatCategoryItems = (profile, category, items) => {
  let tempObj = {};
  if (items) {
    R.pipe(
      R.keys,
      R.map(function (key) {
        R.map(function (condition) {
          if (condition.label === key) {
            tempObj[condition.id] = items[key].value;
          }
        }, category);
      })
    )(items);
  }
  return scrubObj(tempObj);
};

// exported for testing only.
export const formatFENOResults = ({ TEST_RESULTS: testResults }) => {
  if (testResults) {
    const fenoDate = R.path('FENO_DATE.value', testResults);

    let tempObj = {
      value: parseInt(R.path('FENO_VALUE.value', testResults), 10)
    };

    if (!R.isNil(fenoDate)) {
      tempObj.date = moment(fenoDate).toISOString();
    }

    return scrubObj(tempObj);
  }
  return;
};

// exported for testing only.
export const formatFEV1Results = ({ TEST_RESULTS: testResults }) => {
  if (testResults) {
    const fev1Date = R.path('FEV1_DATE.value', testResults);

    let tempObj = {
      value: R.path('FEV1_VALUE.value', testResults)
    };

    if (!R.isNil(fev1Date)) {
      tempObj.date = moment(fev1Date).toISOString();
    }

    return scrubObj(tempObj);
  }
  return;
};

const formattedKnownAllergiesList = formatCategoryList(knownAllergiesList);
const formattedMedicationTypeList = formatCategoryList(medicationTypesList);

export const mergeAndFormatProfile = (profile, updatedProfile) => {
  let mergedProfile = R.clone(
    Object.assign(
      profile,
      formatPetInfo(updatedProfile),
      formatBasicInfo(updatedProfile),
      formatCategoryItems(profile, medicalConditionsList, updatedProfile.MEDICAL_CONDITIONS),
      formatCategoryItems(profile, formattedMedicationTypeList, updatedProfile.MEDICATION_TYPES),
      formatCategoryItems(profile, formattedKnownAllergiesList, updatedProfile.KNOWN_ALLERGIES)
    )
  );

  mergedProfile.pharmacist = Object.assign(
    profile.pharmacist || {},
    formatPharmacyInfo(updatedProfile)
  );

  mergedProfile.fev1 = Object.assign(
    profile.fev1 || {},
    formatFEV1Results(updatedProfile)
  );

  mergedProfile.feno = Object.assign(
    profile.feno || {},
    formatFENOResults(updatedProfile)
  );

  return mergedProfile;
};
