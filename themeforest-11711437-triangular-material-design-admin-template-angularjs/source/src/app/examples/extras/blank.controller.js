(function() {
    'use strict';

    angular
        .module('app.examples.extras')
        .controller('BlankController', BlankController);

    /* @ngInject */
    function BlankController() {
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