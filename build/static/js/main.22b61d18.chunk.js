(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(42)},23:function(e,n,t){},24:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(17),c=t.n(r),u=(t(23),t(7)),l=t(6),i=t(2),m=(t(24),function(e){var n=e.person,t=e.deleteButton;return o.a.createElement("div",null,n.name," ",n.number,o.a.createElement("button",{onClick:function(){return t(n.id,n.name)}},"Delete"))}),s=function(e){var n=e.persons,t=e.nameSearch,a=e.nameToShow,r=e.deleteButton;return""===t?o.a.createElement("div",null,n.map((function(e){return o.a.createElement(m,{key:e.name,person:e,deleteButton:r})}))):o.a.createElement("div",null,a.map((function(e){return o.a.createElement(m,{key:e.name,person:e,deleteButton:r})})))},d=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,r=e.mobileNumber,c=e.handleMobileNumberChange;return o.a.createElement("form",{onSubmit:n},o.a.createElement("h2",null,"add a new"),o.a.createElement("div",null,"name: ",o.a.createElement("input",{type:"text",value:t,placeholder:"Enter name here",onChange:a})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{type:"text",value:r,placeholder:"Enter phone number here",onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit",style:{backgroundColor:"green"}},"add")))},f=function(e){var n=e.nameSearch,t=e.handleNameSearchChange;return o.a.createElement("div",null,"filter shown with",o.a.createElement("input",{type:"text",value:n,placeholder:"Search by name",onChange:t}))},h=t(4),b=t.n(h),p="/api/persons",v=function(){return b.a.get(p).then((function(e){return e.data}))},g=function(e){return b.a.post(p,e).then((function(e){return e.data}))},E=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},S=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},j=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"success"},n)},O=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),m=Object(i.a)(c,2),h=m[0],b=m[1],p=Object(a.useState)(""),O=Object(i.a)(p,2),y=O[0],C=O[1],k=Object(a.useState)(""),N=Object(i.a)(k,2),T=N[0],B=N[1],x=Object(a.useState)([]),D=Object(i.a)(x,2),U=D[0],I=D[1],M=Object(a.useState)(null),P=Object(i.a)(M,2),J=P[0],W=P[1],$=Object(a.useState)(null),q=Object(i.a)($,2),z=q[0],A=q[1];Object(a.useEffect)((function(){v().then((function(e){r(e)})).catch((function(e){W("The data could not be retrieved from the server!"),setTimeout((function(){W(null)}),5e3)}))}),[]),console.log("render",t.length,"persons");return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(j,{message:z}),o.a.createElement(S,{message:J}),o.a.createElement(f,{nameSearch:T,handleNameSearchChange:function(e){var n,a=Object(l.a)(t);console.log("handleNameSearchChange",e.target.value),B(e.target.value),I((n=e,a.filter((function(e){return e.name.toUpperCase().includes(n.target.value.toUpperCase())}))))}}),o.a.createElement(d,{addPerson:function(e){e.preventDefault(),console.log("button clicked",e.target);var n={name:h,number:y};if(""===h||""===y)return window.alert("name or number field can not be empty");var a=Object(l.a)(t),o=a.filter((function(e){return e.name.toUpperCase()===h.toUpperCase()}));if(1===o.length)if(window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?"))){var c=o[0].id,i=a.find((function(e){return e.id===c})),m=Object(u.a)(Object(u.a)({},i),{},{number:y});E(c,m).then((function(e){r(a.map((function(n){return n.id!==c?n:e}))),b(""),C(""),console.log(e)})).then((function(e){A("Successfully updated ".concat(h,"'s number")),setTimeout((function(){A(null)}),5e3)})).catch((function(e){W("Information of ".concat(h," has already been removed from server")),setTimeout((function(){W(null)}),5e3),r(a.filter((function(e){return e.id!==c}))),b(""),C("")}))}else b(""),C("");else g(n).then((function(e){r(a.concat(e)),b(""),C("")})).then((function(e){A("Successfully added ".concat(h)),setTimeout((function(){A(null)}),5e3)})).catch((function(e){W("The person ".concat(h," could not be added to phonebook")),setTimeout((function(){W(null)}),5e3),r(a)}))},newName:h,handleNameChange:function(e){return b(e.target.value)},mobileNumber:y,handleMobileNumberChange:function(e){return C(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(s,{persons:t,nameSearch:T,nameToShow:U,deleteButton:function(e,n){var a=Object(l.a)(t);console.log("ID and name of person to be deleted",e,n),window.confirm("Delete ".concat(n,"?"))?w(e).then((function(t){r(a.filter((function(t){return t.id!==e&&t.name!==n}))),""!==T&&B("")})).then((function(e){A("".concat(n," is successfully deleted from server")),setTimeout((function(){A(null)}),5e3)})).catch((function(t){W("".concat(n," was already deleted from server")),setTimeout((function(){W(null)}),5e3),r(a.filter((function(n){return n.id!==e})))})):(b(""),C(""))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.22b61d18.chunk.js.map