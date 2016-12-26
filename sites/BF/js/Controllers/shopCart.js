function viewShopCart() {
    loadCartHTML();
};

function loadCartHTML() {
    $.ajax({
        type: "GET",
        cache: true,
        url: "views/shopCart.html",
        success: function(obj) {
            $('.content').html(obj);
            renderShopCartPage();
        }
    });
};

function renderShopCartPage() {
    $('header').addClass('fixed');
    $('body, html').scrollTop(0);

    $('.shopCart-totalPrice').text('$' + cart.sumPrice().toFixed(2));
    var shopCart = cart.returnCart();
    if (shopCart.length > 0) {
        $(shopCart).each(function(index) {
            createDOMCartItem(shopCart[index]);
            $('.nameCART span').hide();
            $('.cart-wrapper').show();
        });
    } else {
        $('.nameCART span').show();
        $('.cart-wrapper').hide();
    };

    $('.cart-item-delete').on('click', function(event) {
        event.preventDefault();
        var itemId = $(event.currentTarget).parent().find('.cart-item-name').attr('id');
        $(event.currentTarget).parents('.shopCart-items').fadeOut(300, function() {
            $(this).remove();
        });
        cart.remove(itemId);
        $('.shopCart-totalPrice').fadeOut(10).text('$' + cart.sumPrice().toFixed(2)).fadeIn(200);
        if (cart.returnCart().length == 0) {
            $('.nameCART span').show();
            $('.cart-wrapper').hide();
        };
    });

    $('.cart-item-img').on('click', function() {
        var id = $(event.currentTarget).parent().find('.cart-item-name').attr('id');
        var item = cart.returnItemObj(id);
        if (item) {
            viewItemPage(item);
        }
    });

    $('.cart-item-name').on('click', function() {
        var item = cart.returnItemObj($(event.currentTarget).attr('id'));
        if (item) {
            viewItemPage(item);
        }
    });

    $('.item-qt .qt-controls-plus').on('click', function(event) {
        var $elem = $(event.currentTarget).parent().find('.qt-controls-value');
        var val = +$elem.attr('value');
        if (val + 1 > 5) {
            return false
        };
        $elem.attr('value', val + 1);
        var id = $(event.currentTarget).parents('.shopCart-items').find('.cart-item-name').attr('id');
        cart.addCart(id, false, val + 1)
        var $textPrice = $(event.currentTarget).parents('.shopCart-items').find('.item-totalPrice');
        $textPrice.fadeOut(10).text('$' + cart.sumPrice(id).toFixed(2)).fadeIn(200);
        $('.shopCart-totalPrice').fadeOut(10).text('$' + cart.sumPrice().toFixed(2)).fadeIn(200);

    });

    $('.item-qt .qt-controls-minus').on('click', function(event) {
        var $elem = $(event.currentTarget).parent().find('.qt-controls-value');
        var val = +$elem.attr('value');
        if (val - 1 <= 0) {
            return false
        };
        $elem.attr('value', val - 1);
        var id = $(event.currentTarget).parents('.shopCart-items').find('.cart-item-name').attr('id');
        cart.addCart(id, false, val - 1);
        var $textPrice = $(event.currentTarget).parents('.shopCart-items').find('.item-totalPrice');
        $textPrice.fadeOut(10).text('$' + cart.sumPrice(id).toFixed(2)).fadeIn(200);
        $('.shopCart-totalPrice').fadeOut(10).text('$' + cart.sumPrice().toFixed(2)).fadeIn(200);
    });



};




function createDOMCartItem(item) {
    var $divshopCart = $('<div>').addClass('shopCart-items');
    var $divCartItem = $('<div>').addClass('cart-item item-product').appendTo($divshopCart);
    var $tmp = $('<button>').addClass('cart-item-delete').appendTo($divCartItem);
    $('<i>').addClass('icon-trash-empty').appendTo($tmp);
    $('<div>').addClass('cart-item-img').css({ backgroundImage: 'url(' + item.folder + item.url.small[0] + ')' }).appendTo($divCartItem);
    $('<div>').addClass('cart-item-name').attr('id', item.id).text(item.name).appendTo($divCartItem);
    $('<div>').addClass('cart-item item-price').text('$' + (item.price).toFixed(2)).appendTo($divshopCart);
    $tmp = $('<div>').addClass('cart-item item-qt').appendTo($divshopCart);
    var $controls = $('<div>').addClass('cart-qt-controls').appendTo($tmp);
    $('<button>').addClass('qt-controls-minus').text('-').appendTo($controls);
    $('<input>', { class: "qt-controls-value", type: 'text', value: item.qt, disabled: true }).appendTo($controls);
    $('<button>').addClass('qt-controls-plus').text('+').appendTo($controls);
    $('<div>').addClass('cart-item item-totalPrice').text('$' + (item.qt * item.price).toFixed(2)).appendTo($divshopCart);
    $('.shopCart-items-box').append($divshopCart);
}
