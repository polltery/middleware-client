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
    });

});

app.controller('overview-controller', function($scope, $location){
    $scope.changeView = function(view){
        $location.path(view);
    };
});

app.controller('login-controller', function($scope, $location){
    $scope.changeView = function(view){
        $location.path(view)
    };
});