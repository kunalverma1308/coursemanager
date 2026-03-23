angular
    .module('courseApp')
    .service('CourseService', function ($http) {

        // base URL for Firebase courses node (without trailing .json)
        var apiBase = 'https://backendforng.firebaseio.com/courses';
        var apiUrl = apiBase + '.json';

        var courses = [];

        this.getCourses = function () {
            return $http.get(apiUrl)
                .then(function (response) {
                    var data = response.data || {};
                    // Firebase returns an object keyed by push IDs;
                    // convert to an array of {id,name} objects.
                    courses = Object.keys(data).map(function (key) {
                        // return { id: key, name: data[key].name };
                        return { id: key, name: data[key].name, instructor: data[key].instructor };
                    });
                    return courses;
                }, function (error) {                    
                    console.error('Error fetching courses:', error);
                    throw error;
                });
        };

        // this.addCourse = function (courseName) {
        //     if (!courseName) return;
        //     return $http.post(apiUrl, { name: courseName })
        //         .then(function (response) {
        //             // response.data.name is the new Firebase ID
        //             var id = response.data.name;
        //             courses.push({ id: id, name: courseName });
        //             return response;
        //         }, function (error) {
        //             console.error('Error adding course:', error);
        //             throw error;
        //         });
        // };

        this.addCourse = function (newCourse) {
            if (!newCourse) return;
            return $http.post(apiUrl, { name: newCourse.name, instructor: newCourse.instructor })
                .then(function (response) {
                    // response.data.name is the new Firebase ID
                    var id = response.data.name;
                    courses.push({ id: id, name: newCourse.name, instructor: newCourse.instructor });
                    return response;
                }, function (error) {
                    console.error('Error adding course:', error);
                    throw error;
                });
        };

        this.removeCourse = function (index) {
            if (index < 0 || index >= courses.length) {
                throw new Error("Invalid course index");
            }
            var course = courses[index];
            if (!course || !course.id) {
                // fallback remove locally
                courses.splice(index, 1);
                return Promise.resolve();
            }
            var url = apiBase + '/' + course.id + '.json';
            return $http.delete(url)
                .then(function (response) {
                    courses.splice(index, 1);
                }, function (error) {
                    console.error('Error deleting course:', error);
                    throw error;
                });
        };

        this.getTotalCourses = function () {
            return courses ? courses.length : 0;
        };

        this.getCourseList = function () {
            return courses;
        };
    });