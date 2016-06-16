import d3Util from '../utils/d3.js';
import StockChart from './StockChart.jsx';
import ToggleGroups from './ToggleGroups/ToggleGroups.jsx';
import SymptomSelector from './SymptomSelector.jsx';
import DateDropdown from './DateDropdown.jsx';
import Triggers from './Triggers/Triggers.jsx';
import ControlGrid from './ControlGrid.jsx';
import FullScreen from './FullScreen.jsx';
import DefaultData from '../utils/default-data.js';
import Miscellaneous from '../utils/miscellaneous.js';
import MockUserData from '../utils/mock-user-data.js';
import Location from './Location.jsx';

import LS from '../utils/local-storage.js';
import api from '../utils/api-layer.js';

import * as BS from 'react-bootstrap';
import * as _ from 'lodash';

export default class Dash extends React.Component {

  constructor(props) {
    super(props);

    this.isUserAdult = moment().diff(moment(this.props.profile.birthdayMonth + '-' +
      this.props.profile.birthdayDay + '-' + this.props.profile.birthdayYear), 'years') >= 15;

    this.today = new Date();

    this.factorStack = [];
    this.influenceStack = [];

    this.dataserverPath = 'api/web/allerrhythm';
    this.graphIsLoading = false;
    this.fullScreenMode = false;
    this.fullScreenText = 'Full Screen';

    this.state = {
      content: 'Full Screen',
      clinic: null,
      pharmacy: null,
      coupon: {
        imageUrl: null,
        url: null
      }
    };
  }
  componentWillMount() {
    this.graphIsLoading = true;
    this.setState(MockUserData.initialPageloadUserData);
  }

  // Lifecycle methods first
  // [componentDidMount]
  componentDidMount() {
    this.setGraphDataState();

    // TODO - restore this at a later date
    // this.setClinicState();
    // this.setPharmacyState();
  }

  setGraphDataState() {
  // set variables values to be used in handleDateChange function
    this.latitude = this.props.position.latitude;
    this.longitude = this.props.position.longitude;
    this.email = this.props.email;
    this.authToken = this.props.authToken;

    let startDate = this.props.dates.start;
    let endDate = this.props.dates.end;
    let isUserAdult = this.isUserAdult;
    api.getDataByTime(startDate, endDate, this.latitude, this.longitude, this.email, this.authToken)
      .then((data) => {

        // we need to massage the FENO Data to fit the 'low-moderate-high-veryHigh' data range
        if (isUserAdult) {
          data.data.influences.results.feno = d3Util.convertAdultFENOResultsData(data.data.influences.results.feno);
        } else {
          data.data.influences.results.feno = d3Util.convertChildFENOResultsData(data.data.influences.results.feno);
        }

        // Massage temperature data
        var tempData = data.data.factors.Weather.temperature;
        data.data.factors.Weather.temperature = d3Util.convertTemperatureResultsData(tempData);

        if (DefaultData.isEmptyAllergenData(data)) {
          this.injectDefaultData(data, this.props.dates.start, this.props.dates.end);
        }
        this.graphIsLoading = false;
        this.setState(data);
        this.handleDateChange.bind(this, 'Week', 6, 3)();
      });
  }

  setClinicState() {

    let fetchClinicId = ()=> {
      if (this.props.profile.organizationName) {
        return this.props.profile.organizationName;
      }

      return Miscellaneous.getNearestClinic(this.props.authToken, this.latitude, this.longitude)
        .then(org => {
          return org ? org.id : null;
        });
    };

    let setClinicInfo = result => {
      this.setState({
        clinic: Miscellaneous.createPointOfInterest(result.label, result.address + ', ' + result.city,
          result.phone, result.latitude, result.longitude)});
    };

    $.when(fetchClinicId())
      .then(Miscellaneous.getClinicById.bind(null, this.props.authToken))
      .then(setClinicInfo);
  }

  setPharmacyState() {

    if (this.props.profile.pharmacist) {

      let lat = 0;
      let lng = 0;

      if (this.props.profile.pharmacist.coordinates) {
        lat = this.props.profile.pharmacist.coordinates.lat;
        lng = this.props.profile.pharmacist.coordinates.lng;
      } else if (this.props.profile.pharmacist.geometry) {
        lat = this.props.profile.pharmacist.geometry.location.lat;
        lng = this.props.profile.pharmacist.geometry.location.lng;
      }

      this.setState({
        pharmacy: Miscellaneous.createPointOfInterest(this.props.profile.pharmacist.name,
          this.props.profile.pharmacist.address || this.props.profile.pharmacist.vicinity,
          this.props.profile.pharmacist.phone, lat, lng)
      });
    } else {
      Miscellaneous.getNearestPharmacy(this.latitude, this.longitude)
        .then(result => {
          if (!result) {
            return;
          }
          this.setState({
            pharmacy: Miscellaneous.createPointOfInterest(result.name, result.vicinity, result.telephone, result.lat,
              result.lng)
          });
        });
    }
  }

