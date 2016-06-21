export const accountTypes = [{
    type: 'Clinic',
    roles: {
      showVideo: true,
      showReports: false,
      showPush: false
    }
  }, {
    type: 'Clinic/Data',
    roles: {
      showVideo: true,
      showReports: true,
      showPush: false
    }
  }, {
    type: 'Business',
    roles: {
      showVideo: false,
      showReports: false,
      showPush: true
    }
  }, {
    type: 'Data Collector',
    roles: {
      showVideo: false,
      showReports: true,
      showPush: false
    }
  }]
