(function() {
    'use strict';

    angular
        .module('teacher-module')
        .controller('CreateQuizController', CreateQuizController);

    /* @ngInject */
    function CreateQuizController($log, QuizService) {
        var vm = this;
        vm.postQuiz = postQuiz;
        vm.parseText = parseText;
        vm.htmlToPlaintext = htmlToPlaintext;
        vm.ParsedText;

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
            UnparsedText : '',
            ParsedText : {
                Sentence : {
                    WORDS : []
                }

            }
        };

        function parseText() {
          /*
            var sent = vm.quiz.Sentence.replace("<p>", "");
            sent = sent.replace("</p>", "");*/
            vm.ParsedText = QuizService.parseText(htmlToPlaintext(vm.quiz.UnparsedText));
            $log.log(vm.ParsedText);
        }

        function postQuiz() {
            //vm.results = QuizService.createAnswers(quiz.Sentence);
            //vm.results = QuizService.createQuiz(quiz);
            $log.log('posting to service');
            vm.quiz.ParsedText.Sentence.WORDS = vm.ParsedText;
            QuizService.createQuiz(vm.quiz);
            $log.log(vm.quiz);
        }

        function htmlToPlaintext(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }
    }
})();
