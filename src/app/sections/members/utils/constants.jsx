import R from 'ramda';

import { contactInformationList } from './contactInformationList.jsx';
import { createLastHundredYears } from './createLastHundredYears.jsx';
import { householdPets } from './householdPets.jsx';
import { knownAllergiesList } from './knownAllergiesList.jsx';
import { medicalConditionsList } from './medicalConditionsList.jsx';
import { medicationTypesList } from './medicationTypesList.jsx';
import { personalInformationList } from './personalInformationList.jsx';

import {
  severityTestFields,
  severityTestResultsList
} from './severityTestFields.jsx';

import { stateInformation } from './stateInformation.jsx';
import { transformListToFormFieldConstants } from './transformList.jsx';

export const CONTACT_INFORMATION_LIST = contactInformationList;
export const KNOWN_ALLERGIES_LIST = knownAllergiesList;
export const PERSONAL_INFORMATION_LIST = personalInformationList;
export const MEDICAL_CONDITIONS_LIST = medicalConditionsList;
export const MEDICATION_TYPES_LIST = medicationTypesList;
export const SEVERITY_TEST_FIELDS = severityTestFields;
export const SEVERITY_TEST_RESULTS_LIST = severityTestResultsList;

export const PROFILE_TAB_OPTION = 'PROFILE';
export const AR_TAB_OPTION = 'ALLER-RHYTHM';

export const FEET = 'feet';
export const INCHES = 'inches';

export const GENDER_LIST = [
  'MALE',
  'FEMALE'
];

// Dover, Delaware
export const DEFAULT_LOCATION = {
  city: 'Dover',
  latitude: 39.158459,
  longitude: -75.493263,
  position: {
    latitude: 39.158459,
    longitude: -75.493263
  },
  state: 'DE'
};

export const ACTIVE_FILTER = {
  STATE: {
    ADD_FILTER_TO_SELECTED_LIST: 'ADD_FILTER_TO_SELECTED_LIST',
    FILTER_TOGGLE_CHANGE: 'FILTER_TOGGLE_CHANGE',
    REMOVE_FILTER_TO_SELECTED_LIST: 'REMOVE_FILTER_TO_SELECTED_LIST'
  },
  TYPE: {
    ALBUTEROL_USE: {
      id: 'albuterolUse',
      label: 'Albuterol Use'
    },
    COUGH_WHEEZE: {
      id: 'wheezing',
      label: 'Cough/Wheeze'
    },
    ER_VISIT: {
      id: 'emergencyRoomVisit',
      label: 'ER Visit'
    },
    LIMITED_ACTIVITES: {
      id: 'limitedActivities',
      label: 'Limited Activities'
    },
    NOCTURNAL_ASTHMA: {
      id: 'nocturnalAsthma',
      label: 'Nocturnal Asthma'
    },
    STEROID_USE: {
      id: 'steroidUse',
      label: 'Steroid Use'
    }
  }
};

export const ACTIVE_MEMBER = {
  STATE: {
    CHANGE_VIEW_TAB: 'CHANGE_VIEW_TAB',
    REJECT_REQUEST_MEMBER: 'REJECT_REQUEST_MEMBER',
    REQUEST_MEMBER: 'REQUEST_MEMBER',
    REQUEST_MEMBERS: 'REQUEST_MEMBERS',
    RESET_MEMBER: 'RESET_MEMBER',
    RESOLVE_REQUEST_MEMBER: 'RESOLVE_REQUEST_MEMBER',
    VIEW_SELECTED_MEMBER: 'VIEW_SELECTED_MEMBER',
    REQUEST_SAVE_MEMBER_PROFILE: 'REQUEST_SAVE_MEMBER_PROFILE',
    RESOLVE_SAVE_MEMBER_PROFILE: 'RESOLVE_SAVE_MEMBER_PROFILE',
    REJECT_SAVE_MEMBER_PROFILE: 'REJECT_SAVE_MEMBER_PROFILE'
  }
};

