$(document).ready(function() {
    $(window).on('scroll', function() {
        //PARALAX for main image
        var st = $(this).scrollTop();
        $('.main-image>img').css({ "transform": "translateY(" + st / 10 + "%)" });
        $('.button').css({ "transform": "translateY(" + st / 2 + "%)" });
        $('.main-image').css({ "transform": 'traslate(0%,' + st + '%)' });

        // if ($(this).scrollTop() > $('#callback').offset().top - $('#callback').height()) {
        //     $('.callback-block-line').animate({ height: '160px' }, 1000,
        //         function() {
        //             $('.callback-block-description span').animate({ opacity: 1, marginRight: '50px' }, 1000,
        //                 function() {
        //                     $('.button-callback').animate({ opacity: 1, marginLeft: '0px' }, 1000);
        //                 }
        //             );
        //         }
        //     );

        // }

        if ($(this).scrollTop() > 100) {
            $('.toTop').fadeIn(600);
            $('.menu-hide').fadeIn(1000);
        } else {
            $('.toTop').fadeOut(600);
            $('.menu-hide').fadeOut(300);
        }

        // var elem = $('video')[0];
        // if ($(this).scrollTop() >= $('.video-set').offset().top - $('.video-set').height()) {
        //     elem.play();
        // } else {
        //     elem.pause();
        // }
    });
})
