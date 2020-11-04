import css from './css/style.css';

import template from "./template/templateList.hbs";
import servis from './apiService.js';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

import * as basicLightbox from 'basiclightbox'
// import 'basiclightbox/dist/basicLightbox.min.css'

const button=document.querySelector('.button')
const input = document.querySelector('.input')
const ul = document.querySelector('.gallery')
let page = 1;

const inputHeder = function () {
   servis(input.value, page)  
    .then((data) => { 
      if (data.hits.length >= 1) {
        data.hits.forEach((el) => {
          ul.insertAdjacentHTML('beforeend', template(el))
        });
      } else {
        info('ENTER ANOTHER REQUEST!')
        ul.innerHTML = "";
      }
    })
  ul.innerHTML = "";
}

let a = 100;
let more = function () {
           window.scrollTo({
           top:document.documentElement.offsetHeight,
           behavior: 'smooth'
  })                   
  servis(input.value, page += 1)
    .then((data) => {
      data.hits.forEach((el) => { 
        document.documentElement > a + 100 
        ul.insertAdjacentHTML('beforeend', template(el))
      })
   })
    
}

const  scrolling = function () { 
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 1) {
    more();
    const fn = function () { 
      window.scrollBy(0,600)
    }
    setTimeout(fn, 80)
  }
}
 
button.addEventListener('click', more)
window.addEventListener('scroll', scrolling)
input.addEventListener('change', inputHeder)

let modal;
document.querySelector('.gallery').onclick = (e) => {
// console.log(e);
  if (e.target.nodeName !== 'IMG') { 
return
  }
  
  modal = basicLightbox.create(`
<img width="1400" height="900" src="${e.target.dataset.bigimg}">
`);
  modal.show()
}

document.onkeyup = function (event) {
  // console.log(event.key);
  if (event.key === 'Escape') {
    modal.close()
    //  console.log("ESKAPE");
    }
}