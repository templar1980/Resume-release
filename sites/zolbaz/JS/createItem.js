function CreateItem(descriptionItem) {

    descriptionItem = descriptionItem || {
        imageFile: '',
        name: '',
        code: '',
        metal: '',
        color: '',
        weight: 0,
        insert: '',
        dimensions: '',
        oldPrice: 0,
        newPrice: 0,
        category: 'diamond'
    }

    //create item wrapper
    var item = $('<div></div>').
    addClass('item');

    //create item description
    var itemDescription = $('<div></div>').
    addClass('description-item');

    $('<li></li>').
    appendTo($(itemDescription)).
    addClass('description-item-name').
    text(descriptionItem.name);

    // $('<span id="art"></span>').
    $('<span>', {
        id: 'art',
        text: ' ' + descriptionItem.code,
    }).
    appendTo(itemDescription).
        // text(' ' + descriptionItem.code).
    wrap('<li>Артикул: </li>');

    $('<span></span>').
    appendTo($(itemDescription)).
    text(' ' + descriptionItem.metal).
    wrap('<li>Металл: </li>');

    $('<span></span>').
    appendTo($(itemDescription)).
    text(' ' + descriptionItem.color).
    wrap('<li>Цвет: </li>');

    $('<span></span>').
    appendTo($(itemDescription)).
    text(' ' + descriptionItem.weight).
    wrap('<li>Вес: </li>');

    if (descriptionItem.insert) {
        $('<span></span>').
        appendTo($(itemDescription)).
        text(' ' + descriptionItem.insert).
        wrap('<li>Вставка: </li>');
    }

    if (descriptionItem.dimensions) {
        $('<span></span>').
        appendTo($(itemDescription)).
        text(' ' + descriptionItem.dimensions).
        wrap('<li>Размеры: </li>');
    }


    $(itemDescription).find('li').wrapAll('<ul></ul>');

    //create item image
    var itemImg = $('<div></div>').
    addClass('item-img');

    $('<img>').
    attr('src', descriptionItem.imageFile).
    appendTo(itemImg);
    $('<i></i>').
    addClass('icon-zoom-in').
    appendTo(itemImg);

    //create item price
    var itemPrice = $('<div></div>').
    addClass('price-item');

    $('<span></span>').
    addClass('old-price-item').
    text((descriptionItem.oldPrice).toFixed(2)).
    appendTo(itemPrice);

    $('<br>').
    appendTo(itemPrice);

    $('<span></span>').
    addClass('new-price-item').
    text((descriptionItem.newPrice).toFixed(2)).
    appendTo(itemPrice);

    $('<br>').
    appendTo(itemPrice);

    var link = 'http://zolbaz.dp.ua/catalog/sale/' + $(itemDescription).find('#art').text().replace(' ', '').replace('-','') + '/';

    $('<a target="_blank">Купить</a>').
    addClass('item-buy-button').
    attr('href', link).
    appendTo(itemPrice);

    var wrapper = $('<div></div>').addClass('wraper-price-item');
    itemPrice = $(wrapper).append(itemPrice);

    if ($('#' + descriptionItem.category + ' .item').length % 2 === 0) {
        $(item).append(itemImg).append(itemDescription).append(itemPrice);
    } else {
        $(item).append(itemPrice).append(itemDescription).append(itemImg);
    }

    return item;
}
