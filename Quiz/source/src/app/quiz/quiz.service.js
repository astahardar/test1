(function() {
    'use strict';

    angular
        .module('student-module')
        .factory('QuizService', QuizService);

    QuizService.$inject = ['$http', '$window'];

    /* @ngInject */
    function QuizService($http, $window) {
        return {
            getQuizes: getQuizes,
            getQuiz: getQuiz,
            createAnswers: createAnswers
        };


        function getQuizes() {
            /*
            return $http.get(API_ROUTE.url + 'teachers/' + teacherId + '/student_class/' + classId + '/events')
                .then(function(response) {
                    return response;
                });*/

            var Projects = [{
                Id: '1',
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
                Id: '2',
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

            }];

            return Projects;
        }

        function getQuiz(id) {
            /*
            return $http.get(API_ROUTE.url + 'teachers/' + teacherId + '/student_class/' + classId + '/events')
                .then(function(response) {
                    return response;
                });*/

            var quiz1 = {
                Id : '1',
                Title : 'Title',
                ParsedText :{
                    Sentence:{
                        WORDS:[{
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
            };

            var quiz2 = {
                Id : '1',
                Title : 'Title',
                ParsedText :{
                    Sentence:{
                        WORDS:[{
                            Word: 'Siggi',
                            Class: 'n'
                        }, {
                            Word: 'sjónauki',
                            Class: 'n'
                        }, {
                            Word: 'hefur',
                            Class: 's'
                        }, {
                            Word: 'sagst',
                            Class: 's'
                        }, {
                            Word: 'vera',
                            Class: 's'
                        }, {
                            Word: 'í',
                            Class: 'a'
                        }, {
                            Word: 'hernum',
                            Class: 'n'
                        }, {
                            Word: 'en',
                            Class: 'c'
                        }, {
                            Word: 'hann',
                            Class: 'f'
                        }, {
                            Word: 'er',
                            Class: 's'
                        }, {
                            Word: 'alltaf',
                            Class: 'a'
                        }, {
                            Word: 'að',
                            Class: 'a'
                        }, {
                            Word: 'ljúga',
                            Class: 's'
                        }]
                    }
                }
            };
            if(id == 1) {
                return quiz1;
            }
            else {
                return quiz2;
            }

        }

        function createAnswers(studentId, quizId, quizTitle, Answers, Score) {
            /*
            $window.localStorage.setItem(EVENT.eventId, event.eventId);
            $window.localStorage.setItem(EVENT.liveEventId, event.eventId);
            return $http.post(API_ROUTE.postmanUrl + 'events', event)
                .then(function (response) {
                     TODO: Get back eventId and save in local storage
                    return response.data;
                });*/
        }

    }})();
