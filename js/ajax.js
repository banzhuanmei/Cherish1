function json2url(json){
	json.t=Math.random();
	
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}

function ajax(json){
	var timer=null;
	json=json||{};
	if(!json.url){
		return;	
	}
	json.type=json.type||'get';
	json.data=json.data||{};
	json.timeout=json.timeout||4000;
	
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest();
	}else{
		var xhr=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
			xhr.open('GET',json.url+'?'+json2url(json.data),true);
			xhr.send();
			break;
		case 'post':
			xhr.open('POST',json.url,true);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
			xhr.send(json2url(json.data));
			break;
	}
	
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			clearTimeout(timer);
			if(xhr.status>=200&&xhr.status<300||xhr.status==304){
				json.success&&json.success(xhr.responseText);	
			}else{
				json.error&&json.error(xhr.status);
			}
		}
	};
	
	timer=setTimeout(function(){
		alert('网络超时');
		xhr.onreadystatechange=null;
	},json.timeout);
	
}	