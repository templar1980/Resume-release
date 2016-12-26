function createCart() {
    var cart = [];
    return {
        addCart: function(id, itemPage, qt) {
            var str = 'Item and quantity has already been added',
                qt = qt || 1,
                checkAdded = false,
                state = (function() {
                    var checkbox = 0;
                    $(cart).each(function(index) {
                        if ((cart[index].id == id) && (cart[index].qt == qt)) {
                            checkbox = 1;
                        };
                        if ((cart[index].id == id) && (cart[index].qt != qt)) {
                            checkbox = 2;
                        };
                    })
                    return checkbox;
                })();
            var self = this;

            $(items).each(function(index) {

                if ((items[index].id == id) && (state == 0)) {
                    var itemCart = items[index];
                    itemCart.qt = qt;
                    cart.push(itemCart);
                    self.animateCart();
                    checkAdded = true;
                    str = 'Item added to cart';
                    self.save();
                };

                if ((items[index].id == id) && (state == 2)) {
                    $(cart).each(function(index) {
                        if (cart[index].id == id) {
                            cart[index].qt = qt;
                            self.animateCart();
                            checkAdded = true;
                            str = 'Quantity item changed';
                            self.save();
                        };
                    });

                };
            });

            if (itemPage) {
                $(event.currentTarget).addTooltip(str, 2000, 'animTooltip 0.3s');
            } else {
                $(event.currentTarget).parents('.featured-item').addTooltip(str, 2000, 'animTooltip 0.3s');
            }
        },
        animateCart: function() {
            $('.cart').find('span').text(cart.length);
            $('.cart').find('.icon-shop').addClass('icon-shop-animated');
            setTimeout(function() {
                $('.cart').find('.icon-shop').removeClass('icon-shop-animated');
            }, 500);
        },
        returnCart: function(index) {
            return cart;
        },

        returnItemObj: function(id) {
            var itemObj;
            $(cart).each(function(index) {
                if (cart[index].id == id) {
                    itemObj = cart[index];
                }
            });
            return itemObj;
        },

        sumPrice: function(id) {
            if (cart.length == 0) {
                return 0;
            };
            var sum = 0;
            if (arguments.length > 0) {
                $(cart).each(function(index) {
                    if (cart[index].id == id) {
                        sum = cart[index].price * cart[index].qt;
                    }
                });
            } else {
                $(cart).each(function(index) {
                    sum += cart[index].price * cart[index].qt;
                });
            }
            return sum;
        },
        remove: function(id) {
            for (var i = cart.length - 1; i >= 0; i--) {
                if (cart[i].id == id) {
                    cart.splice(i, 1);
                    this.animateCart();
                    this.save();
                }
            }
        },
        clear: function() {
            cart = [];
        },
        save: function() {
            var localCart = [];
            $(cart).each(function(index) {
                var obj = {};
                obj.id = cart[index].id;
                obj.qt = cart[index].qt;
                localCart.push(obj);
            });
            localStorage['cart'] = JSON.stringify(localCart);
        },
        load: function() {
            this.clear();

            function findItem(id) {
                var item;
                $(items).each(function(index) {
                    if (items[index].id == id) {
                        item = items[index];
                    }
                });
                return item;
            };

            if (localStorage['cart']) {
                var localCart = JSON.parse(localStorage['cart']);
                $(localCart).each(function(index) {
                    var item = findItem(localCart[index].id);
                    if (item) {
                        item.qt = localCart[index].qt;
                        cart.push(item);
                    };
                });
                $('.cart span').text(cart.length);
            } else {
                return false;
            }
        }
    };
};


