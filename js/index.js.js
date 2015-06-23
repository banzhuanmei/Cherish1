// JavaScript Document
window.onload=function(){
	//ÅËÎµ
	(function(){
		function findInArr(arr,str){
			for(var i=0;i<arr.length;i++){
				if(arr[i]==str){
					return true;	
				}	
			}
			return false;
		}
		function getByClass(obj,sClass){
			var result=[];
			if(obj.getElementsByClassName){
				result=obj.getElementsByClassName(sClass);
			}else{
				var aTotal=obj.getElementsByTagName('*');
				for(var i=0;i<aTotal.length;i++){
					var aClass=aTotal[i].className.split(' ');
					if(findInArr(aClass,sClass)){
						result.push(aTotal[i])	
					}
				}
			}
			return result;
		}
		var oBtnParent=document.getElementById('pwk_myConsole');
		var aBtn=oBtnParent.children;
		var aDiv=getByClass(document,'pwk_myOption');
		for(var i=0;i<aBtn.length;i++){
			(function(index){
				aBtn[i].onclick=function(){
					for(var i=0;i<aBtn.length;i++){
						aBtn[i].className='';	
						aDiv[i].style.display='none';	
					}
						this.className='on';	
						aDiv[index].style.display='block';	
				};	
			})(i);
		}
	})();
	
	
	
	
	// LSN
	(function(){
		var oTabPic=document.getElementById('tabPic');
		var aBigPic=oTabPic.children;
		var oUl1=document.getElementById('LSN-pic');
		var aLi=oUl1.children;
		for (var i = 0; i < aLi.length; i++) {
			(function(index){
				aLi[i].onmouseover=function(){
					for (var i = 0; i < aLi.length; i++) {
						aLi[i].className='';
						aBigPic[i].style.display='none';
					}
					this.className='on';
					aBigPic[index].style.display='block';
				};
			})(i);
		};
	})();//LSN
	
	
	//ÁõÐã
	(function(){
		function findInArr(arr,name){
			for(var i=0;i<arr.length;i++){
				if(arr[i]==name)return true;
			}
			return false;
		}
		function getByClass(obj,sClass){
			var result = [];
			if(obj.getElementsByClassName){
				//ÓÃ
				result = obj.getElementsByClassName(sClass);
			}else{
				//²»ÓÃ
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
	
		var aUl=getByClass(document,'playerMaskVideo_js');
		for (var i = 0; i < aUl.length; i++) {
			var aLi=aUl[i].children;
			for (var j = 0; j< aLi.length; j++) {
				var oA=aLi[j].children[0];
				oA.onmouseover=function(){
					this.children[1].className='lzy_span1';
				};
				oA.onmouseout=function(){
					this.children[1].className=' ';
				};
			}
	
		}
	})();

////////////////////////////////////////////////°¬É³
	(function(){
		////////////Ñ¡Ïî¿¨
		function tab(id){
			var oBox = document.getElementById(id);
			var oUl = oBox.getElementsByTagName('ul')[0];
			var aLi = oUl.getElementsByTagName('li');
			var aUl = oBox.getElementsByTagName('ol');
				var timer=null;
				var num=0;
				for(var i=0;i<aLi.length;i++){
					aLi[i].index=i;
					aLi[i].onclick=function(){
						num=this.index;
						tapPic();
					}
				}
				timer=setInterval(function(){
					num++;
					num%=aUl.length;
					tapPic();
				},1000);
				oBox.onmouseover=function(){
					clearInterval(timer);	
				};
				oBox.onmouseout=function(){
					timer=setInterval(function(){
						num++;
						num%=aUl.length;
						tapPic();
					},1000);
				};
				function tapPic(){
					for(var i=0;i<aLi.length;i++){
						aLi[i].className='';
						aUl[i].className='';
					}
					aLi[num].className='active';
					aUl[num].className='active';
				}
			}
			tab('asbox');
			tab('asbox1');
			tab('asbox2');
			tab('asbox3');
			tab('asbox4');
			
			////////////Ñ¡Ïî¿¨
			
		/////////////¸ôÐÐ±äÉ«	
		var oBox1 = document.getElementById('as_move');
		var aLi1 = oBox1.getElementsByTagName('li');
		getColor();
		
		var oBox2 = document.getElementById('as_move1');
		var aOl = oBox2.getElementsByTagName('ol');
		for(var i=0;i<aOl.length;i++){
			var aLi1 = aOl[i].getElementsByTagName('li');
			getColor();
		}
				
		function getColor(){
			for(var i=0;i<aLi1.length;i++){
				if(i%2==0){
					aLi1[i].style.background='#1E1E1E';
				}
			}
		}
		/////////////¸ôÐÐ±äÉ«	
		
		
		///////¹ö¶¯Ìõ+¹ö¶¯Ð§¹û
		var oContBox=document.getElementById('as_mainSide');
		var oCont=document.getElementById('as_cont');
		var oBarBox=document.getElementById('as_scrollBar');
		var oBar=document.getElementById('as_bar');
		var oBtnUp=document.getElementById('as_scrollUp');
		var oBtnDown=document.getElementById('as_scrollDown');
		oBtnDown.onmousedown=function(){return false;};
		oBtnDown.onclick=function(){
			t=oBar.offsetTop;
			t+=20;
			change(t);
		};
		oBtnUp.onclick=function(){
			t=oBar.offsetTop;
			t-=20;
			change(t);
		};
		oBar.onmousedown=function(ev){
			var oEvent=ev||event;
			var disY=oEvent.clientY-oBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;
				change(t);
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oBar.releaseCapture&&oBar.releaseCapture();
			};
			oBar.setCapture&&oBar.setCapture();
			return false;
		};
		addWheel(oContBox,function(bOk){
			var t=oBar.offsetTop;
			if(bOk){
				t+=10;	
			}else{
				t-=10;
			}			
			change(t);
		});
		function addWheel(obj,fn){
			if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
				obj.addEventListener('DOMMouseScroll',wheel,false);	
			}else{
				obj.onmousewheel=wheel;
			}
			function wheel(ev){
				var oEvent=ev||event;
				var bDown=true;
				if(oEvent.wheelDelta){
					oEvent.wheelDelta<0?bDown=true:bDown=false;
				}else{
					oEvent.detail>0?bDown=true:bDown=false;
				}
				fn&&fn(bDown);
				oEvent.preventDefault&&oEvent.preventDefault();
				return false;
			}
		}
		function change(t){
			if(t<11){
				t=11;	
			}else if(t>oBarBox.offsetHeight-oBar.offsetHeight-11){
				t=oBarBox.offsetHeight-oBar.offsetHeight-11;
			}
			oBar.style.top=t+'px';
			var scale=(t-11)/(oBarBox.offsetHeight-oBar.offsetHeight-22);
			oCont.style.top=-scale*(oCont.offsetHeight-oContBox.offsetHeight)+'px';
		}
		///////¹ö¶¯Ìõ+¹ö¶¯Ð§¹û
		
		////µã»÷ÊÕËõ
		dot('asport','as_move');
		dot('asport1','as_move1');
		dot('asport2','as_move2');
		dot('asport3','as_move3');
		dot('asport4','as_move4');
		function dot(sName1,sName2){
			var count=0;
			var oP = document.getElementById(sName1);
			var oAs = document.getElementById(sName2);
			oP.onclick=function(){
				if(count%2){
					oAs.style.display='block';
					this.innerHTML='-';
				}else{
					oAs.style.display='none';
					this.innerHTML='+';
				}
				var scale2=oContBox.offsetHeight/oCont.offsetHeight
				if(scale2>=1){
					oBar.style.display='none';
				}else{
					oBar.style.display='block';
				}
				oBar.style.height=scale2*oBarBox.offsetHeight-11+'px';
				count++;
			};
		}
		////µã»÷ÊÕËõ
		
		
		
		
		
		

	})();
//liuxiu
(function(){
	//滚轮
		var oBox = document.getElementById('box');
		var oDiv1 = document.getElementById('div1');
		var oDiv2 = document.getElementById('div2');
		var oCont = document.getElementById('cont');
		var oBar = document.getElementById('bar');
		oBar.onmousedown=function(ev){
			var oEvent = ev||event;
			var disY = oEvent.clientY-oBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvent = ev||event;
				var t = oEvent.clientY-disY;
				setTop(t);
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oBar.releaseCapture&&oBar.releaseCapture();
			};
			oBar.setCapture&&oBar.setCapture();
			return false;
		};
		function setTop(t){
			if(t<18){
				t=18;
			}else if(t>oDiv2.offsetHeight-oBar.offsetHeight-18){
				t=oDiv2.offsetHeight-oBar.offsetHeight-18;
			}
			oBar.style.top=t+'px';
			var scale = (t-18)/(oDiv2.offsetHeight-oBar.offsetHeight-36);
			oCont.style.top=-scale*(oCont.offsetHeight-oDiv1.offsetHeight)+'px';
		}
		addWheel(oBox,function(bOk){
			var t = oBar.offsetTop;
			if(bOk){
				t+=10;
			}else{
				t-=10;
			}
			setTop(t);
		});
	document.onmousewheel=function(ev){
		oEvent=ev||event;
		oEvent.cancelBubble=true;
	}
	function addWheel(obj,fn){
		function fnWheel(ev){
			var oEvent = ev||event;
			var bDown = true;//true  向下   false   向上
			if(oEvent.wheelDelta){
				//wheelDelta
				if(oEvent.wheelDelta>0){
					bDown=false;
				}else{
					bDown=true;
				}
			}else{
				if(oEvent.detail<0){
					bDown=false;
				}else{
					bDown=true;
				}
			}
			fn&&fn(bDown);
			oEvent.preventDefault&&oEvent.preventDefault();
			return false;
		}
		if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		
			obj.addEventListener('DOMMouseScroll',fnWheel,false);
		}else{

			obj.onmousewheel=fnWheel;
		}
	}
	//点击滚轮
		var oLSNrollBarDown=document.getElementById('LSN-rollBarDown');
		var oLSNrollBarUp=document.getElementById('LSN-rollBarUp');
		oLSNrollBarUp.onclick=function(){
			t=oBar.offsetTop;
			t-=10;
			setTop(t);
			return false;
		};
		oLSNrollBarDown.onmousedown=function(){return false;};
		oLSNrollBarDown.onclick=function(){
			t=oBar.offsetTop;
			t+=10;
			setTop(t);
			return false;
		};
	
//移入出现播放图标
	function findInArr(arr,name){
			for(var i=0;i<arr.length;i++){
				if(arr[i]==name)return true;
			}
			return false;
		}
		function getByClass(obj,sClass){
			var result = [];
			if(obj.getElementsByClassName){
				result = obj.getElementsByClassName(sClass);
			}else{
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
		var aUl=getByClass(document,'playerMaskVideo_js');
		
		for (var i = 0; i < aUl.length; i++) {
			var aLi=aUl[i].children;
			for (var j = 0; j< aLi.length; j++) {
				var oA=aLi[j].children[0];
				oA.onmouseover=function(){
					this.children[1].className='lzy_span1';
				};
				oA.onmouseout=function(){
					this.children[1].className=' ';
				};
			}
	
		}//移入出现播放图标

})();
//liuxiu

};
