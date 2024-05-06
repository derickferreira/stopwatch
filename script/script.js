"use strict";
// selecting items
const stopWatch = document.querySelector(".stopwatch span");
const toggleBtn = document.querySelector("#toggle");
const resetBtn = document.querySelector("#reset");

let marks = [];
let timer = 0;
let intervalId = 0;

// functions
const formatTimer = (time) => {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const hundreths = time % 100;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundreths
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  if (intervalId) return;
  intervalId = setInterval(() => {
    timer += 1;
    stopWatch.textContent = formatTimer(timer);
  }, 10);
};

const pauseTimer = () => {
  clearInterval(intervalId);
  intervalId = 0;
};

const resetTimer = () => {
  clearInterval(intervalId);
  intervalId = 0;
  timer = 0;
  stopWatch.textContent = "00:00:00:00";
};

// events
toggleBtn.addEventListener("click", () => {
  if (intervalId === 0) {
    startTimer();
    toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    pauseTimer();
    toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
});
