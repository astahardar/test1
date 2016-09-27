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
            Projects : [{
                Id: '0',
                Title: 'Málfræði 1',
                Creator: 'Kennari Kennarason',
                Open: {
                    From : '10/8/2016',
                    Till : '17/8/2016'
                },
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

        function postAnswer(quizId, quizTitle, wordInfo, answer) {
            var costnerAnswer = {
                studentId : 'Gunni',
                applicationId : '46853333359',
                applicationName : 'Málfræðileikur',
                level : 'Orðflokkar',
                answerCorrect : wordInfo.Class == answer,
                answerDescription : '',
                correctAnswer : wordInfo.Class,
                studentAnswer : answer,
                questionId : Date.now(),
                questionTitle : ''
            };

            return $http.post('https://robinhood.api.costner.is/answers', costnerAnswer)
                .then(function (response) {
                    $log.log(response.data);
                });
        }

        function getQuizes() {
            /*
            return $http.get(API_ROUTE.url + 'teachers/' + teacherId + '/student_class/' + classId + '/events')
                .then(function(response) {
                    return response;
                });*/

            return this.Projects;
        }

        function getQuiz(id) {
            /*
            return $http.get(API_ROUTE.url + 'teachers/' + teacherId + '/student_class/' + classId + '/events')
                .then(function(response) {
                    return response;
                });*/
                $log.log(this.Projects[id]);
            return this.Projects[id];

        }

        function createQuiz(quiz) {
            /*
            var quiz = {
                studentId : '',
                applicationId : '46853333359',
                applicationName : 'Málfræðileikur',
                levelId : '86458523',
                levelName : 'Orðflokkar',
                questionListDescription : quiz.sentence,
                quiestionList : [
                    quiestionId : "",
                    questionTitle :"",
                    answerCorrect : false,
                    studentAnswer : "",
                    correctAnswer : ""
                ]

            }*/

            $log.log('createQuiz');
            quiz.Id= this.Projects.length;
            quiz.Creator= 'Kennari Kennaradóttir';
            this.Projects.push(quiz);
            $log.log(this.Projects);
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
            });

            /*
            for (var i = 0; i < words.length; i++) {
                var w = {
                    Word: words[i],
                    Class : WordCatagories[Math.floor(Math.random() * 8)].Code
                };
                WORDS.push(w);
            }*/

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

    }})();
