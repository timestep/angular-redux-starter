'use strict';

angular.module('ka-allergen-categories', [])
  .value('allergenCategories', ['Trees', 'Weeds', 'Grass', 'Mold Spores'])
  .value('allergenLevels', [0, 1, 2, 3, 4])
  .value('allergenLevelLabels', ['Absent', 'Low', 'Medium', 'High', 'Very High'])
  .service('allergensFor', function () {
    return {
      data: {
        'Animals': {
          'Birds': null,
          'Cats': null,
          'Dogs': null,
          'Guinea Pigs': null,
          'Hamsters': null,
          'Horses': null,
          'Livestock': null,
          'Rabbits': null
        },
        'Drugs': {
          'Aspirin': null,
          'Codeine': null,
          'Erythromycin': null,
          'Iodides': null,
          'Penicillin': null,
          'Radio-contrast Dye': null,
          'Sulfa': null
        },
        'Food': {
          'Eggs': null,
          'Fish': {
            'All white fish': null,
            'Cod': null,
            'Perch': null,
            'Salmon': null,
            'Tuna': null,
            'Other Fish': null
          },
          'Fruits': {
            'Apple': null,
            'Avocado': null,
            'Banana': null,
            'Blue Berries': null,
            'Dates': null,
            'Figs': null,
            'Kiwi': null,
            'Orange': null,
            'Peach': null,
            'Pear': null,
            'Raspberries': null,
            'Strawberries': null,
            'Other Fruits': null
          },
          'Fungi': {
            'Mushrooms': null,
            'Other Fungi': null
          },
          'Meats': {
            'Beef': null,
            'Chicken': null,
            'Lamb': null,
            'Pork': null,
            'Turkey': null,
            'Other Meat': null
          },
          'Milk  (cow)': null,
          'Nuts & Seeds': {
            'All Nuts': null,
            'All Seeds': null,
            'Almond': null,
            'Cashew': null,
            'Coconut': null,
            'Pecan': null,
            'Pine Nuts': null,
            'Pistachio': null,
            'Sesame Seeds': null,
            'Sunflower Seeds': null,
            'Walnut': null,
            'Other Nut and Seed': null
          },
          'Peanut': null,
          'Shellfish': {
            'All Shellfish': null,
            'Crab': null,
            'Crayfish / Crawfish': null,
            'Lobster': null,
            'Oysters': null,
            'Scallops': null,
            'Shrimp': null,
            'Other Shellfish': null
          },
          'Soy Beans': null,
          'Spices': {
            'Dill': null,
            'Mustard': null,
            'Oregano': null,
            'Parsley': null,
            'Pepper Black': null,
            'Pepper Red (Cayenne)': null,
            'Other Spice': null
          },
          'Vegetables': {
            'Carrot': null,
            'Celery': null,
            'Corn': null,
            'Lettuce': null,
            'Onions': null,
            'Potato': null,
            'Tomato': null,
            'Other Vegetable': null
          },
          'Wheat, Barley, Buckwheat': null,
          'Other Food': null
        },
        'Grass': {
          'Bahia': null,
          'Bermuda': null,
          'Meadow fescue grasses': null,
          'Orchard': null,
          'Red top': null,
          'Rye': null,
          'Timothy': null,
          'Unknown': null
        },
        'Latex, Natural Rubber': null,
        'Mold Spores': {
          'Alternaria': null,
          'Ascospores': null,
          'Aspergillus sp.': null,
          'Basidiospores': null,
          'Botrytis': null,
          'Cercospora': null,
          'Cladosporium': null,
          'Curvularia': null,
          'Drechslera': null,
          'Erysiphe': null,
          'Epicoccum': null,
          'Fusarium': null,
          'Helminthosporium': null,
          'Mucor': null,
          'Nigrospora': null,
          'Penicillium': null,
          'Periconia': null,
          'Pestalotia': null,
          'Pithomyces': null,
          'Polythrincium': null,
          'Rhizopus': null,
          'Rusts': null,
          'Smuts': null,
          'Stemphylium': null,
          'Torula': null,
          'Unknown': null
        },
        'Trees': {
          'Acacia': null,
          'Alder, Red': null,
          'Ash, White': null,
          'Aspen': null,
          'Australian Pine': null,
          'Bayberry, Southern': null,
          'Beech, American': null,
          'Birch': null,
          'Cedar, Mountain': null,
          'Cedar, Red': null,
          'Cottonwood': null,
          'Cypress, Arizona': null,
          'Cypress, Bald': null,
          'Elm, American': null,
          'Eucalyptus, Blue gum': null,
          'Hazelnut, American': null,
          'Hickory, Shellbark': null,
          'Maple, Box elder': null,
          'Maple, Red': null,
          'Mesquite': null,
          'Mulberry, Red': null,
          'Oak': null,
          'Olive': null,
          'Palm, Queen': null,
          'Paloverde': null,
          'Pecan': null,
          'Pepper tree': null,
          'Pine': null,
          'Privet': null,
          'Sweet gum': null,
          'Sycamore': null,
          'Walnut, Black': null,
          'Willow, Black': null,
          'Unknown': null
        },
        'Weeds': {
          'Cocklebur': null,
          'Dock, Yellow': null,
          'Feverfew, Santa Maria': null,
          'Firebush, Burning Bush': null,
          'Hemp': null,
          'Lamb\u2019s quarters': null,
          'Mugwort': null,
          'Nettle, Stinging': null,
          'Pellitory, Wall': null,
          'Pigweed, Redroot': null,
          'Plantain, English': null,
          'Rabbit Bush': null,
          'Ragweed, Giant': null,
          'Ragweed, Short': null,
          'Ragweed, Western': null,
          'Russian thistle': null,
          'Sagebrush': null,
          'Sorrel, Red': null,
          'Tumbleweed': null,
          'Unknown': null
        }
      }
    };
  });