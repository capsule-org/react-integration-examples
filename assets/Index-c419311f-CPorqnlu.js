import{a4 as R,a5 as N,a6 as M,a7 as O,a8 as me,a9 as _,aa as w,ab as G,ac as T,ad as V,ae as C,af as Y,ag as _e,ah as we,ai as $,aj as h,ak as m,al as Ce,am as D,an as x,ao as B,ap as F,aq as g,ar as S,as as ye,at as ze,au as Te,av as je,aw as Le,ax as xe,ay as Pe,az as Se,aA as H,aB as Z,aC as Ee,aD as Ie,aE as be,aF as Re,aG as Ne,aH as U,aI as W,aJ as A,aK as he,aL as Me,aM as ge,aN as Oe,aO as ke,aP as J,aQ as Q,aR as I,aS as X,aT as E,aU as q,aV as ee,aW as $e,aX as te,aY as P,aZ as De,a_ as K,a$ as Fe}from"./index-kMdOwXZx.js";function He(i,{from:e,to:t},n={}){const o=getComputedStyle(i),a=o.transform==="none"?"":o.transform,[f,l]=o.transformOrigin.split(" ").map(parseFloat),s=e.left+e.width*f/t.width-(t.left+f),r=e.top+e.height*l/t.height-(t.top+l),{delay:c=0,duration:d=u=>Math.sqrt(u)*120,easing:v=be}=n;return{delay:c,duration:Ne(d)?d(Math.sqrt(s*s+r*r)):d,easing:v,css:(u,b)=>{const p=b*s,y=b*r,z=u+b*e.width/t.width,j=u+b*e.height/t.height;return`transform: ${a} translate(${p}px, ${y}px) scale(${z}, ${j});`}}}function Ge(i){O(i,"svelte-13cuwwo","div.svelte-13cuwwo{box-sizing:content-box}.border.svelte-13cuwwo{border:2px solid;border-radius:120px;overflow:hidden}")}function Ve(i){let e,t;return{c(){e=h("div"),m(e,"class","border svelte-13cuwwo"),m(e,"style",t=`
    width: ${i[2]-i[3]*2}px; 
    height: ${i[2]-i[3]*2}px; 
    border-color: var(${i[1]}); 
    padding: ${i[3]}px; 
    background-color: ${i[4]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
  `)},m(n,o){_(n,e,o),e.innerHTML=i[0]},p(n,[o]){o&1&&(e.innerHTML=n[0]),o&30&&t!==(t=`
    width: ${n[2]-n[3]*2}px; 
    height: ${n[2]-n[3]*2}px; 
    border-color: var(${n[1]}); 
    padding: ${n[3]}px; 
    background-color: ${n[4]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
  `)&&m(e,"style",t)},i:I,o:I,d(n){n&&C(e)}}}function Ae(i,e,t){let{icon:n}=e,{borderColorVar:o}=e,{size:a}=e,{padding:f=0}=e,{background:l="transparent"}=e;return i.$$set=s=>{"icon"in s&&t(0,n=s.icon),"borderColorVar"in s&&t(1,o=s.borderColorVar),"size"in s&&t(2,a=s.size),"padding"in s&&t(3,f=s.padding),"background"in s&&t(4,l=s.background)},[n,o,a,f,l]}class Be extends R{constructor(e){super(),N(this,e,Ae,Ve,M,{icon:0,borderColorVar:1,size:2,padding:3,background:4},Ge)}}function We(i){O(i,"svelte-jvic9v","div.notification-icons-wrapper.svelte-jvic9v{height:32px;width:32px}.border.svelte-jvic9v{border-radius:8px}div.notification-icon.svelte-jvic9v{padding:6px}div.pending-icon.svelte-jvic9v{animation:svelte-jvic9v-blink 2s ease-in infinite;height:100%;width:100%;padding:7px}@keyframes svelte-jvic9v-blink{from,to{opacity:1}50%{opacity:0.2}}div.border-action.svelte-jvic9v{height:32px;min-width:32px;border-radius:8px;overflow:hidden;will-change:transform}div.border-action.svelte-jvic9v:before{content:'';background-image:conic-gradient(#b1b7f2 20deg, #6370e5 120deg);height:140%;width:140%;position:absolute;left:-25%;top:-25%;animation:svelte-jvic9v-rotate 2s infinite linear}div.chain-icon-container.svelte-jvic9v{left:18px;top:18px}@keyframes svelte-jvic9v-rotate{100%{transform:rotate(-360deg)}}")}function ne(i){let e,t,n,o,a=P[i[1].type].eventIcon+"",f,l,s,r=!i[1].id.includes("customNotification")&&!i[1].id.includes("preflight"),c,d=i[1].type==="pending"&&ie(),v=r&&oe(i);return{c(){e=h("div"),d&&d.c(),t=x(),n=h("div"),o=h("div"),s=x(),v&&v.c(),m(o,"class",f=B(`notification-icon flex items-center justify-center ${i[1].type==="pending"?"pending-icon":""}`)+" svelte-jvic9v"),m(n,"class","flex items-center justify-center border relative notification-icons-wrapper svelte-jvic9v"),m(n,"style",l=`background:${P[i[1].type].backgroundColor}; color: ${P[i[1].type].iconColor||""}; ${i[1].type==="pending"?"height: 28px; width: 28px; margin: 2px;":`border: 2px solid ${P[i[1].type].borderColor}`}; `),m(e,"class","relative")},m(u,b){_(u,e,b),d&&d.m(e,null),g(e,t),g(e,n),g(n,o),o.innerHTML=a,g(e,s),v&&v.m(e,null),c=!0},p(u,b){u[1].type==="pending"?d||(d=ie(),d.c(),d.m(e,t)):d&&(d.d(1),d=null),(!c||b&2)&&a!==(a=P[u[1].type].eventIcon+"")&&(o.innerHTML=a),(!c||b&2&&f!==(f=B(`notification-icon flex items-center justify-center ${u[1].type==="pending"?"pending-icon":""}`)+" svelte-jvic9v"))&&m(o,"class",f),(!c||b&2&&l!==(l=`background:${P[u[1].type].backgroundColor}; color: ${P[u[1].type].iconColor||""}; ${u[1].type==="pending"?"height: 28px; width: 28px; margin: 2px;":`border: 2px solid ${P[u[1].type].borderColor}`}; `))&&m(n,"style",l),b&2&&(r=!u[1].id.includes("customNotification")&&!u[1].id.includes("preflight")),r?v?(v.p(u,b),b&2&&w(v,1)):(v=oe(u),v.c(),w(v,1),v.m(e,null)):v&&(G(),T(v,1,1,()=>{v=null}),V())},i(u){c||(w(v),c=!0)},o(u){T(v),c=!1},d(u){u&&C(e),d&&d.d(),v&&v.d()}}}function ie(i){let e;return{c(){e=h("div"),m(e,"class","border-action absolute svelte-jvic9v")},m(t,n){_(t,e,n)},d(t){t&&C(e)}}}function oe(i){let e,t,n;return t=new Be({props:{icon:i[0].icon,size:16,background:i[0].color,borderColorVar:"--notify-onboard-background, var(--onboard-gray-600, var(--gray-600))",padding:3}}),{c(){e=h("div"),D(t.$$.fragment),m(e,"class","absolute chain-icon-container svelte-jvic9v")},m(o,a){_(o,e,a),F(t,e,null),n=!0},p(o,a){const f={};a&1&&(f.icon=o[0].icon),a&1&&(f.background=o[0].color),t.$set(f)},i(o){n||(w(t.$$.fragment,o),n=!0)},o(o){T(t.$$.fragment,o),n=!1},d(o){o&&C(e),H(t)}}}function Ke(i){let e,t,n=i[1].type&&ne(i);return{c(){n&&n.c(),e=me()},m(o,a){n&&n.m(o,a),_(o,e,a),t=!0},p(o,[a]){o[1].type?n?(n.p(o,a),a&2&&w(n,1)):(n=ne(o),n.c(),w(n,1),n.m(e.parentNode,e)):n&&(G(),T(n,1,1,()=>{n=null}),V())},i(o){t||(w(n),t=!0)},o(o){T(n),t=!1},d(o){n&&n.d(o),o&&C(e)}}}function qe(i,e,t){let{chainStyles:n=De}=e,{notification:o}=e;return i.$$set=a=>{"chainStyles"in a&&t(0,n=a.chainStyles),"notification"in a&&t(1,o=a.notification)},[n,o]}class Ye extends R{constructor(e){super(),N(this,e,qe,Ke,M,{chainStyles:0,notification:1},We)}}function Ze(i){O(i,"svelte-pm7idu",`div.svelte-pm7idu{display:flex;justify-content:center;font-size:inherit;font-family:inherit;margin:0 1.5rem 0 0.75rem}span.svelte-pm7idu{font-family:inherit;display:flex;align-items:center;margin:0 2px}.time.svelte-pm7idu{color:var(
      --notify-onboard-timer-color,
      var(--onboard-gray-300, var(--gray-300))
    );margin-left:4px}`)}function ae(i){let e,t,n=i[2](i[1]-i[0])+"",o,a;return{c(){e=E(`-
    `),t=h("span"),o=E(n),a=E(`
    ago`),m(t,"class","svelte-pm7idu")},m(f,l){_(f,e,l),_(f,t,l),g(t,o),_(f,a,l)},p(f,l){l&3&&n!==(n=f[2](f[1]-f[0])+"")&&q(o,n)},d(f){f&&C(e),f&&C(t),f&&C(a)}}}function Ue(i){let e,t=i[0]&&ae(i);return{c(){e=h("div"),t&&t.c(),m(e,"class","time svelte-pm7idu")},m(n,o){_(n,e,o),t&&t.m(e,null)},p(n,[o]){n[0]?t?t.p(n,o):(t=ae(n),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:I,o:I,d(n){n&&C(e),t&&t.d()}}}function Je(i,e,t){let n,o;$(i,ge,r=>t(3,n=r)),$(i,Fe,r=>t(4,o=r));let{startTime:a}=e;function f(r){const c=Math.floor(r/1e3),d=c<0?0:c;return d>=60?`${Math.floor(d/60).toLocaleString(o)} ${n("notify.time.minutes")}`:`${d.toLocaleString(o)} ${n("notify.time.seconds")}`}let l=Date.now();const s=setInterval(()=>{t(1,l=Date.now())},1e3);return ke(()=>{clearInterval(s)}),i.$$set=r=>{"startTime"in r&&t(0,a=r.startTime)},[a,l,f]}class Qe extends R{constructor(e){super(),N(this,e,Je,Ue,M,{startTime:0},Ze)}}function Xe(i){O(i,"svelte-1otz6tt",`div.notify-transaction-data.svelte-1otz6tt{font-size:var(
      --notify-onboard-transaction-font-size,
      var(--onboard-font-size-6, var(--font-size-6))
    );font-family:inherit;margin:0px 20px 0px 8px;justify-content:center}.hash-time.svelte-1otz6tt{display:inline-flex;margin-top:4px;font-size:var(
      --notify-onboard-hash-time-font-size,
      var(--onboard-font-size-7, var(--font-size-7))
    );line-height:var(
      --notify-onboard-hash-time-font-line-height,
      var(--onboard-font-line-height-4, var(--font-line-height-4))
    )}.address-hash.svelte-1otz6tt{color:var(
      --notify-onboard-address-hash-color,
      var(--onboard-primary-200, var(--primary-200))
    )}a.address-hash.svelte-1otz6tt{color:var(
      --notify-onboard-anchor-color,
      var(--onboard-primary-400, var(--primary-400))
    )}a.svelte-1otz6tt{display:flex;text-decoration:none;color:inherit}.transaction-status.svelte-1otz6tt{color:var(--notify-onboard-transaction-status, inherit);line-height:var(
      --notify-onboard-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );font-weight:400;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}`)}function re(i){let e,t,n,o;function a(s,r){return s[0].link?tt:et}let f=a(i),l=f(i);return n=new Qe({props:{startTime:i[0].startTime}}),{c(){e=h("span"),l.c(),t=x(),D(n.$$.fragment),m(e,"class","hash-time svelte-1otz6tt")},m(s,r){_(s,e,r),l.m(e,null),g(e,t),F(n,e,null),o=!0},p(s,r){f===(f=a(s))&&l?l.p(s,r):(l.d(1),l=f(s),l&&(l.c(),l.m(e,t)));const c={};r&1&&(c.startTime=s[0].startTime),n.$set(c)},i(s){o||(w(n.$$.fragment,s),o=!0)},o(s){T(n.$$.fragment,s),o=!1},d(s){s&&C(e),l.d(),H(n)}}}function et(i){let e,t=K(i[0].id)+"",n;return{c(){e=h("div"),n=E(t),m(e,"class","address-hash svelte-1otz6tt")},m(o,a){_(o,e,a),g(e,n)},p(o,a){a&1&&t!==(t=K(o[0].id)+"")&&q(n,t)},d(o){o&&C(e)}}}function tt(i){let e,t=K(i[0].id)+"",n,o;return{c(){e=h("a"),n=E(t),m(e,"class","address-hash svelte-1otz6tt"),m(e,"href",o=i[0].link),m(e,"target","_blank"),m(e,"rel","noreferrer noopener")},m(a,f){_(a,e,f),g(e,n)},p(a,f){f&1&&t!==(t=K(a[0].id)+"")&&q(n,t),f&1&&o!==(o=a[0].link)&&m(e,"href",o)},d(a){a&&C(e)}}}function nt(i){let e,t,n=i[0].message+"",o,a,f=i[0].id&&!i[0].id.includes("customNotification")&&!i[0].id.includes("preflight"),l,s=f&&re(i);return{c(){e=h("div"),t=h("span"),o=E(n),a=x(),s&&s.c(),m(t,"class","transaction-status svelte-1otz6tt"),m(e,"class","flex flex-column notify-transaction-data svelte-1otz6tt")},m(r,c){_(r,e,c),g(e,t),g(t,o),g(e,a),s&&s.m(e,null),l=!0},p(r,[c]){(!l||c&1)&&n!==(n=r[0].message+"")&&q(o,n),c&1&&(f=r[0].id&&!r[0].id.includes("customNotification")&&!r[0].id.includes("preflight")),f?s?(s.p(r,c),c&1&&w(s,1)):(s=re(r),s.c(),w(s,1),s.m(e,null)):s&&(G(),T(s,1,1,()=>{s=null}),V())},i(r){l||(w(s),l=!0)},o(r){T(s),l=!1},d(r){r&&C(e),s&&s.d()}}}function it(i,e,t){let{notification:n}=e;return i.$$set=o=>{"notification"in o&&t(0,n=o.notification)},[n]}class ot extends R{constructor(e){super(),N(this,e,it,nt,M,{notification:0},Xe)}}var at=`
<svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z" fill="currentColor"/>
</svg>
`;const rt=["txPool"],lt=["main","matic-main"],st=["Ledger","Trezor","Keystone","KeepKey","D'CENT"],le=i=>rt.includes(i),se=i=>lt.includes(i),ce=i=>i&&st.includes(i.label);async function fe({type:i,wallet:e,transaction:t}){const{from:n,input:o,value:a,to:f,nonce:l,gas:s,network:r}=t,c=W[r],{gasPriceProbability:d}=Y.get().notify.replacement,{gas:v,apiKey:u}=Z;if(!v)return;const[b]=await v.get({chains:[W[r]],endpoint:"blockPrices",apiKey:u}),{maxFeePerGas:p,maxPriorityFeePerGas:y}=b.blockPrices[0].estimatedPrices.find(({confidence:L})=>L===(i==="speedup"?d==null?void 0:d.speedup:d==null?void 0:d.cancel))||{};if(!p||!y)return;const z=ee(p),j=ee(y),k=o==="0x"?{}:{data:o};return e.provider.request({method:"eth_sendTransaction",params:[Object.assign({type:"0x2",from:n,to:i==="cancel"?n:f,chainId:parseInt(c),value:$e(BigInt(a)),nonce:te(l),gasLimit:te(s),maxFeePerGas:z,maxPriorityFeePerGas:j},k)]})}function ct(i){O(i,"svelte-ftkynd",`.bn-notify-notification.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{--backround-color:var(--notify-onboard-background, var(--w3o-backround-color, var(--gray-700)));--foreground-color:var(--w3o-foreground-color, var(--gray-600));--text-color:var(--w3o-text-color, #FFF);--border-color:var(--w3o-border-color);font-family:inherit;transition:background 300ms ease-in-out, color 300ms ease-in-out;pointer-events:all;backdrop-filter:blur(5px);width:100%;min-height:56px;display:flex;flex-direction:column;position:relative;overflow:hidden;border:1px solid transparent;border-radius:var(
      --notify-onboard-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );background:var(--foreground-color);color:var(--text-color)}.bn-notify-notification-inner.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{padding:0.75rem}.bn-notify-notification.svelte-ftkynd:hover>div.bn-notify-notification-inner.svelte-ftkynd>div.notify-close-btn-desktop.svelte-ftkynd{visibility:visible;opacity:1}div.notify-close-btn.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{margin-left:auto;margin-bottom:auto;height:24px;width:24px;position:absolute;top:8px;right:8px;justify-content:center;align-items:center}div.notify-close-btn-desktop.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{visibility:hidden;transition:visibility 0.15s linear, opacity 0.15s linear;opacity:0}.notify-close-btn.svelte-ftkynd .close-icon.svelte-ftkynd.svelte-ftkynd{width:20px;margin:auto;color:var(--text-color)}.notify-close-btn.svelte-ftkynd>.close-icon.svelte-ftkynd.svelte-ftkynd{color:var(--notify-onboard-close-icon-color)}.notify-close-btn.svelte-ftkynd:hover>.close-icon.svelte-ftkynd.svelte-ftkynd{color:var(--notify-onboard-close-icon-hover)}.transaction-status.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{color:var(
      --notify-onboard-transaction-status-color,
      var(--onboard-primary-100, var(--primary-100))
    );line-height:14px}.dropdown.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{height:0px;overflow:hidden;transition:height 150ms ease-in-out}.dropdown-visible.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{height:48px}.dropdown-buttons.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{background-color:var(
      --notify-onboard-dropdown-background,
      var(--onboard-gray-700, var(--gray-700))
    );width:100%;padding:8px}.dropdown-button.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd{padding:4px 12px;border-radius:var(
      --notify-onboard-dropdown-border-radius,
      var(--onboard-border-radius-5, var(--border-radius-5))
    );background-color:transparent;font-size:var(
      --notify-onboard-dropdown-font-size,
      var(--onboard-font-size-6, var(--font-size-6))
    );color:var(
      --notify-onboard-dropdown-text-color,
      var(--onboard-primary-400, var(--primary-400))
    );transition:all 150ms ease-in-out;cursor:pointer}.dropdown-button.svelte-ftkynd.svelte-ftkynd.svelte-ftkynd:hover{background:var(
      --notify-onboard-dropdown-btn-hover-background,
      rgba(146, 155, 237, 0.2)
    )}`)}function de(i){let e,t,n,o,a,f;return{c(){e=h("div"),t=h("button"),t.textContent="Cancel",n=x(),o=h("button"),o.textContent="Speed-up",m(t,"class","dropdown-button svelte-ftkynd"),m(o,"class","dropdown-button svelte-ftkynd"),m(e,"class","dropdown-buttons flex items-center justify-end svelte-ftkynd")},m(l,s){_(l,e,s),g(e,t),g(e,n),g(e,o),a||(f=[S(t,"click",i[10]),S(o,"click",i[11])],a=!0)},p:I,d(l){l&&C(e),a=!1,he(f)}}}function ft(i){let e,t,n,o,a,f,l,s,r,c,d,v,u,b;n=new Ye({props:{notification:i[0],chainStyles:U[W[i[0].network]]}}),a=new ot({props:{notification:i[0]}});let p=i[0].eventCode==="txPool"&&de(i);return{c(){e=h("div"),t=h("div"),D(n.$$.fragment),o=x(),D(a.$$.fragment),f=x(),l=h("div"),s=h("div"),r=x(),c=h("div"),p&&p.c(),m(s,"class","flex items-center close-icon svelte-ftkynd"),m(l,"class","notify-close-btn notify-close-btn-"+i[4].type+" pointer flex svelte-ftkynd"),m(t,"class","flex bn-notify-notification-inner svelte-ftkynd"),m(c,"class","dropdown svelte-ftkynd"),A(c,"dropdown-visible",i[2]&&i[5]&&le(i[0].eventCode)&&se(i[0].network)&&ce(i[7])),m(e,"class",d="bn-notify-notification bn-notify-notification-"+i[0].type+"} svelte-ftkynd"),A(e,"bn-notify-clickable",i[0].onClick)},m(y,z){_(y,e,z),g(e,t),F(n,t,null),g(t,o),F(a,t,null),g(t,f),g(t,l),g(l,s),s.innerHTML=at,g(e,r),g(e,c),p&&p.m(c,null),v=!0,u||(b=[S(l,"click",ye(i[9])),S(e,"mouseenter",i[12]),S(e,"mouseleave",i[13]),S(e,"click",i[8])],u=!0)},p(y,[z]){const j={};z&1&&(j.notification=y[0]),z&1&&(j.chainStyles=U[W[y[0].network]]),n.$set(j);const k={};z&1&&(k.notification=y[0]),a.$set(k),y[0].eventCode==="txPool"?p?p.p(y,z):(p=de(y),p.c(),p.m(c,null)):p&&(p.d(1),p=null),(!v||z&165)&&A(c,"dropdown-visible",y[2]&&y[5]&&le(y[0].eventCode)&&se(y[0].network)&&ce(y[7])),(!v||z&1&&d!==(d="bn-notify-notification bn-notify-notification-"+y[0].type+"} svelte-ftkynd"))&&m(e,"class",d),(!v||z&1)&&A(e,"bn-notify-clickable",y[0].onClick)},i(y){v||(w(n.$$.fragment,y),w(a.$$.fragment,y),v=!0)},o(y){T(n.$$.fragment,y),T(a.$$.fragment,y),v=!1},d(y){y&&C(e),H(n),H(a),p&&p.d(),u=!1,he(b)}}}function dt(i,e,t){let n,o;$(i,Me,k=>t(15,n=k)),$(i,ge,k=>t(3,o=k));const{device:a,gas:f}=Z;let{notification:l}=e,{updateParentOnRemove:s}=e,r,c=!1;const d=Oe.getValue().find(({hash:k})=>k===l.id),v=d&&n.find(({accounts:k})=>!!k.find(({address:L})=>L.toLowerCase()===d.from.toLowerCase()));function u(k){l!=null&&l.onClick&&l.onClick(k)}ke(()=>{clearTimeout(r)});const b=()=>{J(l.id),Q(l.id),s()},p=async()=>{try{await fe({type:"cancel",wallet:v,transaction:d})}catch{const L=`${d.hash.slice(0,9)}:txReplaceError${d.hash.slice(-5)}`;X({id:L,type:"hint",eventCode:"txError",message:o("notify.transaction.txReplaceError"),key:L,autoDismiss:4e3})}},y=async()=>{try{await fe({type:"speedup",wallet:v,transaction:d})}catch{const L=`${d.hash.slice(0,9)}:txReplaceError${d.hash.slice(-5)}`;X({id:L,type:"hint",eventCode:"txError",message:o("notify.transaction.txReplaceError"),key:L,autoDismiss:4e3})}},z=()=>t(2,c=!0),j=()=>t(2,c=!1);return i.$$set=k=>{"notification"in k&&t(0,l=k.notification),"updateParentOnRemove"in k&&t(1,s=k.updateParentOnRemove)},i.$$.update=()=>{i.$$.dirty&1&&l.autoDismiss&&(r=setTimeout(()=>{J(l.id),Q(l.id)},l.autoDismiss))},[l,s,c,o,a,f,d,v,u,b,p,y,z,j]}class ut extends R{constructor(e){super(),N(this,e,dt,ft,M,{notification:0,updateParentOnRemove:1},ct)}}function vt(i){O(i,"svelte-1h8mmo3",`ul.svelte-1h8mmo3{padding-left:0;display:flex;flex-flow:column nowrap;font-size:var(
      --notify-onboard-font-size,
      var(--onboard-font-size-5, var(--font-size-5))
    );list-style-type:none;overflow:visible;scrollbar-width:none;box-sizing:border-box;z-index:var(--notify-onboard-z-index, 300);font-family:var(
      --notify-onboard-font-family,
      var(--onboard-font-family-normal, inherit)
    );margin:8px 0;pointer-events:all}.y-scroll.svelte-1h8mmo3{overflow-y:scroll}.y-visible.svelte-1h8mmo3{overflow-y:visible}li.notification-list-top.svelte-1h8mmo3:not(:first-child){margin-top:8px}li.notification-list-bottom.svelte-1h8mmo3:not(:first-child){margin-bottom:8px}ul.bn-notify-bottomLeft.svelte-1h8mmo3,ul.bn-notify-bottomRight.svelte-1h8mmo3{flex-direction:column-reverse}@media only screen and (max-width: 450px){ul.svelte-1h8mmo3{width:100%}}.bn-notify-clickable:hover{cursor:pointer}.svelte-1h8mmo3::-webkit-scrollbar{display:none}`)}function ue(i,e,t){const n=i.slice();return n[12]=e[t],n}function ve(i){let e,t=[],n=new Map,o,a,f,l=i[2];const s=r=>r[12].key;for(let r=0;r<l.length;r+=1){let c=ue(i,l,r),d=s(c);n.set(d,t[r]=pe(d,c))}return{c(){e=h("ul");for(let r=0;r<t.length;r+=1)t[r].c();m(e,"class",o="bn-notify-"+i[0]+" "+i[5]+" svelte-1h8mmo3"),m(e,"style",a=`${i[0].includes("top")?"justify-content:flex-start;":""}; max-height: calc(100vh - ${i[6].expanded?"412px":i[1]&&i[7].type!=="mobile"?"82px":!i[1]&&i[7].type==="mobile"?"108px":"24px"})`)},m(r,c){_(r,e,c);for(let d=0;d<t.length;d+=1)t[d]&&t[d].m(e,null);f=!0},p(r,c){if(c&517){l=r[2],G();for(let d=0;d<t.length;d+=1)t[d].r();t=Ce(t,c,s,1,r,l,n,e,Ie,pe,null,ue);for(let d=0;d<t.length;d+=1)t[d].a();V()}(!f||c&33&&o!==(o="bn-notify-"+r[0]+" "+r[5]+" svelte-1h8mmo3"))&&m(e,"class",o),(!f||c&67&&a!==(a=`${r[0].includes("top")?"justify-content:flex-start;":""}; max-height: calc(100vh - ${r[6].expanded?"412px":r[1]&&r[7].type!=="mobile"?"82px":!r[1]&&r[7].type==="mobile"?"108px":"24px"})`))&&m(e,"style",a)},i(r){if(!f){for(let c=0;c<l.length;c+=1)w(t[c]);f=!0}},o(r){for(let c=0;c<t.length;c+=1)T(t[c]);f=!1},d(r){r&&C(e);for(let c=0;c<t.length;c+=1)t[c].d()}}}function pe(i,e){let t,n,o,a,f,l,s,r=I,c,d,v;return n=new ut({props:{notification:e[12],updateParentOnRemove:e[9]}}),{key:i,first:null,c(){t=h("li"),D(n.$$.fragment),o=x(),m(t,"class",a=B(`bn-notify-li-${e[0]} ${e[0].includes("top")?"notification-list-top":"notification-list-bottom"}`)+" svelte-1h8mmo3"),this.first=t},m(u,b){_(u,t,b),F(n,t,null),g(t,o),c=!0,d||(v=S(t,"click",ye(e[10])),d=!0)},p(u,b){e=u;const p={};b&4&&(p.notification=e[12]),n.$set(p),(!c||b&1&&a!==(a=B(`bn-notify-li-${e[0]} ${e[0].includes("top")?"notification-list-top":"notification-list-bottom"}`)+" svelte-1h8mmo3"))&&m(t,"class",a)},r(){s=t.getBoundingClientRect()},f(){ze(t),r(),Te(t,s)},a(){r(),r=je(t,s,He,{duration:500})},i(u){c||(w(n.$$.fragment,u),u&&Le(()=>{c&&(l&&l.end(1),f=xe(t,Pe,{duration:1200,delay:300,x:e[3],y:e[4],easing:mt}),f.start())}),c=!0)},o(u){T(n.$$.fragment,u),f&&f.invalidate(),l=Se(t,Re,{duration:300,easing:be}),c=!1},d(u){u&&C(t),H(n),u&&l&&l.end(),d=!1,v()}}}function pt(i){let e,t,n=i[2].length&&ve(i);return{c(){n&&n.c(),e=me()},m(o,a){n&&n.m(o,a),_(o,e,a),t=!0},p(o,[a]){o[2].length?n?(n.p(o,a),a&4&&w(n,1)):(n=ve(o),n.c(),w(n,1),n.m(e.parentNode,e)):n&&(G(),T(n,1,1,()=>{n=null}),V())},i(o){t||(w(n),t=!0)},o(o){T(n),t=!1},d(o){n&&n.d(o),o&&C(e)}}}function mt(i){return Math.sin(-13*(i+1)*Math.PI/2)*Math.pow(2,-35*i)+1}function yt(i,e,t){let n;const{device:o}=Z,a=Y.select("accountCenter").pipe(_e(Y.get().accountCenter),we(1));$(i,a,p=>t(6,n=p));let{position:f}=e,{sharedContainer:l}=e,{notifications:s}=e,r,c;r=0,c=0;let d="y-scroll";const v=()=>{d!=="y-visible"&&t(5,d="y-visible"),u(function(){t(5,d="y-scroll")},1e3)},u=function(){let p=null;return(y,z)=>{clearTimeout(p),p=setTimeout(y,z)}}();function b(p){Ee.call(this,i,p)}return i.$$set=p=>{"position"in p&&t(0,f=p.position),"sharedContainer"in p&&t(1,l=p.sharedContainer),"notifications"in p&&t(2,s=p.notifications)},i.$$.update=()=>{i.$$.dirty&1&&(f.includes("top")?t(4,c=-50):t(4,c=50))},[f,l,s,r,c,d,n,o,a,v,b]}class ht extends R{constructor(e){super(),N(this,e,yt,pt,M,{position:0,sharedContainer:1,notifications:2},vt)}}export{ht as default};
