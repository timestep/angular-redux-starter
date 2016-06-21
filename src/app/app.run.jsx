import $ from 'jquery';

export default function run(session, $interval, $rootScope, $state) {
  session.loadAuthToken();
  // to store the last known state viewed
  $rootScope.$on('$stateChangeSuccess',
    function sChangeSuccess(event, toState, toParams, fromState) {
      // remove localStorage items used
      // to keep track of web A-R graph data requests
      window.localStorage.removeItem('startDate1Year');
      window.localStorage.removeItem('startDate6Months');
      window.localStorage.removeItem('startDate3Months');

      // Cancel the video-chat interval on route change
      if ($rootScope.quickCallIntervalStop) {
        $interval.cancel($rootScope.quickCallIntervalStop);
        $rootScope.quickCallIntervalStop = undefined;
      }

      $state.previous = fromState;
    });


  $(document).ready(function() {
    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 400) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  });
}
