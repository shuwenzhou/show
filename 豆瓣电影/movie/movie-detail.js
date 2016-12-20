(function () {
    var appDetail = angular.module("app.movieDetail",[]);
    appDetail.controller("movieDetailCon",function ($scope,$rootScope,UrlConfig,$routeParams,$http) {
        var movieId = $routeParams.movieId;
        var fullUrl = UrlConfig.appURL+"subject/"+movieId+"?callback=movieDetailCallBack";

        $http.jsonp(fullUrl).success(function () {
            console.log("请求成功")
        });
        window.movieDetailCallBack = function (jsonData) {
            console.log(jsonData);
            $scope.movie = jsonData
        };
        $rootScope.navTitle = '电影详情'
    })
}());