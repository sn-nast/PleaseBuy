// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const canteenContainers = [...document.querySelectorAll('.deposit-order-slider')];

const nxtBtn = [...document.querySelectorAll('.nxt-btn-container')];
const preBtn = [...document.querySelectorAll('.pre-btn-container')];

canteenContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => { item.scrollLeft += containerWidth; })
    preBtn[i].addEventListener('click', () => { item.scrollLeft -= containerWidth; })
    console.log();
})

