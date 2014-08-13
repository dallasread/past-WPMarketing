/**
 * Copyright (c) 2005 - 2010, James Auldridge
 * All rights reserved.
 *
 * Licensed under the BSD, MIT, and GPL (your choice!) Licenses:
 *  http://code.google.com/p/cookies/wiki/License
 *
 */
var jaaulde=window.jaaulde||{};jaaulde.utils=jaaulde.utils||{};jaaulde.utils.cookies=(function(){var resolveOptions,assembleOptionsString,parseCookies,constructor,defaultOptions={expiresAt:null,path:'/',domain:null,secure:false};resolveOptions=function(options){var returnValue,expireDate;if(typeof options!=='object'||options===null){returnValue=defaultOptions;}else
{returnValue={expiresAt:defaultOptions.expiresAt,path:defaultOptions.path,domain:defaultOptions.domain,secure:defaultOptions.secure};if(typeof options.expiresAt==='object'&&options.expiresAt instanceof Date){returnValue.expiresAt=options.expiresAt;}else if(typeof options.hoursToLive==='number'&&options.hoursToLive!==0){expireDate=new Date();expireDate.setTime(expireDate.getTime()+(options.hoursToLive*60*60*1000));returnValue.expiresAt=expireDate;}if(typeof options.path==='string'&&options.path!==''){returnValue.path=options.path;}if(typeof options.domain==='string'&&options.domain!==''){returnValue.domain=options.domain;}if(options.secure===true){returnValue.secure=options.secure;}}return returnValue;};assembleOptionsString=function(options){options=resolveOptions(options);return((typeof options.expiresAt==='object'&&options.expiresAt instanceof Date?'; expires='+options.expiresAt.toGMTString():'')+'; path='+options.path+(typeof options.domain==='string'?'; domain='+options.domain:'')+(options.secure===true?'; secure':''));};parseCookies=function(){var cookies={},i,pair,name,value,separated=document.cookie.split(';'),unparsedValue;for(i=0;i<separated.length;i=i+1){pair=separated[i].split('=');name=pair[0].replace(/^\s*/,'').replace(/\s*$/,'');try
{value=decodeURIComponent(pair[1]);}catch(e1){value=pair[1];}if(typeof JSON==='object'&&JSON!==null&&typeof JSON.parse==='function'){try
{unparsedValue=value;value=JSON.parse(value);}catch(e2){value=unparsedValue;}}cookies[name]=value;}return cookies;};constructor=function(){};constructor.prototype.get=function(cookieName){var returnValue,item,cookies=parseCookies();if(typeof cookieName==='string'){returnValue=(typeof cookies[cookieName]!=='undefined')?cookies[cookieName]:null;}else if(typeof cookieName==='object'&&cookieName!==null){returnValue={};for(item in cookieName){if(typeof cookies[cookieName[item]]!=='undefined'){returnValue[cookieName[item]]=cookies[cookieName[item]];}else
{returnValue[cookieName[item]]=null;}}}else
{returnValue=cookies;}return returnValue;};constructor.prototype.filter=function(cookieNameRegExp){var cookieName,returnValue={},cookies=parseCookies();if(typeof cookieNameRegExp==='string'){cookieNameRegExp=new RegExp(cookieNameRegExp);}for(cookieName in cookies){if(cookieName.match(cookieNameRegExp)){returnValue[cookieName]=cookies[cookieName];}}return returnValue;};constructor.prototype.set=function(cookieName,value,options){if(typeof options!=='object'||options===null){options={};}if(typeof value==='undefined'||value===null){value='';options.hoursToLive=-8760;}else if(typeof value!=='string'){if(typeof JSON==='object'&&JSON!==null&&typeof JSON.stringify==='function'){value=JSON.stringify(value);}else
{throw new Error('cookies.set() received non-string value and could not serialize.');}}var optionsString=assembleOptionsString(options);document.cookie=cookieName+'='+encodeURIComponent(value)+optionsString;};constructor.prototype.del=function(cookieName,options){var allCookies={},name;if(typeof options!=='object'||options===null){options={};}if(typeof cookieName==='boolean'&&cookieName===true){allCookies=this.get();}else if(typeof cookieName==='string'){allCookies[cookieName]=true;}for(name in allCookies){if(typeof name==='string'&&name!==''){this.set(name,null,options);}}};constructor.prototype.test=function(){var returnValue=false,testName='cT',testValue='data';this.set(testName,testValue);if(this.get(testName)===testValue){this.del(testName);returnValue=true;}return returnValue;};constructor.prototype.setOptions=function(options){if(typeof options!=='object'){options=null;}defaultOptions=resolveOptions(options);};return new constructor();})();(function(){if(window.jQuery){(function($){$.cookies=jaaulde.utils.cookies;var extensions={cookify:function(options){return this.each(function(){var i,nameAttrs=['name','id'],name,$this=$(this),value;for(i in nameAttrs){if(!isNaN(i)){name=$this.attr(nameAttrs[i]);if(typeof name==='string'&&name!==''){if($this.is(':checkbox, :radio')){if($this.attr('checked')){value=$this.val();}}else if($this.is(':input')){value=$this.val();}else
{value=$this.html();}if(typeof value!=='string'||value===''){value=null;}$.cookies.set(name,value,options);break;}}}});},cookieFill:function(){return this.each(function(){var n,getN,nameAttrs=['name','id'],name,$this=$(this),value;getN=function(){n=nameAttrs.pop();return!!n;};while(getN()){name=$this.attr(n);if(typeof name==='string'&&name!==''){value=$.cookies.get(name);if(value!==null){if($this.is(':checkbox, :radio')){if($this.val()===value){$this.attr('checked','checked');}else
{$this.removeAttr('checked');}}else if($this.is(':input')){$this.val(value);}else
{$this.html(value);}}break;}}});},cookieBind:function(options){return this.each(function(){var $this=$(this);$this.cookieFill().change(function(){$this.cookify(options);});});}};$.each(extensions,function(i){$.fn[i]=this;});})(window.jQuery);}})();

