(function() {
    'use strict';

    angular
        .module('student-module')
        .factory('QuizService', QuizService);

    QuizService.$inject = ['$http', '$window', '$log'];

    /* @ngInject */
    function QuizService($http, $window, $log) {
        return {
            getQuizes: getQuizes,
            getQuiz: getQuiz,
            createQuiz: createQuiz,
            parseText: parseText,
            getCategories : getCategories,
            postAnswer : postAnswer,
            getCategoryName :getCategoryName,
            Projects : [{
                Id: '0',
                Title: 'Málfræði 1',
                Creator: 'Kennari Kennarason',
                Open: {
                    From : '10/8/2016',
                    Till : '17/8/2016'
                },
                Level: 'Miðlungs',
                ParsedText: {
                    Sentence: {
                        WORDS: [{
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
            }, {
                Id: '1',
                Title: 'Málfræði 2',
                Creator: 'Kennari Kennaradóttir',
                Open: {
                    From : '14/8/2016',
                    Till : '21/8/2016'
                },
                Level : 'Auðvelt',
                ParsedText: {
                    Sentence: {
                        WORDS: [{
                            Word: 'Panda',
                            Class: 'n'
                        }, {
                            Word: 'er',
                            Class: 's'
                        }, {
                            Word: 'löt',
                            Class: 'l'
                        }]
                    }
                }
            }]

        };

        function postAnswer(quizId, quizLevel, wordInfo, answer) {


            var costnerAnswer = {
                "studentId" : "Gunni",
                "applicationId" : "46853333359",
                "applicationName" : "Málfræðileikur",
                "levelId" : quizLevel,
                "answerCorrect" : wordInfo.Class == answer,
                "answerDescription" : wordInfo.Word,
                "correctAnswer" : getCategoryName(wordInfo.Class),
                "studentsAnswer" : getCategoryName(answer),
                "questionId" : Date.now(),
                "questionTitle" : "Greindu eftir orðflokki"
            };

            var req = {
                method: 'POST',
                url: 'https://postman.api.costner.is/answers',
                data : costnerAnswer,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return $http(req)
                .then(function (response) {
                    $log.log(response.data);
                });
        }

        function getQuizes() {
            return this.Projects;
        }

        function getQuiz(id) {
            return this.Projects[id];

        }

        function createQuiz(quiz) {
            $log.log('createQuiz');
            quiz.Id= this.Projects.length;
            quiz.Creator= 'Kennari Kennaradóttir';
            this.Projects.push(quiz);
        }

        function parseText(unparsedText) {
            /*
            var req = {
                method: 'GET',
                url: 'http://nlp.cs.ru.is/IceNLPWebService/',
                qs:
               { mode: 'icenlp',
                 parsing: 'true',
                 query: 'Testing%20test'
                },
                headers: {

                    /*
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, HEAD, POST, TRACE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            };*/

            var unparsedText = unparsedText.split(" ");
            var WORDS = [{
                Word: unparsedText[0],
                Class: 'l'
            },{
                Word: unparsedText[1],
                Class: 'n'
            },{
                Word: unparsedText[2],
                Class: 's'
            },{
                Word: unparsedText[3],
                Class: 'a'
            },{
                Word: unparsedText[4],
                Class: 'c'
            },{
                Word: unparsedText[5],
                Class: 'l'
            }];

            return WORDS;
             /*
            $http(req).then(function (response) {
                return response.data;
            }, function (response) {
                $log.log(response);
            }); */

        }

        function getCategories() {
            var Categories = [{
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

            return Categories;
        }

        function getCategoryName(categoryClass) {
            if(categoryClass == 'n') {
                return 'Nafnorð';
            }
            if(categoryClass == 'l') {
                return 'Lýsingarorð';
            }
            if(categoryClass == 'f') {
                return 'Fornafn';
            }
            if(categoryClass == 'g') {
                return 'Greinir';
            }
            if(categoryClass == 't') {
                return 'Töluorð';
            }
            if(categoryClass == 's') {
                return 'Sagnorð';
            }
            if(categoryClass == 'a') {
                return 'Atviksorð';
            }
            if(categoryClass == 'c') {
                return 'Samtenging';
            }
        }

    }})();
