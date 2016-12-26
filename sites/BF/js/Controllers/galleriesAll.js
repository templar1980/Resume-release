function viewAllGalleries() {
    currentItem = 0;
    slider.stop();
    $('header').addClass('fixed');
    loadAllGalleriesHTML();
};

function loadAllGalleriesHTML() {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/galleries.html",
        success: function(obj) {
            $('.content').html(obj);
            renderAllGalleriesPage();
        }
    });
};

function renderAllGalleriesPage() {
    var obj = items;
    renderingAllItems(obj);

    $(listSubnav).each(function(index) {
        if (listSubnav[index].name == 'All Products') {
            $('.galleries-itemList-info p').text(listSubnav[index].text);
            $('.galleries-menu-item').text(listSubnav[index].name);
        }
    });
    $('.content').fadeOut(10).fadeIn(300);
};


function renderingAllItems(obj) {


    var firstElem = obj[0];
    var elem = createElement();
    $(elem).find('.featured-item-name').text(firstElem.name).attr('data-id', firstElem.id);
    $(elem).find('.featured-item-price').text('$' + firstElem.price.toFixed(2));
    $(elem).find('.featured-image').css({ backgroundImage: 'url(' + firstElem.folder + firstElem.url.small[0] + ')' });
    $('.featured-item-box').append(elem);
    var width = parseFloat($(elem).css('width')) + parseFloat($(elem).css('margin-left')) + parseFloat($(elem).css('margin-right'));
    var height = parseFloat($(elem).css('height')) + parseFloat($(elem).css('margin-top')) + parseFloat($(elem).css('margin-bottom'));

    if (($(window).width() < 1000) && ($(window).width() < $(window).height())) {
        multi = ($(window).height() * 0.9) / height;
        multi = Math.floor(multi);
    } else {
        multi = Math.floor(parseFloat($('.featured-item-box').css('width')) / width);
    }

    multi = multi == 1 ? 2 : multi;

    $(elem).remove();
    multiAll = multi;
    renderMore();


    $(window).scroll(function() {
        if ($('.qtStr').text()) {
            if ($(window).scrollTop() + $(window).height() * 0.7 >= $('.qtStr').offset().top) {
                $('.btn-more').remove();
                renderMore();
            };
        };
    });

};


function renderMore() {
    if ($('.featured-item').length == items.length) {
        return false;
    }

    for (var index = currentItem; index < multiAll; index++) {
        if (index > items.length - 1) {
            $('.qtStr').text(' ');
            return false;
        }
        var elem = createElement();
        $(elem).find('.featured-item-name').text(items[index].name).attr('data-id', items[index].id);
        $(elem).find('.featured-item-price').text('$' + items[index].price.toFixed(2));
        $(elem).find('.featured-image').css({ backgroundImage: 'url(' + items[index].folder + items[index].url.small[0] + ')' });
        $('.featured-item-box').append(elem);
        $(elem).css({ 'transform-origin':'center top', transform:'scaleY(0.1)' }).animate({ transform:'scaleY(1)' }, 400);
    }

    currentItem = index;
    multiAll += multi;

    $('<div>').html('More...').addClass('btn-more').appendTo($('.featured'));
    $('.qtStr').text($('.featured-item').length + ' of ' + items.length);


    $('.btn-more').on('click', function(event) {
        $(this).remove();
        $('.qtStr').text('');
        renderMore();
    });

}

function createElement() {

    var divFeaturedItem = $('<div>')
        .addClass('featured-item');
    var divWrapper = $('<div>')
        .addClass('featured-item-image-wrapper')
        .appendTo($(divFeaturedItem));
    var elem = $('<button>', { class: 'btn-addcart btn', title: 'add to cart' }).
    appendTo($(divWrapper));

    $(elem).on('click', function(event) {
        var id = $(event.currentTarget).parent().parent().find('.featured-item-name').attr('data-id');
        cart.addCart(id);
        $(event.currentTarget).addClass('btn-animated');
        setTimeout(function() {
            $('.btn-addcart').removeClass('btn-animated');
        }, 400);

    });

    $('<i>').addClass('icon-basket-circled').appendTo($(elem));
    elem = $('<button>')
        .addClass('btn-details btn')
        .text('Details')
        .appendTo($(divWrapper));

    $(elem).on('click', function(event) {
        var id = $(event.currentTarget).parents('.featured-item').find('.featured-item-name').attr('data-id');
        var item;
        $(items).each(function(index) {
            if (items[index].id == id) {
                item = items[index];
            }
        });
        $('nav li').find('.active').removeClass('active');
        slider.stop();
        viewItemPage(item);
    });

    $('<div>')
        .addClass('featured-image-overlay')
        .appendTo($(divWrapper));
    $('<div>')
        .addClass('featured-image')
        .appendTo($(divWrapper));
    $('<span>')
        .addClass('featured-item-name')
        .appendTo($(divFeaturedItem));
    $('<br>')
        .appendTo($(divFeaturedItem));
    $('<span>')
        .addClass('featured-item-price')
        .appendTo($(divFeaturedItem));
    return divFeaturedItem;
};
