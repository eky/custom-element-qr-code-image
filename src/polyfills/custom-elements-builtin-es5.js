/*! (c) Andrea Giammarchi - ISC */
!function(e,t,n){"use strict";function r(e){for(var t=0,n=e.length;t<n;t++){var r=e[t],a=r.attributeName,l=r.oldValue,i=r.target,o=i.getAttribute(a);d in i&&(l!=o||null!=o)&&i[d](a,l,i.getAttribute(a),null)}}function a(e){if(1===e.nodeType){u(e,a);var t=l(e);t&&e instanceof t.Class&&b in e&&e[b]()}}function l(e){var t=e.getAttribute("is");return t&&(t=t.toLowerCase())in O?O[t]:null}function i(e,t){var n=t.Class,a=n.observedAttributes||[];if(C(e,n.prototype),a.length){new MutationObserver(r).observe(e,{attributes:!0,attributeFilter:a,attributeOldValue:!0});for(var l=[],i=0,o=a.length;i<o;i++)l.push({attributeName:a[i],oldValue:null,target:e});r(l)}}function o(e){if(1===e.nodeType){u(e,o);var t=l(e);t&&(e instanceof t.Class||i(e,t),g in e&&e[g]())}}function u(e,t){for(var n=e.querySelectorAll("[is]"),r=0,a=n.length;r<a;r++)t(n[r])}if(!t.get("ungap-li")&&typeof Reflect!=typeof s){var s="extends";try{var c={};c[s]="li";var f=HTMLLIElement,v=function(){return Reflect.construct(f,[],v)};if(v.prototype=n.create(f.prototype),t.define("ungap-li",v,c),!/is="ungap-li"/.test((new v).outerHTML))throw{}}catch(M){var d="attributeChangedCallback",g="connectedCallback",b="disconnectedCallback",p=n.assign,h=n.create,y=n.defineProperties,C=n.setPrototypeOf,m=t.define,w=t.get,A=t.upgrade,L=t.whenDefined,O=h(null);new MutationObserver(function(e){for(var t=0,n=e.length;t<n;t++){for(var r=e[t],l=r.addedNodes,i=r.removedNodes,u=0,s=l.length;u<s;u++)o(l[u]);for(var u=0,s=i.length;u<s;u++)a(i[u])}}).observe(e,{childList:!0,subtree:!0}),y(t,{define:{value:function(n,r,a){if(n=n.toLowerCase(),a&&s in a){O[n]=p({},a,{Class:r});for(var l=a[s]+'[is="'+n+'"]',i=e.querySelectorAll(l),u=0,c=i.length;u<c;u++)o(i[u])}else m.apply(t,arguments)}},get:{value:function(e){return e in O?O[e].Class:w.call(t,e)}},upgrade:{value:function(e){var n=l(e);!n||e instanceof n.Class?A.call(t,e):i(e,n)}},whenDefined:{value:function(e){return e in O?Promise.resolve():L.call(t,e)}}});var E=e.createElement;y(e,{createElement:{value:function(n,r){var a=E.call(e,n);return r&&"is"in r&&(a.setAttribute("is",r.is),t.upgrade(a)),a}}})}}}(document,customElements,Object);