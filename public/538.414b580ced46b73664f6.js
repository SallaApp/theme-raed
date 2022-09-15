/*! For license information please see 538.414b580ced46b73664f6.js.LICENSE.txt */
"use strict";(self.webpackChunkTheme_Raed=self.webpackChunkTheme_Raed||[]).push([[538],{5525:(t,a,l)=>{l.d(a,{C:()=>s});const s='\x3c!-- Generated by IcoMoon.io --\x3e\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">\n<title>cancel</title>\n<path d="M17.885 16l7.057-7.057c0.521-0.521 0.521-1.364 0-1.885s-1.364-0.521-1.885 0l-7.057 7.057-7.057-7.057c-0.521-0.521-1.364-0.521-1.885 0s-0.521 1.364 0 1.885l7.057 7.057-7.057 7.057c-0.521 0.521-0.521 1.364 0 1.885 0.26 0.26 0.601 0.391 0.943 0.391s0.683-0.131 0.943-0.391l7.057-7.057 7.057 7.057c0.26 0.26 0.601 0.391 0.943 0.391s0.683-0.131 0.943-0.391c0.521-0.521 0.521-1.364 0-1.885z"></path>\n</svg>\n'},6538:(t,a,l)=>{l.r(a),l.d(a,{salla_loyalty:()=>n});var s=l(6298),e=l(9964),i=l(5525);const n=class{constructor(t){(0,s.r)(this,t),this.loyaltyProgram=void 0,this.buttonLoading=!1,this.selectedItem=void 0,this.askConfirmation=!1,this.is_loggedin=!1,this.prizePoints=void 0,this.customerPoints=void 0,this.prizeTitle=void 0,this.allowEmail=!0,this.allowMobile=!0,this.requireEmail=!1,salla.event.on("loyalty::open",(()=>this.open())),salla.auth.event.onLoggedIn((()=>{this.is_loggedin=!0})),salla.lang.onLoaded((()=>{this.translationLoaded=!0}))}setSelectedPrizeItem(t){this.selectedItem&&this.selectedItem.id==t.id?this.selectedItem=void 0:this.selectedItem=t}handleLongText(t){return t.length>150?t.substring(0,150)+"...":t}prizeItem(t){let a={"s-loyalty-prize-item-selected":!!this.selectedItem&&this.selectedItem.id==t.id,"s-loyalty-prize-item":!0};return(0,s.h)("div",{onClick:()=>this.setSelectedPrizeItem(t),class:a},(0,s.h)("img",{class:"s-loyalty-prize-item-image",src:t.image,alt:t.name}),(0,s.h)("div",{class:"s-loyalty-prize-item-title"},t.name),(0,s.h)("div",{class:"s-loyalty-prize-item-subtitle"},this.handleLongText(t.description)),(0,s.h)("div",{class:"s-loyalty-prize-item-points"},t.cost_points," ",salla.lang.get("pages.loyalty_program.point"),(0,s.h)("div",{class:"s-loyalty-prize-item-check"},(0,s.h)("div",null))))}getConfirmationModal(){var t,a;return[(0,s.h)("salla-placeholder",{alignment:"center",icon:'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">\n<title>star3</title>\n  <defs>\n    <style>\n      .a {\n        fill: none !important;\n      }\n\n      .b {\n        fill: #ff9e01;\n      }\n\n      .c {\n        fill: #fff;\n        opacity: 0.1;\n      }\n\n    </style>\n  </defs>\n  <g transform="translate(-683 -269)">\n    <rect class="a" width="80" height="80" transform="translate(683 269)" />\n    <g transform="translate(684.539 261.216)">\n      <path class="b"\n        d="M110.117,37.062,90.024,35.2,82.043,16.665a1.61,1.61,0,0,0-2.958,0L71.1,35.2,51.011,37.062a1.61,1.61,0,0,0-.914,2.813l15.16,13.318L60.821,72.878a1.61,1.61,0,0,0,2.393,1.739l17.351-10.3,17.351,10.3a1.61,1.61,0,0,0,2.393-1.739L95.871,53.192l15.16-13.318A1.61,1.61,0,0,0,110.117,37.062Z"\n        transform="translate(-42.104 -4.011)" />\n      <g transform="translate(0 10.971)">\n        <path class="b"\n          d="M93.54,12.016c1.024,1.423,3.915,7.533,5.568,11.094a.559.559,0,0,1-.891.641c-2.853-2.7-7.73-7.377-8.754-8.8a2.512,2.512,0,0,1,4.077-2.935Z"\n          transform="translate(-75.621 -10.971)" />\n        <path class="b"\n          d="M360.909,12.016c-1.024,1.423-3.915,7.533-5.568,11.094a.559.559,0,0,0,.891.641c2.853-2.7,7.73-7.377,8.754-8.8a2.512,2.512,0,0,0-4.077-2.935Z"\n          transform="translate(-301.908 -10.971)" />\n        <path class="b"\n          d="M427.538,284.659c-1.667-.543-8.366-1.441-12.261-1.934a.559.559,0,0,0-.34,1.044c3.436,1.9,9.377,5.123,11.044,5.666a2.512,2.512,0,0,0,1.558-4.776Z"\n          transform="translate(-352.351 -241.894)" />\n        <path class="b"\n          d="M1.734,284.659c1.667-.543,8.366-1.441,12.261-1.934a.559.559,0,0,1,.34,1.044c-3.436,1.9-9.377,5.123-11.044,5.666a2.512,2.512,0,0,1-1.558-4.776Z"\n          transform="translate(0 -241.894)" />\n        <path class="b"\n          d="M239.794,412.414c0-1.753,1.224-8.4,1.963-12.257a.559.559,0,0,1,1.1,0c.739,3.855,1.963,10.5,1.963,12.257a2.512,2.512,0,0,1-5.023,0Z"\n          transform="translate(-203.768 -341.301)" />\n      </g>\n      <path class="c"\n        d="M84.945,23.4l-2.9-6.74a1.61,1.61,0,0,0-2.958,0L71.1,35.2,51.011,37.062a1.61,1.61,0,0,0-.914,2.813l15.16,13.318L60.821,72.878a1.61,1.61,0,0,0,2.393,1.739l2.309-1.371A125,125,0,0,1,84.945,23.4Z"\n        transform="translate(-42.104 -4.011)" />\n    </g>\n  </g>\n</svg>\n',class:"s-loyalty-confirmation-modal-content"},(0,s.h)("div",{slot:"title",class:"s-loyalty-confirmation-title"},salla.lang.get("pages.loyalty_program.exchange_points")),(0,s.h)("div",{slot:"description"},salla.lang.get("pages.loyalty_program.are_you_sure_to_exchange")," ( ",(0,s.h)("strong",null,null===(t=this.selectedItem)||void 0===t?void 0:t.cost_points)," ) ",salla.lang.get("pages.loyalty_program.for")," ( ",(0,s.h)("strong",null,null===(a=this.selectedItem)||void 0===a?void 0:a.name)," )")),(0,s.h)("div",{class:"s-loyalty-confirmation-actions"},(0,s.h)("salla-button",{fill:"outline",width:"wide",onClick:()=>this.cancelProcess()},salla.lang.get("pages.loyalty_program.cancellation")),(0,s.h)("salla-button",{loading:this.buttonLoading,width:"wide",onClick:()=>this.exchangeLoyaltyPoint()},salla.lang.get("pages.loyalty_program.confirm")))]}getAfterExchangeUI(){return(0,s.h)("slot",{name:"points-applied-widget"},(0,s.h)("salla-list-tile",{class:"s-loyalty-after-exchange"},(0,s.h)("div",{slot:"title",class:"s-loyalty-after-exchange-title"},this.prizeTitle,"   -   ",this.prizePoints),(0,s.h)("div",{slot:"action",class:"s-loyalty-after-exchange-action"},(0,s.h)("salla-button",{class:"s-loyalty-after-exchange-reset",shape:"icon",fill:"outline",color:"danger",size:"small",onClick:()=>this.resetExchange()},(0,s.h)("span",{innerHTML:i.C})))))}async open(){return this.is_loggedin?(this.modal.open(),await salla.loyalty.getProgram().then((t=>{this.loyaltyProgram=t.data})).catch((t=>console.log(t))).finally((()=>{this.modal.stopLoading()}))):salla.event.dispatch("login::open")}async close(){return this.modal.close()}async resetExchange(){return await salla.loyalty.reset().then((()=>{this.prizePoints=void 0,this.prizeTitle=void 0})).catch((t=>console.log(t)))}async openConfirmation(){return await this.modal.close().then((()=>this.confirmationModal.open())).catch((t=>console.log(t)))}async cancelProcess(){return await this.confirmationModal.close().then((()=>this.selectedItem=null)).catch((t=>console.log(t)))}async exchangeLoyaltyPoint(){return this.buttonLoading=!0,await salla.loyalty.exchange(this.selectedItem.id).then((t=>{this.loyaltyProgram=t.data})).catch((t=>console.log(t))).finally((()=>{this.buttonLoading=!1,this.cancelProcess()}))}render(){return this.prizePoints?this.getAfterExchangeUI():[(0,s.h)("slot",{name:"widget"},this.customerPoints?(0,s.h)("salla-list-tile",{class:"s-loyalty-widget"},(0,s.h)("div",{slot:"icon",class:"s-loyalty-widget-icon",innerHTML:e.S}),(0,s.h)("div",{slot:"subtitle"},this.is_loggedin?salla.lang.get("pages.loyalty_program.cart_total_point_summary",{balance:this.customerPoints}):this.guestMessage||salla.lang.get("pages.loyalty_program.guest_message"),(0,s.h)("salla-button",{shape:"link",color:"primary",onClick:()=>salla.event.dispatch("loyalty::open")},this.is_loggedin?salla.lang.get("pages.loyalty_program.cart_point_exchange_now"):salla.lang.get("blocks.header.login")))):""),(0,s.h)("salla-modal",{noPadding:!0,width:"sm",ref:t=>this.confirmationModal=t},this.getConfirmationModal()),(0,s.h)("salla-modal",{isLoading:!0,"has-skeleton":!0,width:"md",ref:t=>this.modal=t},(0,s.h)("div",{slot:"loading"},(0,s.h)("div",{class:"s-loyalty-skeleton"},(0,s.h)("salla-list-tile",{class:"s-loyalty-header"},(0,s.h)("div",{slot:"icon",class:"s-loyalty-header-icon"},(0,s.h)("salla-skeleton",{type:"circle",height:"6rem",width:"6rem"})),(0,s.h)("div",{slot:"title",class:"s-loyalty-header-title mb-5"},(0,s.h)("salla-skeleton",{height:"15px",width:"50%"})),(0,s.h)("div",{slot:"subtitle",class:"s-loyalty-header-subtitle"},(0,s.h)("salla-skeleton",{height:"10px"}),(0,s.h)("salla-skeleton",{height:"10px",width:"75%"}))),(0,s.h)("div",{class:"s-loyalty-skeleton-cards"},[...Array(3)].map((()=>(0,s.h)("div",{class:"s-loyalty-prize-item"},(0,s.h)("salla-skeleton",{height:"9rem"}),(0,s.h)("div",{class:"s-loyalty-prize-item-title"},(0,s.h)("salla-skeleton",{height:"15px",width:"75%"})),(0,s.h)("div",{class:"s-loyalty-prize-item-subtitle"},(0,s.h)("salla-skeleton",{height:"10px",width:"50%"}),(0,s.h)("salla-skeleton",{height:"10px",width:"25%"})),(0,s.h)("div",{class:"s-loyalty-prize-item-points"},(0,s.h)("salla-skeleton",{height:"15px",width:"100px"}),(0,s.h)("div",{class:"s-loyalty-prize-item-check"},(0,s.h)("salla-skeleton",{height:"1rem",width:"1rem",type:"circle"}))))))))),this.loyaltyProgram?[(0,s.h)("salla-list-tile",{id:"s-loyalty-header",class:"s-loyalty-header"},(0,s.h)("div",{slot:"icon",class:"s-loyalty-header-icon",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" width="54.079" height="53.191" viewBox="0 0 54.079 53.191"><defs><style>.a{fill:#ee9d0d;}.b{fill:#c7830b;}.c{fill:#ea2b2d;}.d{fill:#cb2527;}.e{fill:#6699ce;}.f{fill:#faa6b2;}.g{fill:#a6deff;}.h{fill:#eeb436;}.i{fill:#f72d2f;}</style></defs><path class="a" d="M40,248H77.3v25.88a2.1,2.1,0,0,1-2.1,2.1H42.1a2.1,2.1,0,0,1-2.1-2.1Z" transform="translate(-38.135 -222.787)"/><path class="b" d="M250.632,248.711v12.755L236.2,248h13.67Z" transform="translate(-211.463 -222.787)"/><path class="b" d="M333.957,336v3.207L330.52,336Z" transform="translate(-294.787 -300.528)"/><path class="c" d="M226.194,32.048l-.5.185a5.035,5.035,0,0,0-3.072,3.292l-.468,1.585-.759.414a5.035,5.035,0,0,0-2.422,3l8.865,8.271,5.09-5.456.262-6.205a5.191,5.191,0,0,0-7-5.083Z" transform="translate(-196.246 -31.722)"/><path class="c" d="M358.628,175.48l-.15.509a5.034,5.034,0,0,1-3.072,3.292l-1.55.577-.359.785a5.034,5.034,0,0,1-2.822,2.624L341.81,175l5.09-5.455,6.172-.69a5.191,5.191,0,0,1,5.555,6.629Z" transform="translate(-304.761 -152.837)"/><path class="d" d="M168,248h7.461v27.978H168Z" transform="translate(-151.213 -222.787)"/><path class="c" d="M40,336H77.3v7.461H40Z" transform="translate(-38.135 -300.528)"/><path class="d" d="M333.957,336v3.207L330.52,336Z" transform="translate(-294.787 -300.528)"/><path class="a" d="M2.1,0H40.8a2.1,2.1,0,0,1,2.1,2.1V9.326H0V2.1A2.1,2.1,0,0,1,2.1,0Z" transform="matrix(0.731, 0.682, -0.682, 0.731, 18.641, 4.976)"/><path class="d" d="M0,0H9.326V9.326H0Z" transform="matrix(0.731, 0.682, -0.682, 0.731, 30.912, 16.424)"/><path class="d" d="M286.857,79.389a.931.931,0,0,1-.74-.365l-.615-.8a12.516,12.516,0,0,1-2.528-9,.933.933,0,0,1,1.855.2,10.66,10.66,0,0,0,2.153,7.667l.615.8a.933.933,0,0,1-.739,1.5Z" transform="translate(-252.718 -64.113)"/><path class="c" d="M185.485,178.151l-.039.014a30.78,30.78,0,0,1-12.034,1.906l-2.381-.1,4.092,3.817-1.181,4,3.728-1.206a30.775,30.775,0,0,0,9.833-5.315l.71-.572Z" transform="translate(-153.891 -161.081)"/><path class="d" d="M363.834,194.779a12.51,12.51,0,0,1-6.93-2.1l-.843-.559a.933.933,0,1,1,1.031-1.554l.842.558a10.659,10.659,0,0,0,7.8,1.618.933.933,0,1,1,.328,1.836A12.663,12.663,0,0,1,363.834,194.779Z" transform="translate(-316.982 -171.914)"/><path class="c" d="M275,202.524l-.012.04a30.776,30.776,0,0,0-1.069,12.137l.265,2.369-4.092-3.817-3.909,1.455.945-3.8a30.776,30.776,0,0,1,4.622-10.177l.521-.748Z" transform="translate(-237.949 -180.364)"/><circle class="e" cx="1.865" cy="1.865" r="1.865" transform="translate(10.259 0.032)"/><circle class="f" cx="1.865" cy="1.865" r="1.865" transform="translate(0 21.482)"/><path class="g" d="M36.663,36.663a.933.933,0,0,1-.885-.638l-.048-.143a2.946,2.946,0,0,0-2.8-2.017.933.933,0,1,1,0-1.865A4.808,4.808,0,0,1,37.5,35.292l.048.143a.933.933,0,0,1-.885,1.228Z" transform="translate(-31.067 -31.968)"/><path class="g" d="M79.493,194.438a.929.929,0,0,1-.506-.15l-.185-.12a2.074,2.074,0,0,0-2.192-.047.933.933,0,0,1-.947-1.607,3.929,3.929,0,0,1,4.153.088l.185.12a.933.933,0,0,1-.508,1.716Z" transform="translate(-69.235 -173.283)"/><path class="h" d="M27.751,85.141l2.88,2.644,3.811-.874-1.624,3.556,2.008,3.354-3.884-.446-2.569,2.946L27.6,92.49,24,90.957l3.4-1.922Z" transform="translate(-24 -78.914)"/><path class="h" d="M82.174,227.375l-.959,3.772,2.564,2.928-3.884.254L77.9,237.673l-1.442-3.615-3.8-.862,2.993-2.488-.353-3.876,3.291,2.078Z" transform="translate(-66.992 -204.086)"/><path class="i" d="M300.471,141.9l-5.455-5.09,5.09-5.456a8.342,8.342,0,0,1,5.455,5.09Z" transform="translate(-263.422 -119.737)"/></svg>'}),(0,s.h)("div",{slot:"title",class:"s-loyalty-header-title"},this.loyaltyProgram.prize_promotion_title),(0,s.h)("div",{slot:"subtitle",class:"s-loyalty-header-subtitle"},this.loyaltyProgram.prize_promotion_description)),(0,s.h)("salla-tabs",null,this.loyaltyProgram.prizes.map((t=>(0,s.h)("salla-tab-header",{slot:"header",name:t.title},(0,s.h)("span",null,t.title)))),this.loyaltyProgram.prizes.map((t=>(0,s.h)("salla-tab-content",{slot:"content",name:t.title},(0,s.h)("salla-swiper",{"space-between-items":"20"},t.items.map((t=>this.prizeItem(t)))))))),(0,s.h)("salla-button",{disabled:!this.selectedItem,width:"wide",class:"s-loyalty-program-redeem-btn",onClick:()=>this.openConfirmation()},salla.lang.get("pages.loyalty_program.exchange_points"))]:(0,s.h)("salla-placeholder",{class:"s-loyalty-placeholder",alignment:"center"}))]}componentDidLoad(){this.is_loggedin=salla.config.isUser()}};n.style="#salla-loyalty-modal .s-swiper-button-prev button,#salla-loyalty-modal .s-swiper-button-next button{box-shadow:#32325d40 0px 6px 12px -2px, #0000004d 0px 3px 7px -3px}"},9964:(t,a,l)=>{l.d(a,{S:()=>s});const s='\x3c!-- Generated by IcoMoon.io --\x3e\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 30 32">\n<title>star2</title>\n<path d="M29.714 11.839c0 0.321-0.232 0.625-0.464 0.857l-6.482 6.321 1.536 8.929c0.018 0.125 0.018 0.232 0.018 0.357 0 0.464-0.214 0.893-0.732 0.893-0.25 0-0.5-0.089-0.714-0.214l-8.018-4.214-8.018 4.214c-0.232 0.125-0.464 0.214-0.714 0.214-0.518 0-0.75-0.429-0.75-0.893 0-0.125 0.018-0.232 0.036-0.357l1.536-8.929-6.5-6.321c-0.214-0.232-0.446-0.536-0.446-0.857 0-0.536 0.554-0.75 1-0.821l8.964-1.304 4.018-8.125c0.161-0.339 0.464-0.732 0.875-0.732s0.714 0.393 0.875 0.732l4.018 8.125 8.964 1.304c0.429 0.071 1 0.286 1 0.821z"></path>\n</svg>\n'}}]);