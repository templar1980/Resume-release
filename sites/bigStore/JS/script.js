var man = '{"item1":{"title":"Shop t-shirt","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":0,"sale":true,"new":false,"idImage":"IMG/man/catalog-item-1.png","ID":"item-man-01"},"item2":{"title":"Sneaker","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":45.35,"sale":false,"new":false,"idImage":"IMG/man/catalog-item-2.png","ID":"item-man-02"},"item3":{"title":"Backpack","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":65.29,"sale":false,"new":false,"idImage":"IMG/man/catalog-item-3.png","ID":"item-man-03"},"item4":{"title":"Heritage","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":69.99,"sale":false,"new":false,"idImage":"IMG/man/catalog-item-4.png","ID":"item-man-04"}}';
var woman = '{"item1":{"title":"Dress Alta","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":0,"sale":true,"new":false,"idImage":"IMG/woman/woman-1.png","ID":"item-woman-01"},"item2":{"title":" Dress Sibian","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":45.35,"sale":false,"new":false,"idImage":"IMG/woman/woman-2.png","ID":"item-woman-02"},"item3":{"title":"Dress Alter","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":65.29,"sale":false,"new":false,"idImage":"IMG/woman/woman-3.png","ID":"item-woman-03"},"item4":{"title":"Dress Ipsum","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":69.99,"sale":false,"new":true,"idImage":"IMG/woman/woman-4.png","ID":"item-woman-04"}}';
var kids = '{"item1":{"title":"Doodle Girls","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":0,"sale":true,"new":false,"idImage":"IMG/kids/catalog-kids-1.png","ID":"item-man-01"},"item2":{"title":"Chemistry Girl Dress","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":45.35,"sale":false,"new":false,"idImage":"IMG/kids/catalog-kids-2.png","ID":"item-man-02"},"item3":{"title":"UCB KIDS Girls Casual Dress","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":65.29,"sale":false,"new":false,"idImage":"IMG/kids/catalog-kids-3.png","ID":"item-man-03"},"item4":{"title":"Fox Girls Casual Dress","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":69.99,"sale":false,"new":false,"idImage":"IMG/kids/catalog-kids-4.png","ID":"item-man-04"},"item5":{"title":"Lee Cooper Girls Dress","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":69.99,"sale":false,"new":false,"idImage":"IMG/kids/catalog-kids-5.png","ID":"item-man-04"}}';
var acces = '{"item1":{"title":"Gloves","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":0,"sale":false,"new":true,"idImage":"IMG/acces/catalog-accese-1.png","ID":"item-acces-01"},"item2":{"title":"Belt","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":45.35,"sale":false,"new":true,"idImage":"IMG/acces/catalog-accese-2.png","ID":"item-acces-02"},"item3":{"title":"Ladies handbag","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":34.99,"oldPrice":65.29,"sale":false,"new":false,"idImage":"IMG/acces/catalog-accese-3.png","ID":"item-acces-03"},"item4":{"title":"Sunglasses","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":0,"sale":true,"new":false,"idImage":"IMG/acces/catalog-accese-4.png","ID":"item-acces-04"},"item5":{"title":"Shoes","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":0,"sale":false,"new":false,"idImage":"IMG/acces/catalog-accese-5.png","ID":"item-acces-05"},"item6":{"title":"Sunglasses","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":0,"sale":false,"new":false,"idImage":"IMG/acces/catalog-accese-6.png","ID":"item-acces-06"},"item7":{"title":"Necklace","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":0,"sale":false,"new":false,"idImage":"IMG/acces/catalog-accese-7.png","ID":"item-acces-07"},"item8":{"title":"Ring","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit","price":55,"oldPrice":120.35,"sale":true,"new":false,"idImage":"IMG/acces/catalog-accese-8.png","ID":"item-acces-08"}}';
var delta = 0;
//допустим ответ от сервера в формате JSON с выбокой по полю 'Categories' - man, woman, kids

