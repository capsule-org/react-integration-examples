import{be as s,bi as t,bf as e,bg as n,bh as o}from"./index-kMdOwXZx.js";const a=":host{display:none;position:absolute;top:0;left:0;width:100vw;height:100vh;justify-content:center;align-items:center;z-index:10005}:host .card{z-index:10005;opacity:0;position:relative;transition:all}:host(.no-overlay){position:relative;top:unset;left:unset;width:100%;height:auto}:host(.open) .card{opacity:1}:host(.elevated) .card{--card-border-width:0px}:host(.elevated) .card::part(card-container){box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.12)}",r=a,l=class{constructor(i){s(this,i),this.cpslModalEntering=t(this,"cpslModalEntering",7),this.cpslModalEntered=t(this,"cpslModalEntered",7),this.cpslModalExiting=t(this,"cpslModalExiting",7),this.cpslModalExited=t(this,"cpslModalExited",7),this.enterTransitionDuration=.15,this.exitTransitionDuration=.15,this.elevated=void 0,this.noOverlay=void 0,this.open=void 0,this.zIndexOverride=void 0}toggleHeight(){this.open?(this.cpslModalEntering.emit(),this.el.style.display="flex",setTimeout(()=>{this.cpslModalEntered.emit()},this.enterTransitionDuration*1e3)):(this.cpslModalExiting.emit(),setTimeout(()=>{this.el.style.display="none",this.cpslModalExited.emit()},this.exitTransitionDuration*1e3))}componentDidLoad(){this.toggleHeight()}render(){return e(n,{key:"0682407f6320fe77b42e4ceed6a9b7738a1b5541",class:{open:this.open,elevated:this.elevated,"no-overlay":this.noOverlay}},!this.noOverlay&&e("cpsl-overlay",{key:"2b9a8280643c0b665864c6b3ea863211125d941e",zIndexOverride:this.zIndexOverride?this.zIndexOverride:void 0,id:"overlay",open:this.open,enterTransitionDuration:this.enterTransitionDuration,exitTransitionDuration:this.exitTransitionDuration}),e("cpsl-card",{key:"d4aac4aeba42590762fec771bd9053982d02324b",class:"card",style:{transitionDuration:this.open?`${this.exitTransitionDuration}s`:`${this.enterTransitionDuration}s`}},e("slot",{key:"39043016d1b266aeedd62471e70e91c6cbcbc0f1"})))}get el(){return o(this)}static get watchers(){return{open:["toggleHeight"]}}};l.style=r;export{l as cpsl_modal_v2};
