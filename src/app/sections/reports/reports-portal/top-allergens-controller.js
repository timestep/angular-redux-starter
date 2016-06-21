export default function TopAllergenCtrl(
  $modalInstance,
  selectedOrg,
  allergenItems,
  allergenType
) {
  var vm = this;
  vm.org = selectedOrg;
  vm.items = allergenItems;
  vm.type = allergenType;

  // helper function to clear allergen rank
  var clearRanks = function (item) {
    item.res = null;
  };

  // helper function to check if allergen rank is null or not
  var isNotNull = function (item) {
    if (item.res !== null) {
      return item;
    }
  };

  // make sure all allergens are clear
  R.map(clearRanks, vm.items);

  // save ranked allergens for selected clinic
  vm.submit = function () {

    var allergensRanked = R.filter(isNotNull, vm.items);
    var checkValidRank = R.compose(
      R.reduce(
        R.add, 0,
        R.map(
          R.get('res'), allergensRanked)));

    // display error if invalid ranking
    if (allergensRanked.length > 3) {
      window.alert('Please only rank up to 3 allergens.');
      return;
    }

    switch (allergensRanked.length) {
    case 1:
      if (checkValidRank !== 1) {
        window.alert('If ranking only one item, please rank allergen as "1".');
        return;
      }
      break;
    case 2:
      if (checkValidRank !== 3) {
        window.alert('If ranking two items, please rank allergens as "1" and "2".');
        return;
      }
      break;
    case 3:
      if (checkValidRank !== 6) {
        window.alert('If ranking three items, please rank allergens as "1", "2", and "3".');
        return;
      }
      break;
    }

    //close modal and return ranked allergerns
    vm.close(allergensRanked);
  };

  //close modal and return ranked allergens
  vm.close = function (allergensRanked) {
    var modalReturn = {};
    modalReturn.data = allergensRanked;
    $modalInstance.close(modalReturn);
  };
};
