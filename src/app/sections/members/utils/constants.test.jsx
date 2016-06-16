import {
  _generateMedicalConditions,
  _generateKnownAllergies,
  _generateMedicationTypes
} from './constants.jsx';
import {expect} from 'chai';
import R from 'ramda';
const medicalConditionsList = [
  {
    id: 'none',
    label: 'No Medical Conditions',
    value: false
  },
  {
    id: 'Allergic Conjunctivitis\t(allergy in the eyes)',
    label: 'Allergic Conjunctivitis (allergy in the eyes)',
    value: false
  },
  {
    id: 'Allergic Rhinitis\t(Hay Fever)',
    label: 'Allergic Rhinitis (Hay Fever)',
    value: false
  }
];

const knownAllergiesList = [
  {
    label: 'Trees',
    category: 'Trees',
    subcategory: '',
    list: [
      {
        id: 'Acacia',
        label: 'Acacia',
        value: false
      },
      {
        id: 'Yes, but not sure to which Trees',
        label: 'Yes, but not sure to which Trees',
        value: false
      }
    ]
  },
  {
    label: 'Grass',
    category: 'Grass',
    subcategory: '',
    list: [
      {
        id: 'Bahia',
        label: 'Bahia',
        value: false
      },
      {
        id: 'Yes, but not sure to which Grass',
        label: 'Yes, but not sure to which Grass',
        value: false
      }
    ]
  },
  {
    label: 'Weeds',
    category: 'Weeds',
    subcategory: '',
    list: [
      {
        id: 'Cocklebur',
        label: 'Cocklebur',
        value: false
      },
      {
        id: 'Dock, Yellow',
        label: 'Dock, Yellow',
        value: false
      }
    ]
  }
];

const medicationTypesList = [
  {
    label: 'Adrenaline Injections',
    category: 'Adrenaline Injections',
    subcategory: '',
    list: [
      {
        id: 'Epi-Pen Jr.\tEpinephrine',
        label: 'Epi-Pen Jr.',
        description: 'Epinephrine',
        value: false
      }
    ]
  },
  {
    label: 'Allergen Immunotherapy',
    category: 'Allergen Immunotherapy',
    subcategory: '',
    list: [
      {
        id: 'none',
        label: 'No Allergen Immunotherapy',
        description: '',
        value: false
      },
      {
        id: 'Sublingual Ragweed Pill',
        label: 'Sublingual Ragweed Pill',
        description: '',
        value: false
      },
      {
        id: 'Nucala\u00ae \t\tMepolizumab',
        label: 'Nucala®',
        description: 'Mepolizumab',
        value: false
      },
      {
        id: 'Xolair\u00ae \t\tOmalizumab',
        label: 'Xolair®',
        description: 'Omalizumab',
        value: false
      }
    ]
  },
  {
    label: 'Eyes',
    category: 'Eyes',
    subcategory: '',
    list: [
      {
        id: 'none',
        label: 'No Eye Medication',
        description: '',
        value: false
      },
      {
        id: 'Alaway\tKetotifen',
        label: 'Alaway',
        description: 'Ketotifen',
        value: false
      },
      {
        id: 'Bepreve\tBepotastine',
        label: 'Bepreve',
        description: 'Bepotastine',
        value: false
      },
      {
        id: 'Naphcon\tPheniramine',
        label: 'Naphcon',
        description: 'Pheniramine',
        value: false
      }
    ]
  }
];

describe('constants', () => {
  it('_generateMedicalConditions', () => {
    const generatedList = _generateMedicalConditions(medicalConditionsList);
    expect(generatedList.length).to.equal(medicalConditionsList.length);
    expect(generatedList[0]).to.equal('MEDICAL_CONDITIONS.No Medical Conditions');
  });
  it('_generateKnownAllergies', () => {
    const generatedList = _generateKnownAllergies(knownAllergiesList);
    expect(generatedList.length).to.equal(4);
    expect(generatedList[0]).to.equal('KNOWN_ALLERGIES.Acacia');
    expect(R.contains('No ')(generatedList)).to.equal(false);
  });
  it('_generateMedicationTypes', () => {
    const generatedList = _generateMedicationTypes(medicationTypesList);
    expect(generatedList.length).to.equal(7);
    expect(generatedList[0]).to.equal('MEDICATION_TYPES.Alaway');
  });
});
