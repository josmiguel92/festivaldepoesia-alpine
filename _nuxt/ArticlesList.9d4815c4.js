import A from"./ArticlesListItem.40364a8b.js";import k from"./ProseA.c49f6862.js";import v from"./ProseCodeInline.d9ed1a01.js";import{u as I}from"./asyncData.9e69b1dd.js";import{d as S,X as w,H as L,L as _,b as c,c as d,e as i,g as p,F as C,Y as B,C as o,w as m,p as N,i as T,q as V,W,k as Y}from"./entry.d23225cb.js";import"./date.824a539b.js";const $=/\/$|\/\?|\/#/;function b(e="",t){return t?$.test(e):e.endsWith("/")}function q(e="",t){if(!t)return e.endsWith("/")?e:e+"/";if(b(e,!0))return e||"/";let s=e,a="";const n=e.indexOf("#");if(n>=0&&(s=e.slice(0,n),a=e.slice(n),!s))return a;const[r,...l]=s.split("?");return r+"/"+(l.length>0?`?${l.join("?")}`:"")+a}const E=e=>(N("data-v-458d58a9"),e=e(),T(),e),F={key:0,class:"articles-list"},H={class:"featured"},P={class:"layout"},R={key:1,class:"tour"},j=E(()=>i("p",null,"Seems like there are no articles yet.",-1)),D=S({__name:"ArticlesList",props:{path:{type:String,default:"articles"}},async setup(e){let t,s;const a=e,{data:n}=([t,s]=w(async()=>I(a.path,async()=>await V(q(a.path)).sort({date:-1}).find(),"$n1AiYnkyC6")),t=await t,s(),t),r=L(()=>n.value||[]);return(l,G)=>{var f;const u=A,h=k,y=v;return(f=_(r))!=null&&f.length?(c(),d("div",F,[i("div",H,[p(u,{article:_(r)[0],featured:!0},null,8,["article"])]),i("div",P,[(c(!0),d(C,null,B(_(r).slice(1),(x,g)=>(c(),W(u,{key:g,article:x},null,8,["article"]))),128))])])):(c(),d("div",R,[j,i("p",null,[o(" You can start by "),p(h,{href:"https://alpine.nuxt.space/articles/write-articles"},{default:m(()=>[o("creating")]),_:1}),o(" one in the "),p(y,null,{default:m(()=>[o("articles")]),_:1}),o(" folder. ")])]))}}});const Q=Y(D,[["__scopeId","data-v-458d58a9"]]);export{Q as default};
