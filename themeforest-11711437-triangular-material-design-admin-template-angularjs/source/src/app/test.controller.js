(function() {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController, '$stateParams');

    /* @ngInject */
    function TestController($log, $stateParams) {
        var vm = this;

        vm.WordIndex = 0;
        vm.Answer = Answer;
        vm.AnswerData = [];
        vm.IsDone = false;

        vm.Test = {
            Title : 'Title',
            ParsedText :{
                Sentence:{
                    WORDS:[{
                        Word: 'Hjólabáturinn',
                        Class: 'v',
                        Answer: ''
                    }, {
                        Word: 'er',
                        Class: 'a',
                        Answer: ''
                    }, {
                        Word: 'gulur',
                        Class: 'l',
                        Answer: ''
                    }]
                }
            }
        };

        vm.Words = vm.Test.ParsedText.Sentence.WORDS;

        function Answer(wordIndex, answerID)
        {
          if(!vm.IsDone)
          {
              vm.AnswerData[wordIndex] = answerID;
              $log.log(vm.Words[wordIndex].Word + " answered with : " + answerID);
              vm.WordIndex++;

              if(vm.WordIndex > vm.Words.length-1)
              {
                  vm.IsDone = true;
              }
          }
        }
    }
})();
