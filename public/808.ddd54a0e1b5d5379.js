(self.webpackChunkFrontEnd_Historial_Clinico=self.webpackChunkFrontEnd_Historial_Clinico||[]).push([[808],{3808:v=>{window,v.exports=function(E){var c={};function n(i){if(c[i])return c[i].exports;var a=c[i]={i,l:!1,exports:{}};return E[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=E,n.c=c,n.d=function(i,a,d){n.o(i,a)||Object.defineProperty(i,a,{enumerable:!0,get:d})},n.r=function(i){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},n.t=function(i,a){if(1&a&&(i=n(i)),8&a||4&a&&"object"==typeof i&&i&&i.__esModule)return i;var d=Object.create(null);if(n.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:i}),2&a&&"string"!=typeof i)for(var y in i)n.d(d,y,function(o){return i[o]}.bind(null,y));return d},n.n=function(i){var a=i&&i.__esModule?function(){return i.default}:function(){return i};return n.d(a,"a",a),a},n.o=function(i,a){return Object.prototype.hasOwnProperty.call(i,a)},n.p="",n(n.s=0)}({"./src/index.js":
/*!**********************!*\
                !*** ./src/index.js ***!
                \**********************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c),n(
/*! ./sass/index.scss */
"./src/sass/index.scss");var y=n(
/*! ./js/init */
"./src/js/init.js").default.init;typeof window<"u"&&(window.printJS=y),c.default=y},"./src/js/browser.js":
/*!***************************!*\
                !*** ./src/js/browser.js ***!
                \***************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i={isFirefox:function(){return typeof InstallTrigger<"u"},isIE:function(){return-1!==navigator.userAgent.indexOf("MSIE")||!!document.documentMode},isEdge:function(){return!i.isIE()&&!!window.StyleMedia},isChrome:function(){return!!(arguments.length>0&&void 0!==arguments[0]?arguments[0]:window).chrome},isSafari:function(){return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0||-1!==navigator.userAgent.toLowerCase().indexOf("safari")},isIOSChrome:function(){return-1!==navigator.userAgent.toLowerCase().indexOf("crios")}};c.default=i},"./src/js/functions.js":
/*!*****************************!*\
                !*** ./src/js/functions.js ***!
                \*****************************/
/*! exports provided: addWrapper, capitalizePrint, collectStyles, addHeader, cleanUp, isRawHTML */function(E,c,n){"use strict";n.r(c),n.d(c,"addWrapper",function(){return y}),n.d(c,"capitalizePrint",function(){return o}),n.d(c,"collectStyles",function(){return l}),n.d(c,"addHeader",function(){return e}),n.d(c,"cleanUp",function(){return u}),n.d(c,"isRawHTML",function(){return p});var i=n(
/*! ./modal */
"./src/js/modal.js"),a=n(
/*! ./browser */
"./src/js/browser.js");function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(s){return typeof s}:function(s){return s&&"function"==typeof Symbol&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s})(t)}function y(t,f){return'<div style="font-family:'+f.font+" !important; font-size: "+f.font_size+' !important; width:100%;">'+t+"</div>"}function o(t){return t.charAt(0).toUpperCase()+t.slice(1)}function l(t,f){for(var h="",b=(document.defaultView||window).getComputedStyle(t,""),m=0;m<b.length;m++)(-1!==f.targetStyles.indexOf("*")||-1!==f.targetStyle.indexOf(b[m])||r(f.targetStyles,b[m]))&&b.getPropertyValue(b[m])&&(h+=b[m]+":"+b.getPropertyValue(b[m])+";");return h+"max-width: "+f.maxWidth+"px !important; font-size: "+f.font_size+" !important;"}function r(t,f){for(var s=0;s<t.length;s++)if("object"===d(f)&&-1!==f.indexOf(t[s]))return!0;return!1}function e(t,f){var s=document.createElement("div");if(p(f.header))s.innerHTML=f.header;else{var h=document.createElement("h1"),b=document.createTextNode(f.header);h.appendChild(b),h.setAttribute("style",f.headerStyle),s.appendChild(h)}t.insertBefore(s,t.childNodes[0])}function u(t){t.showModal&&i.default.close(),t.onLoadingEnd&&t.onLoadingEnd(),(t.showModal||t.onLoadingStart)&&window.URL.revokeObjectURL(t.printable);var f="mouseover";(a.default.isChrome()||a.default.isFirefox())&&(f="focus");window.addEventListener(f,function h(){window.removeEventListener(f,h),t.onPrintDialogClose();var b=document.getElementById(t.frameId);b&&b.remove()})}function p(t){return new RegExp("<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>").test(t)}},"./src/js/html.js":
/*!************************!*\
                !*** ./src/js/html.js ***!
                \************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./functions */
"./src/js/functions.js"),a=n(
/*! ./print */
"./src/js/print.js");function d(l){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(l)}function y(l,r){for(var e=l.cloneNode(),u=Array.prototype.slice.call(l.childNodes),p=0;p<u.length;p++)if(-1===r.ignoreElements.indexOf(u[p].id)){var t=y(u[p],r);e.appendChild(t)}switch(r.scanStyles&&1===l.nodeType&&e.setAttribute("style",Object(i.collectStyles)(l,r)),l.tagName){case"SELECT":e.value=l.value;break;case"CANVAS":e.getContext("2d").drawImage(l,0,0)}return e}c.default={print:function(r,e){var u=function o(l){return"object"===d(l)&&l&&(l instanceof HTMLElement||1===l.nodeType)}(r.printable)?r.printable:document.getElementById(r.printable);u?(r.printableElement=y(u,r),r.header&&Object(i.addHeader)(r.printableElement,r),a.default.send(r,e)):window.console.error("Invalid HTML element id: "+r.printable)}}},"./src/js/image.js":
/*!*************************!*\
                !*** ./src/js/image.js ***!
                \*************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./functions */
