;
(function($) {
    $.fn.addTooltip = function(text, removeTime, animationStr) {
        
    	if ($(this).find('.tooltip').length != 0) {
    	$(this).find('.tooltip').remove();
    }
        var toolTip = $('<div>').addClass('tooltip').text(text).prependTo($(this));
        var obj={};
       	if ($(this).css('position') !== "absolute") {
       		$(this).css({position:'relative'});
       	}
        $(toolTip).css({
            position: 'absolute',
            background: 'rgba(30,30,30,0.96)',
            color: 'white',
            top: '-15px',
            right: 0,
            'z-index': 1000,
            transform: 'translateY(-100%)',
            padding: '7px 15px',
            'border-radius': '5px',
            'font-size': '0.8rem',
            // border:'1px solid white',
            'box-shadow': '0px 0px 0px 2px oldlace',
            animation: animationStr,
            'text-align':'center',
            'text-transform':'none'

        });
        $('<div>').appendTo($(toolTip)).css({
            position: 'absolute',
            border: '7px solid transparent',
            'border-top': '7px solid rgba(30,30,30,0.96)',
            bottom: 0,
            right: '24px',
            transform: 'translateY(100%)',
        });
        $(toolTip).delay(removeTime).fadeOut(300, function(){
        	$(this).remove();
        });		
    }
})(jQuery);