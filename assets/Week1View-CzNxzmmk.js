import{r as p,c as i,a as e,F as k,b as _,d as r,t as l,w as h,v as b,e as C,o as a}from"./index-CzpPflQI.js";const f={class:"week1"},x=e("h1",null,"W1-餐點管理系統",-1),y=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"ID"),e("th",{scope:"col"},"品項"),e("th",{scope:"col"},"描述"),e("th",{scope:"col"},"價格"),e("th",{scope:"col"},"庫存"),e("th",{scope:"col"},"修改品項")])],-1),g=["onClick"],V=["onClick"],w=["onClick"],D={key:0},E=e("h2",null,"編輯品項",-1),F={__name:"Week1View",setup($){const s=p([{id:1,name:"珍珠奶茶",description:"香濃奶茶搭配QQ珍珠",price:50,stock:20},{id:2,name:"冬瓜檸檬",description:"清新冬瓜配上新鮮檸檬",price:45,stock:15},{id:3,name:"翡翠檸檬",description:"綠茶與檸檬的完美結合",price:55,stock:30},{id:4,name:"四季春茶",description:"香醇四季春茶，回甘無比",price:45,stock:10},{id:5,name:"阿薩姆奶茶",description:"阿薩姆紅茶搭配香醇鮮奶",price:50,stock:25},{id:6,name:"檸檬冰茶",description:"檸檬與冰茶的清新組合",price:45,stock:20},{id:7,name:"芒果綠茶",description:"芒果與綠茶的獨特風味",price:55,stock:18},{id:8,name:"抹茶拿鐵",description:"抹茶與鮮奶的絕配",price:60,stock:20}]),o=p({id:"",name:"",description:"",price:"",stock:""});function d(n,c){s.value==s.value.map(t=>(console.log(n),t.id===n&&(t.stock=c),t))}const m=n=>{o.value={...n},console.log(o.value)},v=()=>{const n=s.value.findIndex(c=>c.id===o.value.id);console.log(n,s.value),s.value[n].name=o.value.name};return(n,c)=>(a(),i("div",f,[x,e("table",null,[y,e("tbody",null,[(a(!0),i(k,null,_(s.value,t=>(a(),i("tr",{key:t.id},[e("td",null,l(t.id),1),e("td",null,l(t.name),1),e("td",null,[e("small",null,l(t.description),1)]),e("td",null,l(t.price),1),e("td",null,[e("button",{onClick:u=>d(t.id,t.stock-1)},"-",8,g),r(" "+l(t.stock)+" ",1),e("button",{onClick:u=>d(t.id,t.stock+1)},"+",8,V)]),e("td",null,[e("button",{onClick:u=>m(t)},"編輯",8,w)])]))),128))])]),o.value.id?(a(),i("div",D,[E,r(" "+l(o.value.id)+" ",1),h(e("input",{type:"text","onUpdate:modelValue":c[0]||(c[0]=t=>o.value.name=t)},null,512),[[b,o.value.name]]),e("button",{type:"button",onClick:v},"確認"),e("button",{type:"button",onClick:c[1]||(c[1]=t=>o.value={})},"取消")])):C("",!0)]))}};export{F as default};
