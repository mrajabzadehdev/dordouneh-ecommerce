document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       CART
    ================================================= */

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    /* =================================================
       ELEMENTS
    ================================================= */

    const cartItems =
        document.querySelector("#cart-items");

    const cartCounter =
        document.querySelector("#cart-counter");

    const cartBox =
        document.querySelector(".cart-box");

    const totalPrice =
        document.querySelector("#total-price");

    const discountPrice =
        document.querySelector("#discount-price");

    const payablePrice =
        document.querySelector("#payable-price");

    const checkoutBtn =
        document.querySelector("#checkout-btn");

    const cartItemsInfo =
        document.querySelector("#cart-items-info");


    /* =================================================
       SAVE CART
    ================================================= */

    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }


    /* =================================================
       GET TOTAL QUANTITY
    ================================================= */

    function getTotalQuantity() {

        let totalQuantity = 0;

        cart.forEach(function (product) {

            totalQuantity +=
                Number(product.quantity) || 1;

        });

        return totalQuantity;

    }


    /* =================================================
       UPDATE CART VISUAL EFFECT
    ================================================= */

    function updateCartVisual() {

        if (!cartBox) {
            return;
        }

        const totalQuantity =
            getTotalQuantity();


        /*
         * اگر سبد محصول دارد:
         * Glow + Float + Pulse
         */

        cartBox.classList.toggle(
            "cart-has-items",
            totalQuantity > 0
        );

    }


    /* =================================================
       UPDATE CART COUNTER
    ================================================= */

    function updateCartCount(pop = false) {

        if (!cartCounter) {
            return;
        }

        const totalQuantity =
            getTotalQuantity();


        cartCounter.textContent =
            totalQuantity.toLocaleString("fa-IR");


        /*
         * Pop شمارنده
         */

        if (pop) {

            cartCounter.classList.remove(
                "cart-counter-pop"
            );

            /*
             * مجبور کردن مرورگر به اجرای دوباره انیمیشن
             */

            void cartCounter.offsetWidth;

            cartCounter.classList.add(
                "cart-counter-pop"
            );


            setTimeout(function () {

                cartCounter.classList.remove(
                    "cart-counter-pop"
                );

            }, 650);

        }


        updateCartVisual();

    }


    /* =================================================
       FLY TO CART
    ================================================= */

    function flyToCart(sourceElement) {

        if (!sourceElement || !cartBox) {
            return;
        }


        /*
         * موقعیت دکمه +
         */

        const sourceRect =
            sourceElement.getBoundingClientRect();


        /*
         * موقعیت سبد
         */

        const cartRect =
            cartBox.getBoundingClientRect();


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


        /*
         * ساخت توپ نورانی
         */

        const dot =
            document.createElement("span");

        dot.className =
            "cart-fly-dot";


        dot.style.left =
            `${startX}px`;

        dot.style.top =
            `${startY}px`;


        document.body.appendChild(dot);


        /*
         * انیمیشن حرکت توپ
         */

        const animation =
            dot.animate(

                [

                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${endX - startX}px),
                                calc(-50% + ${endY - startY}px)
                            ) scale(.35)`,

                        opacity: .2
                    }

                ],

                {

                    duration: 700,

                    easing:
                        "cubic-bezier(.17,.67,.35,1.4)",

                    fill: "forwards"

                }

            );


        /* =================================================
           برخورد توپ با سبد
        ================================================= */

        animation.onfinish = function () {

            dot.remove();


            /*
             * Bounce سبد
             */

            cartBox.classList.remove(
                "cart-bounce"
            );


            /*
             * اجرای مجدد انیمیشن
             */

            void cartBox.offsetWidth;


            cartBox.classList.add(
                "cart-bounce"
            );


            /*
             * بعد از پایان Bounce
             * کلاس حذف می‌شود تا Glow دائمی
             * دوباره فعال شود.
             */

            setTimeout(function () {

                cartBox.classList.remove(
                    "cart-bounce"
                );

            }, 750);

        };

    }


    /* =================================================
       DISPLAY CART ITEMS
    ================================================= */

    function displayCartItems() {

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";


        /* =============================================
           EMPTY CART
        ============================================= */

        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <strong>
                        سبد خرید شما خالی است.
                    </strong>

                </div>

            `;


            if (cartItemsInfo) {

                cartItemsInfo.textContent =
                    "هنوز محصولی به سبد خرید اضافه نشده است";

            }


            /*
             * خاموش کردن Glow سبد
             */

            updateCartVisual();


            return;
        }


        /* =============================================
           PRODUCTS
        ============================================= */

        cart.forEach(function (product) {

            const price =
                Number(product.price) || 0;


            const quantity =
                Number(product.quantity) || 1;


            const discount =
                Number(product.discount) || 0;


            const finalPrice =
                price -
                (price * discount) / 100;


            const productElement =
                document.createElement("div");


            productElement.className =
                "cart-item";


            productElement.dataset.id =
                product.id;


            /* =========================================
               DESCRIPTION
            ========================================= */

            const descriptionHTML =
                product.describe
                    ? `

                        <p class="cart-item-description">

                            ${product.describe}

                        </p>

                    `
                    : "";


            /* =========================================
               DISCOUNT
            ========================================= */

            const discountHTML =
                discount > 0
                    ? `

                        <p class="cart-item-discount">

                            با حساب

                            ${discount.toLocaleString("fa-IR")}

                            درصد تخفیف

                        </p>

                    `
                    : "";


            /* =========================================
               PRODUCT
            ========================================= */

            productElement.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >


                <div class="cart-item-info">


                    <h3>
                        ${product.title}
                    </h3>


                    ${
                        discount > 0
                            ? `

                                <h3>

                                    <div class="cart-item-price1">

                                        ${price.toLocaleString("fa-IR")}

                                    </div>

                                </h3>

                            `
                            : ""
                    }


                    ${descriptionHTML}


                    ${discountHTML}


                    <p class="cart-item-price">

                        ${finalPrice.toLocaleString("fa-IR")}

                        تومان

                    </p>


                    <div class="quantity">


                        <!-- DECREASE -->

                        <button
                            class="decrease"
                            type="button"
                            title="کاهش تعداد"
                            aria-label="کاهش تعداد"
                        >

                            −

                        </button>


                        <!-- NUMBER -->

                        <span>

                            ${quantity.toLocaleString("fa-IR")}

                        </span>


                        <!-- INCREASE -->

                        <button
                            class="increase"
                            type="button"
                            title="افزایش تعداد"
                            aria-label="افزایش تعداد"
                        >

                            +

                        </button>


                        <!-- REMOVE -->

                        <button
                            class="remove-item"
                            type="button"
                            title="حذف محصول"
                            aria-label="حذف محصول"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>


                    </div>


                </div>

            `;


            cartItems.appendChild(
                productElement
            );

        });


        /* =============================================
           CART ITEMS INFO
        ============================================= */

        if (cartItemsInfo) {

            const totalQuantity =
                getTotalQuantity();


            cartItemsInfo.textContent =
                totalQuantity.toLocaleString("fa-IR") +
                " کالا در سبد خرید";

        }


        /*
         * بروزرسانی Glow
         */

        updateCartVisual();

    }


    /* =================================================
       DISPLAY SUMMARY
    ================================================= */

    function displaySummary() {

        let total = 0;

        let discount = 0;


        cart.forEach(function (product) {

            const price =
                Number(product.price) || 0;


            const quantity =
                Number(product.quantity) || 1;


            const productDiscount =
                Number(product.discount) || 0;


            total +=
                price * quantity;


            discount +=
                price *
                (productDiscount / 100) *
                quantity;

        });


        const payable =
            total - discount;


        if (totalPrice) {

            totalPrice.textContent =
                total.toLocaleString("fa-IR") +
                " تومان";

        }


        if (discountPrice) {

            discountPrice.textContent =
                discount.toLocaleString("fa-IR") +
                " تومان";

        }


        if (payablePrice) {

            payablePrice.textContent =
                payable.toLocaleString("fa-IR") +
                " تومان";

        }

    }


    /* =================================================
       CART CLICK EVENTS
    ================================================= */

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            function (event) {

                const cartItem =
                    event.target.closest(
                        ".cart-item"
                    );


                if (!cartItem) {
                    return;
                }


                const productId =
                    Number(
                        cartItem.dataset.id
                    );


                const product =
                    cart.find(function (item) {

                        return (
                            Number(item.id) ===
                            productId
                        );

                    });


                if (!product) {
                    return;
                }


                /* =====================================
                   INCREASE
                ===================================== */

                const increaseButton =
                    event.target.closest(
                        ".increase"
                    );


                if (increaseButton) {


                    /*
                     * اول موقعیت دکمه را می‌گیریم.
                     * چون displayCartItems بعداً
                     * دکمه را دوباره می‌سازد.
                     */

                    const sourceElement =
                        increaseButton;


                    /*
                     * افزایش تعداد
                     */

                    product.quantity =
                        (Number(product.quantity) || 1) +
                        1;


                    saveCart();


                    /*
                     * نمایش توپ از همان دکمه +
                     *
                     * قبل از بازسازی DOM
                     */

                    flyToCart(
                        sourceElement
                    );


                    /*
                     * بروزرسانی صفحه
                     */

                    displayCartItems();

                    updateCartCount(true);

                    displaySummary();


                    return;

                }


                /* =====================================
                   DECREASE
                ===================================== */

                const decreaseButton =
                    event.target.closest(
                        ".decrease"
                    );


                if (decreaseButton) {


                    if (
                        Number(product.quantity) > 1
                    ) {

                        product.quantity--;


                        saveCart();


                        displayCartItems();

                        updateCartCount(false);

                        displaySummary();

                    }


                    return;

                }


                /* =====================================
                   REMOVE
                ===================================== */

                const removeButton =
                    event.target.closest(
                        ".remove-item"
                    );


                if (removeButton) {


                    cart =
                        cart.filter(
                            function (item) {

                                return (
                                    Number(item.id) !==
                                    productId
                                );

                            }
                        );


                    saveCart();


                    displayCartItems();

                    updateCartCount(false);

                    displaySummary();


                    return;

                }

            }
        );

    }


    /* =================================================
       CART HEADER CLICK
    ================================================= */

    if (cartBox) {

        cartBox.addEventListener(
            "click",
            function () {

                /*
                 * چون همین صفحه سبد خرید است،
                 * فعلاً کلیک روی سبد هیچ تغییر صفحه‌ای ندارد.
                 *
                 * فقط افکت کوتاه اجرا می‌شود.
                 */

                cartBox.classList.remove(
                    "cart-bounce"
                );

                void cartBox.offsetWidth;

                cartBox.classList.add(
                    "cart-bounce"
                );


                setTimeout(function () {

                    cartBox.classList.remove(
                        "cart-bounce"
                    );

                }, 750);

            }
        );


        /*
         * پشتیبانی از Enter و Space
         */

        cartBox.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    cartBox.click();

                }

            }
        );

    }


    /* =================================================
       CHECKOUT
    ================================================= */

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert(
                        "سبد خرید شما خالی است."
                    );

                    return;

                }


                window.location.href =
                    "checkout.html";

            }
        );

    }


    /* =================================================
       INITIAL LOAD
    ================================================= */

    displayCartItems();

    updateCartCount(false);

    displaySummary();

});