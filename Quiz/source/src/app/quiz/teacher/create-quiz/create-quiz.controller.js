(function() {
    'use strict';

    angular
        .module('teacher-module')
        .controller('CreateQuizController', CreateQuizController);

    /* @ngInject */
    function CreateQuizController() {
        var vm = this;

         vm.quiz = {
            Id : '',
            Title : '',
            Sentence : ''
        };


    }
})();
