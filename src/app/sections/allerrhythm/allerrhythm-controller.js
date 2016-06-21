export default function allerrhythmController (allerrhythm, session) {
  var vm = this;

  /**
   * Initialize controller - start the AllerRhythm™ service to
   * gather all of the data from the backend, and start the
   * React rendering process. Requires to have an element on
   * the page with an id of 'kagendash'.
   */
  vm.init = function () {
    var email;

    if (session.viewUserCtx.username) {
      email = session.viewUserCtx.username;
    }

    allerrhythm.start(email);
  };

  vm.init();
};
