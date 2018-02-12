(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name loginModule.factory: loginModel
     * @description Login factory
     * @param {loginModel} loginModel - Login model/factory
     */
    angular.module('loginModule').factory('loginModel', loginModel);
    loginModel.$inject = ['$log','httpService','ENV'];

    /**
     * @ngdoc function
     * @name loginModel
     * @methodOf loginModule.factory: loginModel
     * @description Login factory constructor
     * @param {$log} $log - Angular log library
     * @param {loginResource} loginResource - Login resource/service
     * @return {Object} Return list of login factory objects
     */
    function loginModel($log,httpService,ENV) {

        $log.log("login model file loaded");

        /**
         * @type {Object} - Login resource service object
         */
        var factory = {};

        /**
         * @ngdoc function
         * @name login
         * @methodOf loginModule.service: loginResource
         * @description Returns login detail
         * @return {Object} Returns login detail
         */
        factory.loginDetail = function (user) {
          var req=angular.copy(user);
          var url = ENV.appUrl +'login/';
            return httpService.post(url,req).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        };
        return factory;
    }

}());
