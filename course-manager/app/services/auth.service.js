(function(){

    angular
    .module('courseApp')
    .service('AuthService', AuthService);
    
    function AuthService(){
    
        var isAuthenticated = false;
        
        this.login = function(username, password) {
        if(username === 'admin' && password === 'admin') // Mock authentication, replace with real API call
            {
            isAuthenticated = true;
            return true;
            }
            return false;
        };
        
        this.logout = function(){
            isAuthenticated = false; // API call to logout can be made here
        };
        
        this.isLoggedIn = function(){
            return isAuthenticated;
        };
    
    }

})();