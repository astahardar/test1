(function() {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController, '$stateParams');

    /* @ngInject */
    function TestController($log, $stateParams) {
        var vm = this;

        $log.log($stateParams.id);

        vm.WordIndex = 0;
        vm.Answer = Answer;
        vm.AnswerData = [];
        vm.IsDone = false;

        vm.WordCatagories = [{
            Title : 'Nafnorð',
            Code :  'n'
        },{
            Title : 'Lýsingarorð',
            Code :  'l'
        },{
            Title : 'Fornafn',
            Code :  'f'
        },{
            Title : 'Greinir',
            Code :  'g'
        },{
            Title : 'Töluorð',
            Code :  't'
        },{
            Title : 'Sagnorð',
            Code :  's'
        },{
            Title : 'Atviksorð/Forsetning',
            Code :  'a'
        },{
            Title : 'Samtengingarorð',
            Code :  's'
        }];

        //get Test with id
        vm.Test = {
            Id : '1',
            Title : 'Title',
            ParsedText :{
                Sentence:{
                    WORDS:[{
                        Word: 'Hjólabáturinn',
                        Class: 'n'
                    }, {
                        Word: 'er',
                        Class: 's'
                    }, {
                        Word: 'gulur',
                        Class: 'l'
                    }]
                }
            }
        };

        vm.Results = {
            ApplcationName: '',
            StutendId : '',
            ApplicationId: vm.Test.Id,
            LevelName : vm.Test.Title,
            Answers : [],
            Score : 0

        };

        vm.Words = vm.Test.ParsedText.Sentence.WORDS;

        function Answer(wordIndex, answerID) {
            if(!vm.IsDone) {
                vm.AnswerData[wordIndex] = answerID;
                vm.Results.Answers = vm.AnswerData;
                $log.log(vm.Words[wordIndex].Word + ' answered with : ' + answerID);
                vm.WordIndex++;
                $log.log(vm.Results);

                if(vm.WordIndex > vm.Words.length-1) {
                    vm.IsDone = true;
                    CalculateAnswers(vm.AnswerData);
                    //Send Results

                }
            }
        }

        function CalculateAnswers(Answers) {
            var counter = 0;
            for (var i = 0; i < vm.Words.length; i++) {
                $log.log(vm.Words[i].Word + '    ' + Answers[i]);
                if(vm.Words[i].Class == Answers[i]) {
                    counter = counter + 1;
                    $log.log('correct');
                }
            }
            vm.Results.Score = counter;
            $log.log(vm.Results.Score);
        }
    }
})();
