!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(b){"use strict";var c=b.AV=b.AV||{};c.realtime=a("./realtime")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./realtime":2}],2:[function(a,b,c){(function(d){"use strict";var e=a("./tool"),f=e.ajax,g=e.extend,h="2.3.5",i={heartbeatsTime:6e4,WebSocket:a("ws")},j={},k={open:"open",reuse:"reuse",close:"close",create:"create",join:"join",left:"left",invited:"invited",kicked:"kicked",membersjoined:"membersjoined",membersleft:"membersleft",message:"message",receipt:"receipt",update:"update",error:"error"},l=function(a){var b=function(b,c,d,e){var f,g,h,i=[];switch("string"==typeof c?i.push(c):i=c,f={cid:b,members:i,serialId:j.getSerialId(a)},e){case"add":h="conv-added",j.convAdd(a,f);break;case"remove":h="conv-removed",j.convRemove(a,f)}return g=function(b){b.i===f.serialId&&(d&&d(b),a.ec.off(h,g))},a.ec.on(h,g),this};return{id:"",attr:{},add:function(a,c){return b(this.id,a,c,"add"),this},remove:function(a,c){return b(this.id,a,c,"remove"),this},join:function(b){return this.add(a.options.peerId,b),this},leave:function(b){return this.remove(a.options.peerId,b),this},send:function(b,c,d){var e,f={},g=this;switch(arguments.length){case 2:e=c;break;case 3:f=c,e=d}if(f.cid=g.id,f.serialId=j.getSerialId(a),f.type?f.data=j.setMediaMsg(a,f.type,b):"string"==typeof b?f.data=b:f.data=JSON.stringify(b),f.receipt&&(f.receipt=1),!f["transient"]){var h=function i(b){b.i===f.serialId&&(e&&e(b),a.ec.off("ack",i))};a.ec.on("ack",h)}return j.send(a,f,e),this},log:function(b,c){var d={};switch(arguments.length){case 1:c=b;break;case 2:d=b}d.cid=d.cid||this.id,d.serialId=d.serialId||j.getSerialId(a);var e=function f(b){if(b.i===d.serialId){if(c){for(var e=0,g=b.logs.length;g>e;e++)b.logs[e].data=j.getMediaMsg(a,b.logs[e].data),b.logs[e].fromPeerId=b.logs[e].from,b.logs[e].msg=b.logs[e].data;c(b.logs)}a.ec.off("logs",f)}};return a.ec.on("logs",e),j.convLog(a,d),this},receive:function(b){var c=this.id;return a.ec.on(k.message,function(a){c===a.cid&&b(a)}),this},receipt:function(b){var c=this.id;return a.ec.on(k.receipt,function(a){c===a.cid&&b(a)}),this},list:function(b){var c={},d=this.id;c.where={objectId:d},c.serialId=j.getSerialId(a);var e=function f(d){d.i===c.serialId&&(b&&b(d.results.length?d.results[0].m:[]),a.ec.off("conv-results",f))};return a.ec.on("conv-results",e),j.convQuery(a,c),this},count:function(b){var c=this.id,d={cid:c,serialId:j.getSerialId(a)},e=function f(c){c.i===d.serialId&&(b&&b(c.count),a.ec.off("conv-result",f))};return a.ec.on("conv-result",e),j.convCount(a,d),this},update:function(b,c){var d=this.id,e={cid:d,data:b,serialId:j.getSerialId(a)},f=function g(b){b.i===e.serialId&&(c&&c(b),a.ec.off("conv-updated",g))};return a.ec.on("conv-updated",f),j.convUpdate(a,e),this}}},m=function(){var a={options:void 0,ws:void 0,ec:void 0,conv:{},openFlag:!1,closeFlag:!1,reuseTimer:void 0,reuseFlag:!1,serialId:2015};return{clientId:"",cache:a,open:function(a){var b=this,c=this.cache;return c.closeFlag=!1,j.getServer(c,c.options,function(a){a&&j.connect(c,{server:c.server})}),a&&c.ec.once(k.open,a),c.ec.once(k.reuse,function(){c.reuseTimer&&clearTimeout(c.reuseTimer),c.reuseTimer=setTimeout(function(){b.open()},5e3)}),this},close:function(){var a=this.cache;if(!a.openFlag)throw new Error("Must call after open() has successed.");return a.closeFlag=!0,j.closeSession(a),a.ws.close(),this},on:function(a,b){return this.cache.ec.on(a,b),this},once:function(a,b){return this.cache.ec.once(a,b),this},emit:function(a,b){return this.cache.ec.emit(a,b),this},off:function(a,b){return this.cache.ec.off(a,b),this},room:function(a,b){var c=this.cache;if(!c.openFlag)throw new Error("Must call after open() has successed.");var d;if("string"==typeof a){var e=a;d=c.conv[e]?c.conv[e]:l(c),this.query({where:{objectId:e}},function(a){a.length&&(d.id=e,d.name=a[0].name,d.attr=a[0].attr,c.conv[e]=d),b&&b(a.length?d:null)})}else{if(!a)throw new Error("Createing room must have a callback function.");var f;"function"==typeof a?b=a:f=a,f={name:f.name||"",members:f.members||[],attr:f.attr||{},"transient":f["transient"]||!1,unique:f.unique||!1,serialId:j.getSerialId(c)},d=l(c),j.startConv(c,f,b);var g=function h(a){a.i===f.serialId&&(d.id=a.cid,d.name=f.name,d.attr=f.attr,c.conv[d.id]=d,b&&b(d),c.ec.emit(k.create,a),c.ec.off("conv-started",h))};c.ec.on("conv-started",g)}return d},conv:function(){return this.room.apply(this,arguments)},query:function(a,b){var c=this.cache;if(!c.openFlag)throw new Error("Must call after open() has successed.");var d={};switch(arguments.length){case 1:b=a;break;case 2:d=a}d.serialId=j.getSerialId(c);var e=function f(a){a.i===d.serialId&&(b&&b(a.results),c.ec.off("conv-results",f))};return c.ec.on("conv-results",e),d.where||(d.where={},d.where.m=c.options.peerId),j.convQuery(c,d),this},ping:function(a,b){var c=this.cache;if(!c.openFlag)throw new Error("Must call after open() has successed.");if(!b)throw new Error("Ping must have callback.");var d=[];"string"==typeof a?d.push(a):d=a;var e={serialId:j.getSerialId(c),peerIdList:d},f=function g(a){a.i===e.serialId&&(b(a.onlineSessionPeerIds),c.ec.off("session-query-result",g))};return c.ec.on("session-query-result",f),j.querySession(c,e),this}}},n=function(a,b){if("object"!=typeof a)throw new Error("realtime need a argument at least.");if(!a.appId)throw new Error("Options must have appId.");if(i.WebSocket){var c=i.WebSocket.loadFlashPolicyFile?!1:!0;a={appId:a.appId,peerId:a.clientId,encodeHTML:a.encodeHTML||!1,auth:a.auth,secure:"undefined"==typeof a.secure?c:a.secure,region:a.region||"cn"};var d=m();return d.clientId=a.peerId,d.cache.options=a,d.cache.ec=e.eventCenter(),d.cache.authFun=a.auth,d.open(b),d}console.error("Browser must support WebSocket, please read LeanCloud doc and use plugin.")};n.version=h,n._tool=e,n._engine=j,n.config=function(a){g(i,a)},j.wsOpen=function(a){j.bindEvent(a),j.openSession(a,{serialId:j.getSerialId(a)}),j.heartbeats(a),j.guard(a)},j.wsClose=function(a,b){a.ec.emit(k.close,b)},j.wsMessage=function(a,b){var c=JSON.parse(b.data);if(c.cmd){var d=c.cmd;c.op&&(d+="-"+c.op),a.ec.emit(d,c)}},j.wsError=function(a,b){throw a.ec.emit(k.error,b),b},j.wsSend=function(a,b){if(!a.closeFlag){if(!a.ws)throw new Error('The realtimeObject must opened first. Please listen to the "open" event.');b.peerId=a.options.peerId,a.ws.send(JSON.stringify(b))}},j.createSocket=function(a,b){a.ws&&a.ws.close();var c=new i.WebSocket(b);a.ws=c,c.addEventListener("open",function(){j.wsOpen(a)}),c.addEventListener("close",function(b){j.wsClose(a,b)}),c.addEventListener("message",function(b){j.wsMessage(a,b)}),c.addEventListener("error",function(b){j.wsError(a,b)})},j.heartbeats=function(a){if(!a.openFlag){var b;a.ws.addEventListener("message",function(){b&&clearTimeout(b),b=setTimeout(function(){a.ws.send("{}")},i.heartbeatsTime)})}},j.guard=function(a){if(!a.openFlag){var b,c=18e4;a.ws.addEventListener("message",function(){b&&clearTimeout(b),b=setTimeout(function(){a.closeFlag||a.reuseFlag||(a.reuseFlag=!0,a.ec.emit(k.reuse))},c)}),a.ec.on(k.close+" session-closed",function(){a.closeFlag||a.reuseFlag||(a.reuseFlag=!0,a.ec.emit(k.reuse))})}},j.connect=function(a,b){var c=b.server;if(!(c&&e.now()<=c.expires))throw a.ec.emit(k.error),new Error("WebSocket connet failed.");j.createSocket(a,c.server)},j.getServer=function(a,b,c){var g=b.appId,h=b.secure,i="",j="http://";d.location&&"https:"===d.location.protocol&&h&&(j="https://");var l="";switch(b.region){case"cn":l="g0";break;case"us":l="a0";break;default:throw new Error("There is no this region.")}i=j+"router-"+l+"-push.leancloud.cn/v1/route",i+="?_t="+e.now()+"&appId="+g,h&&(i+="&secure=1"),f(i,function(b,d){d?(d.expires=e.now()+1e3*d.ttl,a.server=d,c(d)):a.ec.emit(k.error)})},j.openSession=function(a,b){var c={cmd:"session",op:"open",appId:a.options.appId,ua:"js/"+h,i:b.serialId};a.authFun?a.authFun({clientId:a.options.peerId},function(b){if(!b||!b.signature)throw new Error("Session open denied by application: "+b);c.n=b.nonce,c.t=b.timestamp,c.s=b.signature,j.wsSend(a,c)}):j.wsSend(a,c)},j.closeSession=function(a){j.wsSend(a,a,{cmd:"session",op:"close"})},j.startConv=function(a,b){var c={cmd:"conv",op:"start",m:b.members,attr:{name:b.name||"",attr:b.attr||{}},i:b.serialId,unique:b.unique||!1,"transient":b["transient"]||!1};a.authFun?a.authFun({clientId:a.options.peerId,members:b.members},function(b){if(!b||!b.signature)throw new Error("Conversation creation denied by application: "+b);c.n=b.nonce,c.t=b.timestamp,c.s=b.signature,j.wsSend(a,c)}):j.wsSend(a,c)},j.convAdd=function(a,b){var c={cmd:"conv",op:"add",cid:b.cid,m:b.members,i:b.serialId};a.authFun?a.authFun({clientId:a.options.peerId,members:b.members,convId:b.cid,action:"invite"},function(b){if(!b||!b.signature)throw new Error("Adding members to conversation denied by application: "+b);c.n=b.nonce,c.t=b.timestamp,c.s=b.signature,j.wsSend(a,c)}):j.wsSend(a,c)},j.convRemove=function(a,b){var c={cmd:"conv",op:"remove",cid:b.cid,m:b.members,i:b.serialId};a.authFun&&(b.members.length>1||b.members[0]!=a.options.peerId)?a.authFun({clientId:a.options.peerId,members:b.members,convId:b.cid,action:"kick"},function(b){if(!b||!b.signature)throw new Error("Removing members from conversation denied by application: "+b);c.n=b.nonce,c.t=b.timestamp,c.s=b.signature,j.wsSend(a,c)}):j.wsSend(a,c)},j.send=function(a,b){j.wsSend(a,{cmd:"direct",cid:b.cid,msg:b.data,i:b.serialId,r:b.receipt||!1,"transient":b["transient"]||!1})},j.convQuery=function(a,b){b=b||{};var c=b.where||{};c.m&&"string"!=typeof c.m&&(c.m={$all:c.m}),(c.roomIds||c.convIds)&&(c.objectId={$in:c.roomIds||c.convIds},delete c.roomIds,delete c.convIds),j.wsSend(a,{cmd:"conv",op:"query",where:c,sort:b.sort||"-lm",limit:b.limit||10,skip:b.skip||0,i:b.serialId})},j.querySession=function(a,b){j.wsSend(a,{cmd:"session",op:"query",i:b.serialId,sessionPeerIds:b.peerIdList})},j.convLog=function(a,b){j.wsSend(a,{cmd:"logs",cid:b.cid,t:b.t||void 0,mid:b.mid||void 0,limit:b.limit||20,i:b.serialId})},j.convUpdate=function(a,b){j.wsSend(a,{cmd:"conv",op:"update",cid:b.cid,attr:b.data,i:b.serialId})},j.convAck=function(a,b){j.wsSend(a,{cmd:"ack",cid:b.cid,mid:b.mid})},j.convCount=function(a,b){j.wsSend(a,{cmd:"conv",op:"count",i:b.serialId,cid:b.cid})},j.getMediaMsg=function(a,b){if(!e.isJSONString(b))return a.options.encodeHTML&&(b=e.encodeHTML(b)),b;if(b=JSON.parse(b),!b.hasOwnProperty("_lctype"))return b;var c={text:b._lctext,attr:b._lcattrs};switch(a.options.encodeHTML&&(c.text=e.encodeHTML(b._lctext)),b._lcfile&&b._lcfile.url&&(c.url=b._lcfile.url),b._lcfile&&b._lcfile.metaData&&(c.metaData=b._lcfile.metaData),b._lctype){case-1:c.type="text";break;case-2:c.type="image";break;case-3:c.type="audio";break;case-4:c.type="video";break;case-5:c.type="location",b._lcloc&&(c.location=b._lcloc);break;case-6:c.type="file";break;default:c=b}return c},j.setMediaMsg=function(a,b,c){var d;if("text"!==b&&!c.metaData)throw new Error("Media Data must have metaData attribute.");switch(b){case"text":d={_lctype:-1,_lctext:c.text,_lcattrs:c.attr};break;case"image":d={_lctype:-2,_lctext:c.text,_lcattrs:c.attr,_lcfile:{url:c.url,objId:c.objectId,metaData:{name:c.metaData.name,format:c.metaData.format,height:c.metaData.height,width:c.metaData.width,size:c.metaData.size}}};break;case"audio":d={_lctype:-3,_lctext:c.text,_lcattrs:c.attr,_lcfile:{url:c.url,objId:c.objectId,metaData:{name:c.metaData.name,format:c.metaData.format,duration:c.metaData.duration,size:c.metaData.size}}};break;case"video":d={_lctype:-4,_lctext:c.text,_lcattrs:c.attr,_lcfile:{url:c.url,objId:c.objectId,metaData:{name:c.metaData.name,format:c.metaData.format,duration:c.metaData.duration,size:c.metaData.size}}};break;case"location":d={_lctype:-5,_lctext:c.text,_lcattrs:c.attr,_lcloc:{longitude:c.metaData.longitude,latitude:c.metaData.latitude}};break;case"file":d={_lctype:-6,_lctext:c.text,_lcattrs:c.attr,_lcfile:{name:c.metaData.name,size:c.metaData.size}}}return d=JSON.stringify(d)},j.getSerialId=function(a){return a.serialId++,a.serialId>999999&&(a.serialId=2015),a.serialId},j.bindEvent=function(a){a.openFlag||(a.ec.on("session-opened",function(b){a.reuseFlag=!1,a.openFlag=!0,a.ec.emit(k.open,b)}),a.ec.on("session-error",function(b){a.ec.emit(k.error,b)}),a.ec.on("conv-joined",function(b){b.peerId!==b.initBy&&a.ec.emit(k.join,b),a.ec.emit(k.invited,b)}),a.ec.on("conv-left",function(b){a.ec.emit(k.left,b),a.ec.emit(k.kicked,b)}),a.ec.on("conv-members-joined",function(b){a.ec.emit(k.join,b),a.ec.emit(k.membersjoined,b)}),a.ec.on("conv-members-left",function(b){a.ec.emit(k.left,b),a.ec.emit(k.membersleft,b)}),a.ec.on("conv-error",function(b){throw a.ec.emit(k.error,b),b.code+":"+b.reason}),a.ec.on("direct",function(b){b.msg=j.getMediaMsg(a,b.msg),b["transient"]||j.convAck(a,{cid:b.cid,mid:b.id}),a.ec.emit(k.message,b)}),a.ec.on("rcp",function(b){a.ec.emit(k.receipt,b)}))},"undefined"!=typeof c?("undefined"!=typeof b&&b.exports&&(c=b.exports=n),c.realtime=n):"function"==typeof define&&define.amd&&define("AV/realtime",[],function(){return n})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./tool":6,ws:8}],3:[function(a,b,c){(function(c){"use strict";b.exports=function(b,d){"string"==typeof b&&(b={url:b});var e=b.url,f=b.method||"get",g=a("./xmlhttprequest").XMLHttpRequest,h=new g;c.XDomainRequest&&(h=new c.XDomainRequest),h.open(f,e),h.onload=function(a){h.status>=200&&h.status<300||c.XDomainRequest&&!h.status?d(null,JSON.parse(h.responseText)):d(JSON.parse(h.responseText))},h.onerror=function(a){throw d(a||{}),new Error("Network error.")},h.onprogress=function(){},h.ontimeout=function(){},h.timeout=0;var i=JSON.stringify(b.data);h.send(i)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./xmlhttprequest":7}],4:[function(a,b,c){"use strict";b.exports=function(){function a(a){var b=[],c=0,d=a.length;if(d){for(;d>c;c++)a[c]&&b.push(a[c]);return b}return null}var b={},c={},d=function(a,d,e){if(!a)throw new Error("No event name.");if(!d)throw new Error("No callback function.");var f,g,h,i=a.split(/\s+/);e&&(g=e.once,h=e.single),f=g?c:b;for(var j=0,k=i.length;k>j;j++)if(i[j]){var l=f[i[j]];if(l||(l=[],f[i[j]]=l),h){for(var m=!1,n=0,o=l.length;o>n;n++)if(l[n].toString()===d.toString()){m=!0;break}m||l.push(d)}else l.push(d)}},e=function(a,d,e){var f,g;if(e&&(g=e.once),f=g?c:b,f[a])for(var h=0,i=f[a].length;i>h;h++)if(f[a][h]===d){f[a][h]=null;break}};return{on:function(a,b){return d(a,b),this},once:function(a,b){return d(a,b,{once:!0}),this},_one:function(a,b){d(a,b,{single:!0})},emit:function(d,f){if(!d)throw new Error("No emit event name.");var g=0,h=0;if(b[d]){for(g=0,h=b[d].length;h>g;g++)b[d][g]&&b[d][g].call(this,f);b[d]=a(b[d])}if(c[d]){for(g=0,h=c[d].length;h>g;g++)c[d][g]&&(c[d][g].call(this,f),e(d,c[d][g],{once:!0}));c[d]=a(c[d])}return this},off:function(a,b){return e(a,b),this}}}},{}],5:[function(a,b,c){"use strict";var d=Object.prototype.hasOwnProperty,e=Object.prototype.toString,f=function(a){return"function"==typeof Array.isArray?Array.isArray(a):"[object Array]"===e.call(a)},g=function(a){if(!a||"[object Object]"!==e.call(a))return!1;var b=d.call(a,"constructor"),c=a.constructor&&a.constructor.prototype&&d.call(a.constructor.prototype,"isPrototypeOf");if(a.constructor&&!b&&!c)return!1;var f;for(f in a);return"undefined"==typeof f||d.call(a,f)};b.exports=function h(){var a,b,c,d,e,i,j=arguments[0],k=1,l=arguments.length,m=!1;for("boolean"==typeof j?(m=j,j=arguments[1]||{},k=2):("object"!=typeof j&&"function"!=typeof j||null===j)&&(j={});l>k;++k)if(a=arguments[k],null!==a)for(b in a)c=j[b],d=a[b],j!==d&&(m&&d&&(g(d)||(e=f(d)))?(e?(e=!1,i=c&&f(c)?c:[]):i=c&&g(c)?c:{},j[b]=h(m,i,d)):"undefined"!=typeof d&&(j[b]=d));return j}},{}],6:[function(a,b,c){"use strict";var d={};d.ajax=a("./ajax"),d.extend=a("./extend"),d.eventCenter=a("./eventcenter"),d.noop=function(){},d.isJSONString=function(a){return/^\{.*\}$/.test(a)},d.now=function(){return(new Date).getTime()},d.encodeHTML=function(a){var b=function(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):a};if("object"==typeof a){for(var c in a)a[c]=d.encodeHTML(a[c]);return a}return b(a)},b.exports=d},{"./ajax":3,"./eventcenter":4,"./extend":5}],7:[function(a,b,c){"use strict";c.XMLHttpRequest=window.XMLHttpRequest||window.XDomainRequest},{}],8:[function(a,b,c){function d(a,b,c){var d;return d=b?new f(a,b):new f(a)}var e=function(){return this}(),f=e.WebSocket||e.MozWebSocket;b.exports=f?d:null,f&&(d.prototype=f.prototype)},{}]},{},[1]);