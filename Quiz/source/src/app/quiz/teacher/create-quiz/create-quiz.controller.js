(function() {
    'use strict';

    angular
        .module('teacher-module')
        .controller('CreateQuizController', CreateQuizController);

    /* @ngInject */
    function CreateQuizController($log, QuizService) {
        var vm = this;
        vm.postQuiz = postQuiz;
        vm.getAnswers = getAnswers;
        vm.answers;

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
            Code :  'c',
            Color : 'lime'
        }];

        vm.quiz = {
            Id : '3',
            Title : '',
            Creator: 'Kennari Kennarason',
            Open : {
                From: '',
                Till : ''
            },
            Sentence : '',
            ParsedText :{
                Sentence:{
                    WORDS:[{}]
                }
            }
        };

        function getAnswers() {
            vm.answers = QuizService.getAnswers(vm.quiz.Sentence);
            $log.log('getting answers');
            $log.log(vm.quiz.ParsedText.Sentence.WORDS);
        }

        function postQuiz() {
            //vm.results = QuizService.createAnswers(quiz.Sentence);
            //vm.results = QuizService.createQuiz(quiz);
            $log.log('posting to service');
            vm.quiz.ParsedText.Sentence.WORDS = vm.answers;
            $log.log(vm.quiz);
        }
    }
})();
