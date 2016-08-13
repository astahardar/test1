(function() {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController);

    /* @ngInject */
    function TestController() {
        var vm = this;
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
    }
})();
