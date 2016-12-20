var app = angular.module("app",["ngRoute","app.movieList","app.movieDetail","ui.bootstrap"]);
//自定义指令配置
app.directive('selectLink', function () {
    var item=[];
   return function (scope, element, attr) {
       item.push(element);
       //console.log(item);
       element.bind("click",function () {
           //item.parent().removeClass("active");
           item.forEach(function (e) {
               e.parent().removeClass("active")
           });
           element.parent().addClass("active");
       })
   }
});
// 路由配置
app.config(function ($routeProvider) {
    // 参数     /:tape    表示参数
    $routeProvider.when("/detail/:movieId",{
        templateUrl: "movie/movie-detail.html",
        controller: "movieDetailCon"
    }).when('/:type/:page?',{
        templateUrl: "movie/movie-list.html",
        controller: "movieListCon"
    }).otherwise({
        redirectTo: "/in_theaters/1 "
    })
});
app.constant('UrlConfig',{
    page_size:10,
    appURL : "https://api.douban.com/v2/movie/"
});
console.log(12);
