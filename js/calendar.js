// JavaScript Document
(function(){
	window.myCalendar = function (sName){
		var calenBox= document.getElementById(sName);
		calenBox.innerHTML='<a href="javascript:;" class="prev"><<</a><h3>2015年05月</h3><a href="javascript:;" class="next">>></a><ol><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li class="weekend">六</li><li class="weekend">日</li></ol><ul></ul>';
		var oH3 = calenBox.getElementsByTagName('h3')[0];
		var oPrev = calenBox.getElementsByTagName('a')[0];
		var oNext = calenBox.getElementsByTagName('a')[1];
		var oUl = calenBox.getElementsByTagName('ul')[0];
		var aLi = oUl.children;
		var iNow = 0;
		function calendar(){
			var oDate = new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oH3.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
			oUl.innerHTML='';
			//插空格
			var oDate = new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oDate.setDate(1);
			var w = oDate.getDay();
			if(w==0){w=7};
			w--;
			for(var i=0;i<w;i++){
				var oLi = document.createElement('li');
				oUl.appendChild(oLi);
			}
			//插入日期
			var oDate = new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oDate.setMonth(oDate.getMonth()+1,0);
			var n = oDate.getDate();
			for(var i=0;i<n;i++){
				var oLi = document.createElement('li');
				oLi.innerHTML=i+1;
				oUl.appendChild(oLi);
				oLi.onmouseover=function(){
					this.style.background='#83d6df';
				};
				oLi.onmouseout=function(){
					this.style.background='';
				};
			}
			if(iNow==0){
				var oDate = new Date();
				var today = oDate.getDate();
				for(var i=0;i<aLi.length;i++){
					if(aLi[i].innerHTML<today){
						aLi[i].className='past';
					}else if(aLi[i].innerHTML==today){
						aLi[i].className='today';
					}
				}
			}else if(iNow<0){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className='past';
				}
			}
		}
		calendar();
		//上个月
		oPrev.onclick=function(){
			iNow--;
			calendar();
		};
		//下个月
		oNext.onclick=function(){
			iNow++;
			calendar();
		};
	}
	var oLink = document.createElement('link');
	oLink.rel='stylesheet';
	oLink.href='css/calendar.css';
	var oHead = document.getElementsByTagName('head')[0];
	oHead.appendChild(oLink);
})();