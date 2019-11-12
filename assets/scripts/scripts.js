(function () {

    /**
     * Get the URL parameters
     * source: https://css-tricks.com/snippets/javascript/get-url-variables/
     * @param  {String} url The URL
     * @return {Object}     The URL parameters
     */
    var getParams = function (url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url ? url : window.location.href;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        if (vars.length < 1 || vars[0].length < 1) return params;
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return params;
    };

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

        //Get the url variable
        var getMonth = getParams().month;

        //Find all the seasons
        var months = document.querySelectorAll('[data-month]');
        months.forEach(function (month) {
            

            //Get the months and seasons
            var name = month.getAttribute('data-month');
            var season = document.querySelector('[data-season="' + name + '"]');
            var month = document.querySelector('[data-month="' + name + '"]');

            //Get the month based on URL parameters
            var seasonparam = document.querySelector('[data-season="' + getMonth + '"]');
            var monthparam = document.querySelector('[data-month="' + getMonth + '"]');


            //If URL parameter
            if (getMonth) {
                
                //Hide all the months
                season.classList.add('hide');

                //Now remove the hidden month that matchs the URL parameter
                seasonparam.classList.remove('hide');

                //And make the nav work as expected
                monthparam.classList.add('selected');

            } else {
                
                if (name !== getCurrentMonth()) {
                    season.classList.add('hide');
                }
    
                if (name === getCurrentMonth()) {
                    month.classList.add('selected');
                }
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

