"use strict";

(function () {
  //remove no-js class
  document.documentElement.className = document.documentElement.className.replace("no-js", "js"); //🍪 notice

  function cookieNoticeSeen() {
    var getCookie = function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }; // Cookie vars


    var cookieNotice = document.getElementById('cookieNotice');
    var cookieButton = document.getElementById('cookieButton'); // Set a cookie

    cookieButton.addEventListener('click', function (event) {
      Cookies.set('jw_cookie_notice', 'closed', {
        expires: 365,
        path: ''
      });
      cookieNotice.classList.remove('open');
      document.body.classList.remove('has-cookie');
    }, false); //Remove notice if cookie already set

    if (Cookies.get('jw_cookie_notice') == 'closed') {
      cookieNotice.classList.remove('open');
      document.body.classList.remove('has-cookie');
    }
  }

  function equalizer(elem) {
    var mq = window.matchMedia("(min-width: 1025px)");
    var blocks = document.querySelectorAll(elem);
    if (!blocks) return;

    if (mq.matches) {
      var tallest = 0; // Loop over matching divs

      blocks.forEach(function (item) {
        var height = item.offsetHeight;
        tallest = height > tallest ? height : tallest; // console.log(tallest);

        item.style.height = tallest + "px";
      });
    }
  } // Handler when the DOM is fully loaded


  document.addEventListener("DOMContentLoaded", function () {
    //Cookie notice
    cookieNoticeSeen(); //Equal height columns

    equalizer('[data-col]'); //Load the cookie policy functionality

    var cookie = new WJCookies();
    cookie.init({
      onClick: true,
      onSubmit: false
    }); // cookie.init();
  }); // window.addEventListener("resize", function(){
  //     equalizer('[data-col]');
  // });
})();