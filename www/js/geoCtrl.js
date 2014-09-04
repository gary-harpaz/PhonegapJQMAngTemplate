﻿
app.controller("geoCtrl", function ($scope) {
    $scope.getCurrentPosition = function () {
        navigator.geolocation.getCurrentPosition(
        function (position) {
            $.extend($scope, position.coords);
            $scope.timestamp = position.timestamp;
            $scope.error_code = "";
            $scope.error_message = "";
        },
        function (positionErrorCallback) {
            $scope.error_code = positionErrorCallback.code;
            $scope.error_message = positionErrorCallback.message;
        }
        );

    };



});