export const ACTIVE_SEARCH = {
  QUERY: {
    LIMIT: 100
  },
  STATE: {
    REJECT_SEARCH_MEMBERS: 'REJECT_SEARCH_MEMBERS',
    REQUEST_SEARCH_MEMBERS: 'REQUEST_SEARCH_MEMBERS',
    RESET_FORM_FIELDS: 'RESET_FORM_FIELDS',
    RESOLVE_SEARCH_MEMBERS: 'RESOLVE_SEARCH_MEMBERS',
    SEARCH_MEMBERS: 'SEARCH_MEMBERS',
    SELECT_DROPDOWN: 'SELECT_DROPDOWN',
    SELECT_SEARCH: 'SELECT_SEARCH',
    SORT_BY_LAST_TEST_TAKEN: 'SORT_BY_LAST_TEST_TAKEN',
    UNSELECT_SEARCH: 'UNSELECT_SEARCH'
  }
};

export const ACTIVE_SEVERITY = {
  CATEGORIES: {
    // Exception case that this follow a specific order as this will be used to render drop down menu items accordingly
    ALL_SEVERITIES: 'All',
    OUT_OF_CONTROL: 'Out of Control',
    VERY_HIGH: 'Very High',
    HIGH: 'High',
    MODERATE: 'Moderate',
    LOW: 'Low'
  },
  STATE: {
    SELECT_SEVERITY: 'SELECT_SEVERITY',
    UNSELECT_SEVERITY: 'UNSELECT_SEVERITY'
  }
};

export const ACTIVE_SYMPTOM = {
  CATEGORIES: {
    ALLERGY: 'Allergy',
    ARTHRITIS: 'Arthritis',
    ASTHMA: 'Asthma',
    MIGRAINE: 'Migraine'
  },
  STATE: {
    SELECTED_SYMPTOM_CHANGE: 'SELECTED_SYMPTOM_CHANGE'
  }
};

export const CALENDAR = {
  MONTH_LABELS: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  LAST_HUNDRED_YEARS: createLastHundredYears()
};

export const LOCAL_STORAGE_KEY = {
  USER_AUTHORIZATION_TOKEN: 'Authorization',
  USER_ORGANIZATION_ID: 'user.orgId'
};

export const HOUSE_HOLD_PETS = householdPets;

export const _generateMedicalConditions = (medList) => {
  return R.pipe(
    R.filter(x => !R.contains('No ')(x.label)),
    R.map(conditions => `MEDICAL_CONDITIONS.${conditions.label}`),
  )(medList);
};

export const _generateKnownAllergies = (allergylist) => {
  const list = [].concat(...allergylist.map(x=> x.list));
  const filteredList = R.filter((x) => {
    return x.label &&
      R.strIndexOf('No ')(x.label) === -1 &&
      R.strIndexOf('Yes, ')(x.label) === -1;
  })(list);
  return R.map(conditions => `KNOWN_ALLERGIES.${conditions.label}`)(filteredList).sort();
};

export const _generateMedicationTypes = (medTypesList) => {
  const list = [].concat(...medTypesList.map(x => x.list));
  const filteredList = R.filter((x) => {
    return R.strIndexOf('No ')(x.label) === -1;
  })(list);
  return R.map(conditions => `MEDICATION_TYPES.${conditions.label}`)(filteredList).sort();
};

export const _generateHouseHoldPets = () => {
  return R.map((item) => `HOUSE_PETS.${item.label}`)(HOUSE_HOLD_PETS);
};

export const MEMBER_PAGE = {
  FORM_FIELDS: {
    BASIC_INFO: [
      'BASIC_INFO.ADDRESS_LINE_1',
      'BASIC_INFO.ADDRESS_LINE_2',
      'BASIC_INFO.AGE',
      'BASIC_INFO.CELL_PHONE',
      'BASIC_INFO.DOB',
      'BASIC_INFO.EMAIL',
      'BASIC_INFO.GENDER',
      'BASIC_INFO.HEIGHT',
      'BASIC_INFO.HOME_PHONE',
      'BASIC_INFO.WEIGHT'
    ],
    CLINIC: [
      'CLINIC.ADDRESS',
      'CLINIC.NAME',
      'CLINIC.PHONE'
    ],
    INSURER: [
      'INSURER.ADDRESS',
      'INSURER.EMAIL',
      'INSURER.NAME',
      'INSURER.PHONE'
    ],
    PHARMACY: [
      'PHARMACY.ADDRESS',
      'PHARMACY.EMAIL',
      'PHARMACY.NAME',
      'PHARMACY.PHONE'
    ],
    PHYSICIAN: [
      'PHYSICIAN.ADDRESS_LINE_1',
      'PHYSICIAN.ADDRESS_LINE_2',
      'PHYSICIAN.EMAIL',
      'PHYSICIAN.NAME',
      'PHYSICIAN.PHONE'
    ],
    TEST_RESULTS: [
      'TEST_RESULTS.FENO_DATE',
      'TEST_RESULTS.FENO_VALUE',
      'TEST_RESULTS.FEV1_DATE',
      'TEST_RESULTS.FEV1_VALUE'
    ],
    MEDICAL_CONDITIONS: _generateMedicalConditions(MEDICAL_CONDITIONS_LIST),
    KNOWN_ALLERGIES: _generateKnownAllergies(KNOWN_ALLERGIES_LIST),
    MEDICATION_TYPES: _generateMedicationTypes(MEDICATION_TYPES_LIST),
    HOUSE_PETS: _generateHouseHoldPets()
  }
};

