/**
 *  Author:strive
 *  Date: 2015/6/12
 */
'use strict';
function ZQuery(arg){  //存储元素
    this.elements=[];

    this.domStirng='';

    switch(typeof arg){
        case 'function':
            domReady(arg);
            break;
        case 'string':
            if(arg.indexOf('<')!=-1){
                this.domStirng=arg;
            }else{
                this.elements=getEle(arg);
                this.length=this.elements.length;
            }
            break;
        default:
            this.elements.push(arg);
            break;
    }
}
ZQuery.prototype.css=function(name,value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style[name]=value;
        }
    }else{
        if(typeof name=='string'){
            return  getStyle(this.elements[0],name);
        }else{
            var json=name;
            for(var i=0; i<this.elements.length; i++){
                for(var name in json){
                    this.elements[i].style[name]=json[name];
                }
            }
        }
    }
};
ZQuery.prototype.attr=function(name,value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].setAttribute(name,value);
        }
    }else{
        if(typeof name=='string'){
            return  this.elements[0].getAttribute(name);
        }else{
            var json=name;
            for(var i=0; i<this.elements.length; i++){
                for(var name in json){
                    this.elements[i].setAttribute(name,json[name]);
                }
            }
        }
    }
};
ZQuery.prototype.html=function(str){
    if(str || str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].innerHTML=str;
        }
    }else{
        return this.elements[0].innerHTML;
    }
};
ZQuery.prototype.val=function(str){
    if(str || str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].value=str;
        }
    }else{
        return this.elements[0].value;
    }
};
ZQuery.prototype.addClass=function(sClass){
    var reg=new RegExp('\\b'+sClass+'\\b');
    for(var i=0; i<this.elements.length; i++){
        if(this.elements[i].className){
            if(!reg.test(this.elements[i].className)){
                this.elements[i].className+=' '+sClass;
            }
        }else{
            this.elements[i].className=sClass;
        }
    }
};
ZQuery.prototype.removeClass=function(sClass){
    var reg=new RegExp('\\b'+sClass+'\\b','g');
    for(var i=0; i<this.elements.length; i++){
        if(reg.test(this.elements[i].className)){
            this.elements[i].className=this.elements[i].className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
        }
    }
};
//基本事件
/*ZQuery.prototype.click=function(fn){
 for(var i=0; i<this.elements.length; i++){
 addEvent(this.elements[i],'click',fn);
 }
 };*/
;'mouseover mouseout click mousedown mousemove mouseup keyup keydown load resize scroll focus blur contextmenu dblclick'.replace(/\w+/g,function(sEv){
    ZQuery.prototype[sEv]=function(fn){
        for(var i=0; i<this.elements.length; i++){
            addEvent(this.elements[i],sEv,fn);
        }
    };
});
//运动
ZQuery.prototype.animate=function(json,options){
    for(var i=0; i<this.elements.length; i++){
        move(this.elements[i],json,options);
    }
};
//index
ZQuery.prototype.index=function(){
    var obj=this.elements[this.elements.length-1];
    var aSibling=obj.parentNode.children;
    for(var i=0; i<aSibling.length; i++){
        if(aSibling[i]==obj)return i;
    }
};
//eq
ZQuery.prototype.eq=function(n){
    return $(this.elements[n]);
};
ZQuery.prototype.hide=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='none';
    }
};
ZQuery.prototype.show=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='block';
    }
};
//DOM
ZQuery.prototype.appendTo=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('beforeEnd',this.domStirng);
    }
};
ZQuery.prototype.prependTo=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('afterBegin',this.domStirng);
    }
};
ZQuery.prototype.insertBefore=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('beforeBegin',this.domStirng);
    }
};
ZQuery.prototype.insertAfter=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('afterEnd',this.domStirng);
    }
};
ZQuery.prototype.remove=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].parentNode.removeChild(this.elements[i]);
    }
};
//事件其他
ZQuery.prototype.mouseenter=function(fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],'mouseover',function(ev){
            var from=ev.fromElement || ev.relatedTarget;
            if(this.contains(from))return;
            fn && fn.apply(this,arguments);
        })
    }
};
ZQuery.prototype.mouseleave=function(fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],'mouseout',function(ev){
            var to=ev.toElement || ev.relatedTarget;
            if(this.contains(to))return;
            fn && fn.apply(this,arguments);
        })
    }
};
ZQuery.prototype.hover=function(fnOver,fnOut){
    this.mouseenter(fnOver);
    this.mouseleave(fnOut);
};
ZQuery.prototype.toggle=function(){
    var arg=arguments;
    var _this=this;
    for(var i=0; i<this.elements.length; i++){
        (function(count){
            addEvent(_this.elements[i],'click',function(){
                var fn=arg[count%arg.length];

                fn && fn.apply(this,arguments);
                count++;
            })
        })(0);
    }
};


