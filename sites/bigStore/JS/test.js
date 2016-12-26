
var catalogItem = {},
    template = {};
str = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit';

template.title = 'Doodle Girls';
template.description = str;
template.price = 34.99;
template.oldPrice = 0;
template.sale = true;
template.new = false;
template.idImage = 'IMG/kids/catalog-kids-1.png';
template.ID = 'item-man-01';
catalogItem.item1=template;
template = {};

template.title = 'Chemistry Girl Dress';
template.description = str;
template.price = 34.99;
template.oldPrice = 45.35;
template.sale = false;
template.new = false;
template.idImage = 'IMG/kids/catalog-kids-2.png';
template.ID = 'item-man-02';
catalogItem.item2=template;
template = {};

template.title = 'UCB KIDS Girls Casual Dress';
template.description = str;
template.price = 34.99;
template.oldPrice =65.29;
template.sale = false;
template.new = false;
template.idImage = 'IMG/kids/catalog-kids-3.png';
template.ID = 'item-man-03';
catalogItem.item3=template;
template = {};

template.title = 'Fox Girls Casual Dress';
template.description = str;
template.price = 55.00;
template.oldPrice = 69.99;
template.sale = false;
template.new = false;
template.idImage = 'IMG/kids/catalog-kids-4.png';
template.ID = 'item-man-04';
catalogItem.item4=template;
template = {};

template.title = 'Lee Cooper Girls Dress';
template.description = str;
template.price = 55.00;
template.oldPrice = 69.99;
template.sale = false;
template.new = false;
template.idImage = 'IMG/kids/catalog-kids-5.png';
template.ID = 'item-man-04';
catalogItem.item5=template;
template = {};

str = JSON.stringify(catalogItem);