function controlsGallery(item) {
    var currentSlide, totalSlide = item.url.small.length;

    var path, $elem = $('.image-roll-menu ul');
    if (totalSlide > 0) {
        $(item.url.small).each(function(index) {
            if (index == 0) {
                var $tmp = $('<li>').addClass('image-active');
            } else {
                var $tmp = $('<li>')
            };

            $tmp
                .appendTo($elem)
                .css({ backgroundImage: "url(" + item.folder + item.url.small[index] + ")" })
                .attr('data-url', item.folder + item.url.big[index]);
        });
    };

    // if (totalSlide == 1) {
    //     $('.image-roll-menu ul').css({ display: 'none' });
    // };

    return {
        animateMove: function(options = {
            next: false,
            prev: false,
            animateTime: 500,
            button: undefined,
            index: undefined
        }) {
            var $elem = $('.zoom-image-wrapper');
            if ((!options.next) && (!options.prev) && (typeof(options.index) == 'number')) {
                currentIndex = $('.image-active').index();
                if (options.index > currentIndex) {
                    options.next = true;
                };
                if ((options.index < currentIndex)) {
                    options.prev = true;
                }
            };

            if (options.next) {
                var url = typeof(options.index) == 'number' ?
                    this.switch(options.index) : this.switch(false, true, false);
                if (!url) {
                    return false
                };


                if ($('.image-roll-menu li').find('li.disabled').length != 0) {
                    return false;
                };

                $elem = $('<li>').css({ left: '100%', backgroundImage: url }).appendTo($elem);
                $(options.button).attr('disabled', true);
                this.rollPreview(-1);
                $('.zoom-image-wrapper li:first').animate({ left: '-100%' }, options.animateTime, 'easeOutExpo', function() {
                    $(this).remove();
                    $('.image-roll-menu li').removeClass('disabled');
                });
                $('.zoom-image-wrapper li:last').animate({ left: '0%' }, options.animateTime, 'easeOutExpo', function(obj) {
                    $(options.button).attr('disabled', false);
                    // $('.zoom-image-wrapper li').removeClass('disabled');
                });
                return false;
            };

            if (options.prev) {
                var url = typeof(options.index) == 'number' ?
                    this.switch(options.index) : this.switch(true, false, false);
                if (!url) {
                    return false
                };

                if ($('.image-roll-menu li').find('li.disabled').length != 0) {
                    return false;
                };

                $elem = $('<li>').css({ left: '-100%', backgroundImage: url }).prependTo($elem);
                this.rollPreview(1);
                $(options.button).attr('disabled', true);
                $('.zoom-image-wrapper li:last').animate({ left: '100%' }, options.animateTime, 'easeOutExpo', function() {
                    $(this).remove();
                    $('.image-roll-menu li').removeClass('disabled');
                });
                $('.zoom-image-wrapper li:first').animate({ left: '0%' }, options.animateTime, 'easeOutExpo', function(obj) {
                    $(options.button).attr('disabled', false);
                });
                return false;
            };


            var err = new Error('Неверные параметры функции');
            console.log(err);
        },
        switch: function(prev, next, switchAnimete) {
            var index = $('.image-roll-menu').find('li.image-active').index();
            index = index < 0 ? 0 : index;
            if ((arguments.length == 1) && (typeof(arguments[0]) == 'number')) {
                index = arguments[0];
            } else if (arguments.length > 3) {
                console.log(new Error('Неверные параметры функции'));
                return false;
            } else {
                if (prev) {
                    if (index - 1 >= 0) {
                        index = index - 1;
                    } else {
                        return false;
                    }
                };

                if (next) {
                    var length = $('.image-roll-menu li').length;
                    if (index + 1 <= length - 1) {
                        index = index + 1;
                    } else {
                        return false;
                    };
                };

                if ((prev) && (next)) {
                    console.log(new Error('Неверные параметры функции'));
                    return false;
                };
            };

            $('.image-roll-menu li').removeClass('image-active');
            var path = $('.image-roll-menu li').eq(index).addClass('image-active').attr('data-url');
            if (switchAnimete) {
                $('.zoom-image-wrapper li:first').css({ backgroundImage: "url(" + item.folder + item.url.small[index] + ")" });
            } else {
                return "url(" + item.folder + item.url.small[index] + ")";
            };
        },
        rollPreview: function(multiplier) {
            var length = parseInt($('.image-roll-menu li').eq(0).width()) + parseInt($('.image-roll-menu li').eq(0).css('margin-right'));
            var lengthAll = $('.image-roll-menu li').length * length;
            var lengthViewPort = $('.image-roll-menu').width();
            var currentLeft = parseInt($('.image-roll-menu ul').css('left'));

            if (multiplier < 0) {
                if (lengthViewPort + -currentLeft >= lengthAll) {
                    return false
                };

                $('.image-roll-menu ul').animate({ left: currentLeft - length + 'px' });
            };
            if (multiplier > 0) {
                if (lengthAll - currentLeft <= 0) {
                    return false
                };
                if (currentLeft == 0) {
                    return false
                };

                $('.image-roll-menu ul').animate({ left: currentLeft + length + 'px' });
            };
        },
        zoomImage: function() {
            currentSlide = $('.image-roll-menu').find('li.image-active').index();
            $('.modal').addClass('full-screen-open');
            // $('.fullscreen-overlay, .image-wrapper').addClass('full-screen-open');
            $('.fullscreen-image').find('img').remove();
            $('.modal-qt span:last').text(totalSlide);
            $('.modal-qt span:first').text(currentSlide + 1);
            preloadShow();
            setTimeout(function() {
                loadImage($('.image-roll-menu li').eq(currentSlide).attr('data-url'), true);
            }, 400);
        },
        rollZoomImage: function(nextSlide) {
            if (nextSlide > 0) {
                if (currentSlide >= $('.image-roll-menu li').length - 1) {
                    return false
                };
                currentSlide++;
            } else {
                if (currentSlide <= 0) {
                    return false
                };
                currentSlide--;
            }
            preloadShow();
            $('.modal-qt span:first').text(currentSlide + 1);
            loadImage($('.image-roll-menu li').eq(currentSlide).attr('data-url'), false);
        },
    };
};

function loadImage(url, firstLoad) {
    var img = new Image();
    img.onload = firstLoad ? loadedShowFirst : loadedShow;
    img.src = url;
    if ($(window).width() <= $(window).height()) {
        $(img).css({ width: '100%', height: 'auto' });
    } else {
        $(img).css({ width: 'auto', height: '100%' });
    };
    $('.fullscreen-image img').remove();
    $(img).appendTo($('.fullscreen-image'));
};

$(window).resize(function() {
    var img = $('.fullscreen-image img');
    if ($('.fullscreen-image img').length != 0) {
        if ($(window).width() <= $(window).height()) {
            $(img).css({ width: '100%', height: 'auto' });
        } else {
            $(img).css({ width: 'auto', height: '100%' });
        };
    };
});

function loadedShowFirst() {
    $('.image-preloader').hide();
    $('.fullscreen-image').show(400);
};

function loadedShow() {
    $('.image-preloader').hide();
    $('.fullscreen-image').fadeIn(300);
};

function preloadShow() {
    $('.image-preloader').show();
    $('.fullscreen-image').hide();
}
