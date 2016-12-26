function viewHome() {
    if (!('flex' in document.body.style)) {
        $('body').html('Sorry not suppor your browser...');
        return false;
    };
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/home.html",
        success: function(obj) {
            $('.content').html(obj);
            $.ajax({
                type: "GET",
                cache: true,
                url: "views/svg.html",
                success: function(obj) {
                    var sliderHTML = $('.fade-slider').html();
                    $('.fade-slider').html(sliderHTML + obj);
                    $('.home-page').height($(window).height());
                    loadRenderHomePage();
                }
            });
        }
    });
};

function loadRenderHomePage() {

    if (((navigator.userAgent).search(/Edge/) > -1) || ((navigator.userAgent).search(/.NET/) > -1)) {
        $('#LeftLine, #RightLine, #CenterLine').addClass('fixIE');
        $('#LeftAnimation, #RightAnimation, #CenterAnimation').addClass('fixIE');
        $('#LeftPath, #RightPath, #CenterPath').addClass('fixIE');
    };

    $('header').removeClass('fixed');
    loadItem();

    $(window).resize(function() {
        $('.home-page').height($(window).height());
    });

    $('.btn-bottom').on('click', function() {
        var scroll = $('.home-page').height();
        $('body, html').animate({ scrollTop: scroll }, 600, 'easeOutQuart');
    });

};

function loadItem() {
    if (!items) {
        $.ajax({
            type: "GET",
            data: 'items',
            cache: true,
            url: "data/items.json",
            success: function(obj) {
                items = obj;
                renderingPromoItem();
                obj = sampleItem(items, 'featured', true);
                renderingFeatured(obj, true);
                cart = createCart();
                cart.load();
                $(items).each(function(index) {
                    $('<option>', { value: items[index].name }).appendTo($('#data-list-items'));
                });
            }
        });
    } else {
        renderingPromoItem();
        obj = sampleItem(items, 'featured', true);
        renderingFeatured(obj, true);
    };
};

function renderingPromoItem() {
    var obj = sampleItem(items, 'promo', true);
    $(obj).each(function(index) {
        var info = obj[index].specification ? obj[index].specification[0] : "not specification";
        if (info.length >= 70) {
            info = info.slice(0, 70) + '...';
        };
        var elem = $('<li>', { 'data-name': obj[index].name, 'data-info': info, 'data-id': obj[index].id })
            .appendTo($('.fade-slider'))
            .css({ backgroundImage: 'url(' + obj[index].folder + obj[index].url.promo + ')' });
        $('<img>', { src: obj[index].folder + obj[index].url.promo }).css({ opacity: 0 }).appendTo($(elem));
    });

    slider = $('.fade-slider').fadeSliderRun({
        interval: 30000,
        fadeTime: 1500,
        previewImage: false
    });

    $('.hoverKnife').click(function() {
        $(this).toggleClass('hoverKnife-animated');
        $('.writeLine').toggleClass('line1-animated');
        $('.writeLine2').toggleClass('line2-animated');
        $('rect').toggleClass('rect-animated');
        $('.st2').toggleClass('text-animated');
    });
};

function renderingFeatured(obj, featured, all) {

    var createElement = function() {

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
            viewItemPage(item, featured);
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

    $(obj).each(function(index) {
        var elem = createElement();
        $(elem).find('.featured-item-name').text(obj[index].name).attr('data-id', obj[index].id);
        $(elem).find('.featured-item-price').text('$' + obj[index].price.toFixed(2));
        $(elem).find('.featured-image').css({ backgroundImage: 'url(' + obj[index].folder + obj[index].url.small[0] + ')' });
        $('.featured-item-box').append(elem);
    });
};

function promoClick(event) {
    event.preventDefault;
    var id = $(event.currentTarget).attr('data-id');
    var item;
    $(items).each(function(index) {
        if (items[index].id == id) {
            item = items[index];
        }
    });
    $('nav li').find('.active').removeClass('active');
    slider.stop();
    viewItemPage(item);
};
