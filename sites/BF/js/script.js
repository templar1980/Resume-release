var slider, items, listSubnav, gallery, itemPage, menu, currentItem, multi, multiAll;


$(window).on('load', function() {
    $('#preloader').delay(300).fadeOut(600);
    $('.main').delay(300).fadeIn(600, function() {
        $('header').css({ top: '-50px', opacity: 0 }).animate({ top: 0, opacity: 1 }, 200);
    });
});



$(document).ready(function() {
    viewHome();
    loadGalleriesList();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('header').addClass('fixed');
        } else if ($('.fade-slider').length != 0) {
            $('header').animate({ top: '-50px', opacity: 0 }, 200, function() {
                $(this).css({ opacity: 1, top: 0 }).removeClass('fixed');
            });
        };
        if ($(window).scrollTop() >= $(window).height()) {
            $('.btn-toTop').removeClass('hide').addClass('show');
        }
        if (($(window).scrollTop() < $(window).height()) && ($('.btn-toTop').attr('class').indexOf('show') != -1)) {
            $('.btn-toTop').removeClass('show').addClass('hide');
        }
    });


    $('.modal-image-next').on('click', function(event) {
        event.stopPropagation();
        gallery.rollZoomImage(1);
    });


    $('.modal-image-prev').on('click', function(event) {
        event.stopPropagation();
        gallery.rollZoomImage(-1);
    });



    $('.btn-close').click(function(event) {
        event.stopPropagation();
        $('.btn-close').addClass('btn-animated');
        setTimeout(function() {
            $('.btn-close').removeClass('btn-animated');
            $('.modal').addClass('full-screen-close');
            setTimeout(function() {
                $('.modal').removeClass('full-screen-close full-screen-open');
                $('.btn-zoom-item-image').attr('disabled', false);
                // $('.content').css({ 'z-index': '2' });
            }, 500);
        }, 400);
    });

    $('.image-wrapper').click(function(event) {
        $('.modal').addClass('full-screen-close');
        setTimeout(function() {
            $('.modal').removeClass('full-screen-close full-screen-open');
            $('.btn-zoom-item-image').attr('disabled', false);
            // $('.content').css({ 'z-index': '2' });
            // $('footer').css({'z-index':'2'});
        }, 500);
    });

    $('.btn-toTop').on('click', function() {
        $('body, html').animate({ scrollTop: 0 }, 700, 'easeOutQuart');
    });

    $('.btn-menu-mobile').on('click', function() {
        $('.mobile-menu-overlay')
            .css({ display: 'block', opacity: 0 })
            .animate({ opacity: 1 }, 200);
        $('.mobile-menu')
            .css({ display: 'block', opacity: 0, left: '-30%' })
            .animate({ opacity: 1, left: 0 }, 200);
    });

    $('.mobile-menu-overlay, .btn-mobile-menu-close, .mobile-menu a').on('click', function() {
        $('.mobile-menu-overlay')
            .animate({ opacity: 0 }, 200, function() {
                $(this).css({ display: 'none' });
            });
        $('.mobile-menu')
            .animate({ opacity: 0, left: '-30%' }, 200, function() {
                $(this).css({ display: 'none' });
            });
    });
});

function sampleItem(arr, key, value) {
    var arrItem = [],
        value = (typeof(value) == 'string') ? value.toLowerCase() : value;
    $(arr).each(function(index, obj) {
        var sampleValue = (typeof(obj[key]) == 'string') ? obj[key].toLowerCase() : obj[key];
        if (sampleValue === value) {
            arrItem.push(obj);
        }
    });
    return arrItem;
}

function loadGalleriesList() {
    $.ajax({
        type: "GET",
        cache: true,
        data: "list",
        url: "data/list.json",
        success: function(obj) {
            listSubnav = obj;
            createGalleriesMenu();
        }
    });
};

