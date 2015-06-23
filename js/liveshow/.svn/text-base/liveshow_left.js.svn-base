// JavaScript Document
(function(){
 window.liveshow_left=function(){
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
}
})()