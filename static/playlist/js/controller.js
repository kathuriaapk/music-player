app.controller('mainController', function($scope, $rootScope, $http, $cookies,$location){
    $rootScope.login_id = $cookies.get('login_id');
    if ($rootScope.login_id != undefined){
        $rootScope.login = true;
    } else {
        $rootScope.login = false;
    }
    
    $scope.logout = function(){
        $http({
            method:'GET',
                url: '/logout/',
        }).then(function successCallback(response) {
            $scope.status = response;
            $cookies.remove('login_id');
            $rootScope.login = false;
            $location.path('/');
        }, function errorCallback(response){          

        });
    }
});

app.controller('loginController', function($scope,$rootScope,$cookies, $http,$location){
    if ($rootScope.login != true) {
        $scope.loginData = {};
        $scope.login = function(log_data){
            $http({
                method:'POST',
                url: hostUrl + '/login/',
                headers:'{ ContentType : application/x-www-form-urlencoded}',
                data:log_data
            }).then(function successCallback(response) {
                $scope.user = response.data;
                $cookies.put('login_id', $scope.user);
                $rootScope.login_id = $scope.user;
                $rootScope.login = true;
                $location.path('/dashboard/' + $rootScope.login_id);
            }, function errorCallback(response){          

            });
        }
    } else {
        $location.path('/dashboard/' + $rootScope.login_id);
    }

});

app.controller('dashboardController', function($scope,$rootScope,$http,$route,$location){
    if ($rootScope.login == true) {
        current_view = $location.path();
        $http({
            method:'GET',
            url: hostUrl + '/api/playlist/',
        }).then(function successCallback(response) {
            $scope.userPlaylist = response.data;
            console.log($scope.userPlaylist.keys())            
        }, function errorCallback(response){

        });
        
        $http({
            method:'GET',
            url: hostUrl + '/api/songlist/',
        }).then(function successCallback(response) {
            $scope.songList = response.data;
            
        }, function errorCallback(response){


        });
    
        $scope.remove_playlist = function(p_id){
            $http({
                method:'DELETE',
                url: hostUrl + '/api/playlist/'+ p_id,
            }).then(function successCallback(response) {
                $route.reload();
                
            }, function errorCallback(response){

            });
        }

        $scope.create_playlist = function(p_name){
            $scope.new_playlist = {};
            $scope.new_playlist['name'] = p_name; 
            $scope.new_playlist['user'] = 2; 
                                    
            $http({
                method:'POST',
                url: hostUrl + '/api/playlist/',
                headers:'{ ContentType : application/json}',
                data:$scope.new_playlist,
            }).then(function successCallback(response) {
                    $route.reload();
            }, function errorCallback(response){

            });
        }
        $scope.song_add = function(p_id, song_id){
            $http({
                method:'PATCH',
                url:  hostUrl + '/api/playlist/'+ p_id + '/',
                headers:'{ ContentType : application/json}',
                data:{newSong:song_id},
            }).then(function successCallback(response) {
            }, function errorCallback(response){

            });
        }
    } else {
        $location.path('/');
    }
});

app.controller('activePlaylistController', function($scope,$rootScope,$cookies, $http, $route, $location, $routeParams){
    if ($rootScope.login == true) {
        $scope.host = hostUrl;
        $scope.currentPlaylist = $routeParams.p_id;
        $http({
            method:'GET',
            url: hostUrl + '/api/playlistsongs/' + $scope.currentPlaylist + '/',
        }).then(function successCallback(response) {
            $scope.playlistSongs = response.data;
        }, function errorCallback(response){          

        });
        $scope.remove_song = function(song_id){
            $http({
                method:'PATCH',
                url: hostUrl + '/api/playlist/' + $scope.currentPlaylist + '/' ,
                headers: '{ ContentType : application/json }',
                data : {removeSong:song_id}
            }).then(function successCallback(response) {
                $route.reload();
            }, function errorCallback(response){          

            });
        }

    } else {
        $location.path('/');
    }
});