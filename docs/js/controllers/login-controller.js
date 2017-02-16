/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('login-controller', function($scope, $location, $rootScope, MiddlewareApi, $log){
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        $location.path(view);
    };

    // Form variables
    $scope.loginUsername;
    $scope.loginPassword;
    $scope.signupUsernam;
    $scope.signupPassword;

    // Error variables
    $scope.loginError = false;
    $scope.signupError = false;

    $scope.closeLoginError = function(){
        $scope.loginError = false;
    };

    $scope.closeSignupError = function(){
        $scope.signupError = false;
    };

    // Login
    $scope.login = function(){

        if($scope.loginForm.$valid){

            // Get a login response
            response = MiddlewareApi.login($scope.loginUsername, $scope.loginPassword);

            $log.debug(response);

            if(response.code === 200){
                $rootScope.token = response.data.token;
                $scope.changeView('/profile/'+$scope.loginUsername);
            }else{
                $scope.loginError = true;
                $scope.loginErrorMessage = response.error;
            }

        }
    };

    // Sign up
    $scope.signUp = function(){

        if($scope.signupForm.$valid){

            // Get a response
            response = MiddlewareApi.signUp($scope.signupUsername, $scope.signupPassword);

            $log.debug(response);

            if(response.code === 200){
                $rootScope.token = response.data.token;
                $scope.changeView('/profile/'+$scope.signupUsername);
            }else{
                $scope.signupError = true;
                $scope.signupErrorMessage = response.error;
            }

        }
    };

});
