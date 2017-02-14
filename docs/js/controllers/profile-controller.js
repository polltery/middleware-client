/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('profile-controller', function($scope, $rootScope, $location, MiddlewareApi, $routeParams, auth){
    
    // Changes the current view
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        if(view === '/settings' || view === '/profile'){
            $location.path(view+'/'+$routeParams.username);
        }else{
            $location.path(view);
        }
    };

    $scope.username = $routeParams.username;
    $scope.description = '';
    $scope.profilePictureUrl = '';

    if(!auth){
        console.log('Auth failed');
        $scope.changeView('/login');
    }else{

        // Get user details from the server
        userDetails = MiddlewareApi.getUserDetails($scope.username, $rootScope.token);
    
        // load user variables
        $scope.description = userDetails.description;
        $scope.profilePictureUrl = userDetails.profilePictureUrl;
    }

});
