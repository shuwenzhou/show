var $$ = function () {
};
$$.prototype =  {
    // 完成对象的属性拓展
    extend:function (dis,src) {
        for (var key in src) {
            dis[key] = src[key];
        }
        return dis;
    },
    //数据类型判断
    $string : function (str) {
        return typeof str === "string"
    },
    $number : function (str) {
        return typeof str === "number"
    },
    $boole : function (str) {
        return typeof str === "boole"
    },
    $undefined : function (str) {
        return typeof str === "undefined"
    },
    $null: function (str) {
        return  str === "null"
    },
    $object: function (str) {
        return typeof str === "object"
    },
    $array: function (str) {
        return str.constructor == Array && this.$object(str)
    },
    $HTMLCollection: function (str) {
        return str.constructor == HTMLCollection && this.$object(str)
    },
    $addArray : function (dis,src ) {
    //    判断 src（源）的数据类型
        if (this.$HTMLCollection(src)) {
            //console.log(src);
            Array.prototype.forEach.call(src, function (e) {
                dis.push(e)
            })
        }else{
            dis = dis.concat(src)
        }
        return dis
    }

};

//  DOM 查询

var $dom = new $$();
$dom.extend($dom,{
    //  对传入的数据进行判断
    $tepeof : function (str) {
        if (str.match(/#/)&&!str.match(/[\.,>\s $]/)) {
            return "id"
        }else if (str.match(/\./)&&!str.match(/[#,>\s $]/)) {
            return "class"
        }else if (str.match(/,/)) {
            return "group"
        } else if (str.match(/>/)) {
            return "chlid"
        }
        else if (str.match(/\s/)) {
            return "chlidren"
        }
        return "tagName"
    },
    $id : function (dom) {
        return document.getElementById(dom)
    },
    $class : function (dom) {
        return document.getElementsByClassName(dom)
    },
    $tagName: function (dom) {
        return document.getElementsByTagName(dom)
    },
    allCan : function (dom) {
        // 接收dom 选择器类型  使用switch
        switch (this.$tepeof(dom)){
            case "id":
                return this.$id(dom.replace(/#/,""));
            case "class":
                return this.$class(dom.replace(/\./,""));
            case "tagName":
                return this.$tagName(dom);
            case "group":
                return this.$group(dom);
            case "chlid":
                return this.$child(dom);
            case "chlidren":
                return this.$children(dom);
        }
    },
    //并集选择器
    $group : function (dom) {
    //    split 对字符串按条件进行分割
        var result = dom.split(",");
    //    对result 的数据判断
        var array  =[];
        result.forEach(function (e) {
            console.log($dom.allCan(e));
            $dom.$addArray(array,$dom.allCan(e))
        });
        return array
    },
    //子代选择器
    $child : function (dom) {
        var result = dom.split(">");
        var array = par = child =[];
        function dg(i,arr1,arr2) {
            if (i == result.length-1) {
                //console.log(chlidFun(arr1,$dom.allCan(arr2)));
                return  array = chlidFun(arr1,$dom.$addArray(child,$dom.allCan(arr2)));
                //array;
            }else{
                if (i == 1) {
                    var num = chlidFun($dom.$addArray(par,$dom.allCan(arr1)),$dom.$addArray(child,$dom.allCan(arr2)));
                }else {
                    num = chlidFun(arr1,$dom.$addArray(child,$dom.allCan(arr2)))
                }
                return dg(i+=1,num,result[i])
            }
        }
        console.log(dg(1,result[0],result[1]));
        return array
    },
    //先辈选择器
    $parents : function (dom,pardom) {
        var array = [];
        var result = dom;
        pardom = pardom || document.body;
        for (var i=0;i<10;) {
            if (result != pardom && result !== document.body) {
                result= result.parentNode;
                //array = $dom.$addArray(array,result);
            }else if (result == pardom){
                return pardom;
            }else {
                return ;
            }
        }
        //return array
    },

    //后代选择器
    $children : function (dom) {
         dom = dom.match(/\S?\w+/g);
        var reuslt = [],made;
        var children = [],childPar,array = [];
        dom.forEach(function (e) {
            var reus =[];
            reuslt[reuslt.length] = $dom.$addArray(reus,$dom.allCan(e));
        });
        children = reuslt[reuslt.length-1];
        children.forEach(function (e) {
            childPar = e;
            var jud = false;
            for (var i = reuslt.length-2;i >= 0;i--) {
                for (var j=0;j < reuslt[i].length;j++) {
                    made = $dom.$parents(childPar, reuslt[i][j]);
                    if (made ==reuslt[i][j] ) {
                        childPar = made;
                        jud = true;
                    }
                }
                if (jud === false) {
                    array.push(e);
                    break
                } else {
                    jud = false;
                }
            }
        });
        for (var i=0;i < array.length;i++) {
            children.splice(children.indexOf(array[i]),1);
        }
        return children;
    }









});
function cpar() {

}
//事件绑定
$dom.extend($dom,{
    $bindFunc: function (obj,func) {
        obj =$dom.$object(obj) ?  obj:$dom.allCan(obj);
        if ($dom.$array(obj)) {
            obj.forEach(function (e) {
                func(e)
            })
        }else if ($dom.$HTMLCollection(obj)) {
            Array.prototype.forEach.call(obj, function (e) {
                func(e)
            })
        }else {
                func(obj)
        }
    },
    //绑定事件
    bind: function (obj,event,func) {
        $dom.$bindFunc(obj, function (dom) {
            dom.addEventListener(event,func)
        })
    },
//    解除事件绑定
    remove : function (obj, event, func) {
        $.$bindFunc(obj,function (e) {

            if(e.removeEventListener)
            {
                e.removeEventListener(event,func);
            }
            //IE兼容
            if(e.detachEvent)
            {
                //ie 的事件前on
                e.detachEvent("on" + event,func);
            }
        })
    },
//    分装 界面代理
    deleGate:function (dom,select,evenType,fn){
        dom =$dom.$object(dom) ?  dom:$dom.allCan(dom);
        select = $dom.$object(select) ?  dom:$dom.allCan(select);
        function fun(e) {
            e.target.delegateObj = select;
            e.target.delefun = fn;
            e.target.delefun();
        }
        $dom.bind(dom,evenType,fun)
    }
});



//html css 样式设置
$dom.extend($dom,{
    html: function (obj,text) {
        $dom.$bindFunc($dom.allCan(obj), function (e) {
            e.innerHTML = text;
        });
    },
    cssStyle: function (obj, key, value) {
        if (key.match(/-:/)) {
            var result = key.split(/-/);
            console.log(result);
            key = result[0]+$dom.capitalize(result[1]);
            $dom.$cssKey(obj,key)
        }else if (key.match(/\:/)) {
            $dom.$cssKey(obj,key)
        }else {
            if(key.match(/-/)){
                result = key.match(/-/);
                key = result[0]+$dom.capitalize(result[1]);
            }
            $dom.$bindFunc($dom.allCan(obj), function (e) {
                e.style[key] = value;
            });
        }
    },
//    传入css的样式的是 键值对
    $cssKey : function(obj,key){
        //$dom.allTrim(key);
        //console.log(key);
        var result = key.split(/:/);
        key = $dom.rTrim(result[0]);
        var val = $dom.lTrim(result[1]);
        console.log(result);
        $dom.$bindFunc($dom.allCan(obj), function (e) {
            e.style[key] = val;
        })
    },
//  首字母大写的方法
    capitalize : function (string) {
        string = string[0].toUpperCase()+string.substr(1);
        return string
    },

// 清除左边空格
    lTrim : function (string) {
      return string.replace(/^\s*/g,"")
    },
    //清除右边空格
    rTrim : function (string) {
      return string.replace(/\s*$/g,"")
    },
    allTrim : function (string) {
      return string.replace(/\s*/g,"")
    }





});
/*------------------------------- 函数方法 ----------------------------*/
// 子代选择器的函数
function chlidFun(par, child) {
    var array = [];
    par.forEach(function (e) {
        child.forEach(function (f) {
            if (f.parentNode === e) {
                array.push(f);
            }
        })
    });
    console.log(array);
    return array
}
//多次点击事件函数
function nClick() {
    var sT = sNT = dT = 0;
    var count = 0;
    this.onmousedown = function(event) {
        event = event ||window.event;
        if(count == 0){
            sT = event.timeStamp;
        }
        sNT = event.timeStamp;
        if (sNT - sT >1000) {
            console.log(count);
            sT = sNT;
            count = 0;
        }
    };
    this.onmouseup = function (event) {
        count++;
        event = event ||window.event;
        dT = event.timeStamp;
        if (dT - sT > 1000) {
            console.log(count)
        }
    }
}








