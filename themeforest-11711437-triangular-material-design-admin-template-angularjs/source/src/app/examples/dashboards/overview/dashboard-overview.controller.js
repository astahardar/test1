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
    }
})();
