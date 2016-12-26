function closeCallbackWindow(){
    $('.callback-win-header').animate({ opacity: 0 }, 300);
    $('.callback-win-body').animate({
            opacity: 0
        }, 300,
        function() {
            $('.callback-win-header, .callback-win-body').css({ display: 'none' });
        });
    $('.callback-win').animate({
            width: '40px',
            height: '200px',
            right: '0px',
            bottom: '0px',
        }, 300,
        function() {
            $('.callback-win').css({ 'background-color': 'red', borderRadius: '10px 0 0 10px', cursor:'pointer' });
            $('.callback-win>div:first-child').css({ display: 'block' });
        });
}


$('.callback-win').click(function() {
    $('.callback-win-header, .callback-win-body').css({ display: 'block' });

    // var right = (window.innerWidth - $('.main').width())/2;

    // $('.callback-win').css({'background-color':'transparent' , position:'fixed', 'z-index':'20'}).
    //      animate({width:'300px', height:'500px', 
    //          right:20+'px', 
    //          bottom:window.innerHeight/2-250+'px'},400);

    $(this).css({ transform: 'none', cursor:'default' });
    $('.callback-win>div:first-child').css({ display: 'none' });
    $('.callback-win').css({ 'background-color': 'transparent' }).
    animate({
        width: '350px',
        height: '460px',
        right: '20px',
        bottom: '0px',
        borderRadius: '0'
    }, 400);

    setTimeout(function() {
        $('.callback-win-header').animate({ opacity: 1 }, 200);
        $('.callback-win-body').animate({ opacity: 1 }, 200);
    }, 150);
});


$('.callback-win-body>.icon-cancel-1').click(function(event) {
    event.stopPropagation();
    closeCallbackWindow();
});


$('.callback-win').hover(
    function() {
        if ($('.callback-win-body').css('display') === 'none') {
             $(this).css({ transform: 'scale(1.1)', transformOrigin: 'right bottom' }) 
         }},
    function() { 
        $(this).css({ transform: 'none' })
    }
);
