/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('settings-controller', function($scope, $rootScope, $location, MiddlewareApi){
   
    // user variables
    $scope.username = MiddlewareApi.getUser().username;
    $scope.description = MiddlewareApi.getUser().description;
    $scope.profilePictureURL = MiddlewareApi.getUser().profilePictureURL;
    
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };
});