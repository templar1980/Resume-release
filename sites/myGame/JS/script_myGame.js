document.querySelector('.main').style.height = document.documentElement.clientHeight + 'px';
document.querySelector('.loader').style.height = document.documentElement.clientHeight + 'px';
document.querySelector('.winner').style.height = document.documentElement.clientHeight + 'px';

/*document.querySelector('.main').style.height = screen.availHeight + 'px';
document.querySelector('.loader').style.height = screen.availHeight + 'px';
document.querySelector('.winner').style.height = screen.availHeight + 'px';*/

var arrValue = ['Rock', 'Paper', 'Scissors'];
var round = 1;

var totalScore = {
    human: 0,
    computer: 0,
    tie: 0
};

setTimeout(function() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.main').style.display = 'flex';
}, 1500);

function getSlide() {
    setTimeout(function() {
        document.querySelector('.slide1').classList.remove('bounceIn');
        document.querySelector('.slide1').classList.add('bounceOut');
    }, 4000);

    setTimeout(function() {
        document.querySelector('.slide1').style.display = 'none';
        document.querySelector('.slide2').style.display = 'block';
        document.querySelector('.slide1').classList.remove('bounceOut');
        document.querySelector('.slide1').classList.add('bounceIn');
    }, 5000);

    setTimeout(function() {
        document.querySelector('.slide2').classList.remove('bounceIn');
        document.querySelector('.slide2').classList.add('bounceOut');
    }, 8000);

    setTimeout(function() {
        document.querySelector('.slide1').style.display = 'block';
        document.querySelector('.slide2').style.display = 'none';
        document.querySelector('.slide2').classList.remove('bounceOut');
        document.querySelector('.slide2').classList.add('bounceIn');
    }, 9000);
}
getSlide();
setInterval(getSlide, 10000);

function start(value) {

    var playerValue = value;
    //var compValue = arrValue[0];
    var compValue = compChoise();

    document.getElementsByClassName('work-zone')[0].style.display = 'none';
    document.getElementsByClassName('work-zone')[1].style.display = 'flex';
    document.getElementsByClassName('work-zone')[2].style.display = 'none';
    document.querySelector('audio').setAttribute('src', 'mp3/gong.wav');
    document.querySelector('audio').play();

    setTimeout(function() {
        document.querySelector('audio').pause();
    }, 1500);

    setTimeout(function() {
        document.getElementsByClassName('work-zone')[1].style.display = 'none';
        document.getElementsByClassName('work-zone')[2].style.display = 'flex';
        changePlayerImage(value);
        document.querySelector('audio').setAttribute('src', 'mp3/drum.wav');
        document.querySelector('audio').play();
        changeCompImage(compValue);
    }, 2000);


    if (playerValue === arrValue[0] && compValue === arrValue[0]) {
        deadHeat();
    } else if (playerValue === arrValue[0] && compValue === arrValue[1]) {
        playerLose();
    } else if (playerValue === arrValue[0] && compValue === arrValue[2]) {
        playerWin();
    } else if (playerValue === arrValue[1] && compValue === arrValue[0]) {
        playerWin();
    } else if (playerValue === arrValue[1] && compValue === arrValue[1]) {
        deadHeat();
    } else if (playerValue === arrValue[1] && compValue === arrValue[2]) {
        playerLose();
    } else if (playerValue === arrValue[2] && compValue === arrValue[0]) {
        playerLose();
    } else if (playerValue === arrValue[2] && compValue === arrValue[1]) {
        playerWin();
    } else if (playerValue === arrValue[2] && compValue === arrValue[2]) {
        deadHeat();
    }



    if (totalScore.human === 2) {
    setTimeout(function() {
        document.querySelector('.winner>span').innerHTML = 'Congratulations, <br> You won!';
        document.querySelector('.main').style.display = 'none';
        document.querySelector('.winner').style.display = 'flex';
         }, 8000);
    } else if (totalScore.computer === 2) {
        setTimeout(function() {
        document.querySelector('.winner>span').innerHTML = 'Oh oh, <br> You lose!';
        document.querySelector('.main').style.display = 'none';
        document.querySelector('.winner').style.display = 'flex';
         }, 8000);
    } else {
        setTimeout(function() {
            //document.querySelectorAll('.message').forEach(function(item) {item.style.display = 'none' });
            document.querySelectorAll('.message')[0].style.display = 'none';
            document.querySelectorAll('.message')[1].style.display = 'none';
            document.querySelectorAll('.message')[2].style.display = 'none';
            document.querySelectorAll('.message')[3].style.display = 'none';
            round++;
            document.querySelector('.number-round').textContent = round;
            document.querySelector('.anim').style.animation = 'none';
            document.querySelector('.anim').style.backgroundImage = 'url(IMG/Sprite.png)';
            document.querySelector('.anim').style.backgroundRepeat = 'repeat-y';
            document.querySelector('.game').style.display = 'none';
            document.querySelector('.select').style.display = 'flex';
        }, 8000);
    }
}

function compChoise() {
    var comp = Math.random().toFixed(3);
    if (comp >= 0 && comp <= 0.333) {
        return arrValue[0];
    } else if (comp > 0.333 && comp <= 0.666) {
        return arrValue[1];
    } else {
        return arrValue[2];
    }
}

function playerWin() {
    totalScore.human++;
    setTimeout(function() {
        document.querySelector('.human-win').style.display = 'block';
        document.querySelector('.human').textContent = totalScore.human;
        document.querySelector('audio').setAttribute('src', 'mp3/select1.mp3');
        document.querySelector('audio').play();
    }, 5500);
}

function playerLose(value) {

    totalScore.computer++;

    setTimeout(function() {
        document.querySelector('.comp-win').style.display = 'block';
        document.querySelector('.computer').textContent = totalScore.computer;
        document.querySelector('audio').setAttribute('src', 'mp3/select1.mp3');
        document.querySelector('audio').play();
    }, 5500);
}

function deadHeat(value) {

    totalScore.tie++;

    setTimeout(function() {
        //не работает на Android 4.2-4.3
        //document.querySelectorAll('.human-comp-tie').forEach(function(item) { item.style.display = 'block' });
        document.querySelectorAll('.human-comp-tie')[0].style.display = 'block';
        document.querySelectorAll('.human-comp-tie')[1].style.display = 'block';
        document.querySelector('.tie').textContent = totalScore.tie;
        document.querySelector('audio').setAttribute('src', 'mp3/select1.mp3');
        document.querySelector('audio').play();
    }, 5500);
}

function changePlayerImage(value) {
    document.querySelector('.player-choise>div').style.backgroundImage = 'url(IMG/new' + value + 'Blur.png)';
}

function changeCompImage(value) {
    var elem = document.querySelector('.comp-choise>div');
    elem.style.animation = 'compChoise' + value + ' 3s';
    elem.style.animationTimingFunction = 'ease-out';
    setTimeout(function() {
        elem.style.backgroundImage = 'url(IMG/new' + value + 'Blur.png)';
        elem.style.backgroundRepeat = 'no-repeat';
        elem.style.backgroundPosition = '50% 50%';
        document.querySelector('audio').pause();
    }, 3000);
}

function restart() {
    location.reload();
}
