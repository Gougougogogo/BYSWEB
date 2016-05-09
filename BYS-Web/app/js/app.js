/// <reference path="../../vendor/angular/angular.js" />
/*!
 *
 * Centric - Bootstrap Admin Template
 *
 * Version: 1.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

// APP START
// -----------------------------------

(function() {
    'use strict';

    angular
        .module('bysdn', [
            'app.core',
            'app.header',
            'app.sidebar',
            'app.ripple',
            'app.menu',
            'app.preloader',
            'app.loadingbar',
            'app.settings',
            'app.utils',
            'app.dashboard',
            'app.user',
            'app.blog',
            'app.bbs'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();

(function() {
    'use strict';

    angular
        .module('app.core', [
            'app.router',
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'ngMessages',
            'pascalprecht.translate',
            'ui.bootstrap',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils',
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.dashboard', []);
})();

(function() {
    'use strict';

    angular
        .module('app.header', []);
})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();


(function() {
    'use strict';

    angular
        .module('app.menu', []);
})();

(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();

(function() {
    'use strict';

    angular
        .module('app.ripple', []);
})();

(function() {
    'use strict';

    angular
        .module('app.router', [
          'ui.router',
          'oc.lazyLoad'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();

(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();

(function() {
    'use strict';

    angular
        .module('app.user', []);
})();

(function () {
    'use strict';

    angular
        .module('app.blog', []);
})();

(function () {
    'use strict';

    angular
        .module('app.bbs', [ ]);
})();

(function() {
    'use strict';

    angular
        .module('app.utils', [
            'app.colors'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
            'gray-darker':            '#263238',
            'gray-dark':              '#455A64',
            'gray':                   '#607D8B',
            'gray-light':             '#90A4AE',
            'gray-lighter':           '#ECEFF1',

            'primary':                '#448AFF',
            'success':                '#4CAF50',
            'info':                   '#03A9F4',
            'warning':                '#FFB300',
            'danger':                 '#F44336'
        })
        ;
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(colorsRun);

    colorsRun.$inject = ['$rootScope', 'Colors'];

    function colorsRun($rootScope, Colors) {

        // Allows to use branding color with interpolation
        // <tag attribute="{{ colorByName('primary') }}" />
        $rootScope.colorByName = Colors.byName;

    }

})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];

    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
            var color = APP_COLORS[name];
            if (!color && materialColors) {
                var c = name.split('-'); // red-500, blue-a100, deepPurple-500, etc
                if (c.length)
                    color = (materialColors[c[0]] || {})[c[1]];
            }
            return (color || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];

    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {

        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;

    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
            'desktopLG': 1200,
            'desktop': 992,
            'tablet': 767,
            'mobile': 480
        });

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreRoute);

    coreRoute.$inject = ['Router'];

    function coreRoute(Router) {

        Router.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'core.layout.html',
            require: ['icons', 'ng-mfb', 'md-colors', 'screenfull']
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreRun);

    coreRun.$inject = ['$rootScope'];

    function coreRun($rootScope) {

        $rootScope.theme = function() {
            return $rootScope.app.theme;
        }

        $rootScope.layout = function() {
            return [

                $rootScope.sidebarVisible ? 'sidebar-visible' : '',
                $rootScope.app.sidebar.offcanvas ? 'sidebar-offcanvas' : '',
                $rootScope.sidebarOffcanvasVisible ? 'offcanvas-visible' : ''

            ].join(' ');

        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$timeout', '$window', 'Colors', 'APP_MEDIAQUERY'];

    function DashboardController($scope, $timeout, $window, Colors, APP_MEDIAQUERY) {
        var vm = this;

        activate();

        ////////////////
        ///Init Dashboard
        ///////////////
        function activate() { };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(dashboardRun);
    dashboardRun.$inject = ['Menu'];

    function dashboardRun(Menu) {

        var menuItem = {
            name: 'Dashboard',
            sref: 'app.dashboard',
            // iconclass: 'ion-aperture',
            imgpath: 'app/img/icons/aperture.svg',
            order: 1,
            label: {
                count: 2,
                classname: 'badge bg-success'
            }
        };

        Menu.addItem(menuItem);

    }
})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(dashboardRoute);

    dashboardRoute.$inject = ['Router'];

    function dashboardRoute(Router) {

        Router.state('app.dashboard', {
            url: '/dashboard',
            title: 'Dashboard',
            templateUrl: 'dashboard.html',
            require: ['angular-flot', 'easypiechart', 'sparkline', 'vector-map', 'vector-map-maps']
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderController', HeaderController)
        .controller('HeaderModalController', HeaderModalController)
        .controller('HeaderModalSearchController', HeaderModalSearchController);

    HeaderController.$inject = ['$uibModal'];

    function HeaderController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // Header Search
            vm.openModalSearch = function() {

                var modalSearchInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/views/header-search.tpl.html',
                    controller: 'HeaderModalSearchController as mod',
                    // position via css class
                    windowClass: 'modal-top',
                    backdropClass: 'modal-backdrop-soft',
                    // sent data to the modal instance (injectable into controller)
                    resolve: {
                        data: function() {
                            return {
                                title: 'Search'
                            };
                        }
                    }
                });

                modalSearchInstance.result.then(function( /*data*/ ) {
                    // use data from modal here
                }, function() {
                    // Modal dismissed
                });
            };

            // Settings panel (right sidebar)
            vm.openModalBar = function() {

                var modalBarInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/views/settings.tpl.html',
                    controller: 'HeaderModalController as mod',
                    // position via css class
                    windowClass: 'modal-right',
                    backdropClass: 'modal-backdrop-soft',
                    // sent data to the modal instance (injectable into controller)
                    resolve: {
                        data: function() {
                            return {
                                title: 'Settings'
                            };
                        }
                    }
                });

                modalBarInstance.result.then(function( /*data*/ ) {
                    // use data from modal here
                }, function() {
                    // Modal dismissed
                });
            };

        }
    }

    HeaderModalController.$inject = ['$uibModalInstance', 'data'];

    function HeaderModalController($uibModalInstance, data) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.modalTitle = data.title;

            vm.close = function() {
                $uibModalInstance.close( /* data for promise*/ );
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    }
    HeaderModalSearchController.$inject = ['$uibModalInstance', '$timeout', 'data'];

    function HeaderModalSearchController($uibModalInstance, $timeout, data) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.modalTitle = data.title;

            // input autofocus
            $timeout(function() {
                document.querySelector('.header-input-search').focus();
            }, 300);

            vm.close = function() {
                $uibModalInstance.close( /* data for promise*/ );
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    }

})();

