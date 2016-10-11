(function() {
    'use strict';

    angular
        .module('teacher-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.create-quiz', {
                url: '/quizes/create',
                templateUrl: 'app/quiz/teacher/create-quiz/create-quiz.tmpl.html',
                controller: 'CreateQuizController',
                controllerAs: 'vm'
            })

            .state('triangular.teacher-overview', {
                url: '/quizes/teacher/overview',
                templateUrl: 'app/quiz/teacher/overview/overview.tmpl.html',
                controller: 'TeacherOverviewController',
                controllerAs: 'vm'
            });
        /*
         $urlRouterProvider.when('/quizes/create/', '/quizes/create/');
         $urlRouterProvider.when('/quizes/create/*', '/quizes/create/');*/

        triMenuProvider.addMenu({
            name: 'Teacher',
            icon: '',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Create Quiz',
                state: 'triangular.create-quiz',
                type: 'link'
            },{
                name: 'Overview',
                state: 'triangular.teacher-overview',
                type: 'link'
            }]
        });
    }
})();
