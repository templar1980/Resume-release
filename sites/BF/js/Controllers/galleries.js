function viewGalleries(itemList) {
    slider.stop();
    $('header').addClass('fixed');
    loadGalleriesHTML(itemList);
};

function loadGalleriesHTML(itemList) {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/galleries.html",
        success: function(obj) {
            $('.content').html(obj);
            renderGalleriesPage(itemList);
        }
    });
};

function renderGalleriesPage(itemList) {

    var obj = sampleItem(items, 'menuItem', itemList);
    renderingFeatured(obj);

    $(listSubnav).each(function(index) {
        if (listSubnav[index].name == itemList) {
            $('.galleries-itemList-info p').text(listSubnav[index].text);
            $('.galleries-menu-item').text(listSubnav[index].name);
        }
    });
    $('.content').fadeOut(10).fadeIn(300);
};