(function() {
    'use strict';

    // This component is only used to provide a link in the menu
    // to the jQuery demo. It shows the menu support for direct
    // links using 'href' property.
    angular
        .module('bysdn')
        .run(jQueryDemoRun);
    jQueryDemoRun.$inject = ['Menu'];

    function jQueryDemoRun(Menu) {

        var menuItem = {
            name: 'HTML5/jQuery',
            href: '../html5jquery/',
            iconclass: 'ion-android-open',
            order: 99
        };

        //Menu.addItem(menuItem);

    }
})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig);
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];

    function loadingbarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 500;
        //cfpLoadingBarProvider.parentSelector = '';
    }
})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun);
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];

    function loadingbarRun($rootScope, $timeout, cfpLoadingBar) {

        // Loading bar transition
        // -----------------------------------
        var thBar;
        $rootScope.$on('$stateChangeStart', function() {
            thBar = $timeout(function() {
                cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
        });
        $rootScope.$on('$stateChangeSuccess', function(event) {
            event.targetScope.$watch('$viewContentLoaded', function() {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });

    }

})();

(function() {
    'use strict';

    angular
        .module('app.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['Menu'];

    function MenuController(Menu) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.items = Menu.getItems();
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.menu')
        .service('Menu', Menu);

    function Menu() {
        /* jshint validthis:true */
        this.addItem = addItem;
        this.getItems = getItems;

        ////////////////

        this.menu = [];

        function addItem(item) {
            validate(item);
            this.menu.push(item);
        }

        function getItems() {
            return this.menu;
        }

        // validate items and throw error when can't recover
        function validate(item) {
            if (!angular.isDefined(item))
                throw new Error('Menu item not defined.');
            if (!angular.isDefined(item.name))
                throw new Error('Menu item name not defined.');
            if (!angular.isDefined(item.order))
                item.order = 0; // order must exists
            // item ok
            return item;
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];

    function preloader($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: '<div class="preloader-progress">' +
                '<div class="preloader-progress-bar" ' +
                'ng-style="{width: loadCounter + \'%\'}"></div>' +
                '</div>',
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

            scope.loadCounter = 0;

            var counter = 0,
                timeout;

            // disables scrollbar
            angular.element('body').css('overflow', 'hidden');
            // ensure class is present for styling
            el.addClass('preloader');

            appReady().then(function() {
                $timeout(endCounter, 500);
            });

            timeout = $timeout(startCounter);

            ///////

            function startCounter() {

                var remaining = 100 - counter;
                counter = counter + (0.0175 * Math.pow(1 - Math.sqrt(remaining), 2));

                scope.loadCounter = parseInt(counter, 10);

                timeout = $timeout(startCounter, 20);
            }

            function endCounter() {

                $timeout.cancel(timeout);

                scope.loadCounter = 100;

                $timeout(function() {
                    // animate preloader hiding
                    $animate.addClass(el, 'preloader-hidden');
                    // retore scrollbar
                    angular.element('body').css('overflow', '');
                }, 300);
            }

            function appReady() {
                var deferred = $q.defer();
                var fired = 0;
                // if this doesn't sync with the real app ready
                // a custom event must be used instead
                var off = scope.$on('$viewContentLoaded', function() {
                    fired++;
                    // Wait for two events since we have two main ui-view
                    if ( fired > 1 ) {
                        deferred.resolve();
                        off();
                    }
                });

                return deferred.promise;
            }

        } //link
    }

})();

(function() {
    'use strict';

    angular
        .module('app.ripple')
        .directive('ripple', ripple);

    function ripple() {

        return {
            restrict: 'C',
            link: link
        };

        function link(scope, element) {
            new Ripple(element);
        }

    }

})();

(function(global) {
    'use strict';

    // public interface
    global.Ripple = RippleEffect;

    /**
     * Ripple effect for common components
     * @param [element] jQuery or jqLite element
     */
    function RippleEffect(element) {
        var TRANSITION_END = 'transitionend webkitTransitionEnd';
        var jq = angular.element;

        this.element = element;
        this.rippleElement = this.getElement();
        this.$rippleElement = jq(this.rippleElement);

        var clickEv = this.detectClickEvent();

        var self = this;
        element.on(clickEv, function() {
            // remove animation on click
            self.$rippleElement.removeClass('md-ripple-animate');
            // Set ripple size and position
            self.calcSizeAndPos();
            // start to animate
            self.$rippleElement
                .addClass('md-ripple-animate');
        });

        this.$rippleElement.on(TRANSITION_END, function() {
            self.$rippleElement
                .removeClass('md-ripple-animate');
            // avoid weird affect when ripple is not active
            self.rippleElement.style.width = 0;
            self.rippleElement.style.height = 0;
        });
    }
    /**
     * Returns the elements used to generate the effect
     * If not exists, it is created by appending a new
     * dom element
     */
    RippleEffect.prototype.getElement = function() {
        var dom = this.element[0];
        var rippleElement = dom.querySelector('.md-ripple');

        if (rippleElement === null) {
            // Create ripple
            rippleElement = document.createElement('span');
            rippleElement.className = 'md-ripple';
            // Add ripple to element
            this.element.append(rippleElement);
        }
        return rippleElement;
    };

    /**
     * Determines the better size for the ripple element
     * based on the element attached and calculates the
     * position be fully centered
     */
    RippleEffect.prototype.calcSizeAndPos = function() {
        var size = Math.max(this.element.width(), this.element.height());
        this.rippleElement.style.width = size + 'px';
        this.rippleElement.style.height = size + 'px';
        // autocenter (requires css)
        this.rippleElement.style.marginTop = -(size / 2) + 'px';
        this.rippleElement.style.marginLeft = -(size / 2) + 'px';
    };

    RippleEffect.prototype.detectClickEvent = function() {
        var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion));
        return isIOS ? 'touchstart' : 'click';
    };

})(window);

(function() {
    'use strict';

    angular
        .module('app.router')
        .config(routerConfig);

    routerConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];

    function routerConfig($ocLazyLoadProvider, APP_REQUIRES) {

        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

    }
})();