window._CA || (window._CA = {});
window.ConvertAlert || (window.ConvertAlert = []);
window.ConvertAlert.visitor || (window.ConvertAlert.visitor = {
	wpmkey: jaaulde.utils.cookies.get("ca_visitor_wpmkey")
});

_CA.debug = false;
_CA.mode = "img";
_CA.url = false;

_CA.log = function(data) {
  if (_CA.debug) {
    return console.log(data);
  }
};

_CA.detectPushes = function() {
  return ConvertAlert.push = function(args) {
    var a;
    a = Array.prototype.push.call(this, args);
    _CA.log("ConvertAlert has received a \"" + args[0] + "\" event.");
    setTimeout(_CA.parseEvents, 20);
    return a;
  };
};

_CA.parseEvents = function() {
  var event, _i, _len;
  for (_i = 0, _len = ConvertAlert.length; _i < _len; _i++) {
    event = ConvertAlert[_i];
    event = ConvertAlert.shift();
    if (event[0] === "url") {
      _CA.url = event[1];
      _CA.log("ConvertAlert url is set to " + _CA.url + ".");
    } else if (event[0] === "mode") {
      _CA.mode = event[1];
      _CA.log("ConvertAlert mode is set to " + _CA.mode + ".");
    } else if (event[0] === "track") {
      _CA.log("ConvertAlert is tracking \"" + event[1].verb + "\".");
			_CA.log(event[1]);
      _CA.track(event[1], event[2]);
    } else if (event[0] === "visitor_wpmkey") {
      ConvertAlert.visitor.wpmkey = event[1];
			jaaulde.utils.cookies.set("ca_visitor_wpmkey", ConvertAlert.visitor.wpmkey, { path: "/" });
      _CA.log("ConvertAlert visitor_wpmkey is set to \"" + ConvertAlert.visitor.wpmkey + "\".");
    } else if (event[0] === "debug") {
      _CA.debug = true;
      _CA.log("ConvertAlert is set to debug mode.");
    }
  }
  return _CA.detectPushes();
};

_CA.track = function(data) {
	data.visitor || (data.visitor = {});
	
	if (typeof data.visitor.wpmkey == "undefined" && ConvertAlert.visitor.wpmkey != null) {
		data.visitor.wpmkey = ConvertAlert.visitor.wpmkey;
	}
	
	_CA.log("ConvertAlert event sent for \"" + data.visitor.wpmkey + "\".")
	
  if (_CA.mode == "post") {
		if (_CA.url.indexOf("admin-ajax.php") != -1) {
			_CA.log("ConvertAlert has detected Wordpress.");
			data.action = "convert_alert_track";
		}
	
		jQuery.post(_CA.url, data, function(response) {
			var json = JSON.parse(response);

			if (json.success) {
				ConvertAlert.visitor = json.visitor;
				jaaulde.utils.cookies.set("ca_visitor_wpmkey", ConvertAlert.visitor.wpmkey, { path: "/" });
				_CA.log("ConvertAlert event was successfully recorded.");
				_CA.log(json);
			} else {
				_CA.log("ConvertAlert event was not recorded.");
			}
		});
	} else if (_CA.mode == "img") {
	  var base64, img, params;
	  params = data;
	  base64 = encodeURIComponent(btoa(JSON.stringify(params)));
	  img = document.createElement("img");
	  img.style.display = "none";
		img.src = _CA.url + base64;
		return document.body.appendChild(img);		
	}
};

_CA.parseEvents();
