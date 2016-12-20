// 轮播图
(function () {
    window.onload = function () {
        var lunBoWidth = document.querySelector(".lunBox li").offsetWidth;
        var lunBox = document.querySelector(".lunBox");
        var imgBox = document.querySelector(".img-box");
        var icon1 = document.querySelector(".icon1");
        var icon2 = document.querySelector(".icon2");
        var index = document.querySelector(".index-li");
        var allLi = document.querySelectorAll(".index-li>li");
        var boundary = -lunBox.offsetWidth + lunBoWidth;
        var time1, time2, time3;
        var leaber = 0, liIndex = 0;
        var target = lunBoWidth;
        var imgLeft;
        var bestIndex = lunBox.offsetWidth / target - 1;
        time2 = setTimeout(function () {
            time1 = setInterval(rollBody, 20);
        }, 2000);
        //自动滚动
        function rollBody() {
            icon(false)
        }

        imgBox.addEventListener("mouseover", function () {
            icon1.style.display = "block";
            icon2.style.display = "block";
        });
        imgBox.addEventListener("mouseout", function () {
            icon1.style.display = "none";
            icon2.style.display = "none";
        });
//            左右箭头功能
        icon1.onclick = function () {
            icon(true)
        };
        icon2.onclick = function () {
            icon(false)
        };
//            小圆圈点击功能
        for (var i = 0; i < allLi.length; i++) {
            allLi[i].indexs = i;
            allLi[i].onclick = function () {
                clearInterval(time1);
                clearTimeout(time2);
                indexChange(allLi, allLi[this.indexs]);
                lunBox.style.left = -this.indexs * target + "px";
                liIndex = this.indexs;
                time2 = setTimeout(function () {
                    time1 = setInterval(rollBody, 20)
                }, 4000)
            }
        }
//            两边的箭头 的函数
        function icon(isbool) {
            clearInterval(time1);
            clearTimeout(time2);
            time1 = setInterval(function () {
                leaber = Math.ceil(leaber + (target - leaber) / 10);
                if (isbool) {
                    imgLeft = -(target * liIndex - leaber);
                    if (liIndex <= 0) {
                        liIndex = bestIndex;
                    }
                } else {
                    imgLeft = -(target * liIndex + leaber);
                    if ( liIndex >= bestIndex){
                        liIndex = 0;
                    }
                }
                lunBox.style.left = imgLeft + "px";
                if (imgLeft % lunBoWidth == 0) {
                    clearInterval(time1);
                    leaber = 0;
                    if (isbool) {
                        liIndex--;
                    } else {
                        liIndex++;
                        if (imgLeft <= boundary) {
                            liIndex = 0;
                        }
                    }
                    indexChange(allLi, allLi[liIndex]);
                    if (imgLeft >= 0) {
                        liIndex = bestIndex;
                    }
                    time2 = setTimeout(function () {
                        time1 = setInterval(rollBody, 20)
                    }, 3000)
                }
            }, 20)
        }

//        小圆圈的切换
        function indexChange(dom, domN, classname) {
            for (var i = 0; i < dom.length; i++) {
                dom[i].classList.remove(classname || "my-active");
            }
            domN.classList.add(classname || "my-active");
        }

        //广告轮播图
        var sliderIt = document.querySelectorAll(".img-layout .slider-item");
        var spanAll = document.querySelectorAll(".btn span");
        for (var j = 0; j < spanAll.length; j++) {
            spanAll[j].index = j;
            spanAll[j].onclick = function () {
                for (var i = 0; i < 2; i++) {
                    sliderIt[i].style.display = "none";
                }
                sliderIt[this.index].style.display = "block";
                indexChange(spanAll, spanAll[this.index], "on");
            }
        }
    };
})();

