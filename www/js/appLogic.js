(function (app, undefined) {

    function route_factory(hash2, templateUrl, controller,selector) {
        this.hash = hash2;
        this.route_info = {
            templateUrl: templateUrl,
            controller: controller
        }
        this.is_selected = false;
        this.selector = selector;

        this.activate = function () {
            if (selector)
            {
                $(selector).addClass('ui-btn-active');
            }
        };
        this.deactivate = function () {
            if (selector)
            {
                $(selector).removeClass('ui-btn-active');
            }
        };

    }

    var nav_routes = [];
    app.nav_routes = nav_routes;


    nav_routes.push(new route_factory('/', 'views/GeoView.html', 'geoCtrl','#navGeolocaion'));
    nav_routes.push(new route_factory('/login', 'views/LoginView.html', 'loginCtrl','#navLogin'));
    
    var nav_by_controller = [];
    for (var i = 0; i < nav_routes.length; i++) {
        var route = nav_routes[i];
        nav_by_controller[route.route_info.controller] = route;

    }

 
    app.routeChangeSuccess = function (evData, newRoute, prevRoute) {
        /*console.log('route change succcess ' + $location.hash());
        $rootScope.header = "root header";*/
        if (prevRoute && prevRoute.$$route && prevRoute.$$route.controller) {
            var route_obj = nav_by_controller[prevRoute.$$route.controller];
            if (route_obj) {
                route_obj.deactivate();
            }

        }
        if (newRoute && newRoute.$$route && newRoute.$$route.controller)
        {      
            var route_obj = nav_by_controller[newRoute.$$route.controller];            
            if (route_obj)
            {
                route_obj.activate();
            }                
            else
                console.log('not found');
        
        }        
    }

})(window.app = window.app || {});