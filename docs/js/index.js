/*
Author(s) : Balraj Singh Bains
Date : 12/01/2017
*/

var app = angular.module('network-application', ['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "views/overview.html"
    })
    
    .when("/login", {
        templateUrl : "views/login.html"
    })
    
    .when("/profile", {
        templateUrl : "views/profile.html"
    });

});

app.controller('index-controller', function($rootScope, $scope, $location){
    
    $rootScope.isOverview = true;
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };

});

app.controller('overview-controller', function($scope, $location, $rootScope){
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };
});

app.controller('login-controller', function($scope, $location, $rootScope){
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };
});

app.controller('profile-controller', function($scope){
    $scope.username = "username";
        $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };
});