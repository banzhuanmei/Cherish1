//贴吧时钟
;(function(){
	window.myTieBaShi=function(){

		function toDou(n){
			return n<10?'0'+n:''+n;
		}
		var oTieBaShiZ=document.getElementById('tieBaShiZ');
		var aTieBaImg=oTieBaShiZ.getElementsByTagName('img');
		
		function tick(){
			var oDate=new Date();
			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			
			var str=toDou(h)+toDou(m)+toDou(s);
			
			for(var i=0; i<aTieBaImg.length; i++){
				//aTieBaImg[i].style.top=-str.charAt(i)*35+'px';
				move(aTieBaImg[i],{top:-str.charAt(i)*35});
			}
		}
		
		tick();
		setInterval(tick,1000);
	};
})();

//翻转
;(function(){
	window.flip=function(element, flipName, flipTime, unflipName, unflipTime){
		if(!element){  
        	return;  
	    }  
	    element.style.webkitAnimation = "" + flipName + " " + flipTime;  
	    return $(element).bind('webkitAnimationEnd', function() {  
	        switch (element.style.webkitAnimationName) {  
	            case flipName:  
	                return element.style.webkitAnimation = "" + unflipName + " " + unflipTime;break;  
	            case unflipName:  
	                return element.style.webkitAnimation = "" + flipName + " " + flipTime;break;  
	        }  
	    });  
	};
})();

//导航运动
;(function(){
	window.myStartMove=function(){
		var oNav=document.getElementsByTagName('nav')[0];
		var oUl=oNav.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var oNavBox=aLi[aLi.length-1];
		
		for(var i=0; i<aLi.length-1; i++){

			aLi[i].onmouseover=function(){
                startMove(this.offsetLeft);
            };
            aLi[i].onmouseout=function(){
                startMove(17);
            };
        }

        var left=0;
		var iSpeed=0;
		var timer=null;
        function startMove(iTarget){
        	clearInterval(timer);
		    timer=setInterval(function(){
		        iSpeed+=(iTarget-oNavBox.offsetLeft)/5;
		        iSpeed*=0.7;


		        left+=iSpeed;
		        oNavBox.style.left=left+'px';

		        if(Math.round(iSpeed)==0 && Math.round(left)==iTarget){
		            clearInterval(timer);
		        }
		    },30);
        }
	};
})();

;(function(){
	function findInArr(arr,name){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==name)return true;
		}
		return false;
	}
	function getByClass(obj,sClass){
		var result = [];
		if(obj.getElementsByClassName){
			//用
			result = obj.getElementsByClassName(sClass);
		}else{
			//不用
			var aEle = obj.getElementsByTagName('*');
			for(var i=0;i<aEle.length;i++){
				var aClass = aEle[i].className.split(' ');
				if(findInArr(aClass,sClass)){
					result.push(aEle[i]);
				}
			}
		}
		return result;
	}

