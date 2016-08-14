(function() {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController);

    /* @ngInject */
    function TestController($log) {
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
                        Selected: 'n'
                    }, {
                        Word: 'er',
                        Class: 'a',
                        Selected: ''
                    }, {
                        Word: 'gulur',
                        Class: 'l',
                        Selected: ''
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
