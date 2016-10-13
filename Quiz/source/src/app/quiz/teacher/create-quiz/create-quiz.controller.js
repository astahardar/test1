(function() {
    'use strict';

    angular
        .module('teacher-module')
        .controller('CreateQuizController', CreateQuizController);

    /* @ngInject */
    function CreateQuizController($log, QuizService, $scope) {
        var vm = this;
        vm.createQuiz = createQuiz;
        vm.parseText = parseText;
        vm.htmlToPlaintext = htmlToPlaintext;
        vm.parsedText;
        vm.WordCatagories = QuizService.getCategories();
        vm.reload = reload;
        vm.title;
        vm.open;
        vm.close;
        vm.level;
        vm.unparsedText;

        function parseText() {
            $log.log('parsing text');
            $log.log(vm.unparsedText);
            QuizService.parseText(htmlToPlaintext(vm.unparsedText))
                .then(function (response){
                    vm.parsedText = response.ParsedText;
                    $log.log(vm.parsedText);
                }, function (error) {
                    $log.log(error);
                });
        }

        function createQuiz() {
            $log.log('creating quiz');
            QuizService.createQuiz(vm.title, vm.open, vm.close, vm.level, vm.parsedText);
        }

        function reload() {
            vm.parsedText = null;
        }
        function htmlToPlaintext(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }
    }
})();
