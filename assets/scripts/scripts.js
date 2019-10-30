(function () {

    //remove no-js class
    document.documentElement.className = document.documentElement.className.replace("no-js","js");

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

    //Hide all the months
    hideMonths();

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

})();

