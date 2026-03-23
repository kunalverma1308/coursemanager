(function () {
    angular
        .module('courseApp')
        .directive('courseCard', courseCard);
    function courseCard() {
        return {
            restrict: 'E',
            // restrict: 'C',
            // restrict: 'A',
        scope: {
                course: '=',
                onDelete: '&'
            },
            template:
            `
            <div class="course-card">
            <h4>{{course.name}}</h4>
            <p>Instructor: {{course.instructor}}</p>
            <button ng-click="onDelete()" class="delete-btn">Delete Course</button>
            <hr>
            </div>
            `
            // template:
            // `
            // <h4>{{course.name}}</h4>
            // <p>Instructor: {{course.instructor}}</p>
            // <button ng-click="onDelete()" class="delete-btn">Delete Course</button>
            // <hr>
            // `
        };
    }
})();