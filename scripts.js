import metronome from "./metronome.js";

let count = 1;
let bpm = 120;
const time = "time";
const opened = "col";
const closed = "active col";

const click = new Audio("./sounds/metro.wav");
const click2 = new Audio("./sounds/metro2.wav");

function openLast() {
    if (count == 16) count = 0;
        document.getElementById(time + count.toString()).setAttribute("class", opened);
}

function close() {
    if (count == 16) count = 0;
        document.getElementById(time + count.toString()).setAttribute("class", closed);
}


$(document).on("click", "button", function(){
    if($(this).hasClass("play")) {
        metro.start();
        $(this).removeClass("play")
        $(this).addClass("pause")
    }
    else if($(this).hasClass("pause")) {
        metro.stop();
        $(this).removeClass("pause")
        $(this).addClass("play")
    }
})

$(document).ready(function() { 
    $("#times").on("click", "li", function() {
        openLast();
        count = this.value;
        close();
    });
});

function updateMetronome() {
    metro.timeInterval = 60000 / bpm;
}

function step() {
    if(count == 1) {
        click.play();
        click.currentTime = 0;
    }
    else if(count % 4 == 1) {
        click2.play();
        click2.currentTime = 0;
    }
    if(count < 16) {
        openLast();
        count++;
        close();
    }
    else {
        openLast();
        count = 1;
        close();
    }
}

const metro = new metronome(step, 15000 / bpm);