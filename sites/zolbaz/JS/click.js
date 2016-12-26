$(document).ready(function() {

    $('.toTop').on('click', function() {
        $('body,html').animate({ scrollTop: 0 }, 1200, 'easeOutCirc');
    });


    $('.submenu a, .menu a, .menu-hide a').on('click',
        function(event) {
            var elem = $(this).attr('href');
            var destination = (elem) ? $(elem).offset().top : 0;
            $('body, html').animate({ scrollTop: destination }, 1000);
        })

    $('.menu>ul>li:nth-child(2)').on('click',
        function(event) {
            event.preventDefault();
            $('.submenu').toggle('fast');
            var elem = $('.menu>ul>li:nth-child(2) span');
            var str = $('.menu>ul>li:nth-child(2) span').text();
            str = (str === "▼") ? '▲' : '▼';
            $(elem).text(str);
        })

    $('.menu-hide>ul>li:nth-child(2)').on('click',
        function(event) {
            event.preventDefault();
            $('.submenu-hide').toggle('fast');
            var elem = $('.menu-hide>ul>li:nth-child(2) span');
            var str = $('.menu-hide>ul>li:nth-child(2) span').text();
            str = (str === "▼") ? '▲' : '▼';
            $(elem).text(str);
        })

    $('.item-img').on('click', function(event) {
        event.preventDefault();

        var parentElement = $(event.currentTarget).parent();
        var modalInfo = $('.modal-info');
        var srcImage = $(parentElement).find('img').attr('src').replace('.png','b.png');
        // srcImage=srcImage.replace('.png','-b.png');

        $('.body-modal-window img').attr('src', srcImage);

        var elem = $(parentElement).find('.description-item').html();
        $(modalInfo).append(elem);

        elem = $(parentElement).find('.old-price-item').text();
        $('<span></span>').appendTo($(modalInfo)).text(elem);

        elem = $(parentElement).find('.new-price-item').text();
        $('<span></span>').appendTo($(modalInfo)).text(elem);

        var strHref = 'http://zolbaz.dp.ua/catalog/sale/' + $(parentElement).find('#art').text() + '/';
        $('<a>Оформить заказ</a>').appendTo($(modalInfo)).attr('href', strHref);

        $('.overlay-modal').fadeIn(250,
            function() {
                $('.modal-image-window').css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({ opacity: 1, top: '50%' }, 100);
                $('.modal-info').animate({ opacity: '1', bottom: '30px' }, 1000);
            }
        );
    });

    $('.overlay-modal, .icon-cancel-1').on('click', function(event) {
        event.preventDefault();
        // clear HTML-code
        $('.modal-info').html('');
        // animate close window
        $('.modal-image-window').animate({ opacity: 0, top: '40%' }, 100,
            function() {
                $(this).css({ display: 'none' });
                $('.overlay-modal').fadeOut(250);
                $('.modal-info').css({ bottom: '-5px', opacity: '0' });
            });
    })

    $('.info-block img').mousedown(function() {
        return false;
    });


    $('.callback-win form').submit(function(event) {
        event.preventDefault();
        var obj = {};
        var $mas = $(event.currentTarget).find('input');
        $($mas).each(function() {
            obj[$(this).attr('name')] = $(this).val();
        })
        var date = new Date();
        obj.time = date.getHours() + ':' + date.getMinutes();
        var strJSON = JSON.stringify(obj);
        closeCallbackWindow();
    });
})
