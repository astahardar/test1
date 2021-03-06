(function() {
    'use strict';

    angular
        .module('student-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.overview', {
            url: '/quizes/overview',
            templateUrl: 'app/quiz/student/overview/overview.tmpl.html',
            // set the controller to load for this page
            controller: 'OverviewController',
            controllerAs: 'vm'
            // layout-column class added to make footer move to
            // bottom of the page on short pages
        })

        .state('triangular.quiz-live', {
            url: '/quizes/quiz/:id',
            templateUrl: 'app/quiz/student/live-quiz/live-quiz0.tmpl.html',
            controller: 'LiveQuizController',
            controllerAs: 'vm',

            data: {
                layout: {
                    sideMenuSize: 'hidden',
                    showToolbar: true,
                    footer: true
                   //s contentClass: 'triangular-non-scrolling'

                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Student',
            icon: 'zmdi zmdi-border-color',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Overview',
                state: 'triangular.overview',
                type: 'link'
            }]
        });
        /*
        $urlRouterProvider.when('/quizes/quiz/', '/quizes/quiz/');
        $urlRouterProvider.when('/quizes/quiz/*', '/quizes/quiz/');*/
    }
})();
