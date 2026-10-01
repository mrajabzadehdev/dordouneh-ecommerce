
const slides2 = document.querySelectorAll(".slide2");

const dots = document.querySelectorAll(".dot");

const prevButton =
    document.querySelector(".prev");

const nextButton =
    document.querySelector(".next");

const slider2 =
    document.querySelector(".slider2");

const progressBar =
    document.querySelector(".progress-bar");



let currentSlide = 0;

let autoPlay;

const slideDuration = 5000;

function showSlide(index) {


    if (index >= slides2.length) {

        currentSlide = 0;

    }


    else if (index < 0) {

        currentSlide =
            slides2.length - 1;

    }

    else {

        currentSlide = index;

    }




    slides2.forEach((slide2) => {

        slide2.classList.remove("active");

    });


 

    dots.forEach((dot) => {

        dot.classList.remove("active");

    });


 

    slides2[currentSlide]
        .classList
        .add("active");




    dots[currentSlide]
        .classList
        .add("active");


    restartProgressBar();
}


function nextSlide() {

    showSlide(
        currentSlide + 1
    );

}



function previousSlide() {

    showSlide(
        currentSlide - 1
    );

}



function startAutoPlay() {

    clearInterval(autoPlay);

    autoPlay = setInterval(() => {

        nextSlide();

    }, slideDuration);

}


function stopAutoPlay() {

    clearInterval(autoPlay);

}




function restartAutoPlay() {

    stopAutoPlay();

    startAutoPlay();

}



function restartProgressBar() {

   
    progressBar.style.animation = "none";




    progressBar.offsetHeight;




    progressBar.style.animation =
        `progressAnimation ${slideDuration}ms linear forwards`;

}



nextButton.addEventListener(
    "click",
    () => {

        nextSlide();

        restartAutoPlay();

    }
);



prevButton.addEventListener(
    "click",
    () => {

        previousSlide();

        restartAutoPlay();

    }
);



dots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

                restartAutoPlay();

            }
        );

    }
);

slider2.addEventListener(
    "mouseenter",
    () => {

        stopAutoPlay();

        progressBar.style.animationPlayState =
            "paused";

    }
);



slider2.addEventListener(
    "mouseleave",
    () => {

        startAutoPlay();

        progressBar.style.animationPlayState =
            "running";

    }
);



showSlide(0);

startAutoPlay();



// const slides2 = document.querySelectorAll(".slide2");
// const dots = document.querySelectorAll(".dot");

// const prevButton = document.querySelector(".prev");
// const nextButton = document.querySelector(".next");

// let currentSlide = 0;

// function showSlide(index) {

//     if (index >= slides2.length) {
//         index = 0;
//     }

//     if (index < 0) {
//         index = slides2.length - 1;
//     }

//     currentSlide = index;

//     slides2.forEach(function(slide) {
//         slide.classList.remove("active");
//     });

//     dots.forEach(function(dot) {
//         dot.classList.remove("active");
//     });

//     slides2[currentSlide].classList.add("active");

//     dots[currentSlide].classList.add("active");
// }


// nextButton.addEventListener("click", function() {

//     showSlide(currentSlide + 1);

// });


// prevButton.addEventListener("click", function() {

//     showSlide(currentSlide - 1);

// });


// dots.forEach(function(dot, index) {

//     dot.addEventListener("click", function() {

//         showSlide(index);

//     });

// });


// showSlide(0);