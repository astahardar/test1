(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('triangular');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' oxygenna.com');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('2.7.0');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('Triangular');
        triRouteProvider.setSeparator('|');
    }
})();
