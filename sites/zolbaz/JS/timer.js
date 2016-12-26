function getTimeObj() {
	//Функция возвращает обьект с оставшимся временем
    var deadline = $('.coutdown-timer-wrapper').attr('data-deadline');
    var time = Date.parse(new Date(deadline)) - Date.parse(new Date());
    var days = Math.floor((time / (1000 * 60 * 60 * 24)));
    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((time / (1000 * 60)) % 60);
    var seconds = Math.floor((time / (1000)) % 60);
    return {
        'total': time,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function getStrTime(time) {
	//Функция возвращает время в формате '00'
    if (time > 0) {
        return (time >= 10) ? time : '0' + time;
    } else {
        return '00';
    }
}

function initializeClock() {
    //кэш переменных
    var days = $('.days');
    var hours = $('.hours');
    var minutes = $('.minutes');
    var seconds = $('.seconds');
    //помещаем переменные в область видимости (замыкаем) 
    return function() {
        var id = setInterval(function() {
            var objTimer = getTimeObj();
            $(seconds).text(getStrTime(objTimer.seconds));
            $(minutes).text(getStrTime(objTimer.minutes));
            $(hours).text(getStrTime(objTimer.hours));
            $(days).text(getStrTime(objTimer.days));
            if (objTimer.total < 0) {
                clearInterval(id); //Если время вышло останавливаем счетчик 
            }
        }, 1000);
    }
}

$(window).on('load', function() {
     initializeClock()();
     if (navigator.userAgent.search('WebKit') === -1) {
        $('.reflection').css({display:'none'});
     }
})