"./src/js/functions.js"),a=n(
/*! ./print */
"./src/js/print.js"),d=n(
/*! ./browser */
"./src/js/browser.js");c.default={print:function(o,l){o.printable.constructor!==Array&&(o.printable=[o.printable]),o.printableElement=document.createElement("div"),o.printable.forEach(function(r){var e=document.createElement("img");e.setAttribute("style",o.imageStyle),e.src=r,d.default.isFirefox()&&(e.src=e.src);var p=document.createElement("div");p.appendChild(e),o.printableElement.appendChild(p)}),o.header&&Object(i.addHeader)(o.printableElement,o),a.default.send(o,l)}}},"./src/js/init.js":
/*!************************!*\
                !*** ./src/js/init.js ***!
                \************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./browser */
"./src/js/browser.js"),a=n(
/*! ./modal */
"./src/js/modal.js"),d=n(
/*! ./pdf */
"./src/js/pdf.js"),y=n(
/*! ./html */
"./src/js/html.js"),o=n(
/*! ./raw-html */
"./src/js/raw-html.js"),l=n(
/*! ./image */
"./src/js/image.js"),r=n(
/*! ./json */
"./src/js/json.js");function e(p){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(f){return typeof f}:function(f){return f&&"function"==typeof Symbol&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f})(p)}var u=["pdf","html","image","json","raw-html"];c.default={init:function(){var t={printable:null,fallbackPrintable:null,type:"pdf",header:null,headerStyle:"font-weight: 300;",maxWidth:800,properties:null,gridHeaderStyle:"font-weight: bold; padding: 5px; border: 1px solid #dddddd;",gridStyle:"border: 1px solid lightgray; margin-bottom: -1px;",showModal:!1,onError:function(j){throw j},onLoadingStart:null,onLoadingEnd:null,onPrintDialogClose:function(){},onIncompatibleBrowser:function(){},modalMessage:"Retrieving Document...",frameId:"printJS",printableElement:null,documentTitle:"Document",targetStyle:["clear","display","width","min-width","height","min-height","max-height"],targetStyles:["border","box","break","text-decoration"],ignoreElements:[],repeatTableHeader:!0,css:null,style:null,scanStyles:!0,base64:!1,onPdfOpen:null,font:"TimesNewRoman",font_size:"12pt",honorMarginPadding:!0,honorColor:!1,imageStyle:"max-width: 100%;"},f=arguments[0];if(void 0===f)throw new Error("printJS expects at least 1 attribute.");switch(e(f)){case"string":t.printable=encodeURI(f),t.fallbackPrintable=t.printable,t.type=arguments[1]||t.type;break;case"object":for(var s in t.printable=f.printable,t.fallbackPrintable=typeof f.fallbackPrintable<"u"?f.fallbackPrintable:t.printable,t.fallbackPrintable=t.base64?"data:application/pdf;base64,".concat(t.fallbackPrintable):t.fallbackPrintable,t)"printable"===s||"fallbackPrintable"===s||(t[s]=typeof f[s]<"u"?f[s]:t[s]);break;default:throw new Error('Unexpected argument type! Expected "string" or "object", got '+e(f))}if(!t.printable)throw new Error("Missing printable information.");if(!t.type||"string"!=typeof t.type||-1===u.indexOf(t.type.toLowerCase()))throw new Error("Invalid print type. Available types are: pdf, html, image and json.");t.showModal&&a.default.show(t),t.onLoadingStart&&t.onLoadingStart();var h=document.getElementById(t.frameId);h&&h.parentNode.removeChild(h);var b=document.createElement("iframe");switch(i.default.isFirefox()?b.setAttribute("style","width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0"):b.setAttribute("style","visibility: hidden; height: 0; width: 0; position: absolute; border: 0"),b.setAttribute("id",t.frameId),"pdf"!==t.type&&(b.srcdoc="<html><head><title>"+t.documentTitle+"</title>",t.css&&(Array.isArray(t.css)||(t.css=[t.css]),t.css.forEach(function(g){b.srcdoc+='<link rel="stylesheet" href="'+g+'">'})),b.srcdoc+="</head><body></body></html>"),t.type){case"pdf":if(i.default.isIE())try{console.info("Print.js doesn't support PDF printing in Internet Explorer."),window.open(t.fallbackPrintable,"_blank").focus(),t.onIncompatibleBrowser()}catch(g){t.onError(g)}finally{t.showModal&&a.default.close(),t.onLoadingEnd&&t.onLoadingEnd()}else d.default.print(t,b);break;case"image":l.default.print(t,b);break;case"html":y.default.print(t,b);break;case"raw-html":o.default.print(t,b);break;case"json":r.default.print(t,b)}}}},"./src/js/json.js":
/*!************************!*\
                !*** ./src/js/json.js ***!
                \************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./functions */
