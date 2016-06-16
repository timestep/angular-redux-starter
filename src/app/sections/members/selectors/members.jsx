import { createSelector } from 'reselect';
import {
  ACTIVE_SEVERITY,
  ACTIVE_SYMPTOM
} from '../utils/constants.jsx';

const getActiveFilters = (state) => state.activeFilter.get('currentlySelectedFilters');
const getActiveSymptom = (state) => state.activeSymptom.get('selected');
const getActiveSeverity = (state) => state.activeSeverity.get('selected');
const getMembers = (state) => state.activeMembers.get('members');
const getSortLastTestIsActive = (state) => state.activeMembers.get('sortLastTestIsActive');

/* Helpers */

const factorsArray = ['awoken', 'wheezing', 'inhaler', 'inhaler_before_exercise',
                      'methylprednisolone', 'productive', 'nights', 'short_of_breath',
                      'days_inhaler_used', 'emergency_room_visit'];


function filterBasedOnSeverity(members, severity) {
  // Remove all OOC entries since they will be the duplicates
  if (severity === ACTIVE_SEVERITY.CATEGORIES.ALL_SEVERITIES) {
    return members.filter((member) => member.get('range') !== 'out of control');
  }

  if (severity === ACTIVE_SEVERITY.CATEGORIES.OUT_OF_CONTROL) {
    severity = 'out of control';
  } else {
    severity = severity.toLowerCase();
  }

  return members.filter((member) => member.get('range') === severity);
}

function addOocScoreToEachMember(oocMembers, factors) {
  return oocMembers.map((member) => {
    let matchedFactors = factors.filter((factor) => member.get(factor) > 0);
    return member.set('oocScore', matchedFactors.length);
  });
}

function compareOocScore(a, b) {
  if (a.get('oocScore') > b.get('oocScore')) {
    return -1;
  } else if (a.get('oocScore') < b.get('oocScore')) {
    return 1;
  }
  return 0;
}

/* Selector */

export const getFilteredMembers = createSelector(
  // input selectors we depend on
  [
    getActiveFilters,
    getActiveSymptom,
    getActiveSeverity,
    getMembers,
    getSortLastTestIsActive
  ],
  (
    activeFilters,
    activeSymptom,
    activeSeverity,
    members,
    sortLastTestIsActive
  ) => {

    // need to account for checkbox filters
    if (activeSymptom === ACTIVE_SYMPTOM.CATEGORIES.ASTHMA &&
      activeSeverity === ACTIVE_SEVERITY.CATEGORIES.OUT_OF_CONTROL) {
      const oocMembers = members.filter((member) => member.get('range') === 'out of control');
      const oocMembersWithOocScore = addOocScoreToEachMember(oocMembers, factorsArray);
      let sortedMemberListByOOCScore = oocMembersWithOocScore;
      if (!sortLastTestIsActive) {
        sortedMemberListByOOCScore = oocMembersWithOocScore.sort(compareOocScore);
      }

      if (activeFilters.size > 0) {
        sortedMemberListByOOCScore = sortedMemberListByOOCScore.filter((member) => {
          const matches = activeFilters.filter((filter) => member.get(filter));
          return matches.count() === activeFilters.size;
        });
      }

      return sortedMemberListByOOCScore;
    }

    return filterBasedOnSeverity(members, activeSeverity);
  }
);
