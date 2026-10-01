/* =========================================================
   SEARCH RESULTS
   FINAL JAVASCRIPT
   SEARCH + CATEGORY + DISCOUNT + SORT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchInput =
        document.querySelector("#search-input");

    const clearSearch =
        document.querySelector("#clear-search");

    const searchButton =
        document.querySelector("#search-button");

    const resultsContainer =
        document.querySelector("#search-results");

    const noResults =
        document.querySelector("#no-results");

    const searchText =
        document.querySelector("#search-text");

    const resultsCount =
        document.querySelector("#results-count");

    const sortProducts =
        document.querySelector("#sort-products");


    /* =====================================================
       CART ICON
       نام cart به cartIcon تغییر کرده تا با products.js
       تداخل نداشته باشد.
    ===================================================== */

    const cartIcon =
        document.querySelector(".basket999");

    const cartCount =
        document.querySelector("#cart-count");


    /* =====================================================
       PRODUCTS
    ===================================================== */

    let allProducts = [];

    if (
        typeof products !== "undefined" &&
        Array.isArray(products)
    ) {

        allProducts =
            allProducts.concat(products);

    }


    if (
        typeof cardsnew !== "undefined" &&
        Array.isArray(cardsnew)
    ) {

        allProducts =
            allProducts.concat(cardsnew);

    }


    /* =====================================================
       PERSIAN NUMBER
    ===================================================== */

    function toPersianNumber(value) {

        return String(value).replace(
            /\d/g,
            function (digit) {

                return "۰۱۲۳۴۵۶۷۸۹"[digit];

            }
        );

    }


    /* =====================================================
       NUMBER CONVERTER
    ===================================================== */

    function toNumber(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return 0;

        }


        let stringValue =
            String(value)
                .trim()
                .replace(
                    /[۰-۹]/g,
                    function (digit) {

                        return "۰۱۲۳۴۵۶۷۸۹"
                            .indexOf(digit);

                    }
                )
                .replace(/,/g, ".");


        const numberValue =
            parseFloat(stringValue);


        return Number.isNaN(numberValue)
            ? 0
            : numberValue;

    }


    /* =====================================================
       GET URL PARAMETERS
    ===================================================== */

    function getUrlParameters() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        return {

            search:
                (
                    params.get("search") ||
                    ""
                )
                .trim()
                .toLowerCase(),


            category:
                (
                    params.get("category") ||
                    ""
                )
                .trim()
                .toLowerCase(),


            discount:
                (
                    params.get("discount") ||
                    ""
                )
                .trim()
                .toLowerCase(),


            /* =============================================
               NEW
               sort=bestselling
               sort=newest
            ============================================= */

            sort:
                (
                    params.get("sort") ||
                    ""
                )
                .trim()
                .toLowerCase()

        };

    }


    /* =====================================================
       GET SEARCH KEYWORD
    ===================================================== */

    function getSearchKeyword() {

        const params =
            getUrlParameters();


        return params.search;

    }


    /* =====================================================
       GET CATEGORY
    ===================================================== */

    function getCategory() {

        const params =
            getUrlParameters();


        return params.category;

    }


    /* =====================================================
       GET DISCOUNT
    ===================================================== */

    function getDiscount() {

        const params =
            getUrlParameters();


        return params.discount;

    }


    /* =====================================================
       GET URL SORT
    ===================================================== */

    function getUrlSort() {

        const params =
            getUrlParameters();


        return params.sort;

    }


    /* =====================================================
       SEARCH + CATEGORY + DISCOUNT PRODUCTS
    ===================================================== */

    function getSearchResults() {

        const keyword =
            getSearchKeyword()
                .toLowerCase();


        const category =
            getCategory()
                .toLowerCase();


        const discount =
            getDiscount()
                .toLowerCase();


        let results =
            [...allProducts];


        /* =================================================
           CATEGORY FILTER
        ================================================= */

        if (category) {

            results =
                results.filter(
                    function (product) {

                        const productCategory =
                            String(
                                product.category || ""
                            )
                            .trim()
                            .toLowerCase();


                        return (
                            productCategory ===
                            category
                        );

                    }
                );

        }


        /* =================================================
           SEARCH FILTER
        ================================================= */

        if (keyword) {

            results =
                results.filter(
                    function (product) {

                        const title =
                            String(
                                product.title || ""
                            )
                            .toLowerCase();


                        const productCategory =
                            String(
                                product.category || ""
                            )
                            .toLowerCase();


                        const describe =
                            String(
                                product.describe ||
                                ""
                            )
                            .toLowerCase();


                        return (

                            title.includes(keyword) ||

                            productCategory.includes(keyword) ||

                            describe.includes(keyword)

                        );

                    }
                );

        }


        /* =================================================
           DISCOUNT FILTER
        ================================================= */

        if (discount === "true") {

            results =
                results.filter(
                    function (product) {

                        return (
                            toNumber(
                                product.discount
                            ) > 0
                        );

                    }
                );

        }


        return results;

    }


    /* =====================================================
       SORT PRODUCTS
    ===================================================== */

    function sortResults(results) {

        const sorted =
            [...results];


        /*
         * اولویت اول:
         * sort موجود در URL
         *
         * مثال:
         * ?sort=bestselling
         * ?sort=newest
         *
         * اگر sort در URL نبود،
         * از SELECT استفاده می‌کنیم.
         */

        const urlSort =
            getUrlSort();


        let sortValue =
            urlSort;


        if (!sortValue && sortProducts) {

            sortValue =
                sortProducts.value;

        }


        /* =================================================
           SORT SWITCH
        ================================================= */

        switch (sortValue) {


            /* =============================================
               BEST SELLING
               بیشترین فروش ← کمترین فروش
            ============================================= */

            case "bestselling":

                sorted.sort(
                    function (a, b) {

                        return (
                            toNumber(
                                b.salesCount
                            ) -
                            toNumber(
                                a.salesCount
                            )
                        );

                    }
                );

                break;


            /* =============================================
               NEWEST
               جدیدترین ← قدیمی‌ترین
            ============================================= */

            case "newest":

                sorted.sort(
                    function (a, b) {

                        const dateA =
                            new Date(
                                a.createdAt || 0
                            ).getTime();


                        const dateB =
                            new Date(
                                b.createdAt || 0
                            ).getTime();


                        return (
                            dateB -
                            dateA
                        );

                    }
                );

                break;


            /* =============================================
               CHEAP
            ============================================= */

            case "cheap":

                sorted.sort(
                    function (a, b) {

                        return (
                            toNumber(a.price) -
                            toNumber(b.price)
                        );

                    }
                );

                break;


            /* =============================================
               EXPENSIVE
            ============================================= */

            case "expensive":

                sorted.sort(
                    function (a, b) {

                        return (
                            toNumber(b.price) -
                            toNumber(a.price)
                        );

                    }
                );

                break;


            /* =============================================
               RATING
            ============================================= */

            case "rating":

                sorted.sort(
                    function (a, b) {

                        return (
                            toNumber(b.rating) -
                            toNumber(a.rating)
                        );

                    }
                );

                break;


            /* =============================================
               DISCOUNT
            ============================================= */

            case "discount":

                sorted.sort(
                    function (a, b) {

                        return (
                            toNumber(b.discount) -
                            toNumber(a.discount)
                        );

                    }
                );

                break;


            /* =============================================
               DEFAULT
            ============================================= */

            case "default":

            default:

                break;

        }


        return sorted;

    }


    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    function formatPrice(price) {

        const number =
            toNumber(price);


        return toPersianNumber(
            number.toLocaleString("en-US")
        );

    }


    /* =====================================================
       DISPLAY SEARCH RESULTS
    ===================================================== */

    function displaySearchResults(results) {

        if (!resultsContainer) {

            return;

        }


        resultsContainer.innerHTML = "";


        /* ================================================
           COUNT
        ================================================= */

        if (resultsCount) {

            resultsCount.textContent =
                toPersianNumber(
                    results.length
                ) +
                " کالا";

        }


        /* ================================================
           NO RESULT
        ================================================= */

        if (results.length === 0) {

            resultsContainer.style.display =
                "none";


            if (noResults) {

                noResults.style.display =
                    "block";

            }


            return;

        }


        /* ================================================
           SHOW RESULTS
        ================================================= */

        resultsContainer.style.display =
            "grid";


        if (noResults) {

            noResults.style.display =
                "none";

        }


        /* ================================================
           CARDS
        ================================================= */

        results.forEach(
            function (product) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "search-product-card";


                /* ========================================
                   IMAGE
                ======================================== */

                const image =
                    document.createElement(
                        "div"
                    );


                image.className =
                    "search-product-image";


                image.innerHTML = `

                    <img
                        src="${product.image || ""}"
                        alt="${product.title || "محصول"}"
                        loading="lazy"
                    >

                `;


                image.addEventListener(
                    "click",
                    function () {

                        if (
                            product.id !==
                            undefined
                        ) {

                            window.location.href =
                                `product-details.html?id=${encodeURIComponent(product.id)}`;

                        }

                    }
                );


                /* ========================================
                   CONTENT
                ======================================== */

                const content =
                    document.createElement(
                        "div"
                    );


                content.className =
                    "search-product-content";


                /* ========================================
                   RATING
                ======================================== */

                let ratingHTML =
                    "";


                if (

                    product.rating !==
                        undefined &&

                    product.rating !==
                        null

                ) {

                    ratingHTML = `

                        <div class="search-product-rating">

                            ⭐

                            ${toPersianNumber(
                                toNumber(
                                    product.rating
                                ).toFixed(1)
                            )}

                        </div>

                    `;

                }


                /* ========================================
                   CATEGORY
                ======================================== */

                let categoryHTML =
                    "";


                if (product.category) {

                    categoryHTML = `

                        <div class="search-product-category">

                            ${product.category}

                        </div>

                    `;

                }


                /* ========================================
                   DISCOUNT
                ======================================== */

                let discountHTML =
                    "";


                if (

                    product.discount !==
                        undefined &&

                    toNumber(
                        product.discount
                    ) > 0

                ) {

                    discountHTML = `

                        <div class="search-product-discount">

                            ${toPersianNumber(
                                toNumber(
                                    product.discount
                                )
                            )}% تخفیف

                        </div>

                    `;

                }


                /* ========================================
                   CONTENT HTML
                ======================================== */

                content.innerHTML = `

                    <h3>
                        ${product.title || "محصول بدون نام"}
                    </h3>


                    ${categoryHTML}


                    ${ratingHTML}


                    <p class="search-product-price">

                        ${formatPrice(
                            product.price
                        )}

                        تومان

                    </p>


                    ${discountHTML}


                    <button
                        class="search-add-to-cart"
                        type="button"
                    >
                        افزودن به سبد خرید
                    </button>

                `;


                /* ========================================
                   ADD TO CART
                ======================================== */

                const addButton =
                    content.querySelector(
                        ".search-add-to-cart"
                    );


                addButton.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        addToCart(
                            product,
                            addButton,
                            card
                        );

                    }
                );


                /* ========================================
                   APPEND
                ======================================== */

                card.appendChild(
                    image
                );


                card.appendChild(
                    content
                );


                resultsContainer.appendChild(
                    card
                );

            }
        );

    }


    /* =====================================================
       RENDER RESULTS
    ===================================================== */

    function renderResults() {

        const results =
            getSearchResults();


        const sortedResults =
            sortResults(
                results
            );


        displaySearchResults(
            sortedResults
        );


        /* ================================================
           URL PARAMETERS
        ================================================= */

        const keyword =
            getSearchKeyword();


        const category =
            getCategory();


        const discount =
            getDiscount();


        const urlSort =
            getUrlSort();


        /* ================================================
           SEARCH TEXT
        ================================================= */

        if (searchText) {


            /* =============================================
               BEST SELLING
            ============================================= */

            if (
                urlSort ===
                "bestselling"
            ) {

                searchText.textContent =
                    "پرفروش‌ترین محصولات";


            /* =============================================
               NEWEST
            ============================================= */

            } else if (
                urlSort ===
                "newest"
            ) {

                searchText.textContent =
                    "محصولات جدید";


            /* =============================================
               DISCOUNT
            ============================================= */

            } else if (
                discount === "true"
            ) {

                if (category) {

                    searchText.textContent =
                        `محصولات تخفیف‌دار دسته «${category}»`;

                } else if (keyword) {

                    searchText.textContent =
                        `نتایج تخفیف‌دار برای «${keyword}»`;

                } else {

                    searchText.textContent =
                        "محصولات تخفیف‌دار";

                }


            /* =============================================
               CATEGORY
            ============================================= */

            } else if (category) {

                if (keyword) {

                    searchText.textContent =
                        `نتایج «${category}» برای «${keyword}»`;

                } else {

                    searchText.textContent =
                        `محصولات دسته «${category}»`;

                }


            /* =============================================
               SEARCH
            ============================================= */

            } else if (keyword) {

                searchText.textContent =
                    `نتایج جستجو برای «${keyword}»`;


            /* =============================================
               ALL PRODUCTS
            ============================================= */

            } else {

                searchText.textContent =
                    "نمایش همه محصولات فروشگاه";

            }

        }


        /* ================================================
           INPUT VALUE
        ================================================= */

        if (searchInput) {

            searchInput.value =
                keyword;

        }

    }


    /* =====================================================
       CART FROM LOCAL STORAGE
    ===================================================== */

    function getCart() {

        try {

            const savedCart =
                JSON.parse(
                    localStorage.getItem(
                        "cart"
                    )
                );


            return Array.isArray(
                savedCart
            )
                ? savedCart
                : [];


        } catch (error) {

            return [];

        }

    }


    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */

    function updateCartCount() {

        if (!cartCount) {

            return;

        }


        const cartItems =
            getCart();


        let totalQuantity =
            0;


        cartItems.forEach(
            function (item) {

                const quantity =
                    toNumber(
                        item.quantity
                    );


                totalQuantity +=
                    quantity > 0
                        ? quantity
                        : 1;

            }
        );


        cartCount.textContent =
            toPersianNumber(
                totalQuantity
            );


        if (cartIcon) {

            if (
                totalQuantity > 0
            ) {

                cartIcon.classList.add(
                    "cart-has-items"
                );

            } else {

                cartIcon.classList.remove(
                    "cart-has-items"
                );

            }

        }

    }


    /* =====================================================
       ADD PRODUCT TO CART
    ===================================================== */

    function addToCart(
        product,
        button,
        card
    ) {

        const cartItems =
            getCart();


        /* ================================================
           FIND EXISTING PRODUCT
        ================================================= */

        const existingProduct =
            cartItems.find(
                function (item) {

                    return (
                        String(item.id) ===
                        String(product.id)
                    );

                }
            );


        if (existingProduct) {

            existingProduct.quantity =
                toNumber(
                    existingProduct.quantity
                ) + 1;

        } else {

            cartItems.push({

                ...product,

                quantity: 1

            });

        }


        /* ================================================
           SAVE
        ================================================= */

        localStorage.setItem(
            "cart",
            JSON.stringify(
                cartItems
            )
        );


        /* ================================================
           BUTTON EFFECT
        ================================================= */

        if (button) {

            const oldText =
                button.textContent;


            button.textContent =
                "✓ اضافه شد";


            button.classList.add(
                "cart-success"
            );


            setTimeout(
                function () {

                    button.textContent =
                        oldText;


                    button.classList.remove(
                        "cart-success"
                    );

                },
                2500
            );

        }


        /* ================================================
           CARD EFFECT
        ================================================= */

        if (card) {

            card.classList.remove(
                "cart-added"
            );


            void card.offsetWidth;


            card.classList.add(
                "cart-added"
            );


            setTimeout(
                function () {

                    card.classList.remove(
                        "cart-added"
                    );

                },
                700
            );

        }


        /* ================================================
           CART COUNT
        ================================================= */

        updateCartCount();


        /* ================================================
           CART ANIMATION
        ================================================= */

        animateCart(
            button
                ? button
                : card
        );

    }


    /* =====================================================
       CART ANIMATION
    ===================================================== */

    function animateCart(
        sourceElement
    ) {

        if (
            !sourceElement ||
            !cartIcon
        ) {

            return;

        }


        const sourceRect =
            sourceElement.getBoundingClientRect();


        const cartRect =
            cartIcon.getBoundingClientRect();


        const dot =
            document.createElement(
                "div"
            );


        dot.className =
            "cart-fly-dot";


        dot.style.left =
            (
                sourceRect.left +
                sourceRect.width / 2
            ) + "px";


        dot.style.top =
            (
                sourceRect.top +
                sourceRect.height / 2
            ) + "px";


        document.body.appendChild(
            dot
        );


        const startX =
            sourceRect.left +
            sourceRect.width / 2;


        const startY =
            sourceRect.top +
            sourceRect.height / 2;


        const endX =
            cartRect.left +
            cartRect.width / 2;


        const endY =
            cartRect.top +
            cartRect.height / 2;


        const animation =
            dot.animate(

                [

                    {
                        left:
                            startX + "px",

                        top:
                            startY + "px",

                        transform:
                            "translate(-50%, -50%) scale(1)"

                    },


                    {

                        left:
                            (
                                startX +
                                (
                                    endX -
                                    startX
                                ) * .45
                            ) + "px",

                        top:
                            (
                                startY +
                                (
                                    endY -
                                    startY
                                ) * .25 -
                                70
                            ) + "px",

                        transform:
                            "translate(-50%, -50%) scale(1.25)"

                    },


                    {

                        left:
                            endX + "px",

                        top:
                            endY + "px",

                        transform:
                            "translate(-50%, -50%) scale(.35)"

                    }

                ],

                {

                    duration: 700,

                    easing:
                        "cubic-bezier(.17,.67,.35,1.2)"

                }

            );


        animation.finished
            .then(
                function () {

                    dot.remove();


                    cartIcon.classList.remove(
                        "cart-bounce"
                    );


                    void cartIcon.offsetWidth;


                    cartIcon.classList.add(
                        "cart-bounce"
                    );


                    if (cartCount) {

                        cartCount.classList.remove(
                            "cart-counter-pop"
                        );


                        void cartCount.offsetWidth;


                        cartCount.classList.add(
                            "cart-counter-pop"
                        );

                    }


                    setTimeout(
                        function () {

                            cartIcon.classList.remove(
                                "cart-bounce"
                            );

                        },
                        700
                    );

                }
            )
            .catch(
                function () {

                    dot.remove();

                }
            );

    }


    /* =====================================================
       SORT CHANGE
    ===================================================== */

    if (sortProducts) {

        sortProducts.addEventListener(
            "change",
            function () {

                /*
                 * وقتی کاربر از منوی مرتب‌سازی
                 * استفاده می‌کند، همان رفتار قبلی حفظ می‌شود.
                 */

                renderResults();

            }
        );

    }


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                const keyword =
                    searchInput
                        ? searchInput.value.trim()
                        : "";


                if (keyword) {

                    window.location.href =
                        "search-results.html?search=" +
                        encodeURIComponent(
                            keyword
                        );

                } else {

                    window.location.href =
                        "search-results.html";

                }

            }
        );

    }


    /* =====================================================
       ENTER SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();


                    if (searchButton) {

                        searchButton.click();

                    }

                }

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (searchInput) {

                    searchInput.value =
                        "";

                }


                window.location.href =
                    "search-results.html";

            }
        );

    }


    /* =====================================================
       CART CLICK
    ===================================================== */

    if (cartIcon) {

        cartIcon.addEventListener(
            "click",
            function () {

                window.location.href =
                    "shopping-cart.html";

            }
        );


        cartIcon.addEventListener(
            "keydown",
            function (event) {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    event.preventDefault();


                    window.location.href =
                        "shopping-cart.html";

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCartCount();

    renderResults();

});