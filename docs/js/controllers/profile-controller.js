/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('profile-controller', function($scope, $rootScope, $location, MiddlewareApi, $routeParams, auth, $log){
    
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

    // Profile page variables
    $scope.username = $routeParams.username;
    $scope.description = '';
    $scope.profilePictureUrl = '';

    $scope.profileError = false;
    $scope.profileErrorMessage  = '';

    // Settings page variables
    $scope.saveButton = 'disabled';
    $scope.settingsError = false;
    $scope.settingsErrorMessage = '';
    $scope.settingsSuccess = false;
    $scope.settingsSuccessMessage = '';

    $scope.addAccountError = false;
    $scope.addAccountErrorMessage = '';
    $scope.addAccountType = 'twitter';
    $scope.addAccountSuccess = false;
    $scope.addAccountSuccessMessage = '';
    $scope.accounts = [];
    $scope.addAccountUsername = '';

    if(!auth){
        $scope.changeView('/login');
    }else{

        // Get user details from the server
        response = MiddlewareApi.getUserDetails($scope.username, $rootScope.token);
    
        $log.debug(response);

        if(response.code === 200){

            // load user variables
            $scope.description = response.data.userDetails.details.description;
            $scope.profilePictureUrl = response.data.userDetails.details.profilePictureUrl;
            $scope.accounts = response.data.userDetails.accounts;

        }else{

            $scope.profileErrorMessage = response.error;

        }

    }

    $scope.enableSaveButton = function(){
        $scope.saveButton = '';
    };

    $scope.saveSettings = function(){

        if($scope.saveButton !== 'disabled'){
            settings = {
                description : $scope.description,
                profilePictureUrl : $scope.profilePictureUrl
            };

            response = MiddlewareApi.updateSettings($scope.username, settings, $rootScope.token);

            $log.debug(response);

            if(response.code === 200){
                $scope.settingsSuccess = true;
                $scope.settingsSuccessMessage = 'Settings updated successfully';
            }else{
                $scope.settingsError = true;
                $scope.settingsErrorMessage = response.error;
            }
        }

    };

    $scope.closeSettingsError = function(){
        $scope.settingsError = false;
    };

    $scope.closeSettingsSuccess = function(){
        $scope.settingsSuccess = false;
    };

    $scope.addAccount = function(){

        if($scope.addAccountUsername === ''){
            $scope.addAccountError = true;
            $scope.addAccountErrorMessage = 'Please add a username';
        }else{
            accountDetails = {
                type : $scope.addAccountType,
                username : $scope.addAccountUsername
            };
            
            console.log(accountDetails);

            var response = MiddlewareApi.addAccount($scope.username, accountDetails, $rootScope.token);

            $log.debug(response);

            if(response.code === 200){
                $scope.addAccountSuccess = true;
                $scope.addAccountSuccessMessage = 'Account added successfully';
            
            }else{
                $scope.addAccountError = true;
                $scope.addAccountErrorMessage = response.error;
            }
        }
    };

    $scope.closeAddAccountError = function(){
        $scope.addAccountError = false;
    };

    $scope.closeAddAccountSuccess = function(){
        $scope.addAccountSuccess = false;
    };

    $scope.removeAccount = function(type,username){
        accountDetails = {
            type : type,
            username : username
        };

        var response = MiddlewareApi.removeAccount($scope.username, accountDetails, $rootScope.token);

        $log.debug(response);

        if(response.code === 200){

        }else{

        }
    };

});
