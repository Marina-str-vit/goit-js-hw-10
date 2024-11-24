import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

/**=========================== */
// let userSelectedDate;

// const timerWithFlatpickr = new Flatpickr('#datetime-picker', {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// });

// const timerWithIziToast = new IziToast;
/**===================================== */

const objectEl = {
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
  inputTimer: document.querySelector('#datetime-picker'),
};

objectEl.btnStart.inactive = true;
objectEl.btnStart.classList.add('timer-button__inactive');
objectEl.inputTimer.classList.add('timer-input__inactive');

let userSelectedDate = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] > new Date()) {
//       userSelectedDate = selectedDates[0];
//       objectEl.btnStart.inactive = false;
//       objectEl.btnStart.classList.add('timer-button__normal');
//       objectEl.inputTimer.classList.add('timer-input__normal');
//     } else {
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//         position: 'topRight',
//       });
//       objectEl.btnStart.classList.add('timer-button__inactive');
//       objectEl.inputTimer.classList.add('timer-input__inactive');
//     }
//   },
// };

const options = new Flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      userSelectedDate = selectedDates[0];
      objectEl.btnStart.inactive = false;
      objectEl.btnStart.classList.add('timer-button__normal');
      objectEl.inputTimer.classList.add('timer-input__normal');
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      objectEl.btnStart.classList.add('timer-button__inactive');
      objectEl.inputTimer.classList.add('timer-input__inactive');
    }
  },
});
console.log(Flatpickr);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

objectEl.btnStart.addEventListener('click', () => {
  if (userSelectedDate) {
    const nowDate = new Date();
    
    const diff = userSelectedDate - nowDate; 

    objectEl.btnStart.inactive = true;
    objectEl.btnStart.classList.remove('timer-button__normal');
    objectEl.inputTimer.classList.remove('timer-input__normal');
    objectEl.btnStart.classList.add('timer-button__inactive');
    objectEl.inputTimer.classList.add('timer-input__inactive');
    objectEl.inputTimer.inactive = true;

    const timerInterval = setInterval(() => {
      const remainingTime = diff - (new Date() - nowDate);
      
      const timeParts = convertMs(remainingTime);      

      const formattedTimeParts = Object.fromEntries(
        Object.entries(timeParts).map(([key, value]) => [
          key,
          addLeadingZero(value),
        ])
      );

      objectEl.days.textContent = formattedTimeParts.days;
      objectEl.hours.textContent = formattedTimeParts.hours;
      objectEl.minutes.textContent = formattedTimeParts.minutes;
      objectEl.seconds.textContent = formattedTimeParts.seconds;

      if (remainingTime <= 0) {
        objectEl.days.textContent = addLeadingZero(0);
        objectEl.hours.textContent = addLeadingZero(0);
        objectEl.minutes.textContent = addLeadingZero(0);
        objectEl.seconds.textContent = addLeadingZero(0);
        clearInterval(timerInterval);
        objectEl.btnStart.inactive = false;
        objectEl.inputTimer.inactive = false;
      }
    }, 1000);
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Date not selected!',
      position: 'topRight',
    });
  }
});
