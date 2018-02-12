(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name angular.module('portalSeedApp').directive: loader
     * @description Loader directive
     * @param {loaderDirective} loaderDirective - Loader directive
     * @return {Object} Returns loader element whether need to show or need to hide
     */
    angular.module('portalSeedApp').directive('loader', loaderDirective);

    /**
     * @ngdoc function
     * @name loaderDirective
     * @description Loader directive
     * @return {Object} Returns loader element whether need to show or need to hide
     */
    function loaderDirective() {

        function loaderLink($scope, element, attrs) {

            $scope.$on("loader_show", function() {
                return element.show();
            });

            $scope.$on("loader_hide", function() {
                return element.hide();
            });
        }

        return {
            link: loaderLink
        }

    }

}());