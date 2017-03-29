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
    $scope.signupUsername;
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

            MiddlewareApi.login($scope.loginUsername, $scope.loginPassword)
                .then(function(data){

                    $log.debug(data);

                    if(data.success){

                        // Set token
                        $rootScope.token = data.token;
                        
                        // Add token to localStorage
                        window.sessionStorage.setItem('socialHubUser',$scope.loginUsername);
                        window.sessionStorage.setItem('socialHubUserToken',data.token);

                        // Change view
                        $scope.changeView('/profile/'+$scope.loginUsername);
                    }else{
                        // Show error message
                        $scope.loginError = true;
                        $scope.loginErrorMessage = data.message;
                    }

                });
        }
    };

    // Sign up
    $scope.signUp = function(){

        if($scope.signupForm.$valid){

            // Initiate signup
            MiddlewareApi.signUp($scope.signupUsername)
                .then(function(data){

                    $log.debug(data);

                    if(data.success){

                        // Login the user on successful signup
                        MiddlewareApi.login($scope.signupUsername, $scope.signupPassword)
                            .then(function(data){

                                $log.debug(data);

                                if(data.success){

                                    // Set token
                                    $rootScope.token = data.token;
                                    
                                    // Add token to localStorage
                                    window.sessionStorage.setItem('socialHubUser',$scope.signupUsername);
                                    window.sessionStorage.setItem('socialHubUserToken',data.token);

                                    // Change view
                                    $scope.changeView('/profile/'+$scope.signupUsername);

                                }else{
                                    // Show error message
                                    $scope.loginError = true;
                                    $scope.loginErrorMessage = data.message;
                                }

                            });
                    }else{

                        // Show error message
                        $scope.signupError = true;
                        $scope.signupErrorMessage = data.message;
                    }

                });

        }
    };

});