  changeActiveDate(activeDate) {
    var newState = React.addons.update(this.state, {active_date: {$set: activeDate}});
    this.setState(newState);
  }

  applyNewTriggersToState(date, triggerResp) {
    let asthmaData = this.state.data.symptoms.asthma.data;
    asthmaData = asthmaData.map(function (point) {

      // over-write this points factor data with the new factors
      if (moment(date).date() === moment(point.date).date()) {
        point.correlation.asthma = triggerResp.asthma;
        point.correlation.allergy = triggerResp.allergy;
      }
      return point;
    });

    let allergyData = this.state.data.symptoms.allergy.data;
    allergyData = allergyData.map(function (point) {

      // over-write this points factor data with the new factors
      if (moment(date).date() === moment(point.date).date()) {
        point.correlation.asthma = triggerResp.asthma;
        point.correlation.allergy = triggerResp.allergy;
      }
      return point;
    });

    var newState = React.addons.update(this.state,
      {data: {symptoms: {asthma: {data: {$set: asthmaData }}}}},
      {data: {symptoms: {allergy: {data: {$set: allergyData }}}}});
    this.setState(newState);
  }

  getTriggersForDate(date) {
    let email = this.email;

    if (!this.email) {
      email = this.props.profile.email
        .replace(/\+/g, '_plus_')
        .replace(/\./g, '_dot_')
        .replace(/@/g, '_at_');
    }

    api.getTriggersByDay(email, date, this.authToken)
      .then((resp) => {
        this.applyNewTriggersToState(date, resp);
      });
  }

  // The range is calculated relative to the time, right now.
  // Deltas are measured in days
  handleDateChange(title, beforeDelta, afterDelta) {
    // To be safe with date objects, use millesecond deltas
    var now = this.today.getTime();
    var day = 1000 * 60 * 60 * 24;

    var ms = this.today.getMilliseconds();
    var s = ms + this.today.getSeconds() * 1000;
    var m = s + this.today.getMinutes() * 60000;
    var msPastMidnight = m + this.today.getHours() * 3600000;
    var newStartMs = now - (beforeDelta * day) - msPastMidnight;

    var newStart = new Date(newStartMs);
    var msUntilMidnight = day - msPastMidnight;

    var newEndMs = now + (afterDelta * day) + msUntilMidnight;
    var newEnd = new Date(newEndMs);

    let startDate = moment(newStart).format('YYYY-MM-DD');
    let endDate = moment(newEnd).format('YYYY-MM-DD');
    let isUserAdult = this.isUserAdult;

    // retrieve graph data only if the user requests view grater than 1 month
    if (!LS.checkIfDataAlreadyExists(startDate, title)) {
      this.graphIsLoading = true;

      api.getDataByTime(startDate, endDate, this.latitude, this.longitude, this.email, this.authToken)
        .then((data) => {

          // we need to massage the FENO Data to fi the 'low-moderate-high-veryHigh' data range
          if (isUserAdult) {
            data.data.influences.results.feno = d3Util.convertAdultFENOResultsData(data.data.influences.results.feno);
          } else {
            data.data.influences.results.feno = d3Util.convertChildFENOResultsData(data.data.influences.results.feno);
          }

          if (DefaultData.isEmptyAllergenData(data)) {
            this.injectDefaultData(data, startDate, endDate);
          }

          LS.addDateToLocalStorage(startDate);
          this.graphIsLoading = false;

          // reset toggle switches to false
          this.factorStack = [];
          this.influenceStack = [];

          var newState = React.addons.update(this.state,
                                       {data: {$set: data.data},
                                        factorGlyphs: {$set: data.factorGlyphs},
                                        factorYScale: {$set: data.factorYScale}});
          this.setState(newState);
        });
    }

    var newState = React.addons.update(this.state,
                                       {display_range: {$set: [newStart, newEnd]},
                                        active_range: {$set: title},
                                        startDate: {$set: moment(newStart).format('YYYY-MM-DD')},
                                        endDate: {$set: moment(newEnd).format('YYYY-MM-DD')}});
    this.setState(newState);
  }

