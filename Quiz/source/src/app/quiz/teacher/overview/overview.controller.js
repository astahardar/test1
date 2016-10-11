(function() {
    'use strict';

    angular
        .module('student-module')
        .controller('TeacherOverviewController', TeacherOverviewController, '$log');

    /* @ngInject */
    function TeacherOverviewController(QuizService, $log) {
        var vm = this;
        vm.Quizes = QuizService.getQuizes();
        vm.Delete = Delete;
        vm.Favorate = Favorate;

        function Delete(Id) {
            $log.log('deleting' + Id);
            QuizService.deleteQuiz(Id);
            $log.log(QuizService.getQuizes());
            return vm.Quizes = QuizService.getQuizes();
        }

        function Favorate(Id) {
            $log.log('adding to favoarates');
            QuizService.favorateQuiz(Id);
        }
    }
})();
