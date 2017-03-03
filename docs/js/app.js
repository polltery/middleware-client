/*
Author(s) : Balraj Singh Bains
Date : 12/01/2017
*/

// Intialise angular application
var app = angular.module('network-application', ['ngRoute']);

// Setup routes (config -> run) 
app.config(function($routeProvider, $sceDelegateProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "views/overview.html",
        controller: "overview-controller"
    })
    
    .when("/login", {
        templateUrl : "views/login.html",
        controller: "login-controller"
    })
    
    .when("/profile/:username", {
        templateUrl : "views/profile.html",
        controller: "profile-controller",
        resolve : {
            auth : function($rootScope, MiddlewareApi, $route, $log){
                    response = MiddlewareApi.authenticate($route.current.params.username,$rootScope.token);
                    $log.debug(response);
                    if(response.code === 200){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
    })

    .when("/settings/:username", {
        templateUrl : "views/settings.html",
        controller: "profile-controller",
        resolve : {
            auth : function($rootScope, MiddlewareApi, $route, $log){
                    response = MiddlewareApi.authenticate($route.current.params.username,$rootScope.token);
                    $log.debug(response);
                    if(response.code === 200){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
    });

    // Whitelist some urls for video playback
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://techslides.com/demos/sample-videos/**'
    ]);


});

app.run(function($rootScope){

    // Set base variables
    $rootScope.token = '';

});
