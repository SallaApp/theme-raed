/*! For license information please see 646.js.LICENSE.txt */
"use strict";(self.webpackChunkTheme_One=self.webpackChunkTheme_One||[]).push([[646],{7844:(t,r,o)=>{o.r(r),o.d(r,{salla_installment:()=>e});var a=o(6298);const e=class{constructor(t){(0,a.r)(this,t),this.tabbyBorderRemoved=!1,this.tabbyRemoveBorderTries=0,this.language=salla.config.get("user.language_code"),this.currency=salla.config.get("user.currency_code"),salla.onReady((()=>{const t=salla.config.get("store.settings.installments");t&&(this.tamaraIsActive=-1!=t.indexOf("tamara_installment"),this.tabbyIsActive=-1!=t.indexOf("tabby_installment"),this.spotiiIsActive=-1!=t.indexOf("spotii_pay"))}))}render(){return(0,a.h)(a.H,null,this.tamaraIsActive?(0,a.h)("div",{class:"tamara-product-widget","data-price":this.price,"data-currency":this.currency,"data-lang":this.language,"data-payment-type":"installment"}):"",this.tabbyIsActive?(0,a.h)("div",{id:"tabbyPromoWrapper"},(0,a.h)("div",{id:"tabbyPromo"})):"",this.spotiiIsActive?(0,a.h)("div",{class:"spotii-wrapper"},(0,a.h)("div",{class:"spotii-promo"})):"")}componentDidLoad(){if(this.tamaraIsActive&&((t=document.createElement("script")).setAttribute("src","https://cdn.tamara.co/widget/product-widget.min.js"),document.head.appendChild(t),t.onload=()=>{window.TamaraProductWidget.init({lang:this.language}),setTimeout((()=>{window.TamaraProductWidget.render()}),300)}),this.tabbyIsActive&&((t=document.createElement("script")).setAttribute("src","https://checkout.tabby.ai/tabby-promo.js"),document.head.appendChild(t),t.onload=()=>{new(0,window.TabbyPromo)({selector:"#tabbyPromo",currency:this.currency,price:this.price,lang:this.language}),document.querySelectorAll(".tabby-promo-snippet__logo").forEach((function(t){t.setAttribute("aria-label","Tabby Logo")}))},this.removeTabbyBorder()),this.spotiiIsActive){let r=salla.money((Number(this.price)/4).toFixed(2)),o=salla.config.get("theme.is_rtl",!0);var t;window.spotiiConfig={targetXPath:[".spotii-wrapper"],renderToPath:[".spotii-promo"],numberOfPayment:4,currency:this.currency,templateLine:"${textOne} ${number} ${textTwo} "+r+"${logo} ${info}",textOne:o?"جزء الدفع على":"Split it into",textTwo:o?"أقساط متساوية بدون تكاليف اضافية بقيمة":"payments of",textThree:"مع",price:this.price},(t=document.createElement("script")).setAttribute("src",salla.url.cdn("js/price-widget-ar-salla.js")),document.head.appendChild(t)}}removeTabbyBorder(){this.tabbyBorderRemoved||this.tabbyRemoveBorderTries>5||(this.tabbyRemoveBorderTries++,setTimeout((()=>{let t=document.querySelector("#tabbyPromo>div>div");t=t?t.shadowRoot.querySelector('div[class^="styles__tabby-promo-snippet--"]'):null,t?(t.style="border: none; margin: 15px 0!important;",this.tabbyBorderRemoved=!0):this.removeTabbyBorder()}),500*this.tabbyRemoveBorderTries))}};e.style="#tabbyPromoWrapper{background:white;border-radius:0.375rem;transition:box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);margin-bottom:20px}.salla-y #tabbyPromoWrapper{border:1px solid var(--color-grey-dark);border-radius:12px}#tabbyPromoWrapper:hover{box-shadow:0 0 #0000, 0 0 #0000, 5px 10px 30px #2B2D340D}#tabbyPromoWrapper #tabbyPromo *{font-family:var(--font-main)}#tabbyPromoWrapper #tabbyPromo>div>div{max-width:none;box-shadow:none;border:none}#tabbyPromoWrapper #tabbyPromo .tabby-promo-snippet{max-width:100%;min-height:100px;padding:18px 20px;border:none !important}#tabbyPromoWrapper #tabbyPromo .tabby-promo-snippet__text,#tabbyPromoWrapper #tabbyPromo .tabby-promo-snippet__link{font-size:var(--font-sm);color:var(--color-text) !important}#tabbyPromoWrapper #tabbyPromo .tabby-promo-snippet__link{font-weight:bold}.tabby-promo-wrapper #tabby-promo{font-family:var(--font-main) !important}.tabby-promo-wrapper #tabby-promo .tabby-promo__feature-title{font-size:var(--font-md)}.tabby-promo-wrapper #tabby-promo .tabby-promo__feature-desc{font-size:var(--font-sm);line-height:20px}.tamara-product-widget{margin-bottom:20px}.tamara-product-widget,.spotii-wrapper{min-height:100px;position:relative;color:var(--color-text);font-size:var(--font-sm);line-height:1.25;padding:18px 20px 18px 100px !important;background:white;border-radius:0.375rem;transition:box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)}.salla-y .tamara-product-widget,.salla-y .spotii-wrapper{border-radius:12px;border:1px solid var(--color-grey-dark)}.tamara-product-widget:hover,.spotii-wrapper:hover{box-shadow:0 0 #0000, 0 0 #0000, 5px 10px 30px #2B2D340D}.tamara-product-widget .spotii-logo,.spotii-wrapper .spotii-logo{float:left;margin:0 0 0 -75px}.ltr .tamara-product-widget,.ltr .spotii-wrapper{text-align:left;padding:18px 100px 18px 20px !important}.ltr .tamara-product-widget .spotii-logo,.ltr .spotii-wrapper .spotii-logo{float:right;margin:0 -75px 0 0}.ltr .tamara-product-widget .spotii-product-widget,.ltr .spotii-wrapper .spotii-product-widget{text-align:left !important}.spotii-wrapper .spotii-promo{font-size:var(--font-md)}.spotii-wrapper .spotii-product-widget{font-size:var(--font-sm) !important;margin-top:10px}.tamara-product-widget .tamara-logo{position:absolute;left:20px;top:18px;margin:0 !important}.ltr .tamara-product-widget .tamara-logo{right:20px;left:auto}.tamara-product-widget span{font-family:var(--font-main);font-size:var(--font-sm);color:var(--color-text)}.tamara-product-widget span:last-child{display:block;position:relative;margin-top:8px}.tamara-popup__wrap{overflow:auto !important}"}}]);