(function() {
    'use strict';

    angular
        .module('app.router')
        .constant('APP_REQUIRES', {
            'modernizr': {
                files: ['vendor/modernizr/modernizr.custom.js']
            },
            'icons': {
                files: ['vendor/ionicons/css/ionicons.min.css']
            },
            'fontawesome': {
                files: ['vendor/font-awesome/css/font-awesome.min.css']
            },
            'screenfull': {
                files: ['vendor/screenfull/dist/screenfull.js']
            },
            'lodash': {
                files: ['vendor/lodash/dist/lodash.min.js']
            },
            'md-colors': {
                files: ['vendor/material-colors/dist/colors.css']
            },
            'sparkline': {
                files: ['vendor/sparkline/index.js']
            },
            'ng-mfb': {
                files: ['vendor/ng-mfb/mfb/dist/mfb.min.css',
                    'vendor/ng-mfb/src/mfb-directive.js'
                ]
            },
            'easypiechart': {
                files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']
            },
            'angular-flot': {
                'serie': true,
                files: ['vendor/flot/jquery.flot.js',
                    'vendor/flot/jquery.flot.categories.js',
                    'vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'vendor/flot/jquery.flot.resize.js',
                    'vendor/flot/jquery.flot.pie.js',
                    'vendor/flot/jquery.flot.time.js',
                    'vendor/sidebysideimproved/jquery.flot.orderBars.js',
                    'vendor/flot-spline/js/jquery.flot.spline.min.js',
                    'vendor/angular-flot/angular-flot.js'
                ]
            },
            'ui.select': {
                files: [
                    'vendor/angular-ui-select/dist/select.js',
                    'vendor/angular-ui-select/dist/select.css'
                ]
            },
            'ui.tinymce': {
                files:
                    [
                        'vendor/tinymce/tinymce.min.js',
                        'vendor/tinymce/plugins/table/plugin.min.js',
                        'vendor/tinymce/plugins/paste/plugin.min.js',
                        'vendor/tinymce/plugins/spellchecker/plugin.min.js',                        
                    ]   
            },
            'uiGmapgoogle-maps': {
                files: [
                    'vendor/angular-simple-logger/dist/angular-simple-logger.min.js',
                    'vendor/angular-google-maps/dist/angular-google-maps.min.js'
                ]
            },
            'angular-rickshaw': {
                serie: true,
                files: ['vendor/d3/d3.min.js',
                    'vendor/rickshaw/rickshaw.js',
                    'vendor/rickshaw/rickshaw.min.css',
                    'vendor/angular-rickshaw/rickshaw.js'
                ]
            },
            'ui.knob': {
                files: ['vendor/angular-knob/src/angular-knob.js',
                    'vendor/jquery-knob/dist/jquery.knob.min.js'
                ]
            },
            'oitozero.ngSweetAlert': {
                files: ['vendor/sweetalert/dist/sweetalert.css',
                    'vendor/sweetalert/dist/sweetalert.min.js',
                    'vendor/angular-sweetalert/SweetAlert.js'
                ]
            },
            'the-cormoran.angular-loaders': {
                files: [
                    'vendor/loaders.css/loaders.css',
                    'vendor/angular-loaders/angular-loaders.js'
                ]
            },
            'angularBootstrapNavTree': {
                files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            },
            'ng-nestable': {
                files: ['vendor/ng-nestable/src/angular-nestable.js',
                    'vendor/nestable/jquery.nestable.js'
                ]
            },
            'akoenig.deckgrid': {
                files: ['vendor/angular-deckgrid/angular-deckgrid.js']
            },
            'vr.directives.slider': {
                files: ['vendor/venturocket-angular-slider/build/angular-slider.min.js']
            },
            'xeditable': {
                files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                    'vendor/angular-xeditable/dist/css/xeditable.css'
                ]
            },
            'colorpicker.module': {
                files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                    'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js'
                ]
            },
            'summernote': {
                serie: true,
                insertBefore: '#appcss',
                files: [
                    'vendor/bootstrap/js/modal.js',
                    'vendor/bootstrap/js/dropdown.js',
                    'vendor/bootstrap/js/tooltip.js',
                    'vendor/summernote/dist/summernote.css',
                    'vendor/summernote/dist/summernote.js',
                    'vendor/angular-summernote/dist/angular-summernote.js'
                ]
            },
            'angularFileUpload': {
                files: ['vendor/angular-file-upload/dist/angular-file-upload.min.js']
            },
            'filestyle': {
                files: ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js']
            },
            'ngDropzone': {
                serie: true,
                insertBefore: '#appcss',
                files: [
                    'vendor/dropzone/dist/basic.css',
                    'vendor/dropzone/dist/dropzone.css',
                    'vendor/dropzone/dist/dropzone.js',
                    'vendor/angular-dropzone/lib/angular-dropzone.js'
                ]
            },
            'vector-map': {
                files: ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'
                ]
            },
            'vector-map-maps': {
                files: ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'
                ]
            },
            'datatables': {
                serie: true,
                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                    'vendor/datatables/media/js/jquery.dataTables.js',
                    'vendor/angular-datatables/dist/angular-datatables.js',
                    'vendor/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.css',
                    'vendor/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js'
                ]
            },
            'ngTable': {
                files: ['vendor/ng-table/dist/ng-table.min.js',
                    'vendor/ng-table/dist/ng-table.min.css'
                ]
            },
            'ngTableExport': {
                files: ['vendor/ng-table-export/ng-table-export.js']
            },
            'blueimp-gallery': {
                files: ['vendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js',
                    'vendor/blueimp-gallery/css/blueimp-gallery.min.css'
                ]
            },
            'bbsDetail': {
                files: [
                    'vendor/layer/skin/layer.css',
                    'vendor/highlight/styles/tomorrow.css',
                    'app/js/bbsdetail.js',
                    'vendor/highlight/highlight.pack.js',
                    'vendor/pagination/jquery.twbsPagination.min.js',
                    'vendor/layer/layer.js'
                ]
            },
            'bbsNewpost': {
                files: [
                    'vendor/layer/skin/layer.css',
                    'app/js/newpost.js',
                    'vendor/layer/layer.js'
                ]
            },
            'bbsHome': {
                files: [
                    'vendor/layer/skin/layer.css',
                    'app/js/bbshome.js',
                    'vendor/layer/layer.js'
                ]
            },
            'blogHome': {
                files: [
                    'vendor/layer/skin/layer.css',
                    'app/js/bloghome.js',
                    'vendor/layer/layer.js'
                ]
            },
            'blogDetail': {
                files: [
                    'vendor/highlight/styles/tomorrow.css',
                    'vendor/layer/skin/layer.css',
                    'vendor/highlight/highlight.pack.js',                    
                    'app/js/blogdetail.js',
                    'vendor/layer/layer.js'
                ]
            },
            'blogPost': {
                files: [
                    'vendor/layer/skin/layer.css',
                    'vendor/layer/layer.js',
                    'app/js/blogPost.js'
                ]
            }
        });

})();

