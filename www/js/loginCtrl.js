


app.controller('loginCtrl', ['$scope', '$rootScope',
            function ($scope, $rootScope) {
               /* console.log('loginCtrl');*/
                $scope.getCurrentPosition = function () {
                }
                $scope.getslide = function () {
                    return $rootScope.slide;

                }
            }
]);