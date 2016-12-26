$('body').hide();

$(window).on('load', function(){
    $('body').show();
});

$(document).ready(function() {

    $('.col-1, .col-2, .col-3').viewportChecker({
        classToAdd: 'visible-animation',
        classToRemove: '',
        offset: -100,
        invertBottomOffset: true,
        repeat: true,
        callbackFunction: function(elem, action) {},
        scrollHorizontal: false
    });

    $('.logo img').viewportChecker({
        classToAdd: 'visible-animation-logo',
        classToRemove: '',
        offset: -100,
        invertBottomOffset: true,
        repeat: true,
        callbackFunction: function(elem, action) {},
        scrollHorizontal: false
    });

    $('.video-logo').viewportChecker({
        classToAdd: 'visible-animation-video-logo',
        classToRemove: '',
        offset: 0,
        invertBottomOffset: true,
        repeat: true,
        callbackFunction: function(elem, action) {},
        scrollHorizontal: false
    });


    $('.video-quote').viewportChecker({
        classToAdd: 'visible-animation-video-quote',
        classToRemove: '',
        offset: 0,
        invertBottomOffset: true,
        repeat: true,
        callbackFunction: function(elem, action) {},
        scrollHorizontal: false
    });


    $('.callback-block').viewportChecker({
        classToAdd: 'animate-block',
        classToRemove: '',
        offset: 0,
        invertBottomOffset: true,
        repeat: true,
        callbackFunction: function(elem, action) {},
        scrollHorizontal: false
    });



    var elem = CreateItem({
            imageFile: 'Img/Items/item1.png',
            name: 'Dreams',
            code: 'AH-90874',
            metal: 'Золото 585°',
            color: 'белый',
            weight: '2.8г',
            insert: 'бриллиант 1Кр57-0.2-2/3А',
            dimensions: '16.5,17,17.5,18',
            oldPrice: 16320,
            newPrice: 14100,
            category: 'diamond'
        });

        $('#diamond').append(elem);


        elem = CreateItem({
            imageFile: 'Img/Items/item2.png',
            name: 'Sakura',
            code: 'AH-90872',
            metal: 'Золото 585°',
            color: 'белый',
            weight: '3.3г',
            insert: 'бриллиант 12Кр57-0.23-2/3А',
            dimensions: '16,16.5,17.5,18',
            oldPrice: 15900,
            newPrice: 13500,
            category: 'diamond'
        });

        $('#diamond').append(elem);

        elem = CreateItem({
            imageFile: 'Img/Items/item4.png',
            name: 'July',
            code: 'AH-90431',
            metal: 'Золото 585°',
            color: 'желтый',
            weight: '3.2г',
            insert: 'бриллиант 9Кр57-0.09-3/4А',
            dimensions: '15.5,16,16.5,17,17.5',
            oldPrice: 12000,
            newPrice: 9249.99,
            category: 'diamond'
        });

        $('#diamond').append(elem);

        elem = CreateItem({
            imageFile: 'Img/Items/item5.png',
            name: 'Gold Lily',
            code: 'AH-91323',
            metal: 'Золото 585°',
            color: 'желтый',
            weight: '4.98г',
            insert: 'бриллиант 1Кр57-0.28-3/3А',
            dimensions: '16,16.5,17',
            oldPrice: 21723,
            newPrice: 18120,
            category: 'diamond'
        });

        $('#diamond').append(elem);


        elem = CreateItem({
            imageFile: 'Img/Items/item3.png',
            name: 'Jessica',
            code: 'AS-30121',
            metal: 'Золото 585°',
            color: 'желтый',
            weight: '2.2г',
            insert: 'бриллиант 6Кр57-0.25-2/3А',
            dimensions: '',
            oldPrice: 10900,
            newPrice: 8999.99,
            category: 'diamond'
        });

        $('#diamond').append(elem);



        elem = CreateItem({
            imageFile: 'Img/Items/itemexc1.png',
            name: 'Ruby Star',
            code: 'BH-1053',
            metal: 'Золото 585°',
            color: 'красный',
            weight: 'серьги 3.78г, кулон 5.39г',
            insert: 'рубин',
            dimensions: '',
            oldPrice: 16238.60,
            newPrice: 14250,
            category: 'exclusive'
        });

        $('#exclusive').append(elem);

        elem = CreateItem({
            imageFile: 'Img/Items/itemexc2.png',
            name: 'Ice Blue',
            code: 'BH-1096',
            metal: 'Золото 585°',
            color: 'белый',
            weight: 'серьги 4.09г, кулон 4.98г',
            insert: 'топаз белый/топаз свис',
            dimensions: '',
            oldPrice: 20586,
            newPrice: 18900,
            category: 'exclusive'
        });

        $('#exclusive').append(elem);

        elem = CreateItem({
            imageFile: 'Img/Items/itemexc3.png',
            name: 'Silver Heart',
            code: 'МDS-356',
            metal: 'Серебро 925°',
            color: 'белый',
            weight: 'серьги 8.76г, кольцо 5.98г, кулон 9.02г',
            insert: 'фианит/аметист',
            dimensions: '17,17.5,18',
            oldPrice: 2258.00,
            newPrice: 1839.99,
            category: 'exclusive'
        });

        $('#exclusive').append(elem);

        elem = CreateItem({
            imageFile: 'Img/Items/itemexc4.png',
            name: 'Branch',
            code: 'BH-1098',
            metal: 'Золото 585°',
            color: 'белый',
            weight: 'кольцо 2.98г, кулон 3.58г',
            insert: 'хризолит',
            dimensions: '16,16.5,17',
            oldPrice: 9890,
            newPrice: 8042,
            category: 'exclusive'
        });

        $('#exclusive').append(elem);

});