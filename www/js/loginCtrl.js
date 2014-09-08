
/*console.log('loginCtrl loaded')*/
app.controllers["loginCtrl"] = function ($scope, $rootScope) {
    console.log('loginCtrl');
    $scope.getCurrentPosition = function () {
    }
    $scope.getslide = function () {
        return $rootScope.slide;

    }
};