// ================================
// Advertisement Video
// ================================

const advertisementCards = document.querySelectorAll(".adver1");

const videoModal = document.querySelector("#videoModal");
const advertisementVideo = document.querySelector("#advertisementVideo");
const closeVideo = document.querySelector("#closeVideo");


advertisementCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const videoName = card.dataset.video;

        advertisementVideo.src =
            "/E-commerce-New/videos/" + videoName;

        videoModal.style.display = "flex";

        advertisementVideo.play();

    });

});


closeVideo.addEventListener("click", function () {

    advertisementVideo.pause();

    advertisementVideo.currentTime = 0;

    advertisementVideo.src = "";

    videoModal.style.display = "none";

});



// ================================
// Get Advertisement Video Duration
// ================================

advertisementCards.forEach(function (card) {

    const videoName = card.dataset.video;

    const tempVideo = document.createElement("video");

    tempVideo.src =
        "/E-commerce-New/videos/" + videoName;

    tempVideo.addEventListener("loadedmetadata", function () {

        const duration = tempVideo.duration;

        const minutes = Math.floor(duration / 60);

        const seconds = Math.floor(duration % 60);

        const formattedSeconds =
            seconds.toString().padStart(2, "0");

        const timeElement =
            card.querySelector(".vidio-time");

        timeElement.textContent =
            minutes+ "'" + ":" + formattedSeconds + '"';

    });

});