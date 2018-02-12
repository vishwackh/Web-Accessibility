(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name app.factory: httpInterceptor
     * @description Http Interceptor - called before all other modules and check when to start loader and when to stop.
     * @param {$q} $q - Angular q library
     * @param {$rootScope} $rootScope - Angular rootscope library
     * @param {$log} $log - Angular log library
     * @return {Object} Return the execution control to the code that initiated the request.
     */
    app.factory('httpInterceptor', function($q, $rootScope, $log) {
        var numLoadings = 0;
        return {
            // Request Interceptor
            request: function(config) {
                $log.debug("Request Interceptor");
                numLoadings++;
                // config.headers["Content-Type"] = 'application/json';
                config.headers = config.headers || {};
                config.requestTimestamp = new Date().getTime();
                config.timeout = 60000; // Global timeout to request
                // config.headers.apitoken = "";
                // config.headers.device = "parking";
                // Show loader
                $rootScope.$broadcast("loader_show");
                return config || $q.when(config);

            },
            requestError: function(rejection) {
                $log.error('Request error:', rejection);
                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }
                return rejection || $q.when(rejection);
            },
            // Response Interceptor
            response: function(response) {
                $log.debug("Response Interceptor");
                // response.status >= 200 && response.status <= 299
                // The http request was completed successfully.

                /*
                Before to resolve the promise
                I can do whatever I want!
                For example: add a new property
                to the promise returned from the server.
                */
                response.config.responseTimestamp = new Date().getTime();
                if ((--numLoadings) === 0) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                /*
                Return the execution control to the
                code that initiated the request.
                */
                return response || $q.when(response);

            },
            // Interceptor Error
            responseError: function(response) {

                // The HTTP request was not successful.

                /*
                It's possible to use interceptors to handle
                specific errors. For example:
                */
                $log.debug("Response Error");
                $log.error('Response error:', response);
                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                /*
                $q.reject creates a promise that is resolved as
                rejectedwith the specified reason.
                In this case the error callback will be executed.
                */
                return $q.reject(response);
            }
        };
    });
    app.config(function($httpProvider) {

        /*
        Response interceptors are stored inside the
        $httpProvider.responseInterceptors array.
        To register a new response interceptor is enough to add
        a new function to that array.
        */
        $httpProvider.interceptors.push('httpInterceptor');
    });

}());
