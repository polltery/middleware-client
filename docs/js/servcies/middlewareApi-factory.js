/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

// Angular Service for communicating with the middleware
app.factory('MiddlewareApi', function(){

    function getUser(){
        var user = {
            username : 'passionateCat243',
            description : 'I am a very passionate cat. When I am not passionate I meow.',
            profilePictureURL : 'http://d39kbiy71leyho.cloudfront.net/wp-content/uploads/2016/05/09170020/cats-politics-TN.jpg'
        };

        return user;
    }

    return {
        getUser : getUser
    };

});