(function() {
    'use strict';

    angular
        .module('app.router')
        .provider('Router', RouterProvider);

    RouterProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function RouterProvider($locationProvider, $stateProvider, $urlRouterProvider) {

        var config = {
            // The paths where html template resides
            viewsBasePath: 'app/views/',
            // Automatically prepend views path to all templatesUrl?
            useViewsBasePath: true,
            // Set the following to true to enable the HTML5 Mode
            // You may have to set <base> tag in index and a routing configuration in your server
            html5Mode: false,
            // defaults to dashboard
            defaultRoute: '/app/dashboard'
        };

        // public access to change configuration
        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        $locationProvider.html5Mode(config.html5Mode);

        $urlRouterProvider.otherwise(config.defaultRoute);

        this.$get = Router;

        Router.$inject = ['$rootScope', '$state', '$stateParams', 'APP_REQUIRES'];

        function Router($rootScope, $state, $stateParams, APP_REQUIRES) {
            /* jshint validthis:true */

            var service = {
                // service access level
                viewpath: viewpath,
                resolveFor: resolveFor,
                state: state,
                getStates: getStates
            };

            init();

            return service;

            ///////

            // wrapper for $stateProvider to simply routes creation
            function state(name, options) {
                if (!name) throw new Error('Route name not defined.');

                if (options.require) {
                    var require = this.resolveFor.apply(this, options.require);
                    options.resolve = angular.extend({}, options.resolve, require);
                }
                if (options.templateUrl && config.useViewsBasePath)
                    options.templateUrl = this.viewpath(options.templateUrl);

                $stateProvider.state(name, options);

                // allow chain execution
                return this;
            }

            // Set here the base of the
            // relative path for all views
            function viewpath(uri) {
                return config.viewsBasePath + uri;
            }

            // Generates a resolve object by passing script names
            // previously configured in constant.APP_REQUIRES
            function resolveFor() {
                var _args = arguments;
                return {
                    __deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                        // Creates a promise chain for each argument
                        var promiseChain = $q.when(1); // empty promise
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promiseChain = andThen(_args[i]);
                        }
                        return promiseChain;

                        // creates promise to chain dynamically
                        function andThen(mod) {
                            // support a function that returns a promise
                            if (typeof mod === 'function')
                                return promiseChain.then(mod);
                            else {
                                return promiseChain.then(function() {
                                    // check if module is defined
                                    if (!APP_REQUIRES[mod])
                                        throw new Error('Route resolve: Bad resource name [' + mod + ']');
                                    // finally, return the load promise
                                    return $ocLL.load(APP_REQUIRES[mod]);
                                });
                            }
                        }

                    }]
                };
            } // resolveFor

            function getStates() {
                return $state.get();
            }

            function init() {

                // Set reference to access them from any scope
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                // auto update document title
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState /*, toParams, fromState, fromParams*/ ) {
                        // Autoscroll to top
                        scrollTopMainView();
                        // Update document title
                        var title = (toState.title || '');
                        $rootScope.documentTitle = title; // data bind to <title>
                    }
                );
                // on state not found log to console
                $rootScope.$on('$stateNotFound',
                    function(event, unfoundState /*, fromState, fromParams*/ ) {
                        console.log('State not found: ' + unfoundState.to + unfoundState.toParams + unfoundState.options);
                    });
                // on error log to console
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        console.log(error);
                    });
            }

            function scrollTopMainView() {
                // There must not be more than one <main> element in a document. (http://www.w3schools.com/tags/tag_main.asp)
                var main = document.querySelector('main');
                if(main) main.scrollTop = 0;
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope','$http'];

    function settingsRun($rootScope,$http) {

        var themes = [
            'theme-1',
            'theme-2',
            'theme-3',
            'theme-4',
            'theme-5',
            'theme-6',
            'theme-7',
            'theme-8',
            'theme-9',
        ]

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'bysdn',
            description: 'Bootstrap Admin Template',
            year: ((new Date()).getFullYear()),
            layout: {
                rtl: false
            },
            sidebar: {
                over: false,
                showheader: true,
                showtoolbar: true,
                offcanvas: false
            },
            header: {
                menulink: 'menu-link-slide'
            },
            userName: '',
            userImg: 'app/img/user/01.jpg',
            footerHidden: false,
            viewAnimation: 'ng-fadeInLeftShort',
            theme: themes[0],
            currentTheme: 0
        };

        $http.get('../User/GetUserInfo',{
            cache: false
        }).success(function (e) {
                $rootScope.app.userName = e.userName;
                $rootScope.app.userImg = e.userImg;
            
            //layer.close(load);
        }).error(function (data) {
            layer.msg(data);
            //layer.close(load);
        });

        $rootScope.themes = themes;
    }

})();

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebarNav', sidebarNav);

    sidebarNav.$inject = [];

    function sidebarNav() {
        return {
            restrict: 'EAC',
            link: link
        };

        function link(scope, element) {

            element.on('click', function(event) {
                var item = getItemElement(event);
                // check click is on a tag
                if (!item) return;

                var ele = angular.element(item),
                    liparent = ele.parent()[0];

                var lis = ele.parent().parent().children(); // markup: ul > li > a
                // remove .active from childs
                lis.find('li').removeClass('active');
                // remove .active from siblings ()
                angular.forEach(lis, function(li) {
                    if (li !== liparent)
                        angular.element(li).removeClass('active');
                });

                var next = ele.next();
                if (next.length && next[0].tagName === 'UL') {
                    ele.parent().toggleClass('active');
                    event.preventDefault();
                }
            });

        }

        // find the a element in click context
        // doesn't check deeply, asumens two levels only
        function getItemElement(event) {
            var element = event.target,
                parent = element.parentNode;
            if (element.tagName.toLowerCase() === 'a') return element;
            if (parent.tagName.toLowerCase() === 'a') return parent;
            if (parent.parentNode.tagName.toLowerCase() === 'a') return parent.parentNode;
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .run(sidebarRun);
    sidebarRun.$inject = ['$rootScope', '$window', '$document', '$timeout', 'APP_MEDIAQUERY'];

    function sidebarRun($rootScope, $window, $document, $timeout, APP_MEDIAQUERY) {
        // Sidebar API for mobile
        $rootScope.toggleSidebar = toggleSidebarState;
        $rootScope.closeSidebar = function() {
            toggleSidebarState(false);
        };
        $rootScope.openSidebar = function() {
            toggleSidebarState(true);
        };

        // Sidebar offcanvas API for desktops
        $rootScope.toggleSidebarOffcanvasVisible = function(state) {
            $rootScope.sidebarOffcanvasVisible = angular.isDefined(state) ? state : !$rootScope.sidebarOffcanvasVisible;
        };

        // ESC key close sidebar
        $document.on('keyup',function(e) {
             if (e.keyCode == 27) {
                $timeout(function() {
                    $rootScope.toggleSidebarOffcanvasVisible(false);
                });
            }
        });

        // Considerations for different APP states

        // on mobiles, sidebar starts off-screen
        if (isMobileScreen()) $timeout(function() {
            toggleSidebarState(false);
        });

        // hide sidebar when open a new view
        $rootScope.$on('$stateChangeStart', function() {
            if (isMobileScreen())
                toggleSidebarState(false);
            // Always hide offscreen sidebar when route change
            else
                $rootScope.toggleSidebarOffcanvasVisible(false);
        });

        // remove desktop offcanvas when app changes to mobile
        // so when it returns, the sidebar is shown again
        $window.addEventListener('resize', function() {
            if (isMobileScreen())
                $rootScope.toggleSidebarOffcanvasVisible(false);
        });

        ///////

        function toggleSidebarState(state) {
            //  state === true -> open
            //  state === false -> close
            //  state === undefined -> toggle
            $rootScope.sidebarVisible = angular.isDefined(state) ? state : !$rootScope.sidebarVisible;
        }

        function isMobileScreen() {
            return $window.innerWidth < APP_MEDIAQUERY.desktop;
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.blog')
        .run(userRun);

    userRun.$inject = ['Menu'];

    function userRun(Menu) {

        var menuItem = {
            name: 'Blog',
            sref: 'app.blog.home',
            order: 3,
            imgpath: 'app/img/icons/clipboard.svg'
        };

        Menu.addItem(menuItem);

    }
})();

(function() {
    'use strict';

    angular
        .module('app.user')
        .run(userRun);

    userRun.$inject = ['Menu'];

    function userRun(Menu) {

        var menuItem = {
            name: 'User',
            sref: 'user',
            order: 9,
            iconclass: 'ion-person-stalker',
            imgpath: 'app/img/icons/person-stalker.svg',
            subitems: [{
                name: 'Login',
                sref: 'user.login'
            }, {
                name: 'Signup',
                sref: 'user.signup'
            }, {
                name: 'Lock',
                sref: 'user.lock'
            }, {
                name: 'Recover',
                sref: 'user.recover'
            }]
        };

        Menu.addItem(menuItem);

    }
})();

(function () {
    'use strict';

    angular
        .module('app.bbs')
        .run(userRun);

    userRun.$inject = ['Menu'];

    function userRun(Menu) {

        var menuItem = {
            name: 'BBS',
            sref: 'BBS',
            order: 2,
            //iconclass: 'ion-chatbubble-working',
            imgpath: 'app/img/icons/radio-waves.svg',
            subitems: [
                {
                    name: 'Home',
                    sref: 'app.bbs.home'
                },
                {
                    name: 'New Question',
                    sref: 'app.bbs.newpost'
                }
            ]
        };

        Menu.addItem(menuItem);

    }
})();

(function () {
    'use strict';

    angular
        .module('app.bbs')
        .run(userRoute);

    userRoute.$inject = ['Router'];
    function userRoute(Router) {

        Router.state('app.bbs', {
            url: '/bbs',
            title: 'BBS',
            abstract: true,
            template: '<div ui-view class="ng-fadeInLeftShort"></div>',
            require: ['modernizr', 'icons', 'ng-mfb', 'md-colors']
        })
        .state('app.bbs.newpost', {
            url: '/newpost',
            title: 'NewQuestion',
            templateUrl: 'newpost.html',
            require: ['ui.select', 'ui.tinymce', 'ngDropzone', 'bbsNewpost']
        })
        .state('app.bbs.home', {
            url: '/home',
            title: 'Home',
            templateUrl: 'bbs-home.html',
            require: ['bbsHome']
        })
        .state('app.bbs.detail', {
            url: '/detail/:bbsId',
            title: 'Detail',
            templateUrl: 'bbs-detail.html',
            require: ['bbsDetail', 'ui.tinymce']
        });
    }
})();

(function () {
    'use strict';

    angular
        .module('app.blog')
        .run(userRoute);

    userRoute.$inject = ['Router'];
    function userRoute(Router) {
        Router.state('app.blog', {
            url: '/blog',
            title: 'Blog',
            abstract: true,
            template: '<div ui-view class="ng-fadeInLeftShort"></div>',
            require: ['modernizr', 'icons', 'ng-mfb', 'md-colors']
        })
        .state('app.blog.home', {
            url: '/home',
            title: 'Home',
            templateUrl: 'blog-home.html',
            require: ['blogHome']
        })
        .state('app.blog.detail', {
            url: '/detail/:blogTypeId',
            title: 'Detail',
            templateUrl: 'blog-detail.html',
            require: ['blogDetail']
        })
        .state('app.blog.newpost', {
            url: '/newpost/:blogTypeId',
            title: 'New blog',
            templateUrl: 'blog-new.tpl.html',
            require: ['blogPost', 'ui.tinymce', 'ngDropzone']
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('app.user')
        .run(userRoute);

    userRoute.$inject = ['Router'];
    function userRoute(Router){

        Router.state('user', {
            url: '/user',
            title: 'User',
            abstract: true,
            template: '<div class="page-container bg-blue-grey-900"><div ui-view class="ng-fadeInLeftShort"></div></div>',
            require: ['modernizr', 'icons', 'ng-mfb', 'md-colors']
        })
        .state('user.login', {
            url: '/login',
            title: 'Login',
            templateUrl: 'login.html'
        })
        .state('user.signup', {
            url: '/signup',
            title: 'Signup',
            templateUrl: 'signup.html'
        })
        .state('user.lock', {
            url: '/lock',
            title: 'Lock',
            templateUrl: 'lock.html'
        })
        .state('user.recover', {
            url: '/recover',
            title: 'Recover',
            templateUrl: 'recover.html'
        })
        ;
    }

})();

(function() {
    'use strict';
    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];

    // Browser detection
    function Browser($window) {
        return $window.jQBrowser;
    }

})();

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];

    function toggleFullscreen(Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            // Not supported under IE
            if (Browser.msie) {
                element.addClass('hide');
            } else {
                element.on('click', function(e) {
                    e.preventDefault();

                    if (screenfull.enabled) {

                        screenfull.toggle();

                    } else {
                        // Fullscreen not enabled ;
                    }

                });
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('svgReplace', svgReplace);

    svgReplace.$inject = ['$compile', '$http', '$templateCache', '$timeout']
    function svgReplace ($compile, $http, $templateCache, $timeout) {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function() {

                var src = attrs.src;

                if( !src || src.indexOf('.svg') < 0)
                    throw "only support for SVG images";
                    // return /*only support for SVG images*/;

                $http.get(src, {
                    cache : $templateCache
                }).success(function (res) {
                    element.replaceWith($compile(res)(scope))
                })

            });
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];

    function triggerResize($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            element.on('click', function() {
                $timeout(function() {
                    $window.dispatchEvent(new Event('resize'));
                });
            });
        }
    }

})();