export const MEMBERS_SEARCH = {
  FORM_FIELDS: {
    CONTACT_INFO: transformListToFormFieldConstants(
      'CONTACT_INFO',
      CONTACT_INFORMATION_LIST
    ),
    MEDICAL_INFO: {
      KNOWN_ALLERGIES: transformListToFormFieldConstants(
        'MEDICAL_INFO.KNOWN_ALLERGIES',
        KNOWN_ALLERGIES_LIST
      ),
      MEDICATION_TYPES: transformListToFormFieldConstants(
        'MEDICAL_INFO.MEDICATION_TYPES',
        MEDICATION_TYPES_LIST
      ),
      MEDICAL_CONDITIONS: transformListToFormFieldConstants(
        'MEDICAL_INFO.MEDICAL_CONDITIONS',
        MEDICAL_CONDITIONS_LIST
      ),
      SEVERITY_TEST: {
        FIELDS: transformListToFormFieldConstants(
          'MEDICAL_INFO.SEVERITY_TEST.FIELDS',
          SEVERITY_TEST_FIELDS
        ),
        RESULTS: transformListToFormFieldConstants(
          'MEDICAL_INFO.SEVERITY_TEST.RESULTS',
          SEVERITY_TEST_RESULTS_LIST
        )
      }
    },
    PERSONAL_INFO: transformListToFormFieldConstants(
      'PERSONAL_INFO',
      PERSONAL_INFORMATION_LIST
    )
  }
};

export const MEMBERS_TABLE = {
  TABLE_HEADER_ROW_HEIGHT: 35,
  TABLE_PARENT_DIV: 'MEMBERS_TABLE',
  TABLE_PARENT_DIV_STYLE: {
    margin: 0,
    padding: 0
  },
  TABLE_ROW_HEIGHT: 35
};

export const NOTIFICATIONS = {
  FORM_NAME: 'notification',
  FORM_FIELDS: {
    NOTIFICATION: [
      'NOTIFICATION.IMAGE',
      'NOTIFICATION.LINK',
      'NOTIFICATION.MESSAGE',
      'NOTIFICATION.TITLE',
      'NOTIFICATION.TYPE',
      'NOTIFICATION.VIEW_TEMPLATE'
    ]
  },
  ICON_LABELS: {
    PERSONAL_MESSAGE: 'Personal Message',
    ALERT: 'Alert',
    QUICK_CHAT: 'Quick Chat'
  },
  ICON_TYPES: {
    PERSONAL_MESSAGE: 'icon-message',
    ALERT: 'icon-warning',
    QUICK_CHAT: 'icon-profile'
  },
  REQUEST_TYPES: {
    PERSONAL_MESSAGE: 'Personal Message',
    ALERT: 'Warning',
    QUICK_CHAT: 'Quick Chat'
  },
  STATE: {
    HIDE_NOTIFICATION_DIALOG: 'HIDE_NOTIFICATION_DIALOG',
    REQUEST_SEND_NOTIFICATION: 'REQUEST_SEND_NOTIFICATION',
    RESOLVE_SEND_NOTIFICATION: 'RESOLVE_SEND_NOTIFICATION',
    REJECT_SEND_NOTIFICATION: 'REJECT_SEND_NOTIFICATION',
    SELECT_NOTIFICATION: 'SELECT_NOTIFICATION',
    WARNING_SELECT_RECIPIENT: 'WARNING_SELECT_RECIPIENT'
  }
};

export const SORT_ORDER = {
  ASCENDING: 1,
  DESCENDING: -1
};

export const STATES = stateInformation;

export const USER_PROFILE = {
  PROFILE_PHOTO_PLACE_HOLDER_URL: '/images/img_placeholder_avatar.jpg'
};
