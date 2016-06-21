export default function ContactCtrl($http, $modalInstance, helper) {
  var vm = this;

  vm.submit = function () {
    if (!helper.isEmail(vm.email)) {
      toastr.error('Contact Us: Please provide a valid email.');
      return;
    }

    var payload = {
      firstName: vm.firstName,
      lastName: vm.lastName,
      email: vm.email,
      message: vm.message
    };

    $http.post('/api/contact', payload)
      .then(function (resp) {
        toastr.info('Thank you for your feedback! Contact email successfully sent.');
        $modalInstance.close();
      })
      .then(null, function (resp) {
        toastr.error('There was an error completing your request at this time. Please try again later.');
        $modalInstance.close();
      });
  };
}