function createGalleriesMenu() {
    $(listSubnav).each(function(index) {
        var $elem = $('<div>').addClass('galleries-item').appendTo($('.galleries-menu'));
        var url = listSubnav[index].img.folder + listSubnav[index].img.url;
        $('<img>', { src: url }).appendTo($elem);
        $('<div>', { class: 'galeries-item-name', text: listSubnav[index].name }).appendTo($elem);
    });

    menu = activateGalleriesMenu();

};


function activateGalleriesMenu() {

    var heightItem = parseInt($('.galleries-item').css('height'));
    $('.btn-g-rolldown').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var viewport = parseFloat($('.galleries-viewport').css('height'));
        var allHeight = parseFloat($('.galleries-item').css('height')) * $('.galleries-item').length;
        var curTop = parseInt($('.galleries-menu').css('top'));

        if (curTop - viewport <= -allHeight) {
            return false;
        };

        if (curTop - viewport - heightItem <= -allHeight) {
            $('.btn-g-rolldown').addClass('btn-g-disabled');
        };

        if (curTop <= 0) {
            $('.btn-g-rollup').removeClass('btn-g-disabled');
        };

        $('.galleries-menu').animate({ top: (curTop - heightItem) + 'px' }, 100);
    });

    $('.btn-g-rollup').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var viewport = parseFloat($('.galleries-viewport').css('height'));
        var allHeight = parseFloat($('.galleries-item').css('height')) * $('.galleries-item').length;
        var curTop = parseInt($('.galleries-menu').css('top'));
        if (curTop >= 0) {
            return false;
        };

        if (curTop - viewport <= -allHeight) {
            $('.btn-g-rolldown').removeClass('btn-g-disabled');
        };

        $('.galleries-menu').animate({ top: (curTop + heightItem) + 'px' }, 100);


        if (curTop + heightItem >= 0) {
            $('.btn-g-rollup').addClass('btn-g-disabled');
        };

        /*  if (curTop + $('.galleries-viewport').height() < maxTop) {
              $('.btn-g-rolldown').removeClass('btn-g-disabled');
          };*/
    });

    $('.btn-galleries-close').on('click', function() {
        $('.galleries-menu-wrapper').removeClass('open-galleries');
        closeSearch();
    });


    $('.galleries-item').click(function(event) {
        var itemGalleris = $(event.currentTarget).find('.galeries-item-name').text();
        $('.galleries-menu-wrapper').removeClass('open-galleries');
        $('header').removeClass('toggle-header');
        changeActive($('.galleries'));
        if (itemGalleris == "All Products") {
            viewAllGalleries();
        } else {
            viewGalleries(itemGalleris);
        }

        closeSearch();
    });

    $('.search-wrapper').click(function() {
        openSearch();
    });

    $('.search-wrapper input').on('keydown', function(event) {
        if (event.which == 13) {
            resultSearch();
        };
    });

    $('.search').on('click', function(event) {
        if ($('.search-wrapper input').css('visibility') == 'visible') {
            resultSearch();
        };
    });

    return {}
};

function openSearch() {
    $('.search').css({
        width: '15%',
        border: '1px solid rgba(144, 238, 144, 0.5)',
        transition: 'width 0.4s, border 0.3s 0.2s'
    });
    $('.search-wrapper input').css({
        visibility: 'visible',
        opacity: 1,
        transition: 'opacity 0.5s 0.2s'
    });
};


function resultSearch() {
    var name = $('.search-wrapper input').val();
    var item = getItemOnName(name);
    if (item) {
        $('header').find('a').removeClass('active');
        $('.search-wrapper input').val('');
        slider.stop();
        viewItemPage(item);
    } else {
        $('.search-wrapper').addClass('warning');
        setTimeout(function() {
            $('.search-wrapper').removeClass('warning');
        }, 1500);
    };
}

function closeSearch() {
    $('.search').css({
        width: '95%',
        border: 'none',
        transition: 'initial'
    });
    $('.search-wrapper input').css({
        visibility: 'hidden',
        opacity: 0,
        transition: 'initial'
    });

};

function getItemOnName(name) {
    var item;
    $(items).each(function(index) {
        if (items[index].name == name) {
            item = items[index];
        };
    });
    return item;
};
