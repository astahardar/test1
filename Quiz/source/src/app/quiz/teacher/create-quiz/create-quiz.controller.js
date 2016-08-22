(function() {
    'use strict';

    angular
        .module('teacher-module')
        .controller('CreateQuizController', CreateQuizController);

    /* @ngInject */
    function CreateQuizController($log, QuizService) {
        var vm = this;
        vm.postQuiz = postQuiz;
        vm.results = [];

        vm.quiz = {
            Id : '3',
            Title : '',
            Creator: 'Kennari Kennarason',
            Open : {
                From: '',
                Till : ''
            },
            Sentence : ''
        };

        function postQuiz() {
            //vm.results = QuizService.createQuiz(quiz);
            $log.log('posting to service');
        }
    }
})();
