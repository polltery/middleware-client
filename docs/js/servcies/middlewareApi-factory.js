/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

// Angular Service acting as a middleware
app.factory('MiddlewareApi', function(Database){

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

        var response = {
            code : 200
        };

        var userDetails = Database.getUser(username);

        // Check if user exists
        if(userDetails !== undefined){

            // check password if user exists
            if(userDetails.password === password){
                Database.setToken(username,'online');
                response.data = {
                    token : 'online'
                };

            }else{
                response.code = 400;
                response.error = 'Invalid password';
            }

        }else{
            response.code = 400;
            response.error = 'User not found';
        }
        return response;
    }

    // Signup for user
    function signUp(username, password){

        var response = {
            code : 200
        };

        // Check if user is new
        if(Database.getUser(username) !== undefined){

            response.code = 400;
            response.error = 'User already exists';

        }else{

            // Add a new user
            Database.addUser(username,password);

            // login the user
            Database.setToken(username,'online');
            response.data = {
                token : 'online'
            };
        
        }

        return response;
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

    return {
        getUserDetails : getUserDetails,
        login : login,
        signUp : signUp,
        authenticate : authenticate,
        updateSettings : updateSettings
    };

});