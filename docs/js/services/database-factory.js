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
            description : 'example description',
            theme : 'default'
        },
        accounts : [
            {
                type : 'twitter',
                username : 'exampleTwitter',
                feeds : [
                    {
                        tweet : 'Example tweet 1',
                        timestamp : '29/11/2019',
                        type : 'text',
                        likes : 20
                    },{
                        tweet : 'Example tweet 2',
                        timestamp : '11/11/2011',
                        type : 'video',
                        source : 'http://techslides.com/demos/sample-videos/small.mp4',
                        sourceType : 'video/mp4',
                        likes : 5
                    },{
                        tweet : 'Example tweet 3',
                        timestamp : '23/03/2013',
                        type : 'image',
                        source : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fernando_Alonso_and_Sergio_Perez_2012_Malaysia.jpg/540px-Fernando_Alonso_and_Sergio_Perez_2012_Malaysia.jpg',
                        likes : 3
                    }
                ]
            },
            {
                type : 'instagram',
                username : 'exampleInstagram',
                feeds : [
                    {
                        type : 'image',
                        source : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fernando_Alonso_and_Sergio_Perez_2012_Malaysia.jpg/540px-Fernando_Alonso_and_Sergio_Perez_2012_Malaysia.jpg',
                        timestamp : '29/11/2013',
                        caption : 'My new car',
                        likes : 4
                    },{
                        type : 'image',
                        source : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Replica_of_Auburn_Speedster_-_001.jpg/540px-Replica_of_Auburn_Speedster_-_001.jpg',
                        timestamp : '29/11/2011',
                        caption : 'My old car',
                        likes : 5
                    },{
                        type : 'image',
                        source : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Austin_Six_Saloon_(1932)_GS3184_5902656341.jpg/540px-Austin_Six_Saloon_(1932)_GS3184_5902656341.jpg',
                        timestamp : '29/11/2012',
                        caption : 'My new-old car',
                        likes : 123
                    }
                ]
            }
        ]
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
                description : 'No description available',
                theme : 'default'
            },
            accounts : []
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
                    profilePictureUrl : details.profilePictureUrl,
                    theme : details.theme
                };
            }
        });
        $log.debug(users);
    }

    function addAccount(username, accountsDetails){
        angular.forEach(users, function(user,value){
            if(username === user.username){
                user.accounts.push({
                    type : accountsDetails.type,
                    username : accountsDetails.username
                });
            }
        });
        $log.debug(users);
    }

    function removeAccount(username, accountsDetails){
        angular.forEach(users, function(user,value){
            if(username === user.username){
                i = 0;
                var delete_id;
                angular.forEach(user.accounts, function(account, value){
                    if(account.username == accountsDetails.username && account.type == accountsDetails.type){
                        delete_id = i;
                    }
                    i++;
                });
                delete user.accounts[delete_id];
            }
        });
        $log.debug(users);
    }
    
    return {
        addUser : addUser,
        getUser : getUser,
        setToken : setToken,
        getToken : getToken,
        setDetails : setDetails,
        addAccount : addAccount,
        removeAccount : removeAccount
    };

});