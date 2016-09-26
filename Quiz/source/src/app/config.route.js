(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig)
        .config(provider);


    function provider($httpProvider) {
      //Reset headers to avoid OPTIONS request (aka preflight)

        $httpProvider.defaults.headers.get = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes

        // 404 & 500 pages
        $stateProvider
        .state('404', {
            url: '/404',
            views: {
                'root': {
                    templateUrl: '404.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('401', {
            url: '/401',
            views: {
                'root': {
                    templateUrl: '401.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('500', {
            url: '/500',
            views: {
                'root': {
                    templateUrl: '500.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        });


        // set default routes when no path specified
        $urlRouterProvider.when('', '/quizes/overview');
        $urlRouterProvider.when('/', '/quizes/overview');

        // always goto 404 if route not found
      //  $urlRouterProvider.otherwise('/404');
    }
})();