"./src/js/functions.js"),a=n(
/*! ./print */
"./src/js/print.js");function d(o){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(o)}c.default={print:function(l,r){if("object"!==d(l.printable))throw new Error("Invalid javascript data object (JSON).");if("boolean"!=typeof l.repeatTableHeader)throw new Error("Invalid value for repeatTableHeader attribute (JSON).");if(!l.properties||!Array.isArray(l.properties))throw new Error("Invalid properties array for your JSON data.");l.properties=l.properties.map(function(e){return{field:"object"===d(e)?e.field:e,displayName:"object"===d(e)?e.displayName:e,columnSize:"object"===d(e)&&e.columnSize?e.columnSize+";":100/l.properties.length+"%;"}}),l.printableElement=document.createElement("div"),l.header&&Object(i.addHeader)(l.printableElement,l),l.printableElement.innerHTML+=function y(o){var l=o.printable,r=o.properties,e='<table style="border-collapse: collapse; width: 100%;">';o.repeatTableHeader&&(e+="<thead>"),e+="<tr>";for(var u=0;u<r.length;u++)e+='<th style="width:'+r[u].columnSize+";"+o.gridHeaderStyle+'">'+Object(i.capitalizePrint)(r[u].displayName)+"</th>";e+="</tr>",o.repeatTableHeader&&(e+="</thead>"),e+="<tbody>";for(var p=0;p<l.length;p++){e+="<tr>";for(var t=0;t<r.length;t++){var f=l[p],s=r[t].field.split(".");if(s.length>1)for(var h=0;h<s.length;h++)f=f[s[h]];else f=f[r[t].field];e+='<td style="width:'+r[t].columnSize+o.gridStyle+'">'+f+"</td>"}e+="</tr>"}return e+"</tbody></table>"}(l),a.default.send(l,r)}}},"./src/js/modal.js":
/*!*************************!*\
                !*** ./src/js/modal.js ***!
                \*************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i={show:function(d){var o=document.createElement("div");o.setAttribute("style","font-family:sans-serif; display:table; text-align:center; font-weight:300; font-size:30px; left:0; top:0;position:fixed; z-index: 9990;color: #0460B5; width: 100%; height: 100%; background-color:rgba(255,255,255,.9);transition: opacity .3s ease;"),o.setAttribute("id","printJS-Modal");var l=document.createElement("div");l.setAttribute("style","display:table-cell; vertical-align:middle; padding-bottom:100px;");var r=document.createElement("div");r.setAttribute("class","printClose"),r.setAttribute("id","printClose"),l.appendChild(r);var e=document.createElement("span");e.setAttribute("class","printSpinner"),l.appendChild(e);var u=document.createTextNode(d.modalMessage);l.appendChild(u),o.appendChild(l),document.getElementsByTagName("body")[0].appendChild(o),document.getElementById("printClose").addEventListener("click",function(){i.close()})},close:function(){var d=document.getElementById("printJS-Modal");d&&d.parentNode.removeChild(d)}};c.default=i},"./src/js/pdf.js":
/*!***********************!*\
                !*** ./src/js/pdf.js ***!
                \***********************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./print */
