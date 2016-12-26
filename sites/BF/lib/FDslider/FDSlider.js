;
(function($) {
    $.fn.fadeSliderRun = function(options) {

        options.interval = options.interval || 5000;
        options.fadeTime = options.fadeTime || 800;
        options.previewImage = (typeof(options.previewImage) === "boolean") ?
            options.previewImage : true;

        var id;
        var slider = fadeSlider(this, options);
        slider.run();
        $('.description span, .btn-next, .btn-prev').hover(
            function(event) {
                slider.stop()
            },
            function(event) {
                slider.run()
            }
        );
        $('.switch-controls').find('div').click(function(event) {
            var numberSlide = $(event.currentTarget).index();
            if (numberSlide !== $('.switch-active').index()) {
                slider.stop();
                slider.switch(numberSlide);
                slider.run();
            }
        });

        $('.controls .btn-next').click(function(event) {
            slider.stop();
            slider.nextSlide();
            slider.run();
        });
        $('.controls .btn-prev').click(function(event) {
            slider.stop();
            slider.prevSlide();
            slider.run();
        });
        return slider;
    };
})(jQuery);

function createControlElement(element) {
    //function for creating description and controls elements   
    var description = $('<div>').
    addClass('description').
    appendTo($(element));
    $('<span>').
    addClass('name').
    appendTo($(description));
    $('<span>').
    addClass('info').
    appendTo($(description));
    var control = $('<div>').
    addClass('switch-controls').
    appendTo($(description));
    $(element).
    find('li').
    each(function() {
        $('<div>').
        appendTo($(control))
    });
    var control = $('<div>').
    addClass('controls').
    appendTo($(element));
    var elem = $('<div>').
    addClass('btn-area btn-area-prev').
    appendTo($(control));
    $('<div>', { class: 'btn-prev' }).
    appendTo($(elem));
    elem = $('<div>').
    addClass('btn-area btn-area-next').
    appendTo($(control));
    $('<div>', { class: 'btn-next' }).
    appendTo($(elem));
    elem = $('.btn-area-next');
    $('<div>', { class: 'window-preview-next' }).
    appendTo($(elem));
    elem = $('.btn-area-prev');
    $('<div>', { class: 'window-preview-prev' }).
    appendTo($(elem));

};

function fadeSlider(element, options) {

    var element = element;
    var sliderCount = $(element).find('li').length - 1;
    var currentSlide = 0;
    // var id;
    var runStatus = false;

    $(element).find('li').hide();

    createControlElement(element);

    if (Modernizr.touchevents) {
        $('.btn-prev, .btn-next').css({ opacity: 1 });
    }

    if (!options.previewImage) {
        $('.window-preview-prev, .window-preview-next').css({ display: 'none' });
    }

    //function for paging slide
    animSlide = function(number, first) {
        if (!first) {
            $('#Slider-' + (currentSlide + 1)).css({ display: 'none' });
        };
        var replaceDescription = function() {
            $('.switch-controls').find('div').removeClass('switch-active');
            $('.switch-controls').find('div').eq(currentSlide).addClass('switch-active');
            var name = $(element).find('li').eq(currentSlide).attr('data-name');
            var path = $(element).find('li').eq(currentSlide).attr('data-info');
            var id = $(element).find('li').eq(currentSlide).attr('data-id');
            var pathName = "";
            $('.description .name').html('');
            $('.description .info').html('');
            $('.description .info').text(path);
            var a = $('<a>', { href: "#", text: name, 'data-id': id }).appendTo($('.description .name'));
            $(a).on('click', function(event) {
                promoClick(event);
            });
            $('#Slider-' + (currentSlide + 1)).css({ display: 'block' });
            writeText($('span.name a'), 200)();
        };

        if (!first) {
            $(element).find('li').eq(currentSlide).fadeOut(options.fadeTime);
            $(element).find('span').fadeOut(options.fadeTime - options.fadeTime / 2);
            if (number !== undefined) {
                currentSlide = number;
            } else {
                currentSlide = (currentSlide + 1 > sliderCount) ? 0 : currentSlide + 1;
            }
            $(element).find('li').eq(currentSlide).fadeIn(options.fadeTime);
            $(element).find('span').fadeIn(options.fadeTime - options.fadeTime / 2);
            setTimeout(replaceDescription, options.fadeTime - options.fadeTime / 2);
        } else {
            $(element).find('li').eq(currentSlide).show();
            replaceDescription();
        };

        var nextSlide = (currentSlide == sliderCount) ? 0 : currentSlide + 1;
        var prevSlide = (currentSlide == 0) ? sliderCount : currentSlide - 1;
        var srcNext = $(element).find('li').eq(nextSlide).css('background-image');
        var srcPrev = $(element).find('li').eq(prevSlide).css('background-image');
        setTimeout(function() {
            $('.window-preview-next').css({ 'background-image': srcNext });
            $('.window-preview-prev').css({ 'background-image': srcPrev });
        }, options.fadeTime - options.fadeTime / 3);
    };
    //first call function
    animSlide(0, true);


    return {
        run: function() {
            if (!runStatus) {
                id = setInterval(animSlide, options.interval);
                runStatus = true;
                $('.deadline').removeClass('animated-timeline').addClass('animated-timeline').css({ animationDuration: options.interval / 1000 + 's' });
            }
        },
        stop: function() {
            clearInterval(id);
            runStatus = false;
            $('.deadline').removeClass('animated-timeline');
        },
        switch: function(number) {
            animSlide(number);
            $('.deadline').removeClass('animated-timeline').addClass('animated-timeline');
        },
        nextSlide: function() {
            var nextSlide;
            if (currentSlide == sliderCount) {
                nextSlide = 0;
            } else {
                nextSlide = currentSlide + 1;
            }
            animSlide(nextSlide);
            $('.deadline').removeClass('animated-timeline').addClass('animated-timeline');
        },
        prevSlide: function() {
            var prevSlide;
            if (currentSlide == 0) {
                prevSlide = sliderCount;
            } else {
                prevSlide = currentSlide - 1;
            }
            animSlide(prevSlide);
            $('.deadline').removeClass('animated-timeline').addClass('animated-timeline');
        }
    }
};

function writeText(elem, time) {
    var arrText = $(elem).text().split('');
    var index = 0;
    $(elem).text('');
    var tmp = $('<div>').css({
        display: 'inline-block',
        width: '0.25em',
        height: '0.75em',
        marginLeft: '0.05em',
        // background: 'rgba(57, 181, 74, 0.8)',
        background: 'rgba(250, 250, 250, 0.5)',
        animation: 'blink ' + (time + 1000) / 1000 + 's ' + 'linear infinite',
    });
    $(elem).after(tmp);
    return function() {
        var id = setInterval(function() {
            var text = $(elem).text();
            $(elem).text(text + arrText[index++]);
            if (index == arrText.length) {
                clearInterval(id);
            };
        }, time);
    }
};
