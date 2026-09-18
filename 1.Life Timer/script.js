const dobInput = document.getElementById("dob-input");
const addBtn = document.getElementById("add-btn");
const initialWrapper = document.getElementById("initial-wrapper");
const timerWrapper = document.getElementById("timer-wrapper");

const yearEl = document.getElementById("years");
const monthEl = document.getElementById("months");
const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

let dateOfBirth;

const updateTimer = () => {
  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;

  if (dateDiff < 0) return;

  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
  const day = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30);
  const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((dateDiff / (1000 * 60)) % 60);
  const second = Math.floor((dateDiff / 1000) % 60);

  yearEl.innerHTML = year < 10 ? "0" + year : year;
  monthEl.innerHTML = month < 10 ? "0" + month : month;
  dayEl.innerHTML = day < 10 ? "0" + day : day;
  hourEl.innerHTML = hour < 10 ? "0" + hour : hour;
  minuteEl.innerHTML = minute < 10 ? "0" + minute : minute;
  secondEl.innerHTML = second < 10 ? "0" + second : second;
};

const setDOB = () => {
  const dateString = dobInput.value;
  dateOfBirth = dateString ? new Date(dateString) : null;

  if (dateOfBirth) {
    initialWrapper.classList.add("hidden");
    timerWrapper.classList.remove("hidden");
    setInterval(updateTimer, 1000);
  } else {
    alert("Please select a valid date and time.");
  }
};

addBtn.addEventListener("click", setDOB);