//自动播放
	window.autoTab=function(){
		var oContain=document.getElementById('contain');
		var aDiv=getByClass(oContain,'backPic')
		var oConUl=document.getElementById('con-foot-ul');
		var aConLi=oConUl.children;
		var iNow=0;
		for (var i = 0; i < aConLi.length; i++) {
			(function(index){
				aConLi[i].onclick=function(){
					iNow=index;
					tab();
				};
			})(i);
		}

		function tab(){
			for (var i = 0; i < aConLi.length; i++) {
				aConLi[i].className='';
				aDiv[i].style.display='none';
			}
			aConLi[iNow].className='active';
			aDiv[iNow].style.display='block';
		}

		function next(){
			iNow++;
			if (iNow==aConLi.length) {
				iNow=0;
			};
			tab();
		}
		var timer=setInterval(next,2000);
		oContain.onmouseover=function(){
			clearInterval(timer);
		};
		oContain.onmouseout=function(){
			timer=setInterval(next,2000);
		};
	};
})();
/*
;(function(){
	window.duangMove=function(){
		var oConCen=document.getElementById('conCen');
		var oP=oConCen.getElementsByTagName('p')[0];
		var iSpeedX=0;
		var iSpeedY=8;
		var timer=null;
		move();
		function move(){
			timer=setInterval(function(){
				iSpeedY+=3;
				var l=oP.offsetLeft+iSpeedX;
				var t=oP.offsetTop+iSpeedY;
				if (t>=document.documentElement.clientHeight-300) {
					t=document.documentElement.clientHeight-300;
                        iSpeedY*=-0.8;
                        iSpeedX*=0.8;
				}
				if (t<200) {
					t=200;
					iSpeedY*=-0.8;
                    iSpeedX*=0.8;
				}
				if(l>=document.documentElement.clientWidth-oP.offsetWidth){
                    l=document.documentElement.clientWidth-oP.offsetWidth;
                    iSpeedX*=-0.8;
                    iSpeedY*=0.8;
                }
                if(l<=0){
                    l=0;
                    iSpeedX*=-0.8;
                    iSpeedY*=0.8;
                }
               	oP.style.left=l+'px';
                oP.style.top=t+'px';
                if(Math.abs(iSpeedX)<1)iSpeedX=0;
                if(Math.abs(iSpeedY)<1)iSpeedY=0;
                if(iSpeedX==0 && iSpeedY==0 && t==document.documentElement.clientHeight-oP.offsetHeight){
                    clearInterval(timer);
                }
			},30);
		}
	};
})();*/
//跑马灯
;(function(){
	window.paoMD=function(){
		var oConCen=document.getElementById('conCen');
		var oP=oConCen.getElementsByTagName('p')[0];
		var str='Welcome  to  visit';
		for (var i = 0; i < str.length; i++) {
			var oSpan=document.createElement('span');
			oSpan.innerHTML=str.charAt(i);
			oP.appendChild(oSpan);
		}
		var aSpan=oP.children;

		var i=0;
		var timer=null;
		timer=setInterval(function(){
			move(aSpan[i],{opacity:1});
			i++;
			//alert(aSpan[i]);
			if (i==aSpan.length) {
				clearInterval(timer);
			};
		},100);
	};
})();

