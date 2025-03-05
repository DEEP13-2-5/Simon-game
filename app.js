let gameSeq = [];
let userSeq = [];

let btns = ["pink", "orange", "green", "purple"];
let started = false;
let level = 0;
let highestLevel = 0; // Variable to store the highest level
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelup();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setInterval(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setInterval(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if (level > highestLevel) {
            highestLevel = level; // Update highest level if current level is greater
        }
        h2.innerHTML = `Game over! Score was <b>${level}</b> <br>Press any key to start. <br>Highest score is <b>${highestLevel}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 100);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}



