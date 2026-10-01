const searchInput = document.querySelector("#input-search");
const searchButton = document.querySelector(".magnif");


if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {

if (event.key === "Enter") {

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        return;
    }

    window.location.href =
        `search-results.html?search=${encodeURIComponent(searchText)}`;
}
    });
}


if (searchButton) {
    searchButton.addEventListener("click", function () {

        const searchText = searchInput.value.trim();

        if (searchText === "") {
            return;
        }

        window.location.href =
            `search-results.html?search=${encodeURIComponent(searchText)}`;

    });
}


