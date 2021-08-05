// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
    .constant('JQ_CONFIG', {
        easyPieChart: ['ng/libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
        sparkline: ['ng/libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'],
        plot: ['ng/libs/jquery/flot/jquery.flot.js',
            'ng/libs/jquery/flot/jquery.flot.pie.js',
            'ng/libs/jquery/flot/jquery.flot.resize.js',
            'ng/libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
            'ng/libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js',
            'ng/libs/jquery/flot-spline/js/jquery.flot.spline.min.js'],
        moment: ['ng/libs/jquery/moment/moment.js'],
        screenfull: ['ng/libs/jquery/screenfull/dist/screenfull.min.js'],
        slimScroll: ['ng/libs/jquery/slimscroll/jquery.slimscroll.min.js'],
        sortable: ['ng/libs/jquery/html5sortable/jquery.sortable.js'],
        nestable: ['ng/libs/jquery/nestable/jquery.nestable.js',
            'ng/libs/jquery/nestable/jquery.nestable.css'],
        filestyle: ['ng/libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js'],
        slider: ['ng/libs/jquery/bootstrap-slider/bootstrap-slider.js',
            'ng/libs/jquery/bootstrap-slider/bootstrap-slider.css'],
        chosen: ['ng/libs/jquery/chosen/chosen.jquery.min.js',
            'ng/libs/jquery/chosen/bootstrap-chosen.css'],
        TouchSpin: ['ng/libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
            'ng/libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        wysiwyg: ['ng/libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
            'ng/libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
        dataTable: ['ng/libs/jquery/datatables/media/js/jquery.dataTables.min.js',
            'ng/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
            'ng/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
        vectorMap: ['ng/libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
            'ng/libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
            'ng/libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
            'ng/libs/jquery/bower-jvectormap/jquery-jvectormap.css'],
        footable: ['ng/libs/jquery/footable/v3/js/footable.min.js',
            'ng/libs/jquery/footable/v3/css/footable.bootstrap.min.css'],
        fullcalendar: [   //'ng/libs/jquery/bootstrap-datetimepicker/moment.min.js',
            'ng/libs/jquery/fullcalendar/dist/fullcalendar.min.js',
            'ng/libs/jquery/fullcalendar/dist/fullcalendar.css',
            'ng/libs/jquery/fullcalendar/dist/fullcalendar.theme.css'],
        daterangepicker: [   //'ng/libs/jquery/bootstrap-datetimepicker/moment.min.js',
            'ng/libs/jquery/bootstrap-daterangepicker/daterangepicker.js',
            'ng/libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css'],

        tagsinput: ['ng/libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
            'ng/libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css'],
        handsontable: ['ng/libs/handsontable/handsontable.full.min.css',
            'ng/libs/handsontable/handsontable.full.min.js'],
        gmap: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCgotnujZjRmh-HxGxQ4me3aS3rtTod8dY&sensor=false&libraries=places']

    }
    )
    .constant('MODULE_CONFIG', [
        {
            name: 'ngGrid',
            files: [
                'ng/libs/angulng-grid/buing-grid.min.js',
                'ng/libs/angulng-grng-grid.min.css',
                'ng/libs/angulng-grng-grid.bootstrap.css'
            ]
        },
        {
            name: 'ui.grid',
            files: [
                'ng/libs/angular/angular-ui-grid/ui-grid.min.js',
                'ng/libs/angular/angular-ui-grid/ui-grid.min.css',
                'ng/libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
            ]
        },
        {
            name: 'ui.select',
            files: [
                'ng/libs/angular/angular-ui-select/dist/select.js',
                'ng/libs/angular/angular-ui-select/dist/select.css'
            ]
        },
        {
            name: 'angularFileUpload',
            files: [
                'ng/libs/angular/angular-file-upload/angular-file-upload.js'
            ]
        },
        {
            name: 'ui.calendar',
            files: ['ng/libs/angular/angular-ui-calendar/src/calendar.js']
        },
        {
            name: 'ngImgCrop',
            files: [
                'ng/libs/angulngImgCrop/compile/minifing-img-crop.js',
                'ng/libs/angulngImgCrop/compile/minifing-img-crop.css'
            ]
        },
        {
            name: 'angularBootstrapNavTree',
            files: [
                'ng/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                'ng/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
            ]
        },
        {
            name: 'toaster',
            files: [
                'ng/libs/angular/angularjs-toaster/toaster.js',
                'ng/libs/angular/angularjs-toaster/toaster.css'
            ]
        },
        {
            name: 'textAngular',
            files: [
                'ng/libs/angular/textAngular/dist/textAngular-sanitize.min.js',
                'ng/libs/angular/textAngular/dist/textAngular.min.js'
            ]
        },
        {
            name: 'vr.directives.slider',
            files: [
                'ng/libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
                'ng/libs/angular/venturocket-angular-slider/build/angular-slider.css'
            ]
        },
        {
            name: 'com.2fdevs.videogular',
            files: [
                'ng/libs/angular/videogular/videogular.min.js'
            ]
        },
        {
            name: 'com.2fdevs.videogular.plugins.controls',
            files: [
                'ng/libs/angular/videogular-controls/controls.min.js'
            ]
        },
        {
            name: 'com.2fdevs.videogular.plugins.buffering',
            files: [
                'ng/libs/angular/videogular-buffering/buffering.min.js'
            ]
        },
        {
            name: 'com.2fdevs.videogular.plugins.overlayplay',
            files: [
                'ng/libs/angular/videogular-overlay-play/overlay-play.min.js'
            ]
        },
        {
            name: 'com.2fdevs.videogular.plugins.poster',
            files: [
                'ng/libs/angular/videogular-poster/poster.min.js'
            ]
        },
        {
            name: 'com.2fdevs.videogular.plugins.imaads',
            files: [
                'ng/libs/angular/videogular-ima-ads/ima-ads.min.js'
            ]
        },
        {
            name: 'xeditable',
            files: [
                'ng/libs/angular/angular-xeditable/dist/js/xeditable.min.js',
                'ng/libs/angular/angular-xeditable/dist/css/xeditable.css'
            ]
        },
        {
            name: 'smart-table',
            files: [
                'ng/libs/angular/angular-smart-table/dist/smart-table.min.js'
            ]
        },
        {
            name: 'angular-skycons',
            files: [
                'ng/libs/angular/angular-skycons/angular-skycons.js'
            ]
        }
    ]
    )
    // oclazyload config
    .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: MODULE_CONFIG
        });
    }])
    ;
