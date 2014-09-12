app.controller('geoCtrl', ['$scope', '$rootScope',
            function ($scope, $rootScope) {
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
                $scope.getslide = function () {
                    //  console.log('geoCtrl')
                    return $rootScope.slide;

                }
                $scope.stam = "dsg f dsf ds dg";
             
            }
])