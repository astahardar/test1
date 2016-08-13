(function() {
    'use strict';

    angular
        .module('app.examples.extras')
        .controller('TestController', TestController);

    /* @ngInject */
    function TestController() {
        var vm = this;
        vm.Verkefni = {
            Title : 'lala',
            ParsedText :{
                Sentence:{
                    WORDS:[{
                        'Hjólabáturinn': 'nkeng'
                    },{
                        'er': 'sfg3en'
                    },{
                        'gulur': 'lkensf'
                    }]
                }
            }
        };
    }
})();