// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// const submitBtn = document.querySelector('.fieldset-button');
// const inputdelay = document.querySelector('.input-label');
// const inputFulfilled = document.querySelector('.js-fulfilled');
// const inputRejected = document.querySelector('.js-rejected');
const form = document.querySelector('.form-snackbar');

function createPromise(value, isActive, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isActive) {
                resolve(value);
            } else {
                reject(value);}
            }, delay);
    });
    return promise;
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const delay = e.target.elements.delay.value;
    const isActive = e.target.elements.state.value === 'fulfilled';

    const promise = createPromise(delay, isActive, delay);

    promise

        .then((result) => iziToast.success({
            title: 'OK', message: `Fulfilled promise in ${result}ms`,
            width: 302,
            titleColor: 'white',
            messageColor: 'white',
            image: '../img/bi_check2-circle.svg',
            position: 'topRight',
            icon: '',
            imageWidth: 24,
            backgroundColor: 'rgb(89, 161, 13)'
        }));
    
        .catch((error) => iziToast.error({
            title: 'Error',
            message: `Rejected promise in  ${error}ms`,
            backgroundColor: 'rgb(239, 64, 64)',
            titleColor: 'white',
            messageColor: 'white',
            image: '../img/bi_x-octagon.svg',
            position: 'topRight',
            icon: '',
            imageWidth: 24,
        }));



})