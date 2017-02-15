/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

// A dummy database servcie for middleware api
app.factory('Database', function($log){

    var users = [{
        username: 'example',
        password: 'example',
        token : '',
        details : {
            profilePictureUrl : 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png',
            description : 'example description'
        }
    }];

    // Sets a token for a user
    function setToken(username, token){
        angular.forEach(users, function(user,value){
            if(username === user.username){
                user.token = token;
            }
        });
    }

    // Gets a token for a user
    function getToken(username){
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
                profilePictureUrl : 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png',
                description : 'No description available'
            }
        });
        
        $log.debug(users);
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

    // Set details of a user
    function setDetails(username, details){
        angular.forEach(users, function(user,value){
            if(username === user.username){
                user.details = {
                    description : details.description,
                    profilePictureUrl : details.profilePictureUrl
                };
            }
        });
    }
    
    return {
        addUser : addUser,
        getUser : getUser,
        setToken : setToken,
        getToken : getToken,
        setDetails : setDetails
    };

});