/*
Author(s) : Balraj Singh Bains
Date : 12/01/2017
*/

// Intialise angular application
var app = angular.module('network-application', ['ngRoute']);

// Setup routes (config -> run) 
app.config(function($routeProvider, $sceDelegateProvider) {

    // For default example purposes we store a username in the sessionStorage
    // save user in session storage (read more here https://www.w3schools.com/html/html5_webstorage.asp)
    window.sessionStorage.setItem('socialHubUser','example');

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
    })
    
    .when("/:access_token",{
        resolve : {
            catchToken : function($log, $route, $location){
                // apply regex on string to get the token
                var instagramAccessToken = $route.current.params.access_token.split(/access_token=/i);
                // String is split, and token is stored in instagramAccessToken[1]
                $log.debug(instagramAccessToken[1]);
                // Get the username from cache to set redirect path
                var username = window.sessionStorage.getItem('socialHubUser');
                // #TODO : Send token to backend
                $location.path('/profile/'+username);
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
