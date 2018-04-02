/*Base variables initialized*/
var app = angular.module("myApp", ["ngRoute","ngCookies"]);
var hostUrl = window.location.protocol + '//' + window.location.host;
var viewsUrl = "/static/playlist/views";

/*Token Verification during Http Request*/
app.config(function($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName ='X-CSRFToken';
});

/*Default {{}} changes to [[]] so that Django and Angular Brackets do not clash.*/
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

/*Declaration of different views*/
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : viewsUrl + '/login.html',
        controller: 'loginController'
    })
    .when("/dashboard/:user_id", {
        templateUrl: viewsUrl +'/dashboard.html',
        controller: 'dashboardController'

    })
    .when("/playlist/:p_id", {
        templateUrl : viewsUrl + '/particular-playlist.html',
        controller :'activePlaylistController'
    })
    
    .otherwise({
        redirectTo : '/' 
    });
});