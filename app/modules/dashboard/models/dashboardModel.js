(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name dashboardModule.factory: dashboardModel
     * @description Dashboard factory
     * @param {dashboardModel} dashboardModel - Dashboard model/factory
     */
    angular.module('dashboardModule').factory('dashboardModel', dashboardModel);
    dashboardModel.$inject = ['$log'];

    /**
     * @ngdoc function
     * @name dashboardModel
     * @methodOf dashboardModule.factory: dashboardModel
     * @description Dashboard factory constructor
     * @param {$log} $log - Angular log library
     * @param {dashboardResource} dashboardResource - Dashboard resource/service
     * @return {Object} Return list of dashboard factory objects
     */
    function dashboardModel($log) {

        $log.log("dashboard model file loaded");

        /**
         * @type {Object} - Dashboard resource service object
         */
        var factory = {};

        /**
         * @ngdoc function
         * @name getAutoAttendList
         * @methodOf dashboardModule.service: dashboardResource
         * @description Returns list of auto attendant
         * @return {Array} List of auto attendant
         */
        factory.getAutoAttendList = function() {
      
            return true;
        };
        return factory;
    }

}());