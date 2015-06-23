function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function jsonp(url,data,cbName,fnSucc){
	var fnName='jsonp_'+Math.random();
	fnName=fnName.replace('.','');
	window[fnName]=function(json){
		fnSucc && fnSucc(json);
		
		//删除
		oHead.removeChild(oS);
		window[fnName]=null;
	};
	
	data[cbName]=fnName;
	
	
	var oS=document.createElement('script');	
	oS.src=url+'?'+json2url(data);
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
	
}