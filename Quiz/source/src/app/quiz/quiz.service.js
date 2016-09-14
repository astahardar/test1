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
            getAnswers: getAnswers,
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
            $log.log('createQuiz');
            quiz.Id= this.Projects.length;
            quiz.Creator= 'Kennari Kennaradóttir';
            this.Projects.push(quiz);
            $log.log(this.Projects);
        }

        function getAnswers(sentence) {
            /*
            $window.localStorage.setItem(EVENT.eventId, event.eventId);
            $window.localStorage.setItem(EVENT.liveEventId, event.eventId);
            return $http.post(API_ROUTE.postmanUrl + 'events', event)
                .then(function (response) {
                     TODO: Get back eventId and save in local storage
                    return response.data;
                });*/

            var WordCatagories = [{
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

            var WORDS = [];
            var words = sentence.split(' ');
            for (var i = 0; i < words.length; i++) {
                var w = {
                    Word: words[i],
                    Class : WordCatagories[Math.floor(Math.random() * 8)].Code
                };
                WORDS.push(w);
            }

            return WORDS;

        }

    }})();
