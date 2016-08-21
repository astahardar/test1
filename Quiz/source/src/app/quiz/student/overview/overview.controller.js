(function() {
    'use strict';

    angular
        .module('student-module')
        .controller('OverviewController', OverviewController);

    /* @ngInject */
    function OverviewController(QuizService) {
        var vm = this;
        vm.Quizes = QuizService.getQuizes();

    }
})();
