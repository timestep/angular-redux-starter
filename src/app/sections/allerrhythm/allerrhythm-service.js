export default function allerrhythmService ($http,
                                  $window,
                                  geolocation,
                                  profile) {

  // Constants
  var LS_AUTH_TOKEN = 'Authorization';

  /**
   * Extend React props with profile data and geo location
   * @param orgProps
   * @param profileResponse
   * @returns {*}
   */
  function extendPropsWithProfile(orgProps, profileResponse) {
    var newProps = {
      profile: profileResponse.session,
      profilePhoto: profileResponse.profilePhoto
    };
    return R.mixin(orgProps, newProps);
  }

  /**
   * Extend React props with location information
   * like county, state, etc.
   * @param orgProps {}
   * @returns {*}
   */
  function extendPropsWithLocation(orgProps) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng='
        + orgProps.position.latitude + ',' + orgProps.position.longitude;

    // remove our authorization header before hitting google
    return $http.get(url, { headers: { 'Authorization': undefined } })
      .then(function (resp) {
        var newProps = {
          state: geolocation.getStateName(resp.data.results)
        };

        return R.mixin(orgProps, newProps);
      });
  }

  /**
   * Extend React props with extra data
   * @param orgProps
   * @returns {*}
   */
  function extendPropsWithParameters(orgProps) {
    return geolocation.getPosition()
      .then(function (position) {
        var today = moment();
        var params = {
          position: position.coords,
          dates: {
            start: moment(today).subtract(1, 'month').format('YYYY-MM-DD'),
            end: today.format('YYYY-MM-DD')
          }
        };

        return R.mixin(orgProps, params);
      });
  }

  /**
   * Inject mockData to allow for React to render faster
   * @param orgProps
   */
  function createMockPropsForInitialRender(orgProps) {
    var mockData = {
      dates: {
        end: new Date(),
        start: new Date()
      },
      position: {
        accuracy: 20,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 43.6475733,
        longitude: -79.3954555

      },
      state: 'ON'
    };
    return R.mixin(orgProps, mockData);
  }

  /**
   * Get our React component from the window, and render it.
   * @param props
   */
  function renderReact(props) {
    var kagenairDashboard = React.createElement($window.kagenairDashboard.dash, props);
    ReactDOM.render(kagenairDashboard, document.getElementById('kagendash'));
    return props;
  }

  function start(userEmail) {
    // State vars that React will need
    var props = {
      authToken: $window.localStorage.getItem(LS_AUTH_TOKEN) || null,
      email: userEmail
    };

    profile.getProfile(userEmail)
      .then(extendPropsWithProfile.bind(null, props))
      .then(createMockPropsForInitialRender)
      .then(extendPropsWithParameters)
      .then(extendPropsWithLocation)
      .then(renderReact);
  }

  return {
    start: start,
  };
}