"./src/js/print.js"),a=n(
/*! ./functions */
"./src/js/functions.js");function d(y,o,l){var r=new window.Blob([l],{type:"application/pdf"});r=window.URL.createObjectURL(r),o.setAttribute("src",r),i.default.send(y,o)}c.default={print:function(o,l){if(o.base64){var r=Uint8Array.from(atob(o.printable),function(u){return u.charCodeAt(0)});d(o,l,r)}else{o.printable=/^(blob|http|\/\/)/i.test(o.printable)?o.printable:window.location.origin+("/"!==o.printable.charAt(0)?"/"+o.printable:o.printable);var e=new window.XMLHttpRequest;e.responseType="arraybuffer",e.addEventListener("error",function(){Object(a.cleanUp)(o),o.onError(e.statusText,e)}),e.addEventListener("load",function(){if(-1===[200,201].indexOf(e.status))return Object(a.cleanUp)(o),void o.onError(e.statusText,e);d(o,l,e.response)}),e.open("GET",o.printable,!0),e.send()}}}},"./src/js/print.js":
/*!*************************!*\
                !*** ./src/js/print.js ***!
                \*************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./browser */
"./src/js/browser.js"),a=n(
/*! ./functions */
"./src/js/functions.js");function y(r,e){try{if(r.focus(),i.default.isEdge()||i.default.isIE())try{r.contentWindow.document.execCommand("print",!1,null)}catch{r.contentWindow.print()}else r.contentWindow.print()}catch(u){e.onError(u)}finally{i.default.isFirefox()&&(r.style.visibility="hidden",r.style.left="-1px"),Object(a.cleanUp)(e)}}function o(r){var e=r.map(function(u){if(u.src&&u.src!==window.location.href)return function l(r){return new Promise(function(e){!function p(){!r||typeof r.naturalWidth>"u"||0===r.naturalWidth||!r.complete?setTimeout(p,500):e()}()})}(u)});return Promise.all(e)}c.default={send:function(e,u){document.getElementsByTagName("body")[0].appendChild(u);var p=document.getElementById(e.frameId);p.onload=function(){if("pdf"!==e.type){var t=p.contentWindow||p.contentDocument;if(t.document&&(t=t.document),t.body.appendChild(e.printableElement),"pdf"!==e.type&&e.style){var f=document.createElement("style");f.innerHTML=e.style,t.head.appendChild(f)}var s=t.getElementsByTagName("img");s.length>0?o(Array.from(s)).then(function(){return y(p,e)}):y(p,e)}else i.default.isFirefox()?setTimeout(function(){return y(p,e)},1e3):y(p,e)}}}},"./src/js/raw-html.js":
/*!****************************!*\
                !*** ./src/js/raw-html.js ***!
                \****************************/
/*! exports provided: default */function(E,c,n){"use strict";n.r(c);var i=n(
/*! ./print */
"./src/js/print.js");c.default={print:function(d,y){d.printableElement=document.createElement("div"),d.printableElement.setAttribute("style","width:100%"),d.printableElement.innerHTML=d.printable,i.default.send(d,y)}}},"./src/sass/index.scss":
/*!*****************************!*\
                !*** ./src/sass/index.scss ***!
                \*****************************/
/*! no static exports found */function(E,c,n){},0:
/*!****************************!*\
                !*** multi ./src/index.js ***!
                \****************************/
/*! no static exports found */function(E,c,n){E.exports=n(
/*! ./src/index.js */
"./src/index.js")}}).default}}]);