var objCatalogItem = {},
    response, id;

document.querySelector('.man').addEventListener('click', function() {
    createCatalog('man');
});
document.querySelector('.woman').addEventListener('click', function() {
    createCatalog('woman');
});
document.querySelector('.kids').addEventListener('click', function() {
    createCatalog('kids');
});
document.querySelector('.accessories').addEventListener('click', function() {
    createCatalog('accessories');
});

document.querySelector('.left-button').addEventListener('click', function() {
    document.querySelector('.left-button').disabled = true;
    scrollingClientsPrevious();
    setTimeout(function() {
        document.querySelector('.left-button').disabled = false;
    }, 1000);
});

document.querySelector('.right-button').addEventListener('click', function() {
    document.querySelector('.right-button').disabled = true;
    scrollingClientsNext();
    setTimeout(function() {
        document.querySelector('.right-button').disabled = false;
    }, 1000);
});



/* document.querySelector('.right-button').addEventListener('mousedown', function() {
    scrollingClientsRight();
});

document.querySelector('.right-button').addEventListener('mouseup', function() {
    clearInterval(id);
});


document.querySelector('.left-button').addEventListener('mousedown', function() {
    scrollingClientsLeft();
});

document.querySelector('.left-button').addEventListener('mouseup', function() {
    clearInterval(id);

});
*/




createCatalog('man'); //дефолтная страница




function createCatalog(idRequest) {

    var arr = document.querySelectorAll('.menu-trending a');
    arr.forEach(function(item) {
        item.classList.remove('active-menu-trending');
    });
    document.querySelector('.' + idRequest).classList.add('active-menu-trending');
    document.querySelector('.catalog').innerHTML = '';

    //формируем запрос на сервер по idRequest, ждем ответ 

    if (idRequest === 'man') {
        response = man;
    } else if (idRequest === 'woman') {
        response = woman;
    } else if (idRequest === 'kids') {
        response = kids;
    } else if (idRequest === 'accessories') {
        response = acces;
    }

    // переводим ответ с сервера в объект JS 
    objCatalogItem = JSON.parse(response);

    // перебор объекта и вывод данных в каталог
    for (key in objCatalogItem) {
        createCatalogItem(objCatalogItem[key].title, objCatalogItem[key].description, objCatalogItem[key].price, objCatalogItem[key].oldPrice, objCatalogItem[key].sale, objCatalogItem[key].new, objCatalogItem[key].idImage, objCatalogItem[key].ID);
    }
}

function createCatalogItem(title, description, price, oldPrice, remarkSale, remarkNew, idImage, ID) {
    // функция создания одного элемента в каталоге товаров в html-коде

    //здесь надо написать проверку на правильность данных

    var parent, child, catalogItem, catalogItemTitle;
    var catalog = document.querySelector('.catalog');
    parent = catalog;
    child = document.createElement('div');
    child.classList.add('catalog-item');
    if (remarkSale) {
        child.classList.add('remark-new');
    } else if (remarkNew) {
        child.classList.add('remark-sale');
    }
    catalogItem = parent = parent.appendChild(child);
    child = document.createElement('div');
    child.classList.add('remark');
    if ((remarkSale) || (remarkNew)) {
        child.classList.add('remark-catalog');
    }
    parent = parent.appendChild(child);
    child = document.createElement('div');
    parent.appendChild(child);

    child = document.createElement('div');
    parent = catalogItem;
    parent = parent.appendChild(child);

    child = document.createElement('img');
    child.src = idImage;
    child.title = title;
    parent.appendChild(child);

    parent = catalogItem;
    child = document.createElement('div');
    child.classList.add('catalog-item-title');
    catalogItemTitle = parent = parent.appendChild(child);

    child = document.createElement('div');
    child.classList.add('catalog-item-title-name');
    child.textContent = title;
    parent.appendChild(child);
    child = document.createElement('div');
    child.classList.add('catalog-item-title-description');
    child.textContent = description;
    parent.appendChild(child);
    child = document.createElement('div');
    child.classList.add('catalog-item-title-price');
    parent = parent.appendChild(child);
    if (oldPrice) {
        child = document.createElement('span');
        child.textContent = '$' + oldPrice;
        child.classList.add('old-price-before');
        parent.appendChild(child);
    }
    child = document.createElement('span');
    child.textContent = '$' + price;
    price = parent.appendChild(child).parentElement;
    parent = catalogItemTitle;
    child = document.createElement('button');
    child.classList.add('add-shopping-cart');
    child.classList.add('red-add-cart');
    child.classList.add('catalog-button');
    child.dataset.id = ID;
    child.title = 'Add to Shopping Cart';
    parent.appendChild(child);
}


