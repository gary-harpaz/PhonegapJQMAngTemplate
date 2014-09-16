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
                $scope.options = {
                    high_accuracy: true,
                    timeout:2000

                };
                $scope.edit_options = $.extend({}, $scope.options);
                $scope.getslide = function () {
                    //  console.log('geoCtrl')
                    return $rootScope.slide;

                }
                $scope.high_accuracy = true;
                $scope.timeout = 2000;

                

                $scope.settings = function ()
                {
                    $.extend($scope.edit_options, $scope.options);
                    if ($scope.edit_options.high_accuracy)
                        $('#hacc').prop("checked", true).checkboxradio('refresh');
                    else
                        $('#hacc').prop("checked", false).checkboxradio('refresh');;
                    
                    $('#popupDialog').popup("open");
                    //$('#popupDialog-popup').popup("open");
                    
                }
                $scope.settings_ok = function ()
                {
                    $.extend($scope.options, $scope.edit_options);
                }
             
            }
])