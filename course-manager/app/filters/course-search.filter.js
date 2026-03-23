(function () {
    'use strict';

    angular.module('courseApp')
        .filter('courseSearch', function() {
            return function(courses, searchText) {
                if (!searchText) {
                    return courses;
                }
                return courses.filter(function(course) {
                    return course.name.toLowerCase().includes(searchText.toLowerCase());
                });
            };
        });

})();