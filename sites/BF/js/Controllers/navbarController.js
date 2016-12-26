$(document).ready(function() {

    $('nav li').hover(

        function(event) {
            if (Modernizr.touchevents) {
                return false;
            }
            $(event.currentTarget).
            find('a:first').
            removeClass('roll-down').
            addClass('roll-up');
            $(event.currentTarget).
            find('.rolling').
            removeClass('roll-up').
            addClass('roll-down');
        },
        function(event) {
            if (Modernizr.touchevents) {
                return false;
            }
            $(event.currentTarget).
            find('a:first').
            removeClass('roll-up').
            addClass('roll-down');
            $(event.currentTarget).
            find('.rolling').
            removeClass('roll-down').
            addClass('roll-up');
        }
    );

    $('.home').click(function(event) {
        if (!checkActive(event.currentTarget)) {
            changeActive(event.currentTarget);
            viewHome();
        }
    });

    $('.bladesmithing').click(function(event) {
        if (!checkActive(event.currentTarget)) {
            changeActive(event.currentTarget);
            slider.stop();
            viewBlacksmith();
        }
    });

    $('.aboutme').click(function(event) {
        if (!checkActive(event.currentTarget)) {
            changeActive(event.currentTarget);
            slider.stop();
            viewAboutMe();
        }
    });

    $('.contacts').click(function(event) {
        if (!checkActive(event.currentTarget)) {
            changeActive(event.currentTarget);
            slider.stop();
            viewContacts();
        }
    });


    $('.galleries').click(function(event) {
        event.preventDefault();
        $('.galleries-menu-wrapper').height($(window).height());
        $('.galleries-menu-wrapper').toggleClass('open-galleries');
        if ($('.galleries-viewport').height() >= $('.galleries-menu').height()) {
            $('.btn-g-rolldown').addClass('btn-g-disabled');
        };

        if ($('.galleries-menu-wrapper').attr('class').indexOf('open-galleries') == -1) {
            closeSearch();
        };
    });

    $(window).resize(function() {
        $('.galleries-menu-wrapper').height($(window).height());
    });

    $('.content').click(function(event) {
        event.preventDefault();
        $('.galleries-menu-wrapper').removeClass('open-galleries');
        closeSearch();
    });

    $('.contacts').click(function(event) {
        if (!checkActive(event.currentTarget)) {
            changeActive(event.currentTarget);
        }
    });

    $('.cart').click(function(event) {
        event.preventDefault();
        $(this).parent().find('a').removeClass('active');
        slider.stop();
        viewShopCart();
    });
});

function changeActive(element) {
    $(element).parent().parent().find('a').removeClass('active');
    $(element).parent().find('a').addClass('active');
}

function checkActive(element) {
    if ($(element).attr('class').indexOf('active') > -1) {
        return true;
    } else {
        return false;
    }
};
