(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name angular.module('portalSeedApp').constant: JS_REQUIRES
     * @description Constants for application
     * @param {scripts} Script - Script files
     */
    angular.module('portalSeedApp').constant('JS_REQUIRES', {
        scripts: {

            // application modules
            'modules': ["modules/login/index.js", "modules/dashboard/index.js"],


            // dashboard module constants
            'dashboardCtrl': "modules/dashboard/controllers/dashboardCtrl.js",
            'dashboardModel': "modules/dashboard/models/dashboardModel.js",

        }
    });

}());
