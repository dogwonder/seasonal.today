!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.astro=t(e)}("undefined"!=typeof global?global:this.window||this.global,(function(e){"use strict";var t,o={},n="querySelector"in document&&"addEventListener"in e&&"classList"in document.createElement("_"),c={selector:"[data-nav-toggle]",toggleActiveClass:"active",navActiveClass:"active",initClass:"js-astro",callback:function(){}},a=function(){var e={},t=!1,o=0,n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],o++);for(var c=function(o){for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t&&"[object Object]"===Object.prototype.toString.call(o[n])?e[n]=buoy.extend(!0,e[n],o[n]):e[n]=o[n])};o<n;o++){var a=arguments[o];c(a)}return e};o.toggleNav=function(e,t,o,n){var r=a(r||c,o||{}),s=document.querySelector(t);e.classList.toggle(r.toggleActiveClass),s.classList.toggle(r.navActiveClass),r.callback(e,t)};var r=function(e){var n=function(e,t){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),o=t.length;--o>=0&&t.item(o)!==this;);return o>-1});e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null}(e.target,t.selector);n&&("a"===n.tagName.toLowerCase()&&e.preventDefault(),o.toggleNav(n,n.getAttribute("data-nav-toggle"),t))};return o.destroy=function(){t&&(document.documentElement.classList.remove(t.initClass),document.removeEventListener("click",r,!1),t=null)},o.init=function(e){n&&(o.destroy(),t=a(c,e||{}),document.documentElement.classList.add(t.initClass),document.addEventListener("click",r,!1))},o})),function(){document.documentElement.className=document.documentElement.className.replace("no-js","js");var e=function(){return["january","february","march","april","may","june","july","august","september","october","november","december"][(new Date).getMonth()]};document.addEventListener("click",(function(e){var t=e.target.getAttribute("data-month"),o=document.querySelectorAll("[data-season]");t&&(document.querySelectorAll("[data-month]").forEach((function(e){var t=e.getAttribute("data-month");document.querySelector('[data-month="'+t+'"]').classList.remove("selected")})),o.forEach((function(e){var o=document.querySelector('[data-season="'+t+'"]'),n=document.querySelector('[data-month="'+t+'"]');e.classList.add("hide"),o.classList.remove("hide"),n.classList.add("selected")})))}),!1),document.addEventListener("DOMContentLoaded",(function(){var t;document.querySelectorAll("[data-month]").forEach((function(t){var o=t.getAttribute("data-month"),n=document.querySelector('[data-season="'+o+'"]');t=document.querySelector('[data-month="'+o+'"]'),o!==e()&&n.classList.add("hide"),o==e()&&t.classList.add("selected")})),t=document.getElementById("cookieNotice"),document.getElementById("cookieButton").addEventListener("click",(function(e){Cookies.set("jw_cookie_notice","closed",{expires:365,path:""}),t.classList.remove("open"),document.body.classList.remove("has-cookie")}),!1),"closed"==Cookies.get("jw_cookie_notice")&&(t.classList.remove("open"),document.body.classList.remove("has-cookie"))}))}();