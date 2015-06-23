// JavaScript Document
window.onload=function(){
	
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
	
	
	
	//Ëïº£Ñó
	(function(){
			var oTvList=document.getElementById('Hy-tvList');
			var oTvListBox=document.getElementById('Hy-tvListBox');
			
			var oScroll=oTvListBox.children[1];
			var oBar=oScroll.children[1];
			
		
			oBar.onmousedown=function(ev){
					var oEvent=ev||event;
					
					var disY=oEvent.clientY-oBar.offsetTop;
					
					document.onmousemove=function(ev){
						var oEvent=ev||event;
						var t=oEvent.clientY-disY;
						if(t<0)
						{
							t=0;
						}else if(t>oTvListBox.offsetHeight-oBar.offsetHeight)
						{
							t=oTvListBox.offsetHeight-oBar.offsetHeight;
						}
						
						oBar.style.top=t+'px';
						var scale=t/(oScroll.offsetHeight-oBar.offsetHeight);
						
						oTvList.style.top=-scale*(oTvList.offsetHeight-oTvListBox.offsetHeight)+'px';
					}
					document.onmouseup=function(ev){
						document.onmousemove=null;
						document.onmouseup=null;
						oBar.releaseCapture&&oBar.releaseCapture();
					}
					oBar.setCapture&&oBar.setCapture();
					
					return false;
			}
			
			var aLi=oTvList.children[1].children;
			
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].onmouseover=function(){
					this.className='active'
				}
				aLi[i].onmouseout=function(){
					this.className='';
				}
			}
		})();
	
	
		
	// LSN liuxiu
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
		};
		oLSNrollBarDown.onmousedown=function(){return false;};
		oLSNrollBarDown.onclick=function(){
			t=oBar.offsetTop;
			t+=10;
			setTop(t);
			
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

};
