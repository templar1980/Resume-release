function viewItemPage(item, featured) {
    var featured = featured || false;
    slider.stop();
    loadItemHTML(item, featured);
};

function loadItemHTML(item, featured) {
    if (!itemPage) {
        $.ajax({
            type: "GET",
            cache: true,
            url: "views/itemPage.html",
            success: function(obj) {
                itemPage = obj;
                $('.content').html(obj);
                renderItemPage(item, featured);
            }
        });
    } else {
        $('.content').html(itemPage);
        renderItemPage(item, featured);
    };
};

function renderItemPage(item, featured) {
    gallery = controlsGallery(item);

    $('body, html').scrollTop(0);
    $('header').addClass('fixed');
    var $elem = $('.item-header-name').text(item.name).attr('data-id', item.id);
    $('<i>').addClass('icon-right-open').prependTo($elem);
    if (featured) {
        $('<span>').text('Featured').prependTo($elem);
    } else {
        $('<span>').text(item.menuItem).prependTo($elem);
    };
    $(item.specification).each(function(index) {
        $('<p>').text(item.specification[index]).appendTo($('.item-specification'));
    });

    // $('.item-specification').text(item.specification);
    $('.item-description-price').text('$' + (item.price).toFixed(2));
    $('.zoom-image-wrapper li').css({ backgroundImage: "url(" + item.folder + item.url.small[0] + ")" });

    var heightWindow = $('.item-zoom-image').width() / 1.53;
    $('.item-zoom-image').css({ height: heightWindow });

    $(window).resize(function() {
        var heightWindow = $('.item-zoom-image').width() / 1.53;
        $('.item-zoom-image').css({ height: heightWindow });
    });

    $(window).keydown(function(event){
        var chekOpened = !!parseInt($('.modal').css('top'));
        if((event.which == 27)&&(!chekOpened)){
            $('.image-wrapper').click();
        }
    });


    $('.item-add').on('click', function(event) {
        $('.item-add i').addClass('btn-animated');
        setTimeout(function() {
            $('.item-add i').removeClass('btn-animated');
        }, 400);
        var id = $('.item-header-name').attr('data-id');
        var qt = parseInt($('.qt-controls-value').attr('value'));
        cart.addCart(id, true, qt);

        $('.tooltip').css({ width: '100%', left: 0 });
        $('.tooltip div').css({ left: '24px', right: 'initial' });
    });

    $('.qt-controls-minus').click(function() {
        var val = parseInt($('.qt-controls-value').attr('value'));
        val = val <= 1 ? 1 : val - 1;
        $('.qt-controls-value').attr('value', val);
    });

    $('.qt-controls-plus').click(function() {
        var val = parseInt($('.qt-controls-value').attr('value'));
        val = val >= 5 ? 5 : val + 1;
        $('.qt-controls-value').attr('value', val);
    });

    $('.item-btn.item-next').click(function() {
        $('.content').sliderPage().next(items);
    });

    $('.item-btn.item-prev').on('click', function() {
        $('.content').sliderPage().prev(items);
    });

    $('.btn-next-item-image').on('click', function(event) {
        $(this).addClass('btn-animated');
        setTimeout(function() {
            $('.btn-next-item-image').removeClass('btn-animated');
        }, 400);
        gallery.animateMove({
            next: true,
            animateTime: 600,
            button: $('.btn-gallery')
        });
    });

    $('.btn-prev-item-image').on('click', function() {
        $(this).addClass('btn-animated');
        setTimeout(function() {
            $('.btn-prev-item-image').removeClass('btn-animated');
        }, 400);
        gallery.animateMove({
            prev: true,
            animateTime: 600,
            button: $('.btn-gallery')
        });
    });

    $('.btn-zoom-item-image').on('click', function(event) {
        event.stopPropagation();
        $(this).attr('disabled', true);
        // $('.content').css({'z-index':'6000'});
        // $('.modal').css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
        gallery.zoomImage();
    });

    $('.zoom-image-wrapper').on('click', function(event) {
        event.stopPropagation();
        // $('.content').css({'z-index':'6000'});
        // $('.modal').css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
        gallery.zoomImage();
    });

    $('.image-roll-menu li').on('click', function(event) {
        var index = $(event.currentTarget).index();
        var current = $('.image-roll-menu').find('li.image-active').index();
        if (index == current) {
            return false
        };
        if ($('.image-roll-menu ul').find('li.disabled').length == 0) {
            $('.image-roll-menu li').addClass('disabled');
            gallery.animateMove({
                index: index,
                animateTime: 600,
                button: $('.btn-gallery')
            });
        };
    });

    // $('.roll-menu-next').on('click', function(){
    //     gallery.rollPreview(-1);
    // });

    // $('.roll-menu-prev').on('click', function(){
    //     gallery.rollPreview(1);
    // });
};
