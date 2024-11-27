import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconResolve from '../img/snackbar/Group.png'
import iconReject from '../img/snackbar/Group_rej.png'

function handleSubmit(event) {
  event.preventDefault();

  const delay = parseInt(
    document.querySelector('input[name="delay"]').value,
    10
  )*1000;
  const state = document.querySelector('input[name="state"]:checked').value;

//визов функції очищення форми, ало не потрібно бо використала:  document.querySelector('.form').reset();
  // clearForm();

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        position: 'topRight',
        iconUrl: iconResolve,
        backgroundColor: '#59A10D',
        title: 'OK',
        titleColor: 'white',
        timeout: delay,
        messageColor: 'white',
        message: '✅ Fulfilled promise in ' + delay + 'ms',
      });
    })
    .catch(delay => {
      iziToast.error({
        position: 'topRight',
        iconUrl: iconReject,
        backgroundColor: '#EF4040',
        title: 'Error',
        titleColor: 'white',
        timeout: delay,
        messageColor: 'white',
        message: '❌ Rejected promise in ' + delay + 'ms',
      });
    });
  //для очищення форми!!
    document.querySelector('.form').reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
}
/**
 * це також для очищення форми, але більш громіздкий код, на томість використала вище:  document.querySelector('.form').reset();
 */
// function clearForm() {
//   document.querySelector('input[name="delay"]').value = '';
//   document.querySelectorAll('input[name="state"]').forEach(radio => {
//     radio.checked = false;
//   });
// }

document.querySelector('.form').addEventListener('submit', handleSubmit);

