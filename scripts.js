import metronome from "./metronome.js";

let count = 1;
let bpm = 60;
let metronomeSound = true;
const bpmInput = document.querySelector(".bpm");
const bpmUp = document.querySelector(".up");
const bpmDown = document.querySelector(".down");
const metronomeToggle = document.querySelector(".metroSound");
const time = "time";
const stepOff = "col";
const stepOn = "active col";

const click = new Audio("./sounds/metro.wav");
const click2 = new Audio("./sounds/metro2.wav");

function turnOff() {
    if (count == 16) count = 0;
        document.getElementById(time + count.toString()).setAttribute("class", stepOff);
}

function turnOn() {
    if (count == 16) count = 0;
        document.getElementById(time + count.toString()).setAttribute("class", stepOn);
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
        turnOff();
        count = this.value;
        turnOn();
        if(metro.running){
            metro.stop();
            metro.start();
        }
    });
});

bpmInput.addEventListener("blur", updateBPM);

bpmUp.addEventListener("click", function(){
    if(bpm < 300) bpm++;
    bpmInput.value = bpm;
    updateMetronome();
});

bpmDown.addEventListener("click", function(){
    if(bpm > 30) bpm--;
    bpmInput.value = bpm;
    updateMetronome();
});

metronomeToggle.addEventListener("input", function(){
    if(metronomeSound) metronomeSound = false;
    else metronomeSound = true;
})

function updateBPM() {
    let min = parseInt(bpmInput.min);
    let max = parseInt(bpmInput.max);
    let val = parseInt(bpmInput.value);
    if(!isNaN(val)) {
        if(val < min) bpm = min;
        else if(val > max) bpm = max;
        else bpm = val;
    }
    bpmInput.value = bpm
    updateMetronome();
}

function updateMetronome() {
    metro.timeInterval = 15000 / bpm;
}

function tick() {
    if(metronomeSound) {
        if(count == 1) {
            click.play();
            click.currentTime = 0;
        }
        else if(count % 4 == 1) {
            click2.play();
            click2.currentTime = 0;
        }
    }
}

function step() {
    if(count < 16) {
        turnOff();
        count++;
        turnOn();
    }
    else {
        turnOff();
        count = 1;
        turnOn();
    }
}

const metro = new metronome(tick, step, 15000 / bpm);