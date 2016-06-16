// This is used for the initial page load in order to render the components
// before the real data is received.
var initialPageloadUserData = {
  active_date: new Date(),
  active_range: '7 Day',
  active_symptom: 'allergy',
  data: {
    symptoms: {
      allergy: {
        color: '',
        data: [],
        domain: [
          0,
          100
        ],
        enabled: true,
        hover_color: '',
        name: 'allergy',
        proper_name: 'Allergy',
        subtext: '',
        units: ''
      },
      asthma: {
        color: '',
        data: [],
        domain: [
          0,
          100
        ],
        enabled: true,
        hover_color: '',
        name: 'allergy',
        proper_name: 'Allergy',
        subtext: '',
        units: ''
      },
      arthritis: {
      },
      migraine: {
      }
    },
    factors: {
      Weather: {
        temperature: {
          color: 'red',
          data: [],
          domain: [
            0,
            120
          ],
          enabled: false,
          hover_color: '',
          name: 'temperature',
          proper_name: 'Temperature',
          subtext: '',
          units: 'F'
        },
        'humidity': {
          'enabled': false,
          'name': 'humidity',
          'color': '#91D0CB',
          'hover_color': '',
          'proper_name': 'Humidity',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            100
          ],
          'units': '%'
        },
        'dew_point': {
          'enabled': false,
          'name': 'dew_point',
          'color': '#7E2DD2',
          'hover_color': '',
          'proper_name': 'Dew Point',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            100
          ],
          'units': 'F'
        },
        'wind_speed': {
          'enabled': false,
          'name': 'wind_speed',
          'color': '#263400',
          'hover_color': '',
          'proper_name': 'Wind Speed',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            50
          ],
          'units': 'mph'
        },
        'precipitation': {
          'enabled': false,
          'name': 'precipitation',
          'color': '#0076FF',
          'hover_color': '',
          'proper_name': 'Precipitation',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            10
          ],
          'units': 'inches'
        },
        'air_pressure': {
          'enabled': false,
          'name': 'air_pressure',
          'color': '#5E5E82',
          'hover_color': '',
          'proper_name': 'Air Pressure',
          'subtext': '',
          'data': [],
          'domain': [
            28,
            33
          ],
          'units': 'inHg'
        }
      },
      'Allergens': {
        'trees': {
          'enabled': false,
          'name': 'trees',
          'color': '#EBD000',
          'hover_color': '',
          'proper_name': 'Trees',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            4
          ],
          'units': 'Trees'
        },
        'grass': {
          'enabled': false,
          'name': 'grass',
          'color': '#39AF3C',
          'hover_color': '',
          'proper_name': 'Grass',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            4
          ],
          'units': 'Grass'
        },
        'weeds': {
          'enabled': false,
          'name': 'weeds',
          'color': '#EB5D36',
          'hover_color': '',
          'proper_name': 'Weeds',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            4
          ],
          'units': 'Weeds'
        },
        'mold_spores': {
          'enabled': false,
          'name': 'mold_spores',
          'color': '#50B1A2',
          'hover_color': '',
          'proper_name': 'Mold Spores',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            4
          ],
          'units': 'Molds'
        }
      },
      'Pollution': {
        'particle_pollution_2p5': {
          'enabled': false,
          'name': 'particle_pollution_2p5',
          'color': 'darkorange',
          'hover_color': '',
          'proper_name': 'Particle Pollution',
          'subtext': '(PM 2.5)',
          'data': [],
          'domain': [
            0,
            1000
          ],
          'units': 'ug/m3'
        },
        'particle_pollution_10': {
          'enabled': false,
          'name': 'particle_pollution_10',
          'color': 'dodgerblue',
          'hover_color': '',
          'proper_name': 'Particle Pollution',
          'subtext': '(PM 10)',
          'data': [],
          'domain': [
            0,
            1000
          ],
          'units': 'ug/m3'
        },
        'particle_pollution_10t2p5': {
          'enabled': false,
          'name': 'particle_pollution_10t2p5',
          'color': '#E85EBE',
          'hover_color': '',
          'proper_name': 'Particle Pollution',
          'subtext': '(PM 10 - 2.5)',
          'data': [],
          'domain': [
            0,
            1000
          ],
          'units': 'ug/m3'
        },
        'ozone': {
          'enabled': false,
          'name': 'ozone',
          'color': 'darkorchid',
          'hover_color': '',
          'proper_name': 'Ozone',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            60
          ],
          'units': 'ppm'
        }
      }
    },
    influences: {
      'asthma_control': {
        'medication_score': {
          'enabled': false,
          'name': 'medication_score',
          'color': '#0096d6',
          'hover_color': '',
          'proper_name': 'Medication Score',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            45
          ],
          'units': ''
        },
        'asthma_control_days': {
          'enabled': false,
          'name': 'asthma_control_days',
          'color': 'darkseagreen',
          'hover_color': '#C7DEC7',
          'proper_name': 'Asthma Control Days',
          'subtext': '',
          'data': [],
          'domain': [
            true,
            false
          ],
          'units': 'day'
        },
        'out_of_control_days': {
          'enabled': false,
          'name': 'out_of_control_days',
          'color': '#CF145E',
          'hover_color': '#E78AAE',
          'proper_name': 'Out-of-Control Days',
          'subtext': '',
          'data': [],
          'domain': [
            true,
            false
          ],
          'units': 'day'
        },
        'puffs_of_albuterol': {
          'enabled': false,
          'name': 'puffs_of_albuterol',
          'color': 'darkturquoise',
          'hover_color': '#80E6E8',
          'proper_name': 'Puffs of Albuterol',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            100
          ],
          'units': 'puff'
        },
        'nights_with_asthma': {
          'enabled': false,
          'name': 'nights_with_asthma',
          'color': 'darkslategray',
          'hover_color': '#2F4F4F',
          'proper_name': 'Nights with Asthma',
          'data': [],
          'domain': [
            0,
            100
          ],
          'units': 'night'
        },
        'emergency_visits': {
          'enabled': false,
          'name': 'emergency_visits',
          'color': 'darksalmon',
          'hover_color': '#E9967A',
          'proper_name': 'Emergency Visits',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            100
          ],
          'units': 'visit'
        },
        'prednisone_days': {
          'enabled': false,
          'name': 'prednisone_days',
          'color': '#B280E6',
          'hover_color': '#D8C0F2',
          'proper_name': 'Prednisone Days',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            100
          ],
          'units': 'day'
        }
      },
      'results': {
        'fev1': {
          'enabled': false,
          'name': 'fev1',
          'color': 'deepskyblue',
          'hover_color': '',
          'proper_name': 'FEV-1',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            11
          ],
          'units': 'Liters'
        },
        'feno': {
          'enabled': false,
          'name': 'feno',
          'color': 'darkviolet',
          'hover_color': '',
          'proper_name': 'FeNO',
          'subtext': '',
          'data': [],
          'domain': [
            0,
            250
          ],
          'units': 'ppb'
        }
      }
    }
  },
  display_range: [new Date(), new Date()],
  factorGlyphs: {},
  factorYScale: {},
  loading: false
};

module.exports = {
  initialPageloadUserData: initialPageloadUserData
};
