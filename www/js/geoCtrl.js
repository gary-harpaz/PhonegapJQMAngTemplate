app.controller('geoCtrl', ['$scope', '$rootScope','$q',
            function ($scope, $rootScope,$q) {
                /*  console.log('geoCtrl');*/
                $scope.getCurrentPosition = function () {
                    navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $.extend($scope, position.coords);
                        $scope.timestamp = position.timestamp;
                        $scope.error_code = "";
                        $scope.error_message = "";
                    }
                    , function (positionErrorCallback) {
                        $scope.error_code = positionErrorCallback.code;
                        $scope.error_message = positionErrorCallback.message;
                    }
                  );
                }
                $scope.options = {
                    high_accuracy: true,
                    timeout: 2000

                };
                $scope.edit_options = $.extend({}, $scope.options);
                $scope.poisitions = [];

                $scope.measureposition = function () {
                  /*  var options = {
                        timeout: $scope.options.timeout,
                        enableHighAccuracy: $scope.options.high_accuracy
                    };
                    var result = {};
                    //$scope.poisitions.push(result);
                    // result.timestamp = 14;
                    $scope.poisitions.push(result);
                    navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $.extend(result, position.coords);
                        result.timestamp = position.timestamp;
                        result.error_code = undefined;
                        result.error_message = undefined;


                    }
                    , function (positionErrorCallback) {
                        result.error_code = positionErrorCallback.code;
                        result.error_message = positionErrorCallback.message;
                    },
                    options
                  );*/





                    var options = {
                        timeout: $scope.options.timeout,
                        enableHighAccuracy: $scope.options.high_accuracy
                    };
                    var result = {};
                    //var deferred = $q.defer();

                    var done = false;

                    return
                     new $q(function (resolve, reject) {
                        // perform some asynchronous operation, resolve or reject the promise when appropriate.
                        navigator.geolocation.getCurrentPosition(
                   function (position) {
                       console.log('1');
                       $.extend(result, position.coords);
                       result.timestamp = position.timestamp;
                       result.error_code = undefined;
                       result.error_message = undefined;
                       done = true;


                   }
                   , function (positionErrorCallback) {
                       console.log('2');
                       result.error_code = positionErrorCallback.code;
                       result.error_message = positionErrorCallback.message;
                       done = true;
                   },
                   options
                 );
                        var number = setInterval(function () {
                            if (pollStatus > 0) {
                                resolve(polledValue);
                            } else if (pollStatus < 0) {
                                reject(polledValue);
                            } else {
                                pollStatus = pollAgain(function (value) {
                                    console.log('3');
                                    polledValue = value;
                                    if (!done)
                                        return 0;
                                    else
                                        return 1;
                                });
                            }
                        }, 10000);
                    }).
                      then(function (value) {
                          // handle success
                          console.log('4');
                          $scope.poisitions.push(result);
                      }, function (reason) {
                          console.log('5');
                          // handle failure
                      });

                     $rootScope.apply();

                };






                $scope.getslide = function () {
                    //  console.log('geoCtrl')
                    return $rootScope.slide;

                };
                $scope.high_accuracy = true;
                $scope.timeout = 2000;



                $scope.settings = function () {
                    $.extend($scope.edit_options, $scope.options);
                }
                $scope.settings_ok = function () {
                    $.extend($scope.options, $scope.edit_options);
                }

            }
])