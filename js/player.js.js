// JavaScript Document
window.onload=function(){
	//≈ÀŒ∞øµ
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
	
	
	//ÀÔ∫£—Û
	(function(){
		var oListBox=document.getElementById('listBox');
		var oList=document.getElementById('list');
		var oH4=oList.getElementsByTagName('h4')[0];
		var oDot=oH4.getElementsByTagName('span')[2];
		
		var oHistory=document.getElementById('p-history');
		var oHis_show=oHistory.getElementsByTagName('ul')[0];
		var aLi=oHis_show.children;
		
		var count=0;
		
		var oScroll=oList.children[0];
		var oBar=oScroll.getElementsByTagName('div')[0];
		
		
		oDot.onclick=function(){
			if(count%2)
			{
				oHis_show.style.display='block'
			}else
			{
				oHis_show.style.display='none'
			}
			count++;
		}
		
		oBar.onmousedown=function(ev){
			var oEvent=ev||event;
			
			var disY=oEvent.clientY-oBar.offsetTop;
			
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;
				if(t<0)
				{
					t=0;
				}else if(t>oList.offsetHeight-oBar.offsetHeight)
				{
					t=oList.offsetHeight-oBar.offsetHeight;
				}
				
				oBar.style.top=t+'px';
				var scale=t/(oScroll.offsetHeight-oBar.offsetHeight);
				oList.style.top=-scale*(oList.offsetHeight-oListBox.offsetHeight)+'px';
			}
			document.onmouseup=function(ev){
				document.onmousemove=null;
				document.onmouseup=null;
				oBar.releaseCapture&&oBar.releaseCapture();
			}
			oBar.setCapture&&oBar.setCapture();
			
			return false;
		}
		
		for(var i=0;i<aLi.length;i++)
		aLi[i].onclick=function(){
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].children[2].className='detail'
			}
			this.children[2].className='detail on';
		}

	})();
	
	

	

};