  handleFactorChange(category, name) {
    var newEnabled = !this.state.data.factors[category][name].enabled;

    var newEnabledState = {data: {factors: {}}};

    newEnabledState.data.factors[category] = {};
    newEnabledState.data.factors[category][name] = {};
    newEnabledState.data.factors[category][name].enabled = {$set: newEnabled};

    if (newEnabled) {
      if (this.factorStack.length >= 3) {
        var toDisable = this.factorStack.shift();
        if (!newEnabledState.data.factors[toDisable.category]) { // May have been defined above.
          newEnabledState.data.factors[toDisable.category] = {};
        }

        newEnabledState.data.factors[toDisable.category][toDisable.name] = {enabled: {$set: false}};
      }
      this.factorStack.push({category: category, name: name});

    } else {
      _.remove(this.factorStack, function(d) {
        return (d.category === category && d.name === name);
      });
    }

    var newState = React.addons.update(this.state, newEnabledState);
    this.setState(newState);
  }

  handleFullScreenClick() {
    var $hideableElements = $('.dashHeader, .navbar, .mainRight, .footer, .toolbarPanel');
    if (!this.fullScreenMode) {
      $hideableElements.hide();
      $('body').addClass('fullScreenMargin');
      $('.dashbody').addClass('dashbody-fullscreen');
      this.fullScreenText = 'Exit Full Screen';
    } else {
      $hideableElements.show();
      $('body').removeClass('fullScreenMargin');
      $('.dashbody').removeClass('dashbody-fullscreen');
      this.fullScreenText = 'Full Screen';
    }
    this.fullScreenMode = !this.fullScreenMode;
    $('.btn').blur();

    var newState = React.addons.update(this.state,
                                     {content: {$set: this.fullScreenText}});
    this.setState(newState);
  }

  handleInfluenceChange(category, name) {
    var newEnabled = !this.state.data.influences[category][name].enabled;

    var newEnabledState = {data: {influences: {}}};

    newEnabledState.data.influences[category] = {};
    newEnabledState.data.influences[category][name] = {};
    newEnabledState.data.influences[category][name].enabled = {$set: newEnabled};

    if (newEnabled) {
      if (this.influenceStack.length >= 4) {
        var toDisable = this.influenceStack.shift();
        if (!newEnabledState.data.influences[toDisable.category]) { // May have been defined above.
          newEnabledState.data.influences[toDisable.category] = {};
        }

        newEnabledState.data.influences[toDisable.category][toDisable.name] = {enabled: {$set: false}};
      }
      this.influenceStack.push({category: category, name: name});

    } else {
      _.remove(this.influenceStack, function(d) {
        return (d.category === category && d.name === name);
      });
    }

    var newState = React.addons.update(this.state, newEnabledState);
    this.setState(newState);
  }

  handleSymptomChange(symptomName) {
    var newSymptomState = {active_symptom: {$set: symptomName}};
    var newState = React.addons.update(this.state, newSymptomState);

    this.setState(newState);
  }

  injectDefaultData(data, startDate, endDate) {
    var allergenData = data.data.factors.Allergens;
    var defaultData = DefaultData.getDefaultData(this.props.state, startDate, endDate);

    R.mapObj((factor) => {
      factor.data = factor.data.map((point) => {
        var week = moment(point.date).week();
        if (defaultData[week] && defaultData[week][factor.proper_name]) {
          point.value = defaultData[week][factor.proper_name].level;
        }

        return point;
      });
    }, allergenData);

    return true;
  }

  printScreen() {
    window.print();
  }

