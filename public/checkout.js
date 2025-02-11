(()=>{"use strict";var e={399:(e,t,n)=>{n.d(t,{A:()=>i});var o=n(29),r=n(901),a=function(){return(0,r.A)((function e(){(0,o.A)(this,e)}),[{key:"onReady",value:function(){}},{key:"registerEvents",value:function(){}},{key:"initiate",value:function(e){if(e&&!e.includes(salla.config.get("page.slug")))return app.log("The Class For (".concat(e.join(","),") Skipped."));this.onReady(),this.registerEvents(),app.log("The Class For (".concat((null==e?void 0:e.join(","))||"*",") Loaded🎉"))}}])}();a.initiateWhenReady=function(){var e,t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;"ready"===(null===(e=window.app)||void 0===e?void 0:e.status)?(new this).initiate(n):document.addEventListener("theme::ready",(function(){return(new t).initiate(n)}))};const i=a},417:(e,t,n)=>{function o(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(t,{A:()=>o})},29:(e,t,n)=>{function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,{A:()=>o})},901:(e,t,n)=>{n.d(t,{A:()=>a});var o=n(922);function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(0,o.A)(r.key),r)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}},954:(e,t,n)=>{function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}n.d(t,{A:()=>o})},501:(e,t,n)=>{n.d(t,{A:()=>r});var o=n(662);function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&(0,o.A)(e,t)}},822:(e,t,n)=>{n.d(t,{A:()=>a});var o=n(284),r=n(417);function a(e,t){if(t&&("object"==(0,o.A)(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,r.A)(e)}},662:(e,t,n)=>{function o(e,t){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},o(e,t)}n.d(t,{A:()=>o})},327:(e,t,n)=>{n.d(t,{A:()=>r});var o=n(284);function r(e,t){if("object"!=(0,o.A)(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=(0,o.A)(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}},922:(e,t,n)=>{n.d(t,{A:()=>a});var o=n(284),r=n(327);function a(e){var t=(0,r.A)(e,"string");return"symbol"==(0,o.A)(t)?t:t+""}},284:(e,t,n)=>{function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}n.d(t,{A:()=>o})}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(29),t=n(901),o=n(822),r=n(954),a=n(501);function i(e){if(e){var t=function(){var e=document.createElement("div");e.classList.add("loading-overlay","absolute","inset-0","z-50","flex","justify-center","items-center");var t=document.createElement("div");t.classList.add("absolute","inset-0","bg-white","opacity-40");var n=document.createElement("div");return n.innerHTML='<salla-loading size="32"></salla-loading>',n.classList.add("relative","z-10"),e.appendChild(t),e.appendChild(n),e}(),n=document.querySelector("#item-".concat(e," .cart-item"));n&&n.appendChild(t)}}function u(e){(e?[document.querySelector(".main-content form:not(.cart-options form)#item-".concat(e," .cart-item"))]:document.querySelectorAll(".main-content form:not(.cart-options form) .cart-item")).forEach((function(e){var t=null==e?void 0:e.querySelector(".loading-overlay");t&&setTimeout((function(){return t.remove()}),0)}))}function l(e){var t;return null===(t=e.querySelector('input[type="hidden"][name="id"]'))||void 0===t?void 0:t.value}function c(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(c=function(){return!!e})()}(function(n){function p(){return(0,e.A)(this,p),t=this,n=p,a=arguments,n=(0,r.A)(n),(0,o.A)(t,c()?Reflect.construct(n,a||[],(0,r.A)(t).constructor):n.apply(t,a));var t,n,a}return(0,a.A)(p,n),(0,t.A)(p,[{key:"onReady",value:function(){var e,t=this;salla.event.cart.onUpdated((function(e){return t.updateCartPageInfo(e)})),app.watchElements({couponCodeInput:"#coupon-input",couponBtn:"#coupon-btn",couponError:"#coupon-error",subTotal:"#sub-total",orderOptionsTotal:"#cart-options-total",totalDiscount:"#total-discount",taxAmount:"#tax-amount",shippingCost:"#shipping-cost",freeShipping:"#free-shipping",freeShippingBar:"#free-shipping-bar",freeShippingMsg:"#free-shipping-msg",freeShipApplied:"#free-shipping-applied"}),this.initiateCoupon(),this.initSubmitCart(),(e=document.querySelectorAll(".main-content form:not(.cart-options form)")).length&&(e.forEach((function(e){var t=l(e),n=e.querySelector("salla-product-options"),o=e.querySelector("salla-quantity-input");o&&function(e,t,n){var o=new MutationObserver((function(){var r=e.querySelector('input[name="quantity"]');r&&(o.disconnect(),r.addEventListener("change",(function(e){var o,r;n.reportValidity()&&Number(t)===Number(null===(o=e.detail)||void 0===o?void 0:o.productId)&&i(null===(r=e.detail)||void 0===r?void 0:r.productId)})))}));o.observe(e,{childList:!0,subtree:!0})}(o,t,e),n&&n.addEventListener("changed",(function(n){setTimeout((function(){var o,r,a;e.reportValidity()&&"added"!=(null===(o=n.detail)||void 0===o||null===(o=o.event)||void 0===o?void 0:o.type)&&Number(t)===Number(null===(r=n.detail)||void 0===r?void 0:r.productId)&&i(null===(a=n.detail)||void 0===a?void 0:a.productId)}),100)}))})),salla.cart.event.onItemUpdated((function(e,t){u(t)})),salla.cart.event.onItemUpdatedFailed((function(t,n){!function(e,t){salla.api.cart.getCurrentCartId(!1,"salla-product-options").then((function(e){return salla.cart.details(e,["options"])})).then((function(n){var o=n.data.cart.items.find((function(t){return Number(t.id)===Number(e)}));if(!o)throw new Error("Product with ID ".concat(e," not found in cart details."));!function(e,t){e.forEach((function(e){var n=l(e);if(Number(t.id)===Number(n)){var o=e.querySelector("salla-product-options"),r=e.querySelector("salla-quantity-input");o&&o.setOptionsData(t.options,!1),r&&r.setValue(t.quantity,!1)}}))}(t,o)})).then((function(){return u()})).catch((function(e){console.error("Error restoring cart item state:",e),u()}))}(n,e)})))}},{key:"initSubmitCart",value:function(){var e=document.querySelector("#cart-submit"),t=document.querySelectorAll('form[id^="item-"]');e&&app.onClick(e,(function(e){var n=!0;if(t.forEach((function(t){if(!(n=n&&t.reportValidity()))return e.preventDefault(),void salla.notify.error(salla.lang.get("common.messages.required_fields"))})),n){var o=e.currentTarget;"guest"==salla.config.get("user.type")?salla.cart.submit():o.load().then((function(){return salla.cart.submit()}))}}))}},{key:"updateCartOptions",value:function(e){var t;if(e&&e.length){var n=e.map((function(e){return e.id}));null===(t=document.querySelectorAll(".cart-options form"))||void 0===t||t.forEach((function(e){n.includes(parseInt(e.id.value))||e.remove()}))}}},{key:"updateCartPageInfo",value:function(e){var t,n,o=this;if(!e.count)return null===(n=document.querySelector(".cart-options"))||void 0===n||n.remove(),window.location.reload();if(this.updateCartOptions(null==e?void 0:e.options),null===(t=e.items)||void 0===t||t.forEach((function(e){return o.updateItemInfo(e)})),app.subTotal.innerText=salla.money(e.sub_total),app.taxAmount.innerText=salla.money(e.tax_amount),app.orderOptionsTotal&&(app.orderOptionsTotal.innerText=salla.money(e.options_total)),app.toggleElementClassIf(app.totalDiscount,"discounted","hidden",(function(){return!!e.total_discount})).toggleElementClassIf(app.shippingCost,"has_shipping","hidden",(function(){return!!e.real_shipping_cost})).toggleElementClassIf(app.freeShipping,"has_free","hidden",(function(){return!!e.free_shipping_bar})),app.totalDiscount.querySelector("b").innerText="- "+salla.money(e.total_discount),app.shippingCost.querySelector("b").innerText=salla.money(e.real_shipping_cost),e.free_shipping_bar){var r=e.free_shipping_bar.has_free_shipping;app.toggleElementClassIf(app.freeShippingBar,"active","hidden",(function(){return!r})).toggleElementClassIf(app.freeShipApplied,"active","hidden",(function(){return r})),app.freeShippingMsg.innerHTML=r?salla.lang.get("pages.cart.has_free_shipping"):salla.lang.get("pages.cart.free_shipping_alert",{amount:salla.money(e.free_shipping_bar.remaining)}),app.freeShippingBar.children[0].style.width=e.free_shipping_bar.percent+"%"}}},{key:"updateItemInfo",value:function(e){var t=document.querySelector("#item-"+e.id);if(t){var n=t.querySelector(".item-total"),o=t.querySelector(".item-price"),r=t.querySelector(".item-regular-price"),a=t.querySelector(".offer-name"),i=t.querySelector(".offer-icon"),u=e.offer||e.special_price>0,l=salla.money(e.total);l!==n.innerText&&(n.innerText=l,app.anime(n,{scale:[.88,1]})),app.toggleElementClassIf(a,"offer-applied","hidden",(function(){return u})).toggleElementClassIf(i,"offer-applied","hidden",(function(){return u})).toggleElementClassIf(r,"offer-applied","hidden",(function(){return u})).toggleElementClassIf(o,"text-red-400","text-sm text-gray-400",(function(){return u})),o.innerText=salla.money(e.price),u&&(a.innerText=e.offer.names,r.innerText=salla.money(e.product_price)),e.is_on_sale&&(r.innerText=salla.money(e.original_price))}else salla.log("Can't get the cart item dom for ".concat(e.id,"!"))}},{key:"initiateCoupon",value:function(){var e=this;app.couponCodeInput&&(app.onKeyUp(app.couponCodeInput,(function(e){13===e.keyCode&&app.couponBtn.click(),app.couponError.value="",app.removeClass(app.couponCodeInput,"has-error")})),app.onClick(app.couponBtn,(function(t){var n=app.couponBtn.classList.contains("btn--danger"),o=t.currentTarget;n||app.couponCodeInput.value.length?o.load().then((function(){return n?salla.cart.deleteCoupon():salla.cart.addCoupon(app.couponCodeInput.value)})).then((function(t){return e.toggleCoupon(t,!n)})).catch((function(t){var o;return e.showCouponError(null===(o=t.response)||void 0===o||null===(o=o.data)||void 0===o?void 0:o.error.message,!n)})).finally((function(){return o.stop()})):e.showCouponError("* "+salla.lang.get("pages.checkout.enter_coupon"))})))}},{key:"toggleCoupon",value:function(e,t){app.couponError.innerText="",app.couponCodeInput.value=t?app.couponCodeInput.value:"",app.couponCodeInput.toggleAttribute("disabled",t),app.toggleElementClassIf(app.couponBtn,["btn--danger","has-coupon"],["btn-default","has-not-coupon"],(function(){return t})).toggleElementClassIf(app.couponBtn,["btn-default","has-not-coupon"],["btn--danger","has-coupon"],(function(){return!t})).hideElement(app.couponBtn.querySelector(t?"span":"i")).showElement(app.couponBtn.querySelector(t?"i":"span")).removeClass(app.couponCodeInput,"has-error")}},{key:"showCouponError",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];app.couponError.innerText=e||salla.lang.get("pages.checkout.error_occurred"),t&&app.addClass(app.couponCodeInput,"has-error")}}])})(n(399).A).initiateWhenReady(["cart"])})(),(()=>{var e=n(29),t=n(901),o=n(822),r=n(954),a=n(501);function i(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(i=function(){return!!e})()}(function(n){function u(){return(0,e.A)(this,u),t=this,n=u,a=arguments,n=(0,r.A)(n),(0,o.A)(t,i()?Reflect.construct(n,a||[],(0,r.A)(t).constructor):n.apply(t,a));var t,n,a}return(0,a.A)(u,n),(0,t.A)(u,[{key:"onReady",value:function(){app.anime(".thanks-item",{translateX:[20,0]});var e=document.querySelector("#invoice-form");salla.order.event.onInvoiceSent((function(t){e.innerHTML=t.data.message,e.classList.add("sent")}))}}])})(n(399).A).initiateWhenReady(["thank-you"])})()})();