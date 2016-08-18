(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardOverviewController', DashboardOverviewController);

    /* @ngInject */
    function DashboardOverviewController() {
        var vm = this;
        vm.Projects = [{
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

        }, {
            Id: '3',
            Title: 'Málfræði 3',
            Creator: 'Kennari Kennaradóttir',
            Open: {
                From : '18/8/2016',
                Till : '28/8/2016'
            },
            ParsedText: {
                Sentence: {
                    WORDS: [{
                        Word: 'Sólin',
                        Class: 'n'
                    }, {
                        Word: 'er',
                        Class: 's'
                    }, {
                        Word: 'rauð',
                        Class: 'l'
                    }]
                }
            }

        }];
    }
})();