//吸顶条
;(function(){
	window.xiDingT=function(){
		var oHead=document.getElementById('head');
		var oHead2=document.getElementById('head2');
		var oHeadT=oHead.offsetTop;
		window.onscroll=function(){
			var scrollT=document.documentElement.scrollTop
			||document.body.scrollTop;
			if (scrollT>oHeadT) {
				if (window.navigator.userAgent.indexOf('MSIE 6.0')!=-1) {
					oHead.style.position='absolute';
					oHead.style.left=100;
					oHead.style.top=scrollT+'px';
					oHead2.style.display='block';
				}else{
					oHead.style.position='fixed';
					oHead.style.left=100;
					oHead.style.top=0;
					oHead2.style.display='block';
				}
			}else{
				oHead.style.position='';
				oHead2.style.display='none';
			}
		};	
	};
	
})();
//手风琴
;(function(){
	window.showFQ=function(){
		var oCaseBox=document.getElementById('caseBox');
		var oUl=oCaseBox.getElementsByTagName('ul')[0];
		var aLi=oUl.getElementsByTagName('li');
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].onmouseover=function(){
				for (var i = 0; i < aLi.length; i++) {
					//aLi[i].style.width=116+'px';
					move(aLi[i],{width:116});
				};
				//this.style.width=800+'px';
				move(this,{width:800});
			};
			aLi[i].onmouseout=function(){
				for (var i = 0; i < aLi.length; i++) {
					//aLi[i].style.width=287+'px';
					move(aLi[i],{width:287});
				};
			};
		};
	};
})();
//走一个
;(function(){
	window.zouYiGe=function(){
		var oBox=document.getElementById('secondCaseBox');
		var oUl=document.getElementById('secondCase');
		var oBtn=oBox.getElementsByTagName('input')[0];
		var aLi=oUl.getElementsByTagName('img');
		var zIndex=10;
		var timer=null;
		//布局转化
		var aPos=[];
		for (var i = 0; i < aLi.length; i++) {
			aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
		}
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;
		}
		oBtn.onclick=function(){
			var i=0;
			timer=setInterval(function(){
				(function(index){
					move(aLi[i],{width:0,height:0,left:0,
						top:0,opacity:0},{complete:function(){
						if (index==aLi.length-1) {
							//回来
							i=aLi.length-1;
							timer=setInterval(function(){
								move(aLi[i],{width:220,height:220,
									left:aPos[i].left,top:aPos[i].top,
									opacity:1});
								i--;
								if (i==-1) {
									clearInterval(timer);
								};
							},100);
						}
					}})
				})(i);
				i++;
				if (i==aLi.length) {
					clearInterval(timer);
				}
			},100);
		};
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].onmouseover=function(){
				move(this,{width:308,height:308,marginLeft:-44,
					marginTop:-44},{duration:300});
				this.style.zIndex=zIndex++;
			};
			aLi[i].onmouseout=function(){
				move(this,{width:220,height:220,margin:0},
					{duration:300});
				
			};

		};
	};
})();
//照片墙
;(function(){
	window.photoWall=function(){
		var oBox=document.getElementById('thirdCaseBox');
		var oBtn=oBox.getElementsByTagName('input')[0];
		var oUl=oBox.getElementsByTagName('ul')[0];
		var aLi=oBox.getElementsByTagName('li');
		var zIndex=10;
		var aPos=[];
		//点击随机切换
		function rndPos(){
			aPos.sort(function(){
				return Math.random()-0.5;
			});
			for (var i = 0; i < aLi.length; i++) {
				move(aLi[i],aPos[aLi[i].index]);
			}
		}
		oBtn.onclick=rndPos;
		//存位置
		for (var i = 0; i < aLi.length; i++) {
			aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
		};
		//布局转化
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;
		}
		//拖拽
		for (var i = 0; i <aLi.length; i++) {
			drag(aLi[i]);
			aLi[i].index=i;
		}

		function drag(obj){
			obj.onmousedown=function(ev){
				var oEvent=ev||event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				obj.style.zIndex=zIndex++;
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					obj.style.left=oEvent.clientX-disX+'px';
					obj.style.top=oEvent.clientY-disY+'px';
					for(var i=0; i<aLi.length; i++){
						aLi[i].className='';
					}
					//碰撞检测
					var oNear=findNearest(obj);
					if(oNear){
						oNear.className='box';
					}
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					obj.releaseCapture && obj.relaseCapture();
					var oNear=findNearest(obj);
					if(oNear){
						move(oNear,aPos[obj.index]);
						move(obj,aPos[oNear.index]);
						
						oNear.className='';
						
						var car;
						car=obj.index;
						obj.index=oNear.index;
						oNear.index=car;
					}else{
						move(obj,aPos[obj.index]);
					}
					
				};
				obj.setCapture && obj.setCapture();
				return false;
			};
		}
		function findNearest(obj){
			var iMin=999999999999;
			var iMinIndex=-1;
			
			for(var i=0; i<aLi.length; i++){
				if(obj==aLi[i])continue;
				if(collTest(obj,aLi[i])){
					//找最小的
					var dis=getDis(obj,aLi[i]);
					if(dis<iMin){
						iMin=dis;
						iMinIndex=i;	
					}
				}
			}	
			
			if(iMinIndex==-1){
				return null;
			}else{
				return aLi[iMinIndex];
			}
		}
		function getDis(obj,obj2){
			var l1=obj.offsetLeft+obj.offsetWidth/2;
			var l2=obj2.offsetLeft+obj2.offsetWidth/2;
			
			var t1=obj.offsetTop+obj.offsetHeight/2;
			var t2=obj2.offsetTop+obj2.offsetHeight/2;
			
			var a=l1-l2;
			var b=t1-t2;
			
			return Math.sqrt(a*a+b*b);
		}
		function collTest(obj,obj2){
			var l1=obj.offsetLeft;
			var r1=obj.offsetLeft+obj.offsetWidth;
			var t1=obj.offsetTop;
			var b1=obj.offsetTop+obj.offsetHeight;
			
			var l2=obj2.offsetLeft;
			var r2=obj2.offsetLeft+obj2.offsetWidth;
			var t2=obj2.offsetTop;
			var b2=obj2.offsetTop+obj2.offsetHeight;
			
			if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
				return false;
			}else{
				return true;
			}
		}
		var timer=setInterval(function(){
			rndPos();
		},2000);
		
		oUl.onmouseover=function(){
			clearInterval(timer);
		};
		oUl.onmouseout=function(){
			timer=setInterval(function(){
				rndPos();
			},2000);
		};
	};
})();
//无缝滚动
;(function(){
	window.roll=function(){
		var oFourth=document.getElementById('fourthCaseBox');
		var oBox=oFourth.getElementsByTagName('div')[0];
		var oUl=oBox.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		
		var oLeft=document.getElementById('leftRoll');
		var oRight=document.getElementById('rightRoll');
		oUl.innerHTML+=oUl.innerHTML;
		oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		
		var timer=null;
		var W=oUl.offsetWidth/2;
		var left=0;
		function toRight(){
			clearInterval(timer);
			timer=setInterval(function(){
				left+=10;
				if(left<0){
					oUl.style.left=left%W+'px';	
				}else{
					oUl.style.left=(left%W-W)%W+'px';
				}
			},30);	
		}
		
		function toLeft(){
			clearInterval(timer);
			timer=setInterval(function(){
				left-=10;
				if(left<0){
					oUl.style.left=left%W+'px';	
				}else{
					oUl.style.left=(left%W-W)%W+'px';
				}
			},30);	
		}
		
		toLeft();
		
		oRight.onmouseover=toRight;
		oLeft.onmouseover=toLeft;
	};
})();
//官网作品展示
;(function(){
	window.slideExtend=function(){
		var oBox=document.getElementById('firthCaseBox');
		var oUl=oBox.children[0];
		var aLi=oUl.children;
		var aImg=oUl.getElementsByTagName('img');
		
		var divC=oBox.offsetWidth/2;
		oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
	
	oUl.onmousedown=function(ev){
		var oEvent=ev || event;
		var disX=oEvent.clientX-oUl.offsetLeft;
		
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			var left=oEvent.clientX-disX;
			if(left>divC-(1-0.5)*aLi[0].offsetWidth){
				left=divC-(1-0.5)*aLi[0].offsetWidth;
				//让第一个aLi不往右移
			}
			if(left<divC-(aLi.length-0.5)*aLi[0].offsetWidth){
				left=divC-(aLi.length-0.5)*aLi[0].offsetWidth;
				//让最后一个不忘左移
			}
			oUl.style.left=left+'px';
			
			//求比例
			setSize();
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
		return false;
	};
	
	//让第几个居中
	oUl.style.left=divC-(2-0.5)*aLi[0].offsetWidth+'px';
	
	setSize();
	function setSize(){
		for(var i=0; i<aLi.length; i++){
			var l=Math.abs(divC-(aLi[i].offsetWidth/2+aLi[i].offsetLeft+oUl.offsetLeft));
			var scale=1-l/500;
			scale<0.5 && (scale=0.5);
			aImg[i].style.width=scale*600+'px';
			aImg[i].style.height=scale*400+'px';
			aImg[i].style.marginLeft=-(aImg[i].offsetWidth-300)/2+'px';
			aImg[i].style.marginTop=-(aImg[i].offsetHeight-200)/2+'px';
			
			aLi[i].style.zIndex=scale*100000000;
		}	
	}
	};
})();
;(function(){
	window.menu=function(){
		var oBox=document.getElementById('sixthCase');
		var aImg=oBox.getElementsByTagName('img');
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			for(var i=0; i<aImg.length; i++){
				var a=aImg[i].offsetWidth/2+aImg[i].offsetLeft-oEvent.clientX;
				
				var b=aImg[i].offsetHeight/2+aImg[i].offsetTop+oBox.offsetTop-oEvent.clientY;
				
				var c=Math.sqrt(a*a+b*b);
				
				var scale=1-c/500;
				
				scale<0.5 && (scale=0.5);
				aImg[i].width=scale*128;
			}
		};
	};
})();
;(function(){
	window.circle=function(){
		var oDiv=document.getElementById('skillRight');
	
		var N=10;
		//创建圆
		for(var i=0; i<N; i++){
			var oSpan=document.createElement('span');
			oDiv.appendChild(oSpan);
		}
		
		var R=oDiv.offsetWidth/2;
		
		
		var aSpan=oDiv.children;
		var bSign=true;
		document.onclick=function(){
			if(bSign){
				for(var i=0; i<aSpan.length; i++){
					startMove(aSpan[i],360/N*i);
				}
			}else{
				for(var i=0; i<aSpan.length; i++){
					startMove(aSpan[i],0);
				}
			}
			bSign=!bSign;
		};
		
		function startMove(obj,iTarget){
			obj.a=obj.a || 0;
			var count=Math.floor(1000/30);
			var start=obj.a;
			var dis=iTarget-start;
			var n=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				n++;
				
				var b=1-n/count;
				obj.a=start+dis*(1-Math.pow(b,3));
				
				var x=R+Math.sin(obj.a*Math.PI/180)*R;
				var y=R-Math.cos(obj.a*Math.PI/180)*R;
				
				obj.style.left=x+'px';
				obj.style.top=y+'px';
				
				if(n==count){
					clearInterval(obj.timer);	
				}
			},30);
		}
	};
})();
;(function(){
	window.Dtran=function(){
		var oLeft=document.getElementById('3Dleft');
		var oRight=document.getElementById('3Dright');
		var oUl=document.getElementById('znsRotatePic');
		var aLi=oUl.children;
		var aA=oUl.getElementsByTagName('a');
		var aImg=oUl.getElementsByTagName('img');
		
		//存位置
		var aPos=[];
		
		//加事件
		aA[0].onclick=function(){
			toLeft();
			return false;
		};
		aA[2].onclick=function(){
			toRight();
			return false;
		};
		
		for(var i=0; i<aLi.length; i++){
			aPos[i]={
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop,
				width:aImg[i].offsetWidth,
				opacity:parseFloat(getStyle(aImg[i],'opacity')),
				imgT:aImg[i].offsetTop,
				fnClick:aA[i].onclick
			};
		}
		
		function tab(){
			for(var i=0; i<aLi.length; i++){
				move(aLi[i],{left:aPos[i].left, top:aPos[i].top});
				move(aImg[i],{width:aPos[i].width, opacity:aPos[i].opacity, top:aPos[i].imgT});
				
				aA[i].onclick=aPos[i].fnClick;
			}	
		}
		function toLeft(){
			aPos.push(aPos.shift());
			tab();
		}
		function toRight(){
			aPos.unshift(aPos.pop());
			tab();		
		}
		
		oLeft.onclick=toLeft;
		
		oRight.onclick=toRight;
	};
})();
;(function(){
	window.wangYi=function(){

		var oBox=document.getElementById('contain');
		var oUl=oBox.children[0];
		var aLi=oUl.children;
		var oUl1=document.getElementById('conFootUl');
		var aBtn=oUl1.getElementsByTagName('span');

		oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		var iNow=0;
		function next(){

			for (var i = 0; i < aBtn.length; i++) {
				aBtn[i].style.opacity=0;
			}
			move(aBtn[iNow],{opacity:1},{duration:5000,complete:function(){
				iNow++;
				if (iNow==aLi.length) iNow=0;
				move(oUl,{left:-iNow*aLi[0].offsetWidth},{
					complete:next});
			}});
		}
		next();
	};
})();
;(function(){
	window.init=function(){
		var city = document.getElementById("cityName").value;
		 var oBtn=document.getElementsByTagName('input')[1];
		 var map = new BMap.Map("allmap");
		 var point = new BMap.Point(116.331398,39.897445);
		 map.centerAndZoom(point,11);
		 map.enableScrollWheelZoom(true);
		 oBtn.onclick=function(){
		    if(city != ""){
		        map.centerAndZoom(city,11);      // 用城市名设置地图中心点
		    }
		 };
	};
})();
;(function(){
	window.iconTrans=function(){
		var arr=['北京市昌平区平西府','1339031252','13717894605','yanduchun@foxmail.com'];
		var oTuBi=document.getElementById('tubiao');
		var aI=oTuBi.getElementsByTagName('i');
		var oTuBiInner=document.getElementById('tubiaoInner');
		for (var i = 0; i < aI.length; i++) {
			(function(index){
				aI[i].onclick=function(){
					for (var i = 0; i < aI.length; i++) {
						aI[i].style.color='#83d6df';
						aI[i].style.background='#fff';
						oTuBiInner.innerHTML='';
					};
					aI[index].style.color='#fff';
					aI[index].style.background='#83d6df';
					oTuBiInner.innerHTML=arr[index];
				};
			})(i);
		};
	};
})();
;(function(){
	window.myWish=function(){
		var oSend=document.getElementById('send');
	var oSendForm=document.getElementById('send-form');
	var oLayer=document.getElementById('layer');
	var oClose=document.getElementById('close');
	
	var oBtn=document.getElementById('send-btn');
	var oUsername=document.getElementById('username');
	var oContent=document.getElementById('content');
	var oMain=document.getElementById('main');
	var oFace=document.getElementById('phiz');
	var aImg=oFace.children;
	
	var zIndex=1000;
	var URL='wish.php';
	oSend.onclick=function(){
		oSendForm.style.display='block';
		oLayer.style.display='block';
		oSendForm.style.left=(document.documentElement.clientWidth-oSendForm.offsetWidth)/2+'px';
	};
	
	oClose.onclick=function(){
		oSendForm.style.display='none';
		oLayer.style.display='none';
	};
	
	//
	oBtn.onclick=function(){
		ajax({
			url:URL,
			data:{
				act:'add',
				username:oUsername.value,
				content:oContent.value	
			},
			success:function(str){
				var json=eval('('+str+')');
				if(json.error){
					alert('发表心愿失败了');
				}else{
					console.log(json);
					oSendForm.style.display='none';
					oLayer.style.display='none';
					
					getAllWish();
					
					oUsername.value='';
					oContent.value='';
				}
			}	
		});
	};
	
	function createMsg(username,content,time,id){
		var oDate=new Date();
		oDate.setTime(time*1000);
		var sDate=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes()+':'+oDate.getSeconds();
		
		var oDl=document.createElement('dl');
		oDl.className='paper a'+(id%5+1);
		oDl.innerHTML='<dt>'
			+'<span class="username">'+username+'</span>'
			+'<span class="num">No.'+id+'</span>'
			+'</dt>'
			+'<dd class="content">'+str2face(content)+'</dd>'
			+'<dd class="bottom">'
			+'<span class="time">'+sDate+'</span>'
			+'<a href="javascript:;" class="close"></a>'
			+'</dd>';
		//删除
		var oA=oDl.getElementsByTagName('a')[0];	
		oA.onclick=function(){
			var t=confirm('确认删除么?');
			if(t){
				ajax({
					url:URL,
					data:{
						act:'delete',
						id:id	
					},
					success:function(str){
						var json=eval('('+str+')');
						if(json.error){
							alert('删除失败了');
						}else{
							oMain.removeChild(oDl);
						}
					}	
				});
			}
		};
		
		return oDl;	
	}
	
	getAllWish();
	//获取所有心愿
	function getAllWish(){
		ajax({
			url:URL,
			data:{
				act:'get'	
			},
			success:function(str){
				oMain.innerHTML='';
				var json=eval('('+str+')');
				if(json.error){
					alert(json.msg);
				}else{
					
					var arr=json.msg;
					
					for(var i=0; i<arr.length; i++){
						var oDl=createMsg(arr[i].username,arr[i].content, arr[i].time,arr[i].id);
						oMain.appendChild(oDl);
						
						drag(oDl);
						rndPos(oDl);
					}
				}
			}	
		});	
	}
	
	//拖拽
	function drag(oDiv){
		oDiv.onmousedown=function(ev){
			var oEvent=ev || event;
			
			var disX=oEvent.clientX-oDiv.offsetLeft;
			var disY=oEvent.clientY-oDiv.offsetTop;
			
			oDiv.style.zIndex=zIndex++;
			
			document.onmousemove=function(ev){
				var oEvent=ev || event;
				
				oDiv.style.left=oEvent.clientX-disX+'px';
				oDiv.style.top=oEvent.clientY-disY+'px';	
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;	
				oDiv.releaseCapture && oDiv.releaseCapture();
			}
			oDiv.setCapture && oDiv.setCapture();
			return false;	
		}
	}
	function rndPos(obj){
		obj.style.left=Math.random()*(document.documentElement.clientWidth-obj.offsetWidth-0)+0+'px';
		obj.style.top=Math.random()*(document.documentElement.clientHeight-obj.offsetHeight-150)+'px'
	}
	
	//
	for(var i=0; i<aImg.length; i++){
		aImg[i].onclick=function(){
			oContent.value+='['+this.alt+']';
		};
	}
	
	function str2face(str){
		var arr=['[抓狂]','[抱抱]','[害羞]','[酷]','[嘻嘻]','[太开心]','[偷笑]','[钱]','[花心]','[挤眼]'];
		var arr2=['zhuakuang','baobao','haixiu','ku','xixi','taikaixin','touxiao','qian','huaxin','jiyan'];
		for(var i=0; i<arr.length; i++){
			if(str.indexOf(arr[i])!=-1){
				str=str.replace(arr[i],'<img src="./img/phiz/'+arr2[i]+'.gif">');
				i--;
			}
		}
		return str;
	}
	};
})();
;(function(){
	window.baidu=function(){
		var oT=document.getElementById('t1');
	var oBtn=document.getElementById('btn1');
	var oUl=document.getElementById('ul1');
	
	var iNow=-1;
	
	var oldValue='';
	oT.onkeyup=function(ev){
		var oEvent=ev || event;
		if(oEvent.keyCode==40 || oEvent.keyCode==38)return;
		
		if(oEvent.keyCode==13){
			window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
			oT.value='';
		}
		
		jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
			wd:oT.value	
		},'cb',function(json){
			var arr=json.s;	
			
			oUl.innerHTML='';
			if(arr.length){
				oUl.style.display='block';
			}else{
				oUl.style.display='none';
			}
			
			for(var i=0; i<arr.length; i++){
				var oLi=document.createElement('li');
				oLi.innerHTML=arr[i];
				oUl.appendChild(oLi);
				
				(function(index){
					oLi.onmouseover=function(){
						for(var i=0; i<oUl.children.length; i++){
							oUl.children[i].className='';
						}
						this.className='active';
						iNow=index;
					};
					
					oLi.onclick=function(){
						window.open('https://www.baidu.com/s?wd='+this.innerHTML,'_self');
						oT.value='';
					};
				})(i);
			}
		});
		
		oldValue=oT.value;
	};
	
	//功能
	oT.onkeydown=function(ev){
		var aLi=oUl.children;
		var oEvent=ev || event;
		if(oEvent.keyCode==40){
			iNow++;
			
			if(iNow==aLi.length)iNow=-1;
			for(var i=0; i<aLi.length; i++){
				aLi[i].className='';
			}
			if(iNow==-1){
				oT.value=oldValue;
			}else{
				aLi[iNow].className='active';
				oT.value=aLi[iNow].innerHTML;
			}
		}
		
		if(oEvent.keyCode==38){
			iNow--;
			if(iNow==-2)iNow=aLi.length-1;
			
			for(var i=0; i<aLi.length; i++){
				aLi[i].className='';
			}
			if(iNow==-1){
				oT.value=oldValue;
			}else{
				aLi[iNow].className='active';
				oT.value=aLi[iNow].innerHTML;
			}
			return false;
		}
	};
	
	oBtn.onclick=function(){
		window.open('https://www.baidu.com/s?wd='+oT.value,'blank');
		oT.value='';
	};
	};
})();
//回到顶部
;(function(){
	window.toTop=function(){
		var oBtn=document.getElementById('toTop');
	
	//出来
	window.onscroll=function(){
		var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollT>0){
			oBtn.style.display='block';
		}else{
			oBtn.style.display='none';
		}
	};
	
	var timer=null;
	//点击回去
	oBtn.onclick=function(){
		var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
		var count=Math.floor(1000/30);
		var start=scrollT;
		var dis=0-start;
		var n=0;

		clearInterval(timer);
		
		timer=setInterval(function(){
			n++;
			
			var a=1-n/count;
			var cur=start+dis*(1-Math.pow(a,3));
			
			document.body.scrollTop=document.documentElement.scrollTop=cur;
			
			if(n==count){
				clearInterval(timer);
			}
		},30);
	};
	};
})();


