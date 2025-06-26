let endDate;
let startDate = new Date().getTime();
let intervalId;

// Check if there's a stored date from the date picker
function getEndDate() {
    const storedDate = localStorage.getItem('countdownEndDate');
    if (storedDate) {
        return new Date(storedDate).getTime();
    }
    // If no date is set, redirect to date picker
    window.location.href = 'date-picker.html';
    return null;
}

// Format date for display
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Initialize endDate
endDate = getEndDate();

function pad(num) {
  return num.toString().padStart(2, "0");
}

function updateCountdown() {
  const currentDate = new Date().getTime();
  const distanceCovered = currentDate - startDate;
  const distancePending = endDate - currentDate;

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

  // Progress bar with improved calculation
  const totalDistance = endDate - startDate;
  let percentageDistance = (distanceCovered / totalDistance) * 100;
  percentageDistance = Math.max(0, Math.min(100, percentageDistance));
  
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = percentageDistance + "%";
  document.getElementById("progress-label").textContent = `${percentageDistance.toFixed(1)}%`;

  // Update progress bar color based on percentage
  if (percentageDistance < 25) {
    progressBar.className = "bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500";
  } else if (percentageDistance < 50) {
    progressBar.className = "bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-all duration-500";
  } else if (percentageDistance < 75) {
    progressBar.className = "bg-gradient-to-r from-purple-400 to-pink-500 h-full rounded-full transition-all duration-500";
  } else {
    progressBar.className = "bg-gradient-to-r from-pink-400 to-red-500 h-full rounded-full transition-all duration-500";
  }

  if (distancePending < 0) {
    clearInterval(intervalId);
    document.getElementById("countdown").innerHTML = `
      <div class="text-center">
        <span class='text-4xl font-bold text-green-400 block mb-4'>🎉 COUNTDOWN COMPLETE! 🎉</span>
        <span class='text-lg text-gray-300'>Target reached on ${formatDate(endDate)}</span>
      </div>
    `;
    progressBar.style.width = "100%";
    progressBar.className = "bg-gradient-to-r from-green-400 to-yellow-400 h-full rounded-full transition-all duration-500";
    document.getElementById("progress-label").textContent = "100%";
  }
}

function startCountdown() {
  startDate = new Date().getTime();
  endDate = getEndDate(); // Get the current end date (either stored or redirect to picker)
  if (!endDate) return; // Don't proceed if no date is set
  
  // Update page title with countdown info
  const targetDate = formatDate(endDate);
  document.title = `Countdown to ${targetDate}`;
  
  document.getElementById("progress-bar").className = "bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500";
  document.getElementById("countdown").innerHTML = `
    <div class="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div class="flex flex-col items-center bg-blue-100 rounded-lg shadow-md p-3 sm:p-6 min-w-[70px] sm:min-w-[90px] transition-transform hover:scale-105">
        <span id="days" class="text-blue-600 text-2xl sm:text-4xl font-bold">00</span>
        <span class="text-blue-700 mt-1 sm:mt-2 font-semibold uppercase text-xs tracking-wider">Days</span>
      </div>
      <div class="flex flex-col items-center bg-green-100 rounded-lg shadow-md p-3 sm:p-6 min-w-[70px] sm:min-w-[90px] transition-transform hover:scale-105">
        <span id="hours" class="text-green-600 text-2xl sm:text-4xl font-bold">00</span>
        <span class="text-green-700 mt-1 sm:mt-2 font-semibold uppercase text-xs tracking-wider">Hours</span>
      </div>
      <div class="flex flex-col items-center bg-yellow-100 rounded-lg shadow-md p-3 sm:p-6 min-w-[70px] sm:min-w-[90px] transition-transform hover:scale-105">
        <span id="minutes" class="text-yellow-600 text-2xl sm:text-4xl font-bold">00</span>
        <span class="text-yellow-700 mt-1 sm:mt-2 font-semibold uppercase text-xs tracking-wider">Minutes</span>
      </div>
      <div class="flex flex-col items-center bg-red-100 rounded-lg shadow-md p-3 sm:p-6 min-w-[70px] sm:min-w-[90px] transition-transform hover:scale-105">
        <span id="seconds" class="text-red-600 text-2xl sm:text-4xl font-bold">00</span>
        <span class="text-red-700 mt-1 sm:mt-2 font-semibold uppercase text-xs tracking-wider">Seconds</span>
      </div>
    </div>
  `;
  updateCountdown();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(updateCountdown, 1000);
}

// Add event listener for Set Date button
document.getElementById("set-date-btn").addEventListener("click", function() {
    window.location.href = 'date-picker.html';
});

// Initial start
startCountdown();
