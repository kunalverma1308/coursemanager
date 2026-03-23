(function () {
    'use strict';

    angular.module('courseApp')
        .filter('courseOrder', function() {
            return function(courses) {
                if (!courses) {
                    return courses;
                }
                return courses.slice().sort(function(a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
            };
        });

})();