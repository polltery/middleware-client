/*
Author(s) : Balraj Singh Bains
Date : 12/01/2017
*/

// Intialise angular application
var app = angular.module('network-application', ['ngRoute']);

// Setup routes
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
    })
    
    .when("/settings", {
        templateUrl : "views/settings.html"
    });

});
