/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017

Each function takes in parameters and gives a response.

Check on the controller if the response is 200 or 400.

200 is for sucess and 400 is for error

the data structure is

response = {
    code : 200 or 400
    error (if 400) : 'error message'
    data (if 200) : JSON containing the data
}

*/

// Angular Service acting as a middleware
app.factory('MiddlewareApi', function(Database, $http, $q, $log){

    // Get api url
    var API = window.ENV.apiUrl;

    // Gets user details
    function getUserDetails(username, token){

        var response = {
            code : 200
        };

        var auth = authenticate(username, token);

        if(auth.code === 200){
            var userDetails = Database.getUser(username);

            if(userDetails !== undefined){
                response.data = {
                    userDetails : userDetails
                };
            }else{
                response.code = 400;
                response.error = 'user was not found';
            }

        }else{
            return auth;
        }

        return response;

    }

    // Logs a user in and starts a session
    function login(username, password){

        var deferred = $q.defer();

        var payload = {
            "username" : username,
            "password" : password
        };

        var url = API+'/loginUser';

        $http.post(url,payload)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data){
                deferred.reject(data);
            });

        return deferred.promise;

    }

    // Signup for user
    function signUp(username, password){

        var deferred = $q.defer();

        var payload = {
            "username" : username,
            "password" : password
        };

        var url = API+'/registerUser';

        $http.post(url, JSON.stringify(payload))
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data){
                deferred.reject(data);
            });

        return deferred.promise;

    }

    // Authenticate
    function authenticate(username, token){

        var response = {
            code : 200
        };

        if(Database.getToken(username) === token){
            response.code = 200;
        }else{
            response.code = 400;
            response.error = 'Authentication failed';
        }
        return response;
    }

    function updateSettings(username, settings, token){

        var response = {
            code : 200
        };

        var auth = authenticate(username, token);

        if(auth.code === 200){

            var userDetails = Database.getUser(username);

            if(userDetails !== undefined){
                console.log(settings);
                Database.setDetails(username, settings);
                response.code = 200;
            }else{
                response.code = 400;
                response.error = 'user was not found';
            }

        }else{
            return auth;
        }

        return response;

    }

    function addAccount(username, accountDetails, token){
        var response = {
            code : 200
        };

        var auth = authenticate(username, token);

        if(auth.code === 200){
            var userDetails = Database.getUser(username);

            if(userDetails !== undefined){

                var accountExsits = false;
                angular.forEach(userDetails.accounts, function(account, value){
                    if(accountDetails.type === account.type && accountDetails.username === account.username){
                        accountExsits = true;
                    }
                });

                if(accountExsits){
                    response.code = 400;
                    response.error = 'The account you are trying to add already exists';
                }else{
                    Database.addAccount(username, accountDetails);
                }
            }else{
                response.code = 400;
                response.error = 'user was not found';
            }

        }else{
            return auth;
        }

        return response;
    }

    function removeAccount(username, accountDetails, token){
        var response = {
            code : 200
        };

        var auth = authenticate(username, token);

        if(auth.code === 200){

            var userDetails = Database.getUser(username);

            if(userDetails !== undefined){

                var accountExsits = false;
                angular.forEach(userDetails.accounts, function(account, value){
                    if(accountDetails.type === account.type && accountDetails.username === account.username){
                        accountExsits = true;
                    }
                });
                
                if(!accountExsits){
                    response.code = 400;
                    response.error = 'Nothing to delete, Account does not exists';
                }else{
                    // Account details must contain a type and username
                    Database.removeAccount(username, accountDetails);
                }
            }else{
                response.code = 400;
                response.error = 'user was not found';
            }

        }else{
            return auth;
        }

        return response;
    }

    // Connect to instagram account 
    function connectInstagram(username){

        // Get instagram client properties
        var clientId = window.ENV.instagramClient.clientId;
        var redirectUri = window.ENV.instagramClient.redirectUri;
        var responseType = window.ENV.instagramClient.responseType;
        var scope = window.ENV.instagramClient.scope;

        // Construct a url
        var url = "https://www.instagram.com/oauth/authorize?client_id="+clientId+"&redirect_uri="+encodeURIComponent(redirectUri)+"&response_type="+responseType+"&scope="+scope;

        // Open url
        window.open(url,'_self',false);


    }

    return {
        getUserDetails : getUserDetails,
        login : login,
        signUp : signUp,
        authenticate : authenticate,
        updateSettings : updateSettings,
        addAccount : addAccount,
        removeAccount : removeAccount,
        connectInstagram : connectInstagram
    };

});