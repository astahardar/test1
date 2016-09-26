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
            getCategories : getCategories

        };

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
                    'Access-Control-Allow-Headers': 'Content-Type'*/
                }
            };

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
