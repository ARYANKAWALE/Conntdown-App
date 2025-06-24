const DEFAULT_END_DATE = "24 june 2025 19:00:00";
let endDate = new Date(DEFAULT_END_DATE).getTime();
let startDate = new Date().getTime();
let intervalId;

function pad(num) {
  return num.toString().padStart(2, "0");
}

function updateCountdown() {
  const curruntDate = new Date().getTime();
  const distanceCovered = curruntDate - startDate;
  const distancePending = endDate - curruntDate;

  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const oneHourInMillis = 60 * 60 * 1000;
  const oneMinuteInMillis = 60 * 1000;
  const oneSecondInMillis = 1000;

  let days = 0, hours = 0, minutes = 0, seconds = 0;
  if (distancePending > 0) {
    days = Math.floor(distancePending / oneDayInMillis);
    hours = Math.floor((distancePending % oneDayInMillis) / oneHourInMillis);
    minutes = Math.floor((distancePending % oneHourInMillis) / oneMinuteInMillis);
    seconds = Math.floor((distancePending % oneMinuteInMillis) / oneSecondInMillis);
  }

  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);

  // Progress bar
  const totalDistance = endDate - startDate;
  let percentageDistance = (distanceCovered / totalDistance) * 100;
  percentageDistance = Math.max(0, Math.min(100, percentageDistance));
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = percentageDistance + "%";
  document.getElementById("progress-label").textContent = `${percentageDistance.toFixed(1)}%`;

  if (distancePending < 0) {
    clearInterval(intervalId);
    document.getElementById("countdown").innerHTML = `<span class='text-3xl font-bold text-green-400'>EXPIRED</span>`;
    progressBar.style.width = "100%";
    progressBar.className = "bg-gradient-to-r from-red-400 to-pink-500 h-full rounded-full transition-all duration-500";
    document.getElementById("progress-label").textContent = "100%";
  }
}

function startCountdown() {
  startDate = new Date().getTime();
  endDate = new Date(DEFAULT_END_DATE).getTime();
  document.getElementById("progress-bar").className = "bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500";
  document.getElementById("countdown").innerHTML = `
    <div class="flex flex-wrap justify-center gap-6 mb-8">
      <div class="flex flex-col items-center bg-blue-100 rounded-lg shadow-md p-6 min-w-[90px] transition-transform hover:scale-105">
        <span id="days" class="text-blue-600 text-4xl font-mono font-bold">00</span>
        <span class="text-blue-700 mt-2 font-semibold uppercase text-xs tracking-wider">Days</span>
      </div>
      <div class="flex flex-col items-center bg-green-100 rounded-lg shadow-md p-6 min-w-[90px] transition-transform hover:scale-105">
        <span id="hours" class="text-green-600 text-4xl font-mono font-bold">00</span>
        <span class="text-green-700 mt-2 font-semibold uppercase text-xs tracking-wider">Hours</span>
      </div>
      <div class="flex flex-col items-center bg-yellow-100 rounded-lg shadow-md p-6 min-w-[90px] transition-transform hover:scale-105">
        <span id="minutes" class="text-yellow-600 text-4xl font-mono font-bold">00</span>
        <span class="text-yellow-700 mt-2 font-semibold uppercase text-xs tracking-wider">Minutes</span>
      </div>
      <div class="flex flex-col items-center bg-red-100 rounded-lg shadow-md p-6 min-w-[90px] transition-transform hover:scale-105">
        <span id="seconds" class="text-red-600 text-4xl font-mono font-bold">00</span>
        <span class="text-red-700 mt-2 font-semibold uppercase text-xs tracking-wider">Seconds</span>
      </div>
    </div>
  `;
  updateCountdown();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(updateCountdown, 1000);
}

document.getElementById("reset-btn").addEventListener("click", startCountdown);

// Initial start
startCountdown();
