// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import okMessage from '../img/bi_check2-circle.svg';
import closeMessage from '../img/bi_x-octagon.svg';
const form = document.querySelector('.form');


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
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const delay = Number(e.target.elements.delay.value);
    const isActive = e.target.elements.state.value === 'fulfilled';

    const promise = createPromise(delay, isActive, delay);

    promise.then((result) => iziToast.success({
            title: 'OK', message: `Fulfilled promise in ${result}ms`,
            width: 302,
            titleColor: 'white',
        messageColor: 'white',
            
            iconUrl: okMessage,
            position: 'topRight',
            // icon: '',
            imageWidth: 24,
        backgroundColor: 'rgb(89, 161, 13)',
    })).catch((error) => iziToast.error({
            title: 'Error',
            message: `Rejected promise in  ${error}ms`,
            backgroundColor: 'rgb(239, 64, 64)',
            titleColor: 'white',
        messageColor: 'white',
            iconUrl: closeMessage,
            position: 'topRight',
            // icon: '',
            imageWidth: 24,
        }));



});