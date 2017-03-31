/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('index-controller', function($rootScope, $scope, $location){

    // Redirect on auth failure
    $scope.$on("$routeChangeError", function(evt,current,previous,rejection){
        $scope.changeView('/login');
    });

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