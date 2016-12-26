function loadGalleriesList() {
    if (list == "undefined") {
        $.ajax({
            type: "GET",
            cache: true,
            data: "list",
            url: "data/list.json",
            success: function(obj) {
                list = obj;
                renderGalleriesList();
            }
        });
    }
};

function loadHomeHTML() {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/home.html",
        success: function(obj) {
            $('.content').html(obj);
            $('.home-page').height($(window).height());
            viewHome();
        }
    });
};

function loadItem() {
    $.ajax({
        type: "GET",
        data: 'items',
        cache: true,
        url: "data/items.json",
        success: function(obj) {
            items = obj;
            viewHome();
        }
    });
};