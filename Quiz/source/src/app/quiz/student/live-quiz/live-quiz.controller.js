(function() {
    'use strict';

    angular
        .module('student-module')
        .controller('LiveQuizController', LiveQuizController, '$stateParams', 'triTheming', '$state', '$log');

    /* @ngInject */
    function LiveQuizController($log, $stateParams, $filter, triTheming, $state, QuizService) {
        var vm = this;

        vm.quiz = QuizService.getQuiz($stateParams.id);
        vm.WordCatagories = QuizService.getCategories();

        vm.itemStyle = itemStyle;
        vm.Answer = Answer;
        vm.GetColorForAnswer = GetColorForAnswer;
        vm.TakeAgain = TakeAgain;
        vm.getNextSentece = getNextSentece;

        vm.WordIndex = 0;
        vm.sentenceIndex = 0;
        vm.AnswerData = [];
        vm.IsDone = false;
        vm.IsQuizDone = false;
        vm.Score = 0;
        vm.progress = 0;

        vm.Sentences = vm.quiz.ParsedText.Sentences;
        $log.log(vm.Sentences.length);
        vm.Words = vm.Sentences[vm.sentenceIndex].WORDS;

        function TakeAgain() {
            $log.log('Reload');
            $state.reload();
        }

        function Answer(wordIndex, answerID) {
            if(!vm.IsDone) {
                vm.AnswerData[wordIndex] = answerID;
                $log.log(vm.Words[wordIndex].Word + ' answered with : ' + answerID);
                vm.WordIndex++;
                CalculateAnswer(vm.AnswerData);
                //QuizService.postAnswerWord(vm.quiz.Id, vm.quiz.Level, vm.Words[wordIndex], answerID);
                if(vm.WordIndex > vm.Words.length-1) {
                    $log.log('this sentence is done');
                    vm.IsDone = true;
                    vm.progress = Math.floor(((vm.sentenceIndex+1) /vm.Sentences.length)*100);
                    for(var i = 0; i <= vm.WordIndex; i++) {
                        GetColorForAnswer(i);
                    }
                    //QuizService.postAnswerSentence(vm.quiz.Id, vm.quiz.Level, vm.Words.length, vm.Score);
                }
            }
        }

        function getNextSentece() {
            $log.log('getting next');
            vm.sentenceIndex += 1;
            vm.IsDone = false;
            vm.AnswerData = [];
            vm.WordIndex = 0;
            vm.Words = vm.Sentences[vm.sentenceIndex].WORDS;
            vm.Score = 0;
            if(vm.sentenceIndex >= vm.Sentences.length-1) {
                $log.log('this is the last sentence');
                vm.IsQuizDone = true;
            }
        }

        function GetColorForAnswer(wordIndex) {
            var colorClass = vm.AnswerData[wordIndex];
            if(angular.isDefined(colorClass)) {
                var found = $filter('filter')(vm.WordCatagories, {Code: colorClass}, true);
                if(found.length > 0) {
                    var color = triTheming.getPaletteColor(found[0].Color, 100);

                    if(vm.Words[wordIndex].Class != vm.AnswerData[wordIndex]) {
                        return {'color': triTheming.rgba(triTheming.getPaletteColor('red', 900).value)};
                    }
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

        function CalculateAnswer(Answers) {
            var score = 0;
            for (var i = 0; i < vm.Words.length; i++) {
                if(vm.Words[i].Class == Answers[i]) {
                    score = score + 1;
                }
            }
            vm.Score = score;
        }

    }
})();
