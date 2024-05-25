'use strict';

// add event on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

const loadingElement = document.querySelector("[data-loading]")

window.addEventListener("load", function() {
    loadingElement.classList.add("loaded");
    this.document.body.classList.remove("active");
})

// mobile nav toggle
const [navTogglers, navLinks, navbar, overlay] = [
    document.querySelectorAll("[data-nav-toggler]"),
    document.querySelectorAll("[data-nav-link]"),
    document.querySelectorAll("[data-navbar]"),
    document.querySelectorAll("[data-overlay]")
];

const toggleNav = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}

addEventOnElements(navLinks, "clicks", closeNav);

// header
const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
    if (window.scrollY > 50) {
        header.classList.add("active");
    }
    else {
        header.classList.remove("active");
    }
}

window.addEventListener("scroll", activeElementOnScroll);

// text animation
const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function() {
    for (let i=-0; i<letterBoxes.length; i++) {
        //set initial animation delay
        let letterAnimationDelay = 0;
        //get all cars from curr letter box
        const letters = letterBoxes[i].textContent.trim();
        //remove all char from curr letter box
        letterBoxes[i].textContent = "";

        //loop through all letters
        for (let j=0; j<letters.length; j++) {
            //create a span
            const span = document.createElement("span");
            //set animation delay on span
            span.style.animationDelay = `${letterAnimationDelay}s`;
            //set the "in" class on the span if curr letter box is active
            //otherwise class is "out"
            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            }
            else {
                span.classList.add("out");
            }
            //pass curr letter into span
            span.textContent = letters[j];
            //add space class on span, when curr letter contain space
            if (letters[j] === " ") span.classList.add("space");
            //pass the span on current letter box
            letterBoxes[i].appendChild(span);
            //skip letterAnimationDelay when loop is in the last index
            if (j >= letters.length - 1) break;
            // otherwise update
            letterAnimationDelay += 0.05;
        }

        //get total delay of active letter box
        if (i === activeLetterBoxIndex) {
            totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }
        // add active class on last active letter box
        if (i === lastActiveLetterBoxIndex) {
            letterBoxes[i].classList.add("active");
        }
        else {
            letterBoxes[i].classList.remove("active");
        }
    }
    setTimeout (function () {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;
        // update activeLetterBoxIndex based on total letter boxes
        activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

        setLetterEffect();
    }, (totalLetterBoxDelay*1000) + 3000);
}

//call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);