/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


(function (app, undefined) {
    app.initialize = function () {
        this.bindEvents();




        //$("#btn").click(function () {
        //    $("#pfirst").html("Stam!");
        //});


        /*
        $("#navGeolocaion").click(
            function () {
                $.mobile.changePage("views/GeoView.html"
                    , {
                        dataUrl : "index.html#GeoView"
                      }
                    )
            }
            );*/
        

        app.config(['$routeProvider', function ($routeProvide) {
            
            var nav_routes = app.nav_routes;
            for (var i = 0; i < nav_routes.length; i++) {
                $routeProvide.when(nav_routes[i].hash, nav_routes[i].route_info);                
            }


          

            /*$routeProvide*/
             /*   
             This is a sample of using routes with parameters
             .when('/view/:name', { templateUrl: '/template/view.html', controller: viewCtrl })
                .when('/view/message/:name', { templateUrl: '/template/message.html', controller: messageCtrl })*/


              /*  .when('/', { templateUrl: 'views/GeoView.html', controller: 'geoCtrl' })
                .when('/login', { templateUrl: 'views/LoginView.html', controller: 'loginCtrl' })    */
        }])
//global event handler  
    .run(['$rootScope', '$window', '$route', '$location', function ($rootScope, $window, $route, $location) {
        $rootScope.slide = 'slide-left';
       
       $rootScope.$on('$routeChangeStart', function () {
           //event button to move backward  
           //  console.log('routeChangeStart');
           $rootScope.back = function () {
               console.log('root scope back');
               $rootScope.slide = 'slide-right';
               $window.history.back();
           }
           //event button item list to move forward  
           $rootScope.next = function () {
               console.log('root scope nex');
               $rootScope.slide = 'slide-left';
           }
       });

       $rootScope.$on('$routeChangeSuccess', app.routeChangeSuccess);

    $rootScope.$on('$locationChangeSuccess', function (a,b,c,d) {
       /* console.log('location change succcess ' + $location.hash());*/
    });

    $rootScope.$on('$viewContentLoaded', function (a, b, c, d) {
        $('div[ng-view]').enhanceWithin(); //causes jq mobile to enhance the new viewe coming into the dom
    });

    }]);
        app.directive("myPopupOpen", function () {
            var linkFunction = function (scope, element, attributes) {

                $(element).click(function () {
                    var popup_id = attributes["myPopupOpen"];
                    $('#' + popup_id).popup("open");
                });

            };

            return {
                restrict: "A",
                link: linkFunction
            };
        });

        app.directive('myChk', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attr, ngModel) {
                    scope.$watch(
                        function () { return ngModel.$modelValue },
                        function (newVal) {
                            var s = $(elm);
                            if (s.prop("checked") !== newVal)
                               s.prop("checked", newVal).checkboxradio('refresh');
                        }
                    );
                }
            }
        });

        app.directive("myEnhance", function () {
            var linkFunction = function (scope, element, attributes) {                
                $(element).parent().enhanceWithin();

            };

            return {
                restrict: "A",
                link: linkFunction
            };
        });



    



      /*  var lazyloadController = function (filename, ctrlname, deps) {
            var is_initialized = false;
            var ctrl_implementation = undefined;
            deps.push(
                    function (args) {
                        if (!is_initialized) {
                            $script(filename, ctrlname);
                            var parent_args = arguments;

                            $script.ready(ctrlname, function () {
                                is_initialized = true;
                                ctrl_implementation = app.controllers[ctrlname];
                                ctrl_implementation.apply(this, parent_args);
                            })

                        }
                        else
                            ctrl_implementation.apply(this, arguments);
                    }
                );
            app.controller(ctrlname, deps);

        }



        lazyloadController('js/geoCtrl.js', 'geoCtrl', ['$scope', '$rootScope']);
        lazyloadController('js/loginCtrl.js', 'loginCtrl', ['$scope', '$rootScope']);*/



    };

    app.bindEvents = function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    };
  
    app.onDeviceReady = function () {
        app.receivedEvent('deviceready');
    };

    app.receivedEvent = function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    };
    $.extend(app, angular.module("myApp", ['ngRoute', 'ngAnimate']));



    //global constants and helper functions

    app.time_zone_offset = new Date().getTimezoneOffset();

    app.GMTDTToCurrentTimeZone=function (date)
    {
        return new Date(date.getTime() - app.time_zone_offset * 60000);
    };





})(window.app = window.app || {});


