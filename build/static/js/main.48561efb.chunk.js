(this["webpackJsonpcaro-hhd"]=this["webpackJsonpcaro-hhd"]||[]).push([[0],{18:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(0),a=n.n(c),o=n(5),s=n.n(o),i=(n(18),n.p+"static/media/logo.db36153e.svg"),l=n(12),u=n(4),j=n(6),d=Object(j.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),b=d.actions,h=b.increment,p=b.decrement,x=b.incrementByAmount,m=function(e){return e.counter.value},O=d.reducer,f=n(3),v=n.n(f);function _(){var e=Object(u.c)(m),t=Object(u.b)(),n=Object(c.useState)("2"),a=Object(l.a)(n,2),o=a[0],s=a[1];return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{className:v.a.row,children:[Object(r.jsx)("button",{className:v.a.button,"aria-label":"Increment value",onClick:function(){return t(h())},children:"+"}),Object(r.jsx)("span",{className:v.a.value,children:e}),Object(r.jsx)("button",{className:v.a.button,"aria-label":"Decrement value",onClick:function(){return t(p())},children:"-"})]}),Object(r.jsxs)("div",{className:v.a.row,children:[Object(r.jsx)("input",{className:v.a.textbox,"aria-label":"Set increment amount",value:o,onChange:function(e){return s(e.target.value)}}),Object(r.jsx)("button",{className:v.a.button,onClick:function(){return t(x(Number(o)||0))},children:"Add Amount"}),Object(r.jsx)("button",{className:v.a.asyncButton,onClick:function(){return t((e=Number(o)||0,function(t){setTimeout((function(){t(x(e))}),1e3)}));var e},children:"Add Async"})]})]})}n(25);var g=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsxs)("header",{className:"App-header",children:[Object(r.jsx)("img",{src:i,className:"App-logo",alt:"logo"}),Object(r.jsx)(_,{}),Object(r.jsxs)("p",{children:["Edit ",Object(r.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(r.jsxs)("span",{children:[Object(r.jsx)("span",{children:"Learn "}),Object(r.jsx)("a",{className:"App-link",href:"https://reactjs.org/",target:"_blank",rel:"noopener noreferrer",children:"React"}),Object(r.jsx)("span",{children:", "}),Object(r.jsx)("a",{className:"App-link",href:"https://redux.js.org/",target:"_blank",rel:"noopener noreferrer",children:"Redux"}),Object(r.jsx)("span",{children:", "}),Object(r.jsx)("a",{className:"App-link",href:"https://redux-toolkit.js.org/",target:"_blank",rel:"noopener noreferrer",children:"Redux Toolkit"}),",",Object(r.jsx)("span",{children:" and "}),Object(r.jsx)("a",{className:"App-link",href:"https://react-redux.js.org/",target:"_blank",rel:"noopener noreferrer",children:"React Redux"})]})]})})},k=Object(j.a)({reducer:{counter:O}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(u.a,{store:k,children:Object(r.jsx)(g,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},3:function(e,t,n){e.exports={row:"Counter_row__KPr9V",value:"Counter_value__RyQnp",button:"Counter_button__39i_W",textbox:"Counter_textbox__34LYx",asyncButton:"Counter_asyncButton__1WCSd Counter_button__39i_W"}}},[[26,1,2]]]);
//# sourceMappingURL=main.48561efb.chunk.js.map