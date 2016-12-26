function viewAboutMe() {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/aboutme.html",
        success: function(obj) {
            $('.content').html(obj);
            $('header').addClass('fixed');
        }
    });
};

function viewContacts() {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/contacts.html",
        success: function(obj) {
            $('.content').html(obj);
            $('header').addClass('fixed');
        }
    });
};

function viewBlacksmith() {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/bladesmithing.html",
        success: function(obj) {
            $('header').addClass('fixed');
            $('.content').html(obj);
        }
    });
}
