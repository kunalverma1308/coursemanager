(function(){

angular
.module('courseApp')
.controller('NavController', function (AuthService, $location) {

    var vm = this;

    vm.getIsLoggedIn = function() {
        return AuthService.isLoggedIn();
    };

    vm.logout = function() {
        AuthService.logout();
        $location.path('/login');
    };

});

})();