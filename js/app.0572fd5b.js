(function(t){function e(e){for(var a,r,s=e[0],c=e[1],p=e[2],f=0,l=[];f<s.length;f++)r=s[f],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&l.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(l.length)l.shift()();return o.push.apply(o,p||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},i={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var p=0;p<s.length;p++)e(s[p]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("85ec"),i=n.n(a);i.a},"1c0d":function(t,e,n){t.exports=n.p+"img/stick.52205bf7.png"},"2cfd":function(t,e,n){},"45f8":function(t,e,n){"use strict";var a=n("9513"),i=n.n(a);i.a},"4c8f":function(t,e,n){t.exports=n.p+"img/blob.98460555.png"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("fa6d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"site",attrs:{id:"app"}},[n("Crow",{staticClass:"interactive"}),t._m(0)],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("h1",{staticClass:"title"},[n("em",[t._v("Eli Crow")]),t._v(" is a designer and developer making tools for business folk with "),n("a",{staticClass:"link",attrs:{href:"https://www.sep.com/",target:"_blank"}},[t._v("sep.com")]),t._v(". ")])])}],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Crow"},[n("canvas",{ref:"canvas",staticClass:"canvas"})])},s=[],c=(n("99af"),n("4160"),n("a630"),n("0d03"),n("3ca3"),n("18a5"),n("159b"),n("284c")),p=n("22a2"),u=n("16ed"),f=n.n(u),l=n("a80b"),d=n.n(l),h=n("4c8f"),v=n.n(h),y=n("bb12"),x=n.n(y),w=n("f189"),b=n.n(w),g=n("1c0d"),m=n.n(g),M=n("765d"),C=n.n(M),O=n("876d"),P=n("4476"),_=n("9d0b");O["a"].registerPIXI(p),P["a"].registerPlugin(_["a"],O["a"]);var S=function(t,e,n){return t*(1-n)+e*n},E=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t-e;return n+(n>Math.PI?-2*Math.PI:n<-Math.PI?2*Math.PI:0)},j={mounted:function(){var t=this,e=14,n=14,a=.08*Math.PI,i=.4,o=.75,r={resolution:2},s=(new f.a(Math.random()),new p["Application"]({view:this.$refs.canvas,antialias:!0,autoDensity:!0,resolution:window.devicePixelRatio,autoResize:!0,transparent:!0,resizeTo:this.$el})),u=new p["Container"];u.sortableChildren=!0,u.position.set(this.$refs.canvas.clientWidth/2+10,this.$refs.canvas.clientHeight/2+10),s.stage.addChild(u),window.addEventListener("resize",(function(){u.position.set(t.$refs.canvas.clientWidth/2+10,t.$refs.canvas.clientHeight/2+10)}));var l=new p["Point"],h=!1,y=function t(){h=!1,window.removeEventListener("pointerup",t)},w=function(){h=!0,window.addEventListener("pointerup",y)};this.$el.addEventListener("pointerdown",w),P["a"].to(l,{motionPath:{path:"M211.7,44C82.7,44,0,142,0,254.5S79.6,466,202.7,466S382.3,391.4,524,293.5c133.1-92,132-130.6,132-183.4\n\tS597.3,0,536.4,0S410.8,47.7,410.8,116.1s52.2,107.6,86.9,123.3c93.1,42.1,190-16.5,278-16.5c108,0,143,91.1,143,128\n\tc0,49.5-20.4,115-139,115C639.7,466,535,299.7,383,143.5C329.8,88.8,298.5,44,211.7,44z",offsetX:-480,offsetY:-230},duration:9,repeat:-1,ease:"none"});var g=new p["Sprite"](p["Texture"].from(v.a,r));g.anchor.set(.5),g.position.set(-286,0),u.addChild(g),P["a"].to(g,{pixi:{positionY:-35,rotation:-10},duration:3.15,repeat:-1,yoyoEase:!0,ease:"sine.inOut"});var M=new p["Sprite"](p["Texture"].from(x.a,r));M.anchor.set(.5),M.position.set(180,130),u.addChild(M),P["a"].to(M,{keyframes:[{pixi:{rotation:120,positionX:220,positionY:80},duration:2,ease:"expo.inOut",delay:3},{pixi:{rotation:240},duration:2.8,ease:"expo.inOut",delay:3},{pixi:{rotation:360,positionX:180,positionY:130},duration:2.2,ease:"expo.inOut",delay:3}],repeat:-1,repeatDelay:2,delay:5});var O=new p["Sprite"](p["Texture"].from(b.a,r));O.anchor.set(.5,.65),O.position.set(306,-20),u.addChild(O),P["a"].to(O,{pixi:{rotation:-20,scale:.97},duration:4.15,repeat:-1,repeatDelay:2,yoyoEase:!0,ease:"expo.inOut"});var _=new p["Sprite"](p["Texture"].from(m.a,r));_.anchor.set(.5),_.position.set(-180,0),u.addChild(_),P["a"].to(_,{pixi:{rotation:2,positionX:-205,positionY:15,scale:.95},duration:1.2,yoyoEase:!0,repeat:-1,ease:"expo.out",delay:4,repeatDelay:3});var j=new p["Sprite"](p["Texture"].from(C.a,r));j.anchor.set(.5),j.position.set(45,220),u.addChild(j),P["a"].to(j,{pixi:{rotation:10,positionY:230,scale:.9},duration:4.15,repeat:-1,yoyoEase:!0,ease:"sine.inOut"});var k=Array.from({length:100},(function(t,n){return new p["Point"](n*e,0)})),$=[].concat(Object(c["a"])(k),[l]),T=new p["SimpleRope"](p["Texture"].from(d.a,r),k);T.x=0,u.addChild(T),[_,j,T,g,O,M].forEach((function(t,e){t.zIndex=e+1}));Date.now();s.ticker.add((function(){Date.now();if(h){var t=s.renderer.plugins.interaction.eventData.data.global;l.set(t.x-u.position.x,t.y-u.position.y)}var r=$.length-3;for($.length;r>=0;r--){var c=$[r+2],p=$[r+1],f=$[r],d=f.x-p.x,v=f.y-p.y,y=p.x-c.x,x=p.y-c.y,w=Math.sqrt(Math.pow(d,2)+Math.pow(v,2)),b=(Math.sqrt(Math.pow(y,2)+Math.pow(x,2)),Math.atan2(v,d)),g=Math.atan2(x,y),m=E(b,g),M=void 0;if(m<-a)M=g-a;else{if(!(m>a))continue;M=g+a}var C=p.x+Math.cos(M)*w,O=p.y+Math.sin(M)*w;f.x=S(f.x,C,o),f.y=S(f.y,O,o)}var P=$.length-2;for($.length;P>=0;P--){var _=$[P+1],j=$[P],k=j.x-_.x,T=j.y-_.y,I=Math.sqrt(Math.pow(k,2)+Math.pow(T,2));if(I<=n){var D=_.x+k/I*e,Y=_.y+T/I*e;j.x=S(j.x,D,i),j.y=S(j.y,Y,i)}else{var z=k/I,X=T/I;j.x=_.x+z*n,j.y=_.y+X*n}}}))}},k=j,$=(n("45f8"),n("2877")),T=Object($["a"])(k,r,s,!1,null,"2da76238",null),I=T.exports,D={components:{Crow:I}},Y=D,z=(n("034f"),n("fd93"),Object($["a"])(Y,i,o,!1,null,"1a0968c0",null)),X=z.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(X)}}).$mount("#app")},"765d":function(t,e,n){t.exports=n.p+"img/tilde.352bbf5c.png"},"85ec":function(t,e,n){},9513:function(t,e,n){},a80b:function(t,e,n){t.exports=n.p+"img/snake.bbac8f87.png"},bb12:function(t,e,n){t.exports=n.p+"img/ding.6261cf54.png"},f189:function(t,e,n){t.exports=n.p+"img/peepis.1dbf52ea.png"},fd93:function(t,e,n){"use strict";var a=n("2cfd"),i=n.n(a);i.a}});
//# sourceMappingURL=app.0572fd5b.js.map