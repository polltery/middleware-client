/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('profile-controller', function($scope, $rootScope, $location, MiddlewareApi){
    
    var userDetails = MiddlewareApi.getUserDetails();

    if(userDetails === undefined){
        userDetails = {
            username : 'exampleUsername',
            description : 'example description',
            profilePictureUrl : 'example'
        };
    }

    // user variables
    $scope.username = userDetails.username;
    $scope.description = userDetails.description;
    $scope.profilePictureUrl = userDetails.profilePictureUrl;
    
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };
});
