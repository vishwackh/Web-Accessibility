'use strict';

/**
 * @ngdoc overview
 * @name angular.module: portalSeedApp
 * @description Portal(Main) Module
 * @param {string} ngCookies - Angular cookies library
 * @param {ngSanitize} ngSanitize - Angular sanitize library
 * @param {ngTouch} ngTouch - Angular touch library
 * @param {ui.router} ui.router - Angular router library
 * @param {ngStorage} ngStorage - Angular storage library
 * @param {oc.lazyLoad} oc.lazyLoad - Angular lazyLoad library
 * @param {pascalprecht.translate} pascalprecht.translate - Angular translate library
 */
var app = angular
    .module('portalSeedApp', [
        'ngCookies',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ngStorage',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'toaster',
        'ngAnimate'
    ]);


(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name angular.module('portalSeedApp').config: Translation file
     * @description Translation configuration
     */
    angular.module('portalSeedApp').config(ConfigAppTranslation);

    /**
     * @ngdoc function
     * @name ConfigAppTranslation
     * @description Translation configuration
     * @param {$translateProvider} $translateProvider - Angular translate provider library
     */
    function ConfigAppTranslation($translateProvider) {
        $translateProvider
            .useLoader('$translatePartialLoader', {
                urlTemplate: '/translations/{lang}/{part}.json'
            });
        $translateProvider.preferredLanguage('en-US');
    }

}());
