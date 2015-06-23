// JavaScript Document
window.onload=function(){
	//Ã…Ã‹ÃŽÂ°Â¿Âµ
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
		};
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
		/*(function(){
			var oNav=document.getElementById('nav');
			var oAttachB=document.getElementById('attachBar');
			var oNavT=oNav.offsetTop;
			window.onscroll=function(){
				var LSNscrollT=document.documentElement.scrollTop||document.body.scrollTop;
				if (LSNscrollT>oNavT) {
					if (window.navigator.userAgent.indexOf('MSIE 6.0')!=-1) {
						oNav.style.position='absolute';
						oNav.style.left=0;
						oNav.style.top=LSNscrollT+'px';
						oAttachB.style.display='block';
					}else{
						oNav.style.position='fixed';
						oNav.style.left=0;
						oNav.style.top=0;
						oAttachB.style.display='block';
					}
				}else{
					oNav.style.position=' ';
					oAttachB.style.display='none';
				}
			};


		})();*/
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
		}
	})();
	
	//liuXiu
	(function(){
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
			if(t<0){
				t=0;
			}else if(t>oDiv2.offsetHeight-oBar.offsetHeight){
				t=oDiv2.offsetHeight-oBar.offsetHeight;
			}
			oBar.style.top=t+'px';
			var scale = t/(oDiv2.offsetHeight-oBar.offsetHeight);
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
	
//mine
	
	
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
	
		}
	})();
		
	
=======
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
>>>>>>> .r48

<<<<<<< .mine
	function addWheel(obj,fn){
		function fnWheel(ev){
			var oEvent = ev||event;
			var bDown = true;//true  å‘ä¸‹   false   å‘ä¸Š
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
=======
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



//////////////////////////////////////////////	//AS
(function(){
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
			};


				tab('box');
				tab('box1');
				tab('box2');
				tab('box3');
				tab('box4');
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



				
				dot('port','as_move');
				dot('port1','as_move1');
				dot('port2','as_move2');
				dot('port3','as_move3');
				dot('port4','as_move4');
				function dot(sName1,sName2){
					var count=0;
					var oP = document.getElementById(sName1);
					var oAs = document.getElementById(sName2);
					oP.onclick=function(){

						if(count%2){
							oAs.style.display='block';
						}else{
							oAs.style.display='none';
						}
						count++;
					};
				}
		

})();
>>>>>>> .r48
};