;(function(){
	window.caseClick=function(){
		var oCasePre=document.getElementById('casePre');
		var oCaseNext=document.getElementById('caseNext');
		var oCaseBox=document.getElementById('caseBox');
		var oCase=document.getElementById('case');
		var iNow=0;
		oCase.onmouseover=function(){
			oCasePre.style.display='block';
			oCaseNext.style.display='block';
		};
		oCase.onmouseout=function(){
			oCasePre.style.display='none';
			oCaseNext.style.display='none';
		};
		oCasePre.onclick=function(){
			iNow--;
			tab();
		};
		oCaseNext.onclick=function(){
			iNow++;
			tab();
		};

		function tab(){
			startMove(oCaseBox,-iNow*535);
		}
		
		var top=0;
		function startMove(obj,iTarget){
			var count=Math.floor(1000/30);
			var start=top;
			var dis=iTarget-start;
			var n=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				n++;
				var a=1-n/count;
				top=start+dis*(1-Math.pow(a,3));
				
				if(top<-5880){
					obj.style.top=-5880+'px';	
				}else{
					obj.style.top=top+'px';
				}
				if (top>=0) {
					obj.style.top=0+'px';
				};
				if(n==count){
					clearInterval(obj.timer);	
				}
			},30);
		}
	};
})();