function $(arg){
    return new ZQuery(arg);
}

function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,function(ev){
            var oEvent=ev || event;
            if(fn.apply(obj,arguments)==false){
                oEvent.cancelBubble=true;
                oEvent.preventDefault();
            }
        },false);
    }else{
        obj.attachEvent('on'+sEv,function(ev){
            var oEvent=ev || event;
            if(fn.apply(obj,arguments)==false){
                oEvent.cancelBubble=true;
                return false;
            }
        });
    }
}
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function move(obj,json,options){
    options=options || {};
    options.duration=options.duration || 500;
    options.easing=options.easing || 'ease-out';

    var count=Math.ceil(options.duration/30);
    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));

        if(isNaN(start[name])){
            switch(name){
                case 'left':
                    start[name]=obj.offsetLeft;
                    break;
                case 'top':
                    start[name]=obj.offsetTop;
                    break;
                case 'width':
                    start[name]=obj.offsetWidth;
                    break;
                case 'height':
                    start[name]=obj.offsetHeight;
                    break;
                case 'opacity':
                    start[name]=1;
                    break;
                case 'fontSize':
                    start[name]=12;
                    break;
                //.....
            }
        }

        dis[name]=json[name]-start[name];
    }

    var n=0;

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){

            switch(options.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-Math.pow(a,3));
                    break;
            }

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            options.complete && options.complete.call(obj);
        }
    },30);
}
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',fn,false);
    }else{
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        });
    }
}
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var arr=[];
        var reg=new RegExp('\\b'+sClass+'\\b');
        var aEle=oParent.getElementsByTagName('*');
        for(var i=0; i<aEle.length; i++){
            if(reg.test(aEle[i].className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
function getByStr(aParent,str){
    var aChild=[];
    for(var i=0; i<aParent.length; i++){
        switch(str.charAt(0)){
            case '#':
                var obj=document.getElementById(str.substring(1));
                aChild.push(obj);
                break;
            case '.':
                var aEle=getByClass(aParent[i],str.substring(1));
                for(var j=0; j<aEle.length; j++){
                    aChild.push(aEle[j]);
                }
                break;
            default :
                if(/\w+\.\w+/.test(str)){  //li.box
                    var aStr=str.split('.');
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    var reg=new RegExp('\\b'+aStr[1]+'\\b');
                    for(var j=0; j<aEle.length; j++){
                        if(reg.test(aEle[j].className)){
                            aChild.push(aEle[j]);
                        }
                    }

                }else if(/\w+\[\w+=\w+\]/.test(str)){ //input[type=button]
                    var aStr=str.split(/\[|=|\]/);
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    for(var j=0; j<aEle.length; j++){
                        if(aEle[j].getAttribute([aStr[1]])==aStr[2]){
                            aChild.push(aEle[j]);

                        }
                    }
                }else if(/\w+:\w+(\(\d+\))?/.test(str)){ //li:eq(2)  li:first
                    var aStr=str.split(/:|\(|\)/);
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    switch(aStr[1]){
                        case 'first':
                            aChild.push(aEle[0]);
                            break;
                        case 'last':
                            aChild.push(aEle[aEle.length-1]);
                            break;
                        case 'eq':
                            aChild.push(aEle[aStr[2]]);
                            break;
                        case 'lt':
                            for(var j=0; j<aStr[2]; j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'gt':
                            for(var j=parseInt(aStr[2])+1; j<aEle.length; j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'odd':
                            for(var j=1; j<aEle.length; j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'even':
                            for(var j=0; j<aEle.length; j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                    }
                }else{
                    var aEle=aParent[i].getElementsByTagName(str);
                    for(var j=0; j<aEle.length; j++){
                        aChild.push(aEle[j]);
                    }
                }
                break;
        }
    }

    return aChild;
}
function getEle(str){
    var arr=str.replace(/^\s+|\s+$/g,'').split(/\s+/);

    var aParent=[document];
    var aChild=[];
    for(var i=0; i<arr.length; i++){
        aChild=getByStr(aParent,arr[i]);

        aParent=aChild; //这次结果，作为下次父级
    }
    return aChild;
}