/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

// A dummy database servcie for middleware api
app.factory('Database', function(){

    var users = [];

    // Sets a session for a user
    function setSession(username, token){
        angular.forEach(users, function(user,value){
            if(username === user.username){
                user.token = token;
            }
        });
    }

    // Gets a session for a user
    function getSession(username, token){
        var userToken;
        angular.forEach(users, function(user,value){
            if(username === user.username){
                userToken = user.token;
            }
        });
        return userToken;
    }

    // Adds a new user given username and password
    function addUser(username, password){
        users.push({
            username : username,
            password : password,
            token : '',
            details : {
                profilePictureUrl : 'https://pixabay.com/photo-42914/',
                description : ''
            }
        });
    }

    // Returns userdetails of the given user
    function getUser(username){
        var userDetails;
        angular.forEach(users, function(user,value){
            if(username === user.username){
                userDetails = user;
            }
        });
        return userDetails;
    }

    // Update a user given username
    function updateUser(username, newDetails){
        angular.forEach(users, function(user,value){
            if(username === user.username){
                user.username = newDetails.username;
                user.password = newDetails.password;
            }
        });
    }
    
    return {
        addUser : addUser,
        getUser : getUser,
        updateUser : updateUser,
        setSession : setSession,
        getSession : getSession
    };

});