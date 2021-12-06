/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/pages/cart.js":
/*!*********************************!*\
  !*** ./assets/js/pages/cart.js ***!
  \*********************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\n  if (!cartItemsCount) {\n    salla.cart.event.clearCartSummary();\n  }\n\n  animatedItem('.free-shipping');\n  animatedItem('.shipping-item');\n});\n\nwindow.hasApplePay = function () {\n  return {\n    'has_apple_pay': !!window.ApplePaySession\n  };\n}; // TODO: add timeline\n\n\nfunction animatedItem(selector) {\n  anime({\n    targets: selector,\n    opacity: [0, 1],\n    duration: 2000,\n    translateX: [-20, 0],\n    delay: (el, i) => i * 100\n  }); // change progress\n  //document.querySelectorAll('.progress-bg').style.width = '200px';\n} // cart\n\n\nwindow.initCart = function (copoun) {\n  return {\n    copounCode: copoun,\n    isShowCopounDiscount: false,\n    isShowCopounError: false,\n    addCopoun: function () {\n      if (this.copounCode) {\n        this.isShowCopounError = false;\n        this.isShowCopounDiscount = !this.isShowCopounDiscount;\n\n        if (!this.isShowCopounDiscount) {\n          this.copounCode = '';\n        }\n      } else {\n        this.isShowCopounError = true;\n      }\n    }\n  };\n};\n/**\n *\n * @param  {{\n *      data:{\n *          total: string,\n *          total_discount: string,\n *          shipping_cost: number,\n *          final_total: string,\n *          count: number,\n *          sub_total: string,\n *          total_before_discount: string,\n *          items: Array<Object>,\n *          coupon_discount: number\n *          }\n *      sections:{'free-shipping-bar':string}\n *          }} res\n */\n\n\nfunction updateCartPageInfo(res) {\n  // TODO: items is not defined \n  // res.data.items.forEach(item => {\n  // });\n  let shippingBar = res.sections['free-shipping-bar']; // if (shippingBar) {\n\n  document.querySelector('#free-shipping-bar').outerHTML = shippingBar; //     animatedItem('.free-shipping');\n  //     animatedItem('.shipping-item');\n  // }\n} //cart Item\n\n\nwindow.initCartItem = function (itemId, quantity) {\n  return {\n    itemId: itemId,\n    itemQty: quantity,\n    isRemoveItem: false,\n    addQty: function () {\n      salla.cart.api.updateItem({\n        id: this.itemId,\n        quantity: this.itemQty + 1\n      }).then(res => {\n        updateCartPageInfo(res);\n        this.itemQty++;\n      });\n    },\n    subQty: function () {\n      if (this.itemQty <= 1) {\n        return;\n      }\n\n      salla.cart.api.updateItem({\n        id: this.itemId,\n        quantity: this.itemQty - 1\n      }).then(res => {\n        this.itemQty--;\n        updateCartPageInfo(res);\n      });\n    },\n    removeItem: function () {\n      this.isRemoveItem = true;\n      salla.cart.api.deleteItem(this.itemId).then(res => {\n        updateCartPageInfo(res);\n        let item = document.querySelector('#item-' + itemId);\n        anime({\n          targets: item,\n          height: '0',\n          // -> from 'height' to '0',\n          margin: 0,\n          easing: 'easeInOutQuad',\n          duration: 500,\n          opacity: 0,\n          'padding-bottom': 0,\n          'padding-top': 0,\n          complete: () => item.remove()\n        });\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack://Theme-One/./assets/js/pages/cart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/pages/cart.js"]();
/******/ 	
/******/ })()
;