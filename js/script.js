var sites, logo = {
    html: "img/logo/html.png",
    css: "img/logo/css.png",
    js: "img/logo/js.png",
    ajax: "img/logo/ajax.png",
    bootstrap: "img/logo/bootstrap.png",
    parallax: "img/logo/parallax.png",
    jquery: "img/logo/jquery.png",
    modernizr: "img/logo/modernizr.png",
    svg: "img/logo/svg.png",
    cssanimation: "img/logo/cssanimation.png"
}

$(window).on('unload', function(event) {
    if ($('.window').width() == 0) {
        localStorage.removeItem("statePagePortfolio");
    }
});

$(window).on('load', function() {
    $('.main').show();
    $('.menu li.portfolio-page').click(function() {
        var self = this;
        clearEffects(self);
        loadListSites();
    });

    $(window).keydown(function(event) {
        var chek = !!$('.window').width();
        if ((event.which == 27) && (chek)) {
            $('svg#svg-btn-close').click();
        }
    });

    $('.current-lang').click(function(event) {
        $('.select-lang').removeClass('close-panel').addClass('open-panel');
    });

    $('.main').click(function(event) {
        if ($('.select-lang').attr('class').indexOf('open') > -1) {
            $('.select-lang').removeClass('open-panel').addClass('close-panel');
        };
    });

    $('.lang-item').click(function(event) {
        var lang = $(event.currentTarget).attr('lang-id');
        changeLanguage(lang, event.currentTarget);
        $('.select-lang').removeClass('open-panel').addClass('close-panel');
        if ($('.content').is(":visible")) {
            $('.content').html('');
            loadResume(lang);
        };
        if ($('.portfolio').is(":visible")) {
            createPortfolioItem(lang);
            $('.port-image').css({ transform: 'none', opacity: 1 });
        };
    });

    $('.menu li.resume-page').click(function() {
        var self = this;
        clearEffects(self);
        var lang = $('.active-lang').attr('lang-id');
        loadResume(lang);
    });

    $('.menu li.contacts-page').click(function() {
        var self = this;
        clearEffects(self);
        $('.contacts-box').css({ display: 'flex' });

        setTimeout(function() {
            $('.contacts-box').find('i').each(function(index) {
                $(this).css({
                    opacity: 1,
                    transform: 'translateY(0.2em) rotateY(0deg)',
                    transition: 'all 0.5s ' + (0.13 * (index + 1)) + 's ease-out'
                });
                $(this).next().css({
                    opacity: 1,
                    transition: 'all 0.5s ' + (0.13 * (index + 1)) + 's ease-out'
                });
            });
        }, 50);
    });

    $('svg#svg-btn-close').click(function() {

        $('.window-des').css({
            'overflow-y': 'initial'
        });

        setTimeout(function() {
            $('.window').children().hide();
        }, 200);

        $('.window').css({ height: '5px' });
        var elem = $('.window');
        setTimeout(function() {
            $(elem).css({
                width: '0%'
            });
        }, 300);

        setTimeout(function() {
            $('.portfolio').fadeIn(300);
        }, 900);
    });

    $('.window a').click(function() {
        localStorage["statePagePortfolio"] = 'true';
    });

    $('.menu li.home-page').click(function() {
        localStorage.removeItem('statePagePortfolio');
        location.reload();
    });

    if (localStorage['lang']) {
        changeLanguage(localStorage['lang'], $('.lang-' + localStorage['lang']));
    } else {
        changeLanguage('ru', $('.lang-ru'));
    };

    if (localStorage['statePagePortfolio']) {
        $('.menu li.portfolio-page').click();
        $('div.foto').addClass('changed');
        $('.foto').css({
            transform: 'none',
            transition: 'none',
            opacity: 1
        });
        $('.header').css({ transition: 'none' });
        $('.name').css({
            transform: 'none',
            transition: 'none',
            opacity: 1
        });
        localStorage.removeItem('statePagePortfolio');
    } else {

        $('.contacts a').addClass('anim');
        setTimeout(function() {
            $('.foto').css({
                transform: 'none',
                opacity: 1
            });
            $('.name').css({
                transform: 'none',
                opacity: 1
            });
            $('.right-border').css({
                width: '300px',
                height: '100px'
            });
        }, 30);
        setTimeout(function() {
            $('div.foto').addClass('changed');
        }, 600);

        setTimeout(function() {
            $('.contacts li a').each(function(index) {
                $(this).css({
                    opacity: 1,
                    transform: 'none',
                    transitionDelay: 0.17 * (index + 1) + 's'
                });
            });
        }, 1000);
    };
});

function loadResume(lang) {
    $.ajax({
        type: "GET",
        cache: true,
        url: "lang/" + lang + '.html',
        success: function(obj) {
            $('.content').html(obj).show();
            setTimeout(function() {
                $('.skills-icon').addClass('anim-icon');
                $('.skills-icon').each(function(index) {
                    $(this).css({
                        transition: 'all 0.6s ' + (index + 1) * 0.2 + 's ease-out'
                    });
                });
                setTimeout(function() {
                    $('.skills-scale .scale').each(function(index) {
                        var width = $(this).attr('data-per');
                        $(this).find('div').css({ width: width + '%' });
                    });
                }, 400);
            }, 50);
        }
    });
};

function loadListSites() {
    $.ajax({
        type: "GET",
        cache: true,
        url: 'data/sites.json',
        success: function(obj) {
            sites = obj;
            var lang = $('.active-lang').attr('lang-id');
            createPortfolioItem(lang);
            $('.portfolio').show();
            setTimeout(function() {
                $('.port-image').each(function(index) {
                    $(this).css({
                        transform: 'rotateY(0)',
                        opacity: 1,
                        transition: 'all 0.6s ease-out ' + (index + 1) * 0.15 + 's'
                    });
                });
            }, 50);
        }
    });
};


function changeLanguage(language, currentTarget) {
    $('.current-lang').css({
        'background-image': 'url(img/lang' + language + '.svg)'
    });
    var lang = language == 'ua' ? 'uk' : language;
    $('html').attr('lang', lang);
    $('.select-lang div').removeClass('active-lang');
    $(currentTarget).addClass('active-lang');
    $('.lang').hide();
    $('.' + language).show();
    localStorage['lang'] = language;

}

function clearEffects(self) {
    $('.animate-web').hide();
    $('.right-border').hide();
    $('.portfolio').hide();
    $('.menu .active').removeClass('active');
    $(self).addClass('active');
    $('.header, .foto').removeClass('to-center');
    $('.content').hide();
    $('.contacts-box').hide();
    $('.portfolio').hide();
    $('.contacts-box i').css({ opacity: 0, transform: 'translateY(0.2em) rotateY(-90deg)' });
    $('.box-item i+span').css({ opacity: 0 });
    $('.skills-icon').removeClass('anim-icon');
    $('.skills-scale .scale div').css({ width: 0 });
}

function createPortfolioItem(lang) {
    $('.port-image-container').html('');
    $(sites).each(function(index) {
        var $item = $('<div>').addClass('port-image').attr('data-id', sites[index].id);
        $('<img>', { src: sites[index].imgUrl[0] }).appendTo($item);
        var $des = $('<div>').addClass('port-des').appendTo($item);
        $('<div>').addClass('port-des-img').css({
            'background-image': 'url(' + sites[index].imgUrl[2] + ')'
        }).appendTo($des);

        var $desInfo = $('<div>').addClass('port-des-info').appendTo($des);
        var $ul = $('<ul>').appendTo($desInfo);

        $('<img>').attr('src', logo.html).appendTo($ul).wrap($('<li>'));
        $('<img>').attr('src', logo.css).appendTo($ul).wrap($('<li>'));
        $('<img>').attr('src', logo.js).appendTo($ul).wrap($('<li>'));

        var arr = sites[index].frameworks[1];
        $(arr).each(function(index) {
            var name = arr[index].toLowerCase().replace(" ", "");
            if (logo[name]) {
                $('<img>').attr('src', logo[name]).appendTo($ul).wrap($('<li>'));
            }
        });

        $('<div>').addClass('port-des-info-name').text(sites[index].name[lang]).appendTo($desInfo);
        var str = sites[index].theme[lang];
        var html = '<strong>' + str.substring(0, str.indexOf(':') + 1) + '</strong>' + str.substring(str.indexOf(':') + 1);
        $('<div>').addClass('port-des-info-theme').html(html).appendTo($desInfo);
        str = sites[index].customer[lang];
        html = '<strong>' + str.substring(0, str.indexOf(':') + 1) + '</strong>' + str.substring(str.indexOf(':') + 1);
        $('<div>').addClass('port-des-info-customer').html(html).appendTo($desInfo);

        if (sites[index].menu === "commercial") {
            $('.commercial').append($item);
        } else {
            $('.other').append($item);
        }
    })


    $('.port-image').on('click', function(event) {
        $('.window').children().show();
        var id = $(event.currentTarget).attr('data-id');
        var lang = $('.active-lang').attr('lang-id');
        renderWindow(id, lang);

        $('.window').css({
            width: '100%'
        });

        setTimeout(function() {
            $('.window').css({
                height: '100%'
            });

        }, 650);

        setTimeout(function() {
            $('.window-des').css({
                'overflow-y': 'auto'
            });
        }, 3000);

        setTimeout(function() {
            $('.portfolio').fadeOut(300);
        }, 200);

        setTimeout(function() {
            $('.port-anim').each(function(index) {
                $(this).css({
                    transition: 'all 0.5s ' + (0.2 * index + 1) + 's',
                    opacity: 1,
                    transform: 'none'
                })
            });
        }, 450);
    });
}

function renderWindow(id, lang) {
    var obj;
    $(sites).each(function(index) {
        if (sites[index].id == id) {
            obj = sites[index];
        };
    });

    $('.des-img').attr('href', obj.url).css({
        'background-image': 'url(' + obj.imgUrl[1] + ')'
    });
    $('.des-name').text(obj.name[lang]);

    var str = obj.customer[lang];
    var strBegin = str.substring(0, str.indexOf(':') + 1);
    var strEnd = str.substring(str.indexOf(':') + 1).replace(' ', '');
    strEnd = strEnd[0].toUpperCase() + strEnd.substring(1);
    var html = '<strong>' + strBegin + '</strong> <br>' + strEnd;
    $('.customer').html(html);

    str = obj.theme[lang];
    strBegin = str.substring(0, str.indexOf(':') + 1);
    strEnd = str.substring(str.indexOf(':') + 1).replace(' ', '');
    strEnd = strEnd[0].toUpperCase() + strEnd.substring(1);
    html = '<strong>' + strBegin + '</strong> <br>' + strEnd;
    $('.theme').html(html);

    html = '<strong>' + obj.frameworks[0][lang] + '</strong><br>';
    $(obj.frameworks[1]).each(function(index) {
        html += obj.frameworks[1][index] + '<br>'
    });
    $('.frameworks').html(html);

    $('.info').text(obj.info[lang]);
    $('.btn-toGo').attr('href', obj.url);

    $('.port-anim').css({
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'none'
    });
}