  render() {

    var toolbar;
    var stockchart;
    var toggleGroups;
    var triggerPanel;
    var controlGrid;
    var forecast;
    var fullscreen;
    var loading;

    var forecastClass = 'forecast';
    let firstName = this.props.profile.firstName || '';
    let lastName = this.props.profile.lastName || '';

    let userName = this.props.profile.firstName;
    if (this.props.profile.firstName) {
      userName += '\'s ';
    } else {
      userName = '';
    }

    var profileSymptoms = {
      allergy: this.props.profile.monitorAllergy,
      asthma: this.props.profile.monitorAsthma,
      arthritis: true, // demo purposes
      migraine: true // demo purposes
    };

    var asthmaControlData = this.state.data.influences.asthma_control;
    var asthmaControlGridToggles = _.filter(asthmaControlData, function(factor) {
      return factor.enabled && factor.name !== 'medication_score';
    });

    if (this.state) {
      toolbar = (
        <div className="toolbarPanel">
          <div id="location">
            <Location
                city={this.props.city}
                isShown={this.props.showLocation}
                state={this.props.state}
            />
          </div>
          <div id="symptomSelector">
            <SymptomSelector
                active_symptom={this.state.active_symptom}
                handleSymptomChange={this.handleSymptomChange.bind(this)}
                profileSymptoms={profileSymptoms}
                symptoms={this.state.data.symptoms}
            />
          </div>
          <div id="dateDropdown">
            <img height="35px"
                src={"/images/calendar.png"}
                style={{marginRight: '5px'}}
                width="35px"
            />
            <DateDropdown
                active_range={this.state.active_range}
                handleDateChange={this.handleDateChange.bind(this)}
            />
          </div>
        </div>
      );

      if (this.graphIsLoading) {
        loading = <div className="loadingStatus">{'LOADING...'}</div>;
      }

      stockchart =
          (<StockChart
              active_range={this.state.active_range}
              active_symptom={this.state.active_symptom}
              asthmaControlGridToggles={asthmaControlGridToggles}
              changeActiveDate={this.changeActiveDate.bind(this)}
              data={this.state.data}
              display_range={this.state.display_range}
              factorYScale={this.state.factorYScale}
              getTriggersForDate={this.getTriggersForDate.bind(this)}
              key="stockChartKey"
              width ={this.state.content}
           />);

      toggleGroups =
          (<ToggleGroups
              activeSymptom = {this.state.active_symptom}
              dataserverPath = {this.dataserverPath}
              factors = {this.state.data.factors}
              glyphNames = {this.state.factorGlyphs}
              handleFactorChange = {this.handleFactorChange.bind(this)}
              handleInfluenceChange = {this.handleInfluenceChange.bind(this)}
              influences = {this.state.data.influences}
           />);

      let factors = Miscellaneous.filterSymptomDataByDate(
        this.state.active_date,
        this.state.data.symptoms[this.state.active_symptom].data);

      let triggersProps = {
        activeSymptom: this.state.active_symptom,
        date: this.state.active_date,
        clinic: this.state.clinic,
        coupon: this.state.coupon,
        currentPosition: this.props.position,
        factors: factors,
        firstName: this.props.profile.firstName,
        pharmacy: this.state.pharmacy
      };

      triggerPanel = (<Triggers {...triggersProps} />);

      controlGrid =
          (<ControlGrid
              active_symptom={this.state.active_symptom}
              display_range = {this.state.display_range}
              influences = {this.state.data.influences}
           />);

      fullscreen =
          (<FullScreen
              content = {this.state.content}
              onFullScreen={this.handleFullScreenClick.bind(this)}
           />);

      if (asthmaControlGridToggles.length) {
        forecastClass = 'forecast-with-controlgrid ' + forecastClass;
      }

      forecast = (
        <p className={forecastClass}
            style={{float: 'right'}}
        >
          {"Forecast"}
        </p>);

       // Don't show this projection overlay if we're >= 3 months
      if (this.state.active_range === '3 Months' ||
        this.state.active_range === '6 Months' ||
        this.state.active_range === '1 Year') {
        forecast = (<p></p>);
      }
    }

    function renderHeader() {
      var image = '<image x="0" y="0" height="140" width="140" xlink:href="' + this.props.profilePhoto +
        '" style="clip-path: url(#headerImage)"/>';

      return (
        <div className="dashHeader">
          <svg height="250"
              width="100%"
          >
            <defs>
              <clipPath id="headerImage" >
                <circle cx="70"
                    cy="70"
                    r="65"
                />
              </clipPath>
            </defs>
            <g transform={"translate(100, 25)"}>
              <g dangerouslySetInnerHTML={{__html: image}}/>
            </g>
            <text transform={"translate(250, 100)"}>
              {firstName + ' ' + lastName}
            </text>
          </svg>
        </div>
      );
    }

    return (
      <div>
        {this.props.hideHeader ? null : renderHeader.bind(this, this.dataserverPath)()}
        {toolbar}
        <div className="dashbody flex-container">
          <div className="mainLeft">
            <div className="top fullscreen">
              {fullscreen}
            </div>

            <div className="stockChartHeader">
              <p className="title"
                  style={{float: 'left'}}
              >
                {userName + 'Aller-Rhythm'}<sup>{'®'}</sup>{" display"}
              </p>
              <p className="versus"
                  style={{float: 'right'}}
              >
                {'vs. Symptom Scores'}
              </p>
            </div>

            <div className="stockChartPanel">
              {loading}
              {stockchart}
              {forecast}
            </div>

            {toggleGroups}

            <hr/>
          </div>

          <div className="mainRight">
            {triggerPanel}
            {controlGrid}
          </div>

          <div id="footer">
            <div className="shareAndPrint">
              <BS.Button
                  disabled
                  onClick={this.printScreen}
              >
                {'Print'}
              </BS.Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
