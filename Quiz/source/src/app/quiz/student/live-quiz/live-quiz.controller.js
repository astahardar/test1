(function() {
    'use strict';

    angular
        .module('student-module')
        .controller('LiveQuizController', LiveQuizController, '$stateParams', 'triTheming', '$state');

    /* @ngInject */
    function LiveQuizController($log, $stateParams, $filter, triTheming, $state, QuizService) {
        var vm = this;

        $log.log($stateParams.id);

        vm.WordIndex = 0;
        vm.GetColorForAnswer = GetColorForAnswer;
        vm.itemStyle = itemStyle;
        vm.Answer = Answer;
        vm.AnswerData = [];
        vm.IsDone = false;
        vm.TakeAgain = TakeAgain;
        vm.Score = 0;

        vm.WordCatagories = QuizService.getCategories();

        vm.Quiz = QuizService.getQuiz($stateParams.id);
        $log.log(vm.Quiz);
        vm.Words = vm.Quiz.ParsedText.Sentence.WORDS;

        function TakeAgain() {
            $log.log('Reload');
            $state.reload();
        }

        function Answer(wordIndex, answerID) {
            if(!vm.IsDone) {
                vm.AnswerData[wordIndex] = answerID;
                $log.log(vm.Words[wordIndex].Word + ' answered with : ' + answerID);
                vm.WordIndex++;
                QuizService.postAnswer(vm.Quiz.Id, vm.Quiz.Level, vm.Words[wordIndex], answerID);
                if(vm.WordIndex > vm.Words.length-1) {
                    vm.IsDone = true;
                    CalculateAnswers(vm.AnswerData);
                    //QuizService.createAnswers('',vm.Quiz.Id,vm.Quiz.Title, vm.AnswerData, vm.Score);

                }
            }
        }

        function GetColorForAnswer(wordIndex)
        {
            var colorClass = vm.AnswerData[wordIndex];
            if(angular.isDefined(colorClass))
            {
                var found = $filter('filter')(vm.WordCatagories, {Code: colorClass}, true);
                if(found.length > 0) {

                    var color = triTheming.getPaletteColor(found[0].Color, 100);

                    return {'color': triTheming.rgba(color.value)};
                }
            }
        }

        function itemStyle(palette) {
            return {
                'background-color': triTheming.rgba(palette.value),
                'color': triTheming.rgba(palette.contrast)
            };
        }

        function CalculateAnswers(Answers) {
            var score = 0;
            for (var i = 0; i < vm.Words.length; i++) {
               // $log.log(vm.Words[i].Word + '    ' + Answers[i]);
                if(vm.Words[i].Class == Answers[i]) {
                    score = score + 1;
                    $log.log('correct');
                }
            }
            vm.Score = score;
        }

    }
})();
