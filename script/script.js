"use strict";
// selecting items
const stopWatch = document.querySelector(".stopwatch span");
const markContainer = document.querySelector("#mark_list");
const toggleBtn = document.querySelector("#toggle");
const resetBtn = document.querySelector("#reset");

const toggleListBtn = document.querySelector("#toggle_marklist");

const markBtn = document.querySelector("#mark");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal button");
modal.classList.add("hidden");
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

// mark
const addMarkToList = (markIndex, markTime) => {
  markContainer.innerHTML += `<p>Mark ${markIndex}: ${formatTimer(
    markTime
  )}</p>`;
};

const markTime = () => {
  marks.push(timer);
  addMarkToList(marks.length, timer);
  toggleListBtn.style.display = "block";
};

// events
toggleBtn.addEventListener("click", () => {
  if (intervalId === 0) {
    modal.classList.add("hidden");
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
  marks = [];
  markContainer.innerText = "";
  toggleListBtn.classList.add("hidden");
});

markBtn.addEventListener("click", () => {
  if (timer === 0) {
    modal.classList.remove("hidden");
    return;
  }
  markTime();
  toggleListBtn.classList.remove("hidden");
});

toggleListBtn.addEventListener("click", () => {
  markContainer.classList.toggle("hidden");
  if (markContainer.classList.contains("hidden")) {
    toggleListBtn.style.transform = "rotateX(180deg)";
  } else {
    toggleListBtn.style.transform = "rotate(0)";
  }
});

modalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
