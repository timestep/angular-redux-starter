import {
  formatBasicInfo,
  formatFEV1Results,
  formatFENOResults
} from './mergeAndFormatProfile.jsx';
import { expect } from 'chai';

const mockUpdatedProfile = {
  BASIC_INFO: {
    DOB: {
      value: moment()
    },
    GENDER: {
      value: 'FEMALE'
    },
    CELL_PHONE: {
      value: 12312312
    },
    EMAIL: {
      value: '12321'
    },
    HEIGHT: {
      value: 23423
    },
    HOME_PHONE: {
      value: '121321'
    },
    WEIGHT: {
      value: 12312
    }
  }
};

const mockFEV1 = {
  TEST_RESULTS: {
    FEV1_VALUE: {
      value: 1234
    },
    FEV1_DATE: {
      value: moment()
    }
  }
};

const mockFENO = {
  TEST_RESULTS: {
    FENO_VALUE: {
      value: 1234
    },
    FENO_DATE: {
      value: moment()
    }
  }
};

describe('mergeAndFormatProfile', () => {
  describe('formatBasicInfo', () => {
    it('should return clean format', () => {
      const formatedProfile = formatBasicInfo(mockUpdatedProfile);
      expect(formatedProfile).to.have.keys(
        'birthdayDay',
        'birthdayMonth',
        'birthdayYear',
        'cell',
        'email',
        'gender',
        'height',
        'phone',
        'weight'
      );
      expect(formatedProfile.cell).to.eql(mockUpdatedProfile.BASIC_INFO.CELL_PHONE.value);
      expect(formatedProfile.gender).to.eql(mockUpdatedProfile.BASIC_INFO.GENDER.value.toLowerCase());
      expect(formatedProfile.email).to.eql(mockUpdatedProfile.BASIC_INFO.EMAIL.value);
      expect(formatedProfile.height).to.eql(mockUpdatedProfile.BASIC_INFO.HEIGHT.value);
      expect(formatedProfile.weight).to.eql(mockUpdatedProfile.BASIC_INFO.WEIGHT.value);
      expect(formatedProfile.phone).to.eql(mockUpdatedProfile.BASIC_INFO.HOME_PHONE.value);
      expect(formatedProfile.birthdayDay).to.eql(moment(mockUpdatedProfile.BASIC_INFO.DOB.value).date());
      expect(formatedProfile.birthdayMonth).to.eql(moment(mockUpdatedProfile.BASIC_INFO.DOB.value).month() + 1);
      expect(formatedProfile.birthdayYear).to.eql(moment(mockUpdatedProfile.BASIC_INFO.DOB.value).year());
    });
  });
  describe('fev1', () => {
    it('should return clean format', () => {
      const formattedFEV1 = formatFEV1Results(mockFEV1);
      expect(formattedFEV1).to.have.keys(
        'date',
        'value'
      );
      expect(formattedFEV1.value).to.eql(mockFEV1.TEST_RESULTS.FEV1_VALUE.value);
      expect(formattedFEV1.date).to.eql(mockFEV1.TEST_RESULTS.FEV1_DATE.value.toISOString());
    });
  });
  describe('feno', () => {
    it('should return clean format', () => {
      const formatedFENO = formatFENOResults(mockFENO);
      expect(formatedFENO).to.have.keys(
        'date',
        'value'
      );
      expect(formatedFENO.value).to.eql(mockFENO.TEST_RESULTS.FENO_VALUE.value);
      expect(formatedFENO.date).to.eql(mockFENO.TEST_RESULTS.FENO_DATE.value.toISOString());
    });
  });
});
