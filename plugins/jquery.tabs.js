﻿/**
 * jQuery EasyUI 1.2
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var _3=$(">div.tabs-header",_2);
var _4=0;
$("ul.tabs li",_3).each(function(){
_4+=$(this).outerWidth(true);
});
var _5=$("div.tabs-wrap",_3).width();
var _6=parseInt($("ul.tabs",_3).css("padding-left"));
return _4-_5+_6;
};
function _7(_8){
var _9=$(">div.tabs-header",_8);
var _a=0;
$("ul.tabs li",_9).each(function(){
_a+=$(this).outerWidth(true);
});
if(_a>_9.width()){
$(".tabs-scroller-left",_9).css("display","block");
$(".tabs-scroller-right",_9).css("display","block");
$(".tabs-wrap",_9).addClass("tabs-scrolling");
if($.boxModel==true){
$(".tabs-wrap",_9).css("left",2);
}else{
$(".tabs-wrap",_9).css("left",0);
}
var _b=_9.width()-$(".tabs-scroller-left",_9).outerWidth()-$(".tabs-scroller-right",_9).outerWidth();
$(".tabs-wrap",_9).width(_b);
}else{
$(".tabs-scroller-left",_9).css("display","none");
$(".tabs-scroller-right",_9).css("display","none");
$(".tabs-wrap",_9).removeClass("tabs-scrolling").scrollLeft(0);
$(".tabs-wrap",_9).width(_9.width());
$(".tabs-wrap",_9).css("left",0);
}
};
function _c(_d){
var _e=$.data(_d,"tabs").options;
var cc=$(_d);
if(_e.fit==true){
var p=cc.parent();
_e.width=p.width();
_e.height=p.height();
}
cc.width(_e.width).height(_e.height);
var _f=$(">div.tabs-header",_d);
if($.boxModel==true){
_f.width(_e.width-(_f.outerWidth()-_f.width()));
}else{
_f.width(_e.width);
}
_7(_d);
var _10=$(">div.tabs-panels",_d);
var _11=_e.height;
if(!isNaN(_11)){
if($.boxModel==true){
var _12=_10.outerHeight()-_10.height();
_10.css("height",(_11-_f.outerHeight()-_12)||"auto");
}else{
_10.css("height",_11-_f.outerHeight());
}
}else{
_10.height("auto");
}
var _13=_e.width;
if(!isNaN(_13)){
if($.boxModel==true){
_10.width(_13-(_10.outerWidth()-_10.width()));
}else{
_10.width(_13);
}
}else{
_10.width("auto");
}
};
function _14(_15){
var _16=$.data(_15,"tabs").options;
var tab=_17(_15);
if(tab){
var _18=$(_15).find(">div.tabs-panels");
var _19=_16.width=="auto"?"auto":_18.width();
var _1a=_16.height=="auto"?"auto":_18.height();
tab.panel("resize",{width:_19,height:_1a});
}
};
function _1b(_1c){
var cc=$(_1c);
cc.addClass("tabs-container");
cc.wrapInner("<div class=\"tabs-panels\"/>");
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_1c);
var _1d=[];
var _1e=$(">div.tabs-header",_1c);
$(">div.tabs-panels>div",_1c).each(function(){
var pp=$(this);
_1d.push(pp);
_2b(_1c,pp);
});
$(".tabs-scroller-left, .tabs-scroller-right",_1e).hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(){
var _1f=$.data(_1c,"tabs").options;
if(_1f.fit==true){
_c(_1c);
_14(_1c);
}
return false;
});
return _1d;
};
function _20(_21){
var _22=$.data(_21,"tabs").options;
var _23=$(">div.tabs-header",_21);
var _24=$(">div.tabs-panels",_21);
if(_22.plain==true){
_23.addClass("tabs-header-plain");
}else{
_23.removeClass("tabs-header-plain");
}
if(_22.border==true){
_23.removeClass("tabs-header-noborder");
_24.removeClass("tabs-panels-noborder");
}else{
_23.addClass("tabs-header-noborder");
_24.addClass("tabs-panels-noborder");
}
$(".tabs-scroller-left",_23).unbind(".tabs").bind("click.tabs",function(){
var _25=$(".tabs-wrap",_23);
var pos=_25.scrollLeft()-_22.scrollIncrement;
_25.animate({scrollLeft:pos},_22.scrollDuration);
});
$(".tabs-scroller-right",_23).unbind(".tabs").bind("click.tabs",function(){
var _26=$(".tabs-wrap",_23);
var pos=Math.min(_26.scrollLeft()+_22.scrollIncrement,_1(_21));
_26.animate({scrollLeft:pos},_22.scrollDuration);
});
var _27=$.data(_21,"tabs").tabs;
for(var i=0,len=_27.length;i<len;i++){
var _28=_27[i];
var tab=_28.panel("options").tab;
var _29=_28.panel("options").title;
tab.unbind(".tabs").bind("click.tabs",{title:_29},function(e){
_39(_21,e.data.title);
});
tab.find("a.tabs-close").unbind(".tabs").bind("click.tabs",{title:_29},function(e){
_2a(_21,e.data.title);
return false;
});
}
};
function _2b(_2c,pp,_2d){
_2d=_2d||{};
pp.panel($.extend({},{selected:pp.attr("selected")=="true"},_2d,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_2d.icon?_2d.icon:undefined),onLoad:function(){
$.data(_2c,"tabs").options.onLoad.call(_2c,pp);
}}));
var _2e=pp.panel("options");
var _2f=$(">div.tabs-header",_2c);
var _30=$("ul.tabs",_2f);
var tab=$("<li></li>").appendTo(_30);
var _31=$("<a href=\"javascript:void(0)\" class=\"tabs-inner\"></a>").appendTo(tab);
var _32=$("<span class=\"tabs-title\"></span>").html(_2e.title).appendTo(_31);
var _33=$("<span class=\"tabs-icon\"></span>").appendTo(_31);
if(_2e.closable){
_32.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}
if(_2e.iconCls){
_32.addClass("tabs-with-icon");
_33.addClass(_2e.iconCls);
}
_2e.tab=tab;
};
function _34(_35,_36){
var _37=$.data(_35,"tabs").options;
var _38=$.data(_35,"tabs").tabs;
var pp=$("<div></div>").appendTo($(">div.tabs-panels",_35));
_38.push(pp);
_2b(_35,pp,_36);
_37.onAdd.call(_35,_36.title);
_7(_35);
_20(_35);
_39(_35,_36.title);
};
function _3a(_3b,_3c){
var pp=_3c.tab;
pp.panel($.extend({},_3c.options,{iconCls:(_3c.options.icon?_3c.options.icon:undefined)}));
var _3d=pp.panel("options");
var tab=_3d.tab;
tab.find("span.tabs-icon").attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
tab.find("span.tabs-title").html(_3d.title);
if(_3d.closable){
tab.find("span.tabs-title").addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
tab.find("span.tabs-title").removeClass("tabs-closable");
}
if(_3d.iconCls){
tab.find("span.tabs-title").addClass("tabs-with-icon");
tab.find("span.tabs-icon").addClass(_3d.iconCls);
}else{
tab.find("span.tabs-title").removeClass("tabs-with-icon");
}
_20(_3b);
$.data(_3b,"tabs").options.onUpdate.call(_3b,_3d.title);
};
function _2a(_3e,_3f){
var _40=$.data(_3e,"tabs").options;
var _41=$.data(_3e,"tabs").tabs;
var _42=$.data(_3e,"tabs").selectHis;
var tab=_43(_3e,_3f,true);
if(!tab){
return;
}
if(_40.onBeforeClose.call(_3e,_3f)==false){
return;
}
tab.panel("options").tab.remove();
tab.panel("destroy");
_40.onClose.call(_3e,_3f);
_7(_3e);
for(var i=0;i<_42.length;i++){
if(_42[i]==_3f){
_42.splice(i,1);
i--;
}
}
var _44=_42.pop();
if(_44){
_39(_3e,_44);
}else{
if(_41.length){
_39(_3e,_41[0].panel("options").title);
}
}
};
function _43(_45,_46,_47){
var _48=$.data(_45,"tabs").tabs;
for(var i=0;i<_48.length;i++){
var tab=_48[i];
if(tab.panel("options").title==_46){
if(_47){
_48.splice(i,1);
}
return tab;
}
}
return null;
};
function _17(_49){
var _4a=$.data(_49,"tabs").tabs;
for(var i=0;i<_4a.length;i++){
var tab=_4a[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _4b(_4c){
var _4d=$.data(_4c,"tabs").tabs;
for(var i=0;i<_4d.length;i++){
var tab=_4d[i];
if(tab.panel("options").selected){
_39(_4c,tab.panel("options").title);
return;
}
}
if(_4d.length){
_39(_4c,_4d[0].panel("options").title);
}
};
function _39(_4e,_4f){
var _50=$.data(_4e,"tabs").options;
var _51=$.data(_4e,"tabs").tabs;
var _52=$.data(_4e,"tabs").selectHis;
if(_51.length==0){
return;
}
var _53=_43(_4e,_4f);
if(!_53){
return;
}
var _54=_17(_4e);
if(_54){
_54.panel("close");
_54.panel("options").tab.removeClass("tabs-selected");
}
_53.panel("open");
var tab=_53.panel("options").tab;
tab.addClass("tabs-selected");
var _55=$(_4e).find(">div.tabs-header div.tabs-wrap");
var _56=tab.position().left+_55.scrollLeft();
var _57=_56-_55.scrollLeft();
var _58=_57+tab.outerWidth();
if(_57<0||_58>_55.innerWidth()){
var pos=Math.min(_56-(_55.width()-tab.width())/2,_1(_4e));
_55.animate({scrollLeft:pos},_50.scrollDuration);
}else{
var pos=Math.min(_55.scrollLeft(),_1(_4e));
_55.animate({scrollLeft:pos},_50.scrollDuration);
}
_14(_4e);
_52.push(_4f);
_50.onSelect.call(_4e,_4f);
};
function _59(_5a,_5b){
return _43(_5a,_5b)!=null;
};
$.fn.tabs=function(_5c,_5d){
if(typeof _5c=="string"){
return $.fn.tabs.methods[_5c](this,_5d);
}
_5c=_5c||{};
return this.each(function(){
var _5e=$.data(this,"tabs");
var _5f;
if(_5e){
_5f=$.extend(_5e.options,_5c);
_5e.options=_5f;
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_5c),tabs:_1b(this),selectHis:[]});
}
_20(this);
_c(this);
var _60=this;
setTimeout(function(){
_4b(_60);
},0);
});
};
$.fn.tabs.methods={options:function(jq){
return $.data(jq[0],"tabs").options;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq){
return jq.each(function(){
_c(this);
_14(this);
});
},add:function(jq,_61){
return jq.each(function(){
_34(this,_61);
});
},close:function(jq,_62){
return jq.each(function(){
_2a(this,_62);
});
},getTab:function(jq,_63){
return _43(jq[0],_63);
},getSelected:function(jq){
return _17(jq[0]);
},select:function(jq,_64){
return jq.each(function(){
_39(this,_64);
});
},exists:function(jq,_65){
return _59(jq[0],_65);
},update:function(jq,_66){
return jq.each(function(){
_3a(this,_66);
});
}};
$.fn.tabs.parseOptions=function(_67){
var t=$(_67);
return {width:(parseInt(_67.style.width)||undefined),height:(parseInt(_67.style.height)||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),plain:(t.attr("plain")?t.attr("plain")=="true":undefined)};
};
$.fn.tabs.defaults={width:"auto",height:"auto",plain:false,fit:false,border:true,scrollIncrement:100,scrollDuration:400,onLoad:function(_68){
},onSelect:function(_69){
},onBeforeClose:function(_6a){
},onClose:function(_6b){
},onAdd:function(_6c){
},onUpdate:function(_6d){
}};
})(jQuery);
