var clock = runClock();
setInterval(clock, 1000);


function runClock() {

    var arrDegMinutesSeconds = [],
        arrDegHours = [];

    // ассоциативные массивы с градусами для rotate - минуты, секунды и часы
    
    for (var i = 0; i < 60; i++) {
        arrDegMinutesSeconds.push(i * 6);
    }

    for (var i = 0; i < 12; i++) {
        arrDegHours.push(i * 30);
    }

    return function() {
        date = new Date();
        var hours = date.getHours() < 12 ? date.getHours() : date.getHours() - 12;
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var degHour = arrDegHours[hours] + (minutes / 60 * 30);
        var degMinutes = arrDegMinutesSeconds[minutes] + (seconds / 60 * 6);
        var degSeconds = arrDegMinutesSeconds[seconds];

        var elem = document.querySelector('.hours');
        elem.style.transform = "translate(-50%, 41px) rotate(" + degHour + "deg)";
        elem = document.querySelector('.minutes');
        elem.style.transform = "translate(-50%, 41px) rotate(" + degMinutes + "deg)";
        elem = document.querySelector('.seconds');
        elem.style.transform = "translate(-50%, 41px) rotate(" + degSeconds + "deg)";

        document.querySelector('.electro-hours').textContent = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
        document.querySelector('.electro-minutes').textContent = minutes >= 10 ? minutes : '0' + minutes;
        document.querySelector('.electro-seconds').textContent = seconds >= 10 ? seconds : '0' + seconds;
        document.querySelector('.day').textContent = date.getDate();
        document.querySelector('.month').textContent = (date.toDateString()).slice(4, 7);
    }
}
