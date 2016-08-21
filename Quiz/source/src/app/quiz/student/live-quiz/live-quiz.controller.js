(function() {
    'use strict';

    angular
        .module('student-module')
        .controller('LiveQuizController', LiveQuizController, '$stateParams', 'triTheming', '$state');

    /* @ngInject */
    function LiveQuizController($log, $stateParams, $filter, triTheming, $state) {
        var vm = this;

        $log.log($stateParams.id);

        vm.WordIndex = 0;
        vm.GetColorForAnswer = GetColorForAnswer;
        vm.itemStyle = itemStyle;
        vm.Answer = Answer;
        vm.AnswerData = [];
        vm.IsDone = false;
        vm.TakeAgain = TakeAgain;

        vm.WordCatagories = [{
            Title : 'Nafnorð',
            Code :  'n',
            Color : 'pink'
        },{
            Title : 'Lýsingarorð',
            Code :  'l',
            Color : 'red'
        },{
            Title : 'Fornafn',
            Code :  'f',
            Color : 'purple'
        },{
            Title : 'Greinir',
            Code :  'g',
            Color : 'indigo'
        },{
            Title : 'Töluorð',
            Code :  't',
            Color : 'blue'
        },{
            Title : 'Sagnorð',
            Code :  's',
            Color : 'cyan'
        },{
            Title : 'Atviksorð',
            Code :  'a',
            Color : 'green'
        },{
            Title : 'Samtenging',
            Code :  's',
            Color : 'lime'
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

        function TakeAgain() {
            $log.log('Reload');
            $state.reload();
        }

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

        function GetColorForAnswer(wordIndex)
        {
            //$log.log("WordIndex:" + wordIndex);
            var colorClass = vm.AnswerData[wordIndex];
            if(angular.isDefined(colorClass)) {
              //  $log.log('Color class to search for:' + colorClass);
                var found = $filter('filter')(vm.WordCatagories, {Code: colorClass}, true);
                if(found.length > 0) {
                  //  $log.log('Length:' + found.length);
                  //  $log.log('Found:' + found[0].Color);

                    return {'color': found[0].Color};
                }
            }
/*
            if(colorClass != undefined)
            {
              var found = $filter('filter')(vm.WordCatagories, {Code: colorClass}, false);
              $log.log(found.length);
              return found.Color;
            }
            else
            {
              $log.log("Noting");
              return "nothing";
            }*/

        }

        function itemStyle(palette) {
            return {
                'background-color': triTheming.rgba(palette.value),
                'color': triTheming.rgba(palette.contrast)
            };
        }

        function CalculateAnswers(Answers) {
            var counter = 0;
            for (var i = 0; i < vm.Words.length; i++) {
               // $log.log(vm.Words[i].Word + '    ' + Answers[i]);
                if(vm.Words[i].Class == Answers[i]) {
                    counter = counter + 1;
                    $log.log('correct');
                }
            }
            vm.Results.Score = counter;
            //$log.log(vm.Results.Score);
        }

    }
})();
