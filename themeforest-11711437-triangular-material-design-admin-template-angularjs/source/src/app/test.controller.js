(function() {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController, '$stateParams');

    /* @ngInject */
    function TestController($log, $stateParams) {
        var vm = this;
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

        vm.Answers = [];
        vm.svar = '';
        $log.log($stateParams.id);
        vm.ProcessForms = function(place,value) {
            vm.Answers[place]= value;
            $log.log(vm.Answers);
        };
    }
})();
