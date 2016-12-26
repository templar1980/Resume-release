;
(function($) {
    $.fn.sliderPage = function() {
        var curItem = $('.item-header-name').attr('data-id');
       	this.curListNav = $('.item-header-name span').text();
       	if (this.curListNav == "Featured") {
       		var obj = sampleItem(items, 'featured', true);
       		this.featured = true;
       	} else {
       		var obj = sampleItem(items, 'menuItem', this.curListNav);
       	};
        
        var curIndex;
        $(obj).each(function(index) {
            if (obj[index].id == curItem) {
                curIndex = index;
            }
        });
        this.curIndex = curIndex;
        this.obj = obj;
        this.next = function() {
            if (this.curIndex + 1 > this.obj.length-1) {
            	$('.item-btn.item-next').attr('disabled',' ');
                return false };
            viewItemPage(this.obj[curIndex + 1], this.featured);
        };

        this.prev = function() {
            // var obj = sampleItem(items, 'menuItem', this.curListNav);
            if (this.curIndex - 1 < 0) {
            	$('.item-btn.item-prev').attr('disabled',' ');
                return false };
            viewItemPage(this.obj[curIndex - 1], this.featured);
        };

        return this;
    };
})(jQuery);
