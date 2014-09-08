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
        //disable jquery moile navigation




        app.config(['$routeProvider', function ($routeProvide) {
            $routeProvide
             /*   
             This is a sample of using routes with parameters
             .when('/view/:name', { templateUrl: '/template/view.html', controller: viewCtrl })
                .when('/view/message/:name', { templateUrl: '/template/message.html', controller: messageCtrl })*/
                .when('/', { templateUrl: 'views/GeoView.html', controller: 'geoCtrl' })
                .when('/login', { templateUrl: 'views/LoginView.html', controller: 'loginCtrl' })
            //  .when('/Geo', { templateUrl: 'views/GeoView.html', controller: 'geoCtrl' })
        }])
        //global event handler  
        .run(function ($rootScope, $window) {
            $rootScope.slide = 'slide-left';

            /*        $rootScope.$on('$routeChangeStart', function () {*/
            /* $rootScope.$on('$locationChangeStart', function () {*/
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
    app.controllers = {};








})(window.app = window.app || {});


