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




                    var options = {
                        timeout: $scope.options.timeout,
                        enableHighAccuracy: $scope.options.high_accuracy
                    };
                    
                    var deferred = $q.defer();


                    navigator.geolocation.getCurrentPosition(
                  function (position) {                      
                      var result = {};
                      $.extend(result, position.coords);


                 
                      //                      var dt=app.GMTDTToCurrentTimeZone(new Date(position.timestamp));
                      var pad = "00";
                      var dt = new Date(position.timestamp);
                      var h = (dt.getHours() + 1).toString();                      
                      h = pad.substring(0, pad.length - h.length) + h;
                      var m = dt.getMinutes().toString();
                      m = pad.substring(0, pad.length - m.length) + m;
                      var s = dt.getSeconds().toString();
                      s = pad.substring(0, pad.length - s.length) + s;
                      var ms = dt.getMilliseconds().toString();
                      pad = "000";
                      ms = pad.substring(0, pad.length - ms.length) + ms;
                      result.timestamp = h + ":" + m + ":" + s + "." + ms;

                      result.error_code = undefined;
                      result.error_message = undefined;
                      deferred.resolve(result);
                      


                  }
                  , function (positionErrorCallback) {
                      var result = {};                      
                      result.error_code = positionErrorCallback.code;
                      result.error_message = positionErrorCallback.message;
                      deferred.resolve(result);
                      
                  },
                  options
                );
                    deferred.promise.then(function (value) {                        
                        $scope.poisitions.push(value);

                    });
                    

                    
              

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