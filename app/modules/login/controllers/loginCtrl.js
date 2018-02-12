(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name loginModule.controller: loginCtrl
     * @description login controller
     * @param {LoginCtrl} LoginCtrl - Login controller
     */
    angular.module('loginModule').controller('loginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['loginModel', '$state', 'toaster', '$cookies', '$cookieStore'];

    /**
     * @ngdoc function
     * @name LoginCtrl
     * @methodOf loginModule.controller: loginCtrl
     * @description Login controller constructor
     * @param {loginModel} loginModel - Login model/factory
     * @param {$state} $state - Angular state library
     */
    function LoginCtrl(loginModel, $state, toaster, $cookies, $cookieStore) {

        /**
         * @type {Object} - Login controller object
         */
        var vm = this;

        /**
         * @ngdoc function
         * @name loginInit
         * @methodOf loginModule.controller: loginCtrl
         * @description Login controller initializer
         */
        function loginInit() {
            $cookieStore.remove('user');
        }
        loginInit();
        /**
         * @ngdoc function
         * @name login
         * @methodOf loginModule.controller: loginCtrl
         * @description login button click
         */
        vm.login = function(user) {
            var loginPromise = loginModel.loginDetail(user);
            loginPromise.then(function(response) {
                if (response.user) {
                    $cookieStore.put('user', response.user);
                    $state.go('dashboard.home');
                } else {
                    toaster.pop('error', response.message || "Login failed", "");
                }
            });
        };
    }

}());
