(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardOverviewController', DashboardOverviewController);

    /* @ngInject */
    function DashboardOverviewController() {
        var vm = this;
        vm.Verkefni = [{
            id: '1',
            title: 'Setningarfræði 101',
            word: 'Hjólabátur'

        },{
            id: '2',
            title: 'Málfræði 101',
            word: 'Gulur'
        }];
    }
})();