!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=(e,t)=>{const n=document.querySelectorAll(t),o=document.querySelector(e);n.forEach(e=>{e.addEventListener("click",()=>{o.style.display="block"})}),o.addEventListener("click",e=>{let t=e.target;t.classList.contains("popup-close")?o.style.display="none":(t=t.closest(".popup-content"),t||(o.style.display="none"))})};var c=(e,t)=>{const n=document.querySelector(e),o=document.createElement("div");o.style.cssText="font-size: 2rem;\n                                    color: red;";n.addEventListener("submit",e=>{e.preventDefault(),n.appendChild(o),o.textContent="Идёт отправка...";const c=new FormData(n);let l={};c.forEach((e,t)=>{l[t]=e}),Object.assign(l,t),(e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(l).then(e=>{if(200!==e.status)throw new Error("status network not 200");o.textContent="Спасибо! Мы скоро с Вами свяжемся!",n.reset()}).catch(e=>{o.textContent="Ошибка...",console.log(e),n.reset()}).finally(()=>{setTimeout(()=>{o.remove()},3e3)})}),n.querySelectorAll("input").forEach(e=>{e.addEventListener("input",()=>{"text"===e.type&&e.classList.contains("phone-user")?e.value=e.value.replace(/[^\d]/g,""):e.value=e.value.replace(/[^а-яА-Я ]/g,"")})})};var l=e=>{const t=document.getElementById(e),n=t.querySelectorAll(".panel-heading"),o=t.querySelectorAll(".panel-collapse"),c=t.querySelectorAll(".construct-btn"),l=e=>{for(let t=0;t<o.length;t++)e===t?o[t].classList.add("in"):o[t].classList.remove("in")};t.addEventListener("click",e=>{e.preventDefault();let t=e.target;t&&(n.forEach((e,n)=>{e===t.closest(".panel-heading")&&l(n)}),c.forEach((e,n)=>{e===t.closest(".construct-btn")&&3!==n&&l(n+1)}))})};var r=()=>{const e=document.getElementById("accordion"),t=document.querySelectorAll(".onoffswitch-label"),n=document.querySelectorAll(".onoffswitch-checkbox"),l=document.getElementById("second-section"),r=document.querySelectorAll(".form-control"),s=e.querySelector('input[type="text"]'),a=document.getElementById("calc-result");e.addEventListener("click",e=>{const o=e.target;t.forEach((e,t)=>{e===o.closest(".onoffswitch-label")&&(n[t].checked?n[t].removeAttribute("checked"):n[t].setAttribute("checked",!0)),n[0].checked?l.style.display="none":l.style.display="block"}),(()=>{let e=1e4;const t=r[0].options[r[0].selectedIndex].textContent,o=r[1].options[r[1].selectedIndex].textContent,c=r[2].options[r[2].selectedIndex].textContent,l=r[3].options[r[3].selectedIndex].textContent;n[0].checked?("2 метра"===t&&(e*=1.2),"2 штуки"===o?e*=1.3:"3 штуки"===o&&(e*=1.5),n[1].checked&&(e+=1e3)):(e=15e3,"2 метра"===t&&(e*=1.2),"2 штуки"===o?e*=1.3:"3 штуки"===o&&(e*=1.5),"2 метра"===c&&(e*=1.2),"2 штуки"===l?e*=1.3:"3 штуки"===l&&(e*=1.5),n[1].checked&&(e+=2e3)),a.value=e})()}),o(".popup-discount","button.call-btn"),document.querySelector("button.call-btn").addEventListener("mousedown",()=>{let e={"Тип септика":n[0].hasAttribute("checked")?"однокамерный":"двухкамерный","Диаметр первого колодца":r[0].options[r[0].selectedIndex].textContent,"Количество колец первого колодца":r[1].options[r[1].selectedIndex].textContent,"Диаметр второго колодца":r[2].options[r[2].selectedIndex].textContent,"Количество колец второго колодца":r[3].options[r[3].selectedIndex].textContent,"Наличие днища колодца":n[1].hasAttribute("checked")?"с днищем":"без днища","Расстояние от септика до дома":s.value,"Примерная стоимость":a.value};c(".capture-form-calc",e)})};var s=()=>{const e=document.querySelector(".add-sentence-btn"),t=document.querySelector(".sentence").querySelectorAll(".col-xs-12");e.addEventListener("click",()=>{t.forEach(e=>{e.classList.contains("visible-sm-block")?e.classList.remove("visible-sm-block"):e.classList.contains("hidden")&&e.classList.remove("hidden")}),e.style.display="none"})};var a=()=>{o(".popup-consultation",".consultation-btn");const e=document.querySelector(".consultation-btn"),t=document.getElementById("sss");e.addEventListener("click",e=>{e.preventDefault();let n={question:t.value};c(".capture-form-consultation",n)}),t.addEventListener("input",()=>{t.value=t.value.replace(/[a-zA-Z\d]/g,"")})};o(".popup-call",'a[class="call-btn"]'),c(".capture-form-call"),o(".popup-discount",".discount-btn"),c(".capture-form-calc"),o(".popup-check",".check-btn"),c(".capture-form-check"),c(".capture-form"),c(".main-form"),l("accordion"),l("accordion-two"),r(),s(),a()}]);