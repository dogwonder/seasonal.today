/*! Astro v10.2.0 | (c) 2016 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/astro */
!(function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.astro=e(t)})("undefined"!=typeof global?global:this.window||this.global,(function(t){"use strict";var e,o={},n="querySelector"in document&&"addEventListener"in t&&"classList"in document.createElement("_"),c={selector:"[data-nav-toggle]",toggleActiveClass:"active",navActiveClass:"active",initClass:"js-astro",callback:function(){}},l=function(){var t={},e=!1,o=0,n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],o++);for(var c=function(o){for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e&&"[object Object]"===Object.prototype.toString.call(o[n])?t[n]=buoy.extend(!0,t[n],o[n]):t[n]=o[n])};o<n;o++){var l=arguments[o];c(l)}return t},r=function(t,e){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),o=e.length;--o>=0&&e.item(o)!==this;);return o>-1});t&&t!==document;t=t.parentNode)if(t.matches(e))return t;return null};o.toggleNav=function(t,e,o,n){var r=l(r||c,o||{}),a=document.querySelector(e);t.classList.toggle(r.toggleActiveClass),a.classList.toggle(r.navActiveClass),r.callback(t,e)};var a=function(t){var n=r(t.target,e.selector);n&&("a"===n.tagName.toLowerCase()&&t.preventDefault(),o.toggleNav(n,n.getAttribute("data-nav-toggle"),e))};return o.destroy=function(){e&&(document.documentElement.classList.remove(e.initClass),document.removeEventListener("click",a,!1),e=null)},o.init=function(t){n&&(o.destroy(),e=l(c,t||{}),document.documentElement.classList.add(e.initClass),document.addEventListener("click",a,!1))},o}));
(function () {

    //remove no-js class
    document.documentElement.className = document.documentElement.className.replace("no-js","js");

    //🍪 notice
    function cookieNoticeSeen() {

        var getCookie = function (name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        };

        // Cookie vars
        var cookieNotice = document.getElementById('cookieNotice');
        var cookieButton = document.getElementById('cookieButton');

        // Set a cookie
        cookieButton.addEventListener('click', function (event) {
            Cookies.set('jw_cookie_notice', 'closed', { expires: 365, path: '' });
            cookieNotice.classList.remove('open');
            document.body.classList.remove('has-cookie');
        }, false);

        //Remove notice if cookie already set
        if (Cookies.get('jw_cookie_notice') == 'closed') {
            cookieNotice.classList.remove('open');
            document.body.classList.remove('has-cookie');
        }

    }

    var getCurrentMonth = function() {
        var months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
        var now = new Date();
        var thisMonth = months[now.getMonth()]; 
            return thisMonth;
    };

    // console.log(getCurrentMonth());
    
    //Hide months
    var hideMonths = function() {

        var months = document.querySelectorAll('[data-month]');
        months.forEach(function (month) {
            // console.log(month);
            // console.log(getCurrentMonth());
            var name = month.getAttribute('data-month');
            var season = document.querySelector('[data-season="' + name + '"]');
            var month = document.querySelector('[data-month="' + name + '"]');

            if (name !== getCurrentMonth()) {
                season.classList.add('hide');
            }

            if (name == getCurrentMonth()) {
                month.classList.add('selected');
            }
            
        });

    };

    // Listen for clicks in the document
    document.addEventListener('click', function (event) {

        // Check if a password selector was clicked
        var selector = event.target.getAttribute('data-month');
        var seasons = document.querySelectorAll('[data-season]');

        if (!selector) return;

        //Remove previously selected classes
        var months = document.querySelectorAll('[data-month]');
        months.forEach(function (month) {
            var name = month.getAttribute('data-month');
            var season = document.querySelector('[data-month="' + name + '"]');
            season.classList.remove('selected');
            
        });


        seasons.forEach(function (season) {
            //Target the correct month
            var seasonName = document.querySelector('[data-season="' + selector + '"]');
            var monthName = document.querySelector('[data-month="' + selector + '"]');

            //Hide everything
            season.classList.add('hide');
            
            //Show targeted month
            seasonName.classList.remove('hide');

            //Add selected class
            monthName.classList.add('selected');

        }); 

    }, false);

    // Handler when the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function(){

        //Hide all the months
        hideMonths();
        
        //Cookie notice
        cookieNoticeSeen();
    });

})();

