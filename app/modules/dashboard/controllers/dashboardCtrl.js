(function() {

    'use strict';

    /**
     * @ngdoc controller
     * @name dashboardModule.controller: dashboardCtrl
     * @description Dashboard controller
     * @param {DashboardCtrl} DashboardCtrl - Dashboard controller
     */
    angular.module('dashboardModule').controller('dashboardCtrl', DashboardCtrl);
    DashboardCtrl.$inject = ['$state', '$translatePartialLoader', '$translate', 'dashboardModel', '$cookies', '$cookieStore'];

    /**
     * @ngdoc function
     * @name DashboardCtrl
     * @methodOf dashboardModule.controller: dashboardCtrl
     * @description Dashboard controller constructor
     * @param {$log} $log - Angular log library
     * @param {$translatePartialLoader} $translatePartialLoader - Angular translate partial loader library
     * @param {$translate} $translate - Angular translate library
     * @param {dashboardModel} dashboardModel - Dashboard model/factory
     * @param {overviewModel} overviewModel - Overview model/factory
     */
    function DashboardCtrl($state, $translatePartialLoader, $translate, dashboardModel, $cookies, $cookieStore) {

        /**
         * @type {Object} - Dashboard controller object
         */
        var vm = this;

        vm.mainAAList = [], vm.mainHGList = [];
        vm.dashboardHeader = "Dashboard";

        $translatePartialLoader.addPart('dashboard');
        $translate.refresh();

        dashboardInit();

        /**
         * @ngdoc function
         * @name dashbardInit
         * @methodOf dashboardModule.controller: dashboardCtrl
         * @description Dashboard controller initializer
         */
        function dashboardInit() {
            vm.usertype = $cookieStore.get('user');
        }

        /**
         * @ngdoc function
         * @name logout
         * @methodOf dashboardModule.controller: dashboardCtrl
         * @description Dashboard controller logout
         */
        vm.logout = function() {
            $cookieStore.remove('user');
            vm.usertype = $cookieStore.get('user');
            if (!vm.usertype) {
                $state.go('login');
            }
        }
    }

}());
