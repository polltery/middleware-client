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
app.factory('MiddlewareApi', function($http, $q, $log){

    // Get api url
    var API = window.ENV.apiUrl;

    // Gets user details
    function getUserDetails(username){

        var deferred = $q.defer();

        // Get token
        var token = window.sessionStorage.getItem("socialHubUserToken");

        var url = API+'/userDetails/'+username+'?token='+token;

        $http.get(url)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data){
                deferred.reject(data);
            });

        return deferred.promise;

    }

    // Logs a user in and starts a session
    function login(username, password){

        var deferred = $q.defer();

        var payload = {
            username : username,
            password : password
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
            username : username,
            password : password
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
    function authenticate(username){
        var deferred = $q.defer();

        // Get token
        var token = window.sessionStorage.getItem("socialHubUserToken");

        var payload = {
            username : username,
            token : token
        };

        var url = API+'/authenticate';

        $http.post(url, JSON.stringify(payload))
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data){
                deferred.reject(data);
            });

        return deferred.promise;
    }

    function updateSettings(username, settings){
        var deferred = $q.defer();

        var payload = {
            details: settings
        };

        // Get token
        var token = window.sessionStorage.getItem("socialHubUserToken");

        var url = API+'/userDetails/'+username+'?token='+token;

        $http.put(url, JSON.stringify(payload))
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data){
                deferred.reject(data);
            });

        return deferred.promise;
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
        connectInstagram : connectInstagram
    };

});