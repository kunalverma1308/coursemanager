angular
    .module('courseApp')
    .controller('MainController', function (CourseService, AuthService, $location) {

        var vm = this;

        vm.appTitle = 'Course Manager';
        vm.errorMessage = '';

        vm.newCourse = {};

        vm.student = {
            name: "Rahul Sharma",
            id: "ST1001",
            dob: new Date(1995, 4, 15) // May 15, 1995 (months are 0-indexed)
        };

        // vm.courses = CourseService.getCourses();

        vm.loading = true;
        CourseService.getCourses()
            .then(function (courses) {
                setCourseList(courses);
                vm.errorMessage = "";
            }, function (error) {
                vm.errorMessage = "Failed to load courses. Please try again later.";
            })
            .finally(function () {
                vm.loading = false;
            });

        vm.addCourse = function (form) {
            if (!vm.newCourse || vm.newCourse.trim() === "") {
                vm.errorMessage = "Course name cannot be empty.";
                return;
            };
            vm.loading = true;
            CourseService.addCourse(vm.newCourse)
                .then(function (response) {
                    setCourseList(CourseService.getCourseList());
                    vm.newCourse = {};
                    vm.errorMessage = "";
                    // Reset form state
                    form.$setUntouched();
                    form.$setPristine();
                }, function (error) {
                    vm.errorMessage = "Failed to add course. Please try again later.";
                })
                .finally(function () {
                    vm.loading = false;
                });
        };

        vm.removeCourse = function (index) {
            vm.loading = true;
            CourseService.removeCourse(index)
            .then(function (response) {
                setCourseList(CourseService.getCourseList());
                vm.errorMessage = "";
            }, function (error) {
                vm.errorMessage = "Failed to remove course. Please try again later.";
            })
            .finally(function () {
                vm.loading = false;
            });
        };

        vm.getTotal = CourseService.getTotalCourses;

        function setCourseList(coursesJson) {
            vm.courses = coursesJson.map(function (course) {
                // return course.name;
                return { name: course.name, instructor: course.instructor };
            });
        }

        vm.login = function() {
            var success = AuthService.login(vm.username, vm.password);
            if(success){
                vm.isLoggedIn = true;
                $location.path('/');
            }else{
                vm.error = "Invalid credentials";
            }
        };

        vm.logout = function() {
            AuthService.logout();
            vm.isLoggedIn = false;
            $location.path('/login');
        };

        vm.getIsLoggedIn = function() {
            return AuthService.isLoggedIn();
        };
        
        vm.isLoggedIn = AuthService.isLoggedIn();
    });