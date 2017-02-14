/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

// Angular Service acting as a middleware
app.factory('MiddlewareApi', function(Database){

    // Gets user details
    function getUserDetails(username, token){
        if(token === Database.getSession(username)){
            return Database.getUser(Database.getUser(username));
        }else{
            return false;
        }
    }

    // Logs a user in and starts a session
    function login(username, password){
        var userDetails = Database.getUser(username);
        if(userDetails.password === password){
            Database.setSession(username,'online');
            return true;
        }else{
            return false;
        }
    }

    // Signup for user
    function signUp(username, password){
        Database.addUser(username,password);
        return login(username,password);
    }

    // Sign out
    function signOut(username, token){
        if(token === Database.getSession(username)){
            Database.setSession(username, '');
            return true;
        }else{
            return false;
        }
    }

    return {
        getUserDetails : getUserDetails,
        login : login,
        signUp : signUp,
        signOut : signOut
    };

});