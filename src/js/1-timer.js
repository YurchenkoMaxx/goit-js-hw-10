// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('.input-btn');
const userInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let userSelectedDate;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentDate = new Date();

        console.log(currentDate);
        console.log(userSelectedDate);

        
        if (userSelectedDate.getTime() <= currentDate.getTime()) {
            startBtn.disabled = true;
            iziToast.show({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
                backgroundColor: 'rgb(239, 64, 64)',
                image: '../img/bi_x-octagon.svg',
                imageWidth: 24,
                titleColor: 'white',
                messageColor: 'white',
                            });
        } else {
            startBtn.disabled = false;

        };
  },
};


flatpickr(userInput, options);

let intervalID;
startBtn.addEventListener('click', () => {

    startBtn.disabled = true;
            userInput.disabled = true;
    
clearInterval(intervalID);
    intervalID = setInterval(() => {
        const currentDate = new Date();
        const diff = userSelectedDate - currentDate;

         const { days, hours, minutes, seconds } = convertMs(diff);
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent= hours.toString().padStart(2, '0');
    minutesEl.textContent= minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        if (diff < 1000) {
            clearInterval(intervalID);
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            startBtn.disabled = false;
            userInput.disabled = false;
            return;
        }
            }, 1000);

});
    

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
};


