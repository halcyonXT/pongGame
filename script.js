let p1pos = 40
let p2pos = 40
let timer;
let stimer;
let ballTimer;
let flag = true;
let audioFlag = true;
let ballX;
let ballY;

let p1score = 0
let p2score = 0

let multiplier = 1;

let ballXpos = 48
let ballYpos = 36

let optFlag = false

let sensitivity = 10;

let pastFlag = false;

const sfxChange = () => {
    audioFlag = !audioFlag
    switch(audioFlag) {
        case true:
            document.getElementById("sfxBtn").innerText = `SFX ON`
        break;
        case false:
            document.getElementById("sfxBtn").innerText = `SFX OFF`
            document.getElementById("theme").muted = "true"
        break;
    }
}

const displayOptions = () => {
    optFlag = true;
    document.getElementById("outerframe").style.display = "block";
}

const closeOptions = () => {
    optFlag = false;
    document.getElementById("outerframe").style.display = "none";
}

const playTheme = () => {
    document.getElementById("theme").play()
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("optBtn").style.display = "block";
}

const gameInit = async () => {
    pastFlag = true;
    document.getElementById("theme").muted = "true"
    if (audioFlag) {
        document.getElementById("start").play()
    }
    document.getElementById("mDisplay").style.display = "none";
    document.getElementById("p1c").style.display = "block";
    document.getElementById("p2c").style.display = "block";
    document.getElementById("pauseframe").style.display = "block";
    setTimeout(() => {
        document.getElementById("p1c").style.display = "none";
        document.getElementById("p2c").style.display = "none";
        document.getElementById("pauseframe").style.display = "none";
        gameStart();
    }, 3000)
}

const rstBtn = () => {
    if (!pastFlag) {
        return;
    }
    p1score = 0
    p2score = 0
    document.getElementById("p1score").innerText = `${p1score}`
    document.getElementById("p2score").innerText = `${p2score}`
    flag = true;
    gameOver(3);
}

const gameOver = (playerWon) => {
    if (playerWon != 3) {
        if (audioFlag) {
            document.getElementById("winsound").play()
        }
    }
    document.getElementById("ball").style.display = "none";
    multiplier = 1;
    clearInterval(ballTimer)
    ballTimer = null;
    //ABOVE ARE RESET SETTINGS
    switch(playerWon) {
        case 1:
            p1score++
            document.getElementById("victor").style.display = "block"
            document.getElementById("victor").innerText = "PLAYER 1 WON"
            document.getElementById("p1score").innerText = `${p1score}`
        break;
        case 2:
            p2score++
            document.getElementById("victor").style.display = "block"
            document.getElementById("victor").innerText = "PLAYER 2 WON"
            document.getElementById("p2score").innerText = `${p2score}`
        break;
    }
    document.getElementById("subtext").style.display = "block"
    document.addEventListener("keyup", function(event) {
        if (event.keyCode == "13") {
            if (flag) {
                document.getElementById("ball").style.display = "block";
                ballXpos=48;
                document.getElementById("ball").style.left = `48vw`
                ballYpos=36;
                document.getElementById("ball").style.top = `36vh`
                gameStart();
            }
        }
    })
}

const gameStart = () => {
    let temp=0;
    if (audioFlag) {
        document.getElementById("start").play()
    }
    document.getElementById("victor").style.display = "none"
    document.getElementById("subtext").style.display = "none"
    let ballX = [0.5,-0.5][Math.floor(Math.random()*2)]
    let ballY = [1,-1][Math.floor(Math.random()*2)]
    flag = false;
    ballTimer = setInterval(() => {
        if (ballXpos <= 1) {
            if (ballYpos + 8 >= p1pos-8 && ballYpos + 8 <= p1pos+18) {
                ballX = 0.5 * multiplier
                multiplier += 0.05
                if (audioFlag) {
                    document.getElementById("paddleHit").play()
                }
            } else {
                flag = true
                gameOver(2)
            }
        }
        if (ballXpos >= 97) {
            if (ballYpos + 8 >= p2pos-8 && ballYpos + 8 <= p2pos+18) {
                ballX = -0.5 * multiplier
                multiplier += 0.05
                if (audioFlag) {
                    document.getElementById("paddleHit").play()
                }
            } else {
                flag = true
                gameOver(1)
            }
        }
        if (ballYpos <= -8) {
            ballY = 1 * multiplier
       }
        if (ballYpos >= 85) {
            ballY = -1 * multiplier
        }
        /*if (optFlag) {
            if (temp == 0) {
                tempX = ballX;
                tempY = ballY;
                temp = 1;
            }
            ballX = 0;
            ballY = 0;
        }*/
        if (!optFlag) {
            ballXpos += ballX
            ballYpos += ballY
            document.getElementById("ball").style.left = `${ballXpos}vw`
            document.getElementById("ball").style.top = `${ballYpos}vh`
        }
    }, 20)
}


const player2MoveUp = () => {
    if (p2pos == 0) {
        return;
    } 
    p2pos--
    document.getElementById("player2").style.marginTop = `${p2pos}vh`
}

const player2MoveDown = () => {
    if (p2pos == 85) {
        return;
    }
    p2pos++
    document.getElementById("player2").style.marginTop = `${p2pos}vh`
}

const player2MoveDownSetting = () => {
    if(stimer) return;
    stimer= setInterval(player2MoveDown, sensitivity);
}

const player2MoveUpSetting = () => {
    if(stimer) return;
    stimer= setInterval(player2MoveUp, sensitivity);
}

const player1MoveUp = () => {
    if (p1pos == 0) {
        return;
    } 
    p1pos--
    document.getElementById("player1").style.marginTop = `${p1pos}vh`
}

const player1MoveDown = () => {
    if (p1pos == 85) {
        return;
    }
    p1pos++
    document.getElementById("player1").style.marginTop = `${p1pos}vh`
}

const player1MoveDownSetting = () => {
    if(timer) return;
    timer= setInterval(player1MoveDown, sensitivity);
}

const player1MoveUpSetting = () => {
    if(timer) return;
    timer= setInterval(player1MoveUp, sensitivity);
}
  
const playerStop = () => {
    clearInterval(timer);
    timer= null;
}

const player2Stop = () => {
    clearInterval(stimer);
    stimer = null;
}

document.addEventListener("keydown", function(event){
    if (event.key.toLowerCase() == "s") {
        player1MoveDownSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.key == "s") {
                playerStop();
            }
        })
    }
    if (event.key.toLowerCase() == "w") {
        player1MoveUpSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.key == "w") {
                playerStop();
            }
        })
    }
    if (event.keyCode == "40") {
        player2MoveDownSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.keyCode == "40") {
                player2Stop();
            }
        })
    }
    if (event.keyCode == "38") {
        player2MoveUpSetting();
        document.addEventListener("keyup", function(sec){
            if (sec.keyCode == "38") {
                player2Stop();
            }
        })
    }
})

document.addEventListener("keyup", function(event) {
    if (event.keyCode == "27") {
        closeOptions();
    }
    if (event.key.toLowerCase() == "p") {
        displayOptions();
    }
})

document.getElementById("sensRange").addEventListener("change", function(){
    let temporary = 6 - document.getElementById("sensRange").value;
    sensitivity = temporary * 5;
})
