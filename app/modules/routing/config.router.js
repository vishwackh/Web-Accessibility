(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name angular.module('portalSeedApp').config: Routing file
     * @description Routing detail of all modules
     */
    angular.module('portalSeedApp').config(ConfigRouter).run(function($rootScope, $state, $stateParams,$cookies, $cookieStore) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ui-sref-active="active }"> will set the <li> // to active whenever
        // 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                // if (toState.name !== 'login' && !$cookieStore.get('user')) {
                //     event.preventDefault();
                //     $state.go('dashboard');
                // }
            });
    });

    /**
     * @ngdoc function
     * @name ConfigRouter
     * @description Routing detail of all modules
     * @param {$stateProvider} $stateProvider - Angular state provider library
     * @param {$urlRouterProvider} $urlRouterProvider - Angular url router provider library
     * @param {JS_REQUIRES} JS_REQUIRES - Constants defined in constant file
     */
    function ConfigRouter($stateProvider, $urlRouterProvider, JS_REQUIRES) {

        // default routing
        $urlRouterProvider.otherwise('dashboard');

        /**
         * @ngdoc service
         * @name $stateProvider.state: Name of state of module to route
         * @description Routing of modules
         * @param {login} login - Return login module
         * @param {dashboard} dashboard - Return dashboard module
         * @param {overview} overview - Return overview module
         */
        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "modules/dashboard/views/dashboard.html",
                resolve: loadSequence('modules', 'dashboardCtrl', 'dashboardModel'),
                redirectTo: "dashboard.home"
            })
            .state('dashboard.home', {
                url: "/home",
                templateUrl: "modules/dashboard/views/home.html",
                resolve: loadSequence('modules', 'dashboardCtrl', 'dashboardModel')
            })
            .state('input', {
                url: "/input",
                templateUrl: "modules/inputs/views/textbox.html",
                // resolve: loadSequence('modules', 'dashboardCtrl', 'dashboardModel')
            })
            .state('inputRadio', {
                url: "/inputRadio",
                templateUrl: "modules/inputs/views/radioButton.html",
                // resolve: loadSequence('modules', 'dashboardCtrl', 'dashboardModel')
            })
            .state('inputCheckbox', {
                url: "/inputCheckbox",
                templateUrl: "modules/inputs/views/home.html",
                // resolve: loadSequence('modules', 'dashboardCtrl', 'dashboardModel')
            });


        /**
         * @ngdoc function
         * @name loadSequence
         * @methodOf $stateProvider.state: Name of state of module to route
         * @description Lazy loading description
         * @param {$ocLazyLoad} $ocLazyLoad - Angular lazyload library
         * @param {$q} $q - Angular q library
         * @returns {Object} Promise objects
         */
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                    var promise = $q.when(1);
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = promiseThen(_args[i]);
                    }
                    return promise;

                    function promiseThen(_arg) {
                        if (typeof _arg == 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function() {
                                var nowLoad = requiredData(_arg);
                                if (!nowLoad)
                                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                return $ocLL.load(nowLoad);
                            });
                    }

                    function requiredData(name) {
                        if (JS_REQUIRES.modules)
                            for (var m in JS_REQUIRES.modules)
                                if (JS_REQUIRES.modules[m].name && JS_REQUIRES.modules[m].name === name)
                                    return JS_REQUIRES.modules[m];
                        return JS_REQUIRES.scripts && JS_REQUIRES.scripts[name];
                    }
                }]
            };
        }
    }
}());
