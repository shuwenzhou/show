/**
 * Created by Administrator on 2016/9/21.
 */
window.onload=function () {
    waterfall("main","box");
    var dateInt={"date":[{"src":"images/01.jpg"},{"src":"images/02.jpg"},{"src":"images/03.jpg"},{"src":"images/04.jpg"}
    ,{"src":"images/05.jpg"},{"src":"images/11.jpg"},{"src":"images/07.jpg"},{"src":"images/12.jpg"},{"src":"images/08.jpg"},{"src":"images/18.jpg"}]};
    window.onscroll=function () {
        if (gunDongTiaoPanDuan()) {
            for (var i=0;i<dateInt.date.length;i++) {
                var oparent=document.getElementById("main");
                var boxC=document.createElement("div");
                boxC.className="box";
                oparent.appendChild(boxC);
                var bosC=document.createElement("div");
                bosC.className="bos";
                boxC.appendChild(bosC);
                var imgs=document.createElement("img");
                imgs.src=dateInt.date[i].src;
                bosC.appendChild(imgs);
                console.log(1)
            }
            waterfall("main","box");
        }
    }
};
function waterfall(parent,box) {
    var oparent=document.getElementById(parent);
    var box=document.getElementsByClassName(box);
    var boxW=box[0].offsetWidth;
    var clos=parseInt(document.documentElement.clientWidth/boxW);
    oparent.style.cssText="width:"+boxW*clos+"px;margin:0 auto";
    var arr=[];//·ÅÍ¼Æ¬µÄ¸ß
    for (var i=0;i<box.length;i++) {
        if (i<clos) {
            arr[i]=box[i].offsetHeight;
        }else{
            var minH=Math.min.apply(null,arr);
            var idex=inde(arr,minH);
            box[i].style.position="absolute";
            box[i].style.top=minH+"px";
            box[i].style.left=idex*boxW+"px";
            arr[idex]+=box[i].offsetHeight;
            //console.log(arr[idex])
        }
    }
}
function inde(arr,val) {
    for (var i in arr) {
        if (arr[i]==val) {
            return i
        }
    }
}
function gunDongTiaoPanDuan() {
    var oparent=document.getElementById("mian");
    var box=document.getElementsByClassName("box");
    var lastboxH=box[box.length-1].offsetHeight;
    var lastboxT=box[box.length-1].offsetTop+parseInt(lastboxH/2);
    var costop=document.body.scrollTop || document.documentElement.scrollTop;
    var height=document.body.scrollHeight || document.documentElement.scrollHeight;
    return (lastboxT<costop+height)? true:false;
}