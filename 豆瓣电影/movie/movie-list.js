//数据解析  配置到界面
(function () {
    var appList = angular.module("app.movieList",[]);
    appList.controller("movieListCon",function ($scope,$rootScope,UrlConfig,$http,$routeParams,$route) {
    //    配置网络访问 参数 url count

        var count = UrlConfig.page_size;
        var url = UrlConfig.appURL;
        var type = $routeParams.type || "in_theaters";
        var page = $routeParams.page || 1;
        //console.log(page);
        $scope.currentPage = parseInt(page);
        //$scope.currentPage = page;
        $scope.size = count;
        $scope.loading = true;
        var newPage = (page-1)*count;
    //    url 的拼接
        if (type.indexOf("search") !== -1) {
            var fullUrl= url+type+"?q="+text+"count"+count+"&start="+newPage +"&callback=movieListCallBack";
            console.log(fullUrl);
        }
        fullUrl = url+type+"?count"+count+"&start="+newPage+"&callback=movieListCallBack";

    //   请求数据
        $http.jsonp(fullUrl).error(function () {
            console.log("请求失败")
        });

        window.movieListCallBack = function (jsonData) {
            console.log(jsonData);
            $scope.title = jsonData.title;
            $scope.total = jsonData.total;
            $scope.page = Math.round($scope.total/count+0.5);
            $scope.movies = jsonData.subjects;
            $scope.loading = false;

        };
         $rootScope.navTitle = "电影列表";
        $scope.$watch("currentPage", function (newV, oldV) {
            console.log(newV,oldV);
            //$scope.flag = true;
            if (newV !== oldV ) {
                $route.updateParams({
                    page:newV
                });
                //$routeParams.page=newV
                //var page = $routeParams.page ||1;
                //var newPage = (page-1)*count;
                //var fullUrl = url+type+"?count="+count+"&start="+newPage+"&callback=movieListCallBack";
                //$http.jsonp(fullUrl)
            }
        })
    })

}());

