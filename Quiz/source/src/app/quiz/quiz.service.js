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
            postAnswerWord : postAnswerWord,
            postAnswerSentence : postAnswerSentence,
            getCategoryName : getCategoryName,
            deleteQuiz : deleteQuiz,
            favorateQuiz : favorateQuiz,
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
                    Sentences: [{
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
                    }, {
                        WORDS: [{
                            Word: 'Sólin',
                            Class: 'n'
                        }, {
                            Word: 'er',
                            Class: 's'
                        }, {
                            Word: 'líka',
                            Class: 'a'
                        }, {
                            Word: 'gul',
                            Class: 'l'
                        }]
                    }]
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
                    Sentences: [{
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
                    }]
                }
            }]

        };

        function postAnswerSentence(quizId, quizLevel, wordCount, score) {
            var costnerAnswer = {
                "studentId" : "Gunni",
                "applicationId" : "46853333359",
                "applicationName" : "Málfræðileikur",
                "levelId" : quizLevel,
                "levelName" : "Málfræðid",
                "questionId" : Date.now(),
                "questionTitle" : "Greindu eftir orðflokki",
                "percentCorrect" : Math.floor((score/wordCount)*100),
                "questionCount" : wordCount
            };
            $log.log(costnerAnswer);
            var req = {
                method: 'POST',
                url: 'https://postman.api.costner.is/collection_answer',
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

        function postAnswerWord(quizId, quizLevel, wordInfo, answer) {
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

        function deleteQuiz(id) {
            this.Projects.splice(id,id);
        }

        function favorateQuiz(id) {
            //Todo
        }

        function createQuiz(title, opens, closes, level, parsedText) {
            var quiz = {
                Id : this.Projects.length,
                Title : title,
                Creator: 'Kennari Kennarason', //getUser
                Open : {
                    From: opens,
                    Till : closes
                },
                Level : level,
                ParsedText : parsedText
            };

            this.Projects.push(quiz);
        }

        function parseText(unparsedText) {
            return $http.post('http://localhost:8080/icenlp/IceNLPServlet/process/?mode=icenlp&parsing=true&tokenize=true&query='+ unparsedText + '&output=json' )
                .then(function (response) {
                    return response.data;
                });
        }

        function getCategories() {
            var Categories = [{
                Title : 'Nafnorð',
                Code :  'n',
                Color : 'pink'
            },{
                Title : 'Lýsingarorð',
                Code :  'l',
                Color : 'blue'
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
                Color : 'red'
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
