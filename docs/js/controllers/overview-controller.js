/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('overview-controller', function($scope, $location, $rootScope){
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $rootScope.token = '';
        $location.path(view);
    };
});