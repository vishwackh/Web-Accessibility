(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name angular.module('portalSeedApp').service: httpService
     * @description Http service
     * @param {httpService} httpService - Http service
     */
    angular.module('portalSeedApp').service('httpService', httpService);
    httpService.$inject = ['$log', '$http', 'ENV'];

    /**
     * @ngdoc function
     * @name httpService
     * @methodOf angular.module('portalSeedApp').service: httpService
     * @description Http service constructor
     * @param {$log} $log - Angular log library
     * @param {$http} $http - Angular http library
     */
    function httpService($log, $http) {

        var _this = this;

        /**
         * @ngdoc function
         * @name get
         * @description Returns get api response
         * @methodOf angular.module('portalSeedApp').service: httpService
         * @param {String} url - API url
         * @return {Any} Returns data
         */
        _this.get = function(url) {
            return $http.get(url).then(function(response) {
                return response.data;
            });
        };

        /**
         * @ngdoc function
         * @name post
         * @description Returns post api response
         * @methodOf angular.module('portalSeedApp').service: httpService
         * @param {String} url - API url
         * @param {String} param - post parameters
         * @return {Any} Returns data
         */
        _this.post = function(url, param) {
            return $http.post(url, param).then(function(response) {
                return response.data;
            });
        };


        /**
         * @ngdoc function
         * @name delete
         * @description Returns post api response
         * @methodOf angular.module('portalSeedApp').service: httpService
         * @param {String} url - API url
         * @param {String} param - delete parameters
         * @return {Any} Returns data
         */
        _this.delete = function(url) {
            return $http.delete(url).then(function(response) {
                return response.data;
            });
        };

    }

}());