function scrollingClientsNext() {

    var ul = document.querySelector('.clients>ul');
    var position = +getComputedStyle(ul).transform.slice(19).slice(0, -4);
    if ((position - 1000) >= -Math.round(parseFloat(getComputedStyle(ul).width))) {
        var i = 1;
        var shiftUl = 0;
        var activeElement = document.querySelector('.clients-active');


        shiftUl = Math.round(parseFloat(getComputedStyle(activeElement).width));

        while ((activeElement.nextElementSibling) && (i < 3)) {
            activeElement.classList.remove('clients-active');
            activeElement = activeElement.nextElementSibling;
            activeElement.classList.add('clients-active');
            shiftUl += Math.round(parseFloat(getComputedStyle(activeElement).width));
            i++;
        }

        if (activeElement.nextElementSibling) {
            activeElement.classList.remove('clients-active');
            activeElement.nextElementSibling.classList.add('clients-active');
        }
        ul.style.transform = 'translateX(' + (position - shiftUl) + 'px)';
        ul.style.transition = 'transform 1s ease-out';
    }

  
}



function scrollingClientsPrevious() {
    var ul = document.querySelector('.clients>ul');
    var position = +getComputedStyle(ul).transform.slice(19).slice(0, -4);
    var activeElement = document.querySelector('.clients-active');

    if (document.querySelector('.clients-active').previousElementSibling) {
        activeElement.classList.remove('clients-active');
        activeElement = activeElement.previousElementSibling;
        activeElement.classList.add('clients-active');
    }
    var i = 1;
    var shiftUl = 0;
    if (position < 0) {
        shiftUl = Math.round(parseFloat(getComputedStyle(activeElement).width));
        while ((activeElement.previousElementSibling) && (i < 3)) {
            activeElement.classList.remove('clients-active');
            activeElement = activeElement.previousElementSibling;
            activeElement.classList.add('clients-active');
            shiftUl += Math.round(parseFloat(getComputedStyle(activeElement).width));
            i++;
        }
        ul.style.transform = 'translateX(' + (position + shiftUl) + 'px)';
        ul.style.transition = 'transform 1s ease-out';
    }    
}





function scrollingClientsRight() {

    var ul = document.querySelector('.clients>ul');
    ul.style.transition = 'none';
    var widthClients = (+parseFloat(getComputedStyle(ul).width)) - 1000;
    id = setInterval(function() {
        var position = +getComputedStyle(ul).transform.slice(19).slice(0, -4);
        if (position >= -widthClients) {
            ul.style.transform = 'translateX(' + (--position - 20) + 'px)';
        } else {
            clearInterval(id);
        }
    }, 50)
}

function scrollingClientsLeft() {
    var ul = document.querySelector('.clients>ul');
    var widthClients = (+parseFloat(getComputedStyle(ul).width)) - 1000;
    id = setInterval(function() {
        var position = +getComputedStyle(ul).transform.slice(19).slice(0, -4);
        if (position <= 0) {
            ul.style.transform = 'translateX(' + (++position + 20) + 'px)';
        } else {
            clearInterval(id);
        }
    }, 50)
}
