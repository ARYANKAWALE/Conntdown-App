// Set minimum date to today and default to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('countdown-date').min = today;
document.getElementById('countdown-date').value = today;

// Set default time to current time + 1 hour
const now = new Date();
now.setHours(now.getHours() + 1);
const defaultTime = now.toTimeString().slice(0, 5);
document.getElementById('countdown-time').value = defaultTime;

// Add real-time validation
function validateDateTime() {
    const date = document.getElementById('countdown-date').value;
    const time = document.getElementById('countdown-time').value;
    const submitBtn = document.querySelector('button[type="submit"]');
    
    if (date && time) {
        const selectedDateTime = new Date(`${date} ${time}:00`);
        const now = new Date();
        
        if (selectedDateTime <= now) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Please select future date/time';
            submitBtn.className = 'bg-gray-500 text-gray-300 font-bold py-3 px-8 rounded-lg shadow-lg cursor-not-allowed';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Start Countdown';
            submitBtn.className = 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105';
        }
    }
}

// Add event listeners for real-time validation
document.getElementById('countdown-date').addEventListener('change', validateDateTime);
document.getElementById('countdown-time').addEventListener('change', validateDateTime);

// Initial validation
validateDateTime();

// Handle form submission
document.getElementById('date-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('countdown-date').value;
    const time = document.getElementById('countdown-time').value;
    
    if (!date || !time) {
        alert('Please select both date and time');
        return;
    }
    
    const selectedDateTime = new Date(`${date} ${time}:00`);
    const now = new Date();
    
    if (selectedDateTime <= now) {
        alert('Please select a future date and time');
        return;
    }
    
    // Combine date and time
    const dateTimeString = `${date} ${time}:00`;
    
    // Store in localStorage
    localStorage.setItem('countdownEndDate', dateTimeString);
    
    // Show success message before redirecting
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Starting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}); 