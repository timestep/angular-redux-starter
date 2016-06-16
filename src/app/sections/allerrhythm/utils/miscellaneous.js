'use strict';

/**
 * Create a point of interest object
 * @param name
 * @param address
 * @param phone
 * @param lat
 * @param lng
 * @returns {{name: (*|string), address: (*|string), phone: (*|string), position: {latitude, longitude}}}
 */
function createPointOfInterest (name, address, phone, lat, lng) {
  return {
    name: name || null,
    address: address || null,
    phone: phone || null,
    position: lat && lng ? createPosition(lat, lng) : null
  };
}

/**
 * Create a position object
 * @param lat
 * @param lng
 * @returns {{latitude: *, longitude: *}}
 */
function createPosition (lat, lng) {
  return {
    latitude: lat,
    longitude: lng
  };
}

/**
 * Encode a start and destination position to be a Google Maps URL
 * @param startPos
 * @param destPos
 * @returns {string}
 */
function encodeGoogleMapsDirectionURL (startPos, destPos) {
  return 'http://maps.google.com/maps?saddr=%START_POS%&daddr=%DEST_POS%'
    .replace(/%START_POS%/g, encodePosition(startPos))
    .replace(/%DEST_POS%/g, encodePosition(destPos));
}

/**
 * Encode a position
 * @param position
 * @returns {string}
 */
function encodePosition (position) {
  return position.latitude + ',' + position.longitude;
}

/**
 * Get a clinic by id
 * @param authToken
 * @param clinicId
 * @returns {*}
 */
function getClinicById (authToken, clinicId) {
  return $.ajax({
    url: '/api/userOrganization/app/:clinicId/'.replace(/:clinicId/g, clinicId),
    type: 'GET',

    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', authToken);
    }
  })
  .then(function(clinic) {
    clinic.label = clinic.label || clinic.name;
    return clinic;
  })
  .then(null, function (jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(errorThrown);
  });
}

function getNearestClinic (authToken, lat, lng) {
  return $.ajax({
    url: '/api/organizations/closestClinics',
    data: {
      count: 1,
      offset: 0,
      radius: 80467, //50miles
      lat: lat,
      lng: lng,
      onlyPartners: true,
      filterKagen: true
    },
    type: 'GET',

    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', authToken);
    }
  })
    .then(function (response) {
      return response.rows && response.rows.length > 0 ? response.rows[0] : null;
    })
    .then(null, function (xhr, status, error) {
      console.error(status);
      console.error(error);
      return null;
    });
}

/**
 * Get nearest pharmacy - ported from Kagen App project
 * @param lat
 * @param lng
 */
function getNearestPharmacy (lat, lng) {
  return $.ajax({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
    type: 'GET',
    data: {
      key: 'AIzaSyDUPqjbyevMkLTsgAd39YYoKr8rrpw9Hxc',
      sensor: false,
      location: lat + ',' + lng,
      types: 'pharmacy',
      radius: 5000,
      keyword: '"Walgreens" OR "CVS" OR "Walmart" OR "Target" OR "Winn-Dixie" OR "Kroger" OR "Supervalu" OR "Dominick" OR "Rite Aid" OR "Kroger" OR "Hy-Vee" OR "Publix" OR "Uniprix" OR "Pharmaprix" OR "Shoppers Drug Mart" OR "Proxim" OR "Pharmasave" OR "PharmaChoice" OR "London Drugs" OR "Lawtons" OR "Jean Coutu" or "Familiprix" OR "Costco"'
    }
  })
  .then(function (response) {

    var result;
    var telephone = null;
    var lat;
    var lng;
    if (!(response.status === 200 || response.stauts === 'OK' || response.statusText === 'OK' || response.results.length > 0)) {
      return null;
    }

    result = response.results[0];

    if (result.coordinates &&
      result.coordinates.lat &&
      result.coordinates.lng) {
      lat = result.coordinates.lat;
      lng = result.coordinates.lng;
    }
    else if (result.geometry &&
      result.geometry.location) {
      lat = result.geometry.location.lat;
      lng = result.geometry.location.lng;
    }

    return {
      name: result.name,
      vicinity: result.vicinity,
      telephone: telephone,
      lat: lat,
      lng: lng
    };

  })
  .then(null, function (xhr, status, error) {
    console.error(status);
    console.error(error);
    return null;
  });
}

/**
 * Print Screen action
 * @param elemsToHide
 * @param elemsToShow
 */
function printScreenShot(elemsToHide, elemsToShow) {
  var $elementsToHide = $(elemsToHide);
  var $elementsToShow = $(elemsToShow);
  $elementsToHide.addClass('triggersOnlyPrintHide');
  $elementsToShow.addClass('triggersOnlyPrint');
  window.print();
  $elementsToHide.removeClass('triggersOnlyPrintHide');
  $elementsToShow.removeClass('triggersOnlyPrint');
  $elementsToHide = null;
  $elementsToShow = null;
}

/**
 * Download Screen as PNG Action
 * @param printElemId
 * @param dlLinkElemId
 * @param filenamePrefix
 */
function downloadScreenShotAsPNG(printElemId, dlLinkElemId, filenamePrefix) {
  html2canvas(document.getElementById(printElemId))
    .then(function (canvas) {
      var dlLink = document.getElementById(dlLinkElemId);
      var now = new Date();
      var timestamp = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
      dlLink.href = canvas.toDataURL();
      dlLink.download = filenamePrefix + timestamp + '.png';
      $('#' + dlLinkElemId)[0].click();
    });
}

/**
 * Filter Symptom Data by date
 * @param date
 * @param symptomData
 * @returns {*}
 */
function filterSymptomDataByDate (date, symptomData) {

  var mStartDate = moment(date);
  var mEndDate = moment(mStartDate).add(1, 'day');
  var results = _.find(symptomData, function (data) {
    var mDate = moment(data.date);
    return mDate.isSame(mStartDate, 'day') || (mDate.isAfter(mStartDate) && mDate.isAfter(mEndDate));
  });

  return results && results.correlation || [];
}

module.exports = {
  createPointOfInterest: createPointOfInterest,
  createPosition: createPosition,
  downloadScreenShotAsPNG: downloadScreenShotAsPNG,
  encodeGoogleMapsDirectionURL: encodeGoogleMapsDirectionURL,
  encodePosition: encodePosition,
  filterSymptomDataByDate: filterSymptomDataByDate,
  getClinicById: getClinicById,
  getNearestClinic: getNearestClinic,
  getNearestPharmacy: getNearestPharmacy,
  printScreenShot: printScreenShot
};
