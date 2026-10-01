document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */

    const productsContainer =
        document.getElementById("checkout-products");

    const checkoutTotal =
        document.getElementById("checkout-total");

    const checkoutDiscount =
        document.getElementById("checkout-discount");

    const checkoutFinal =
        document.getElementById("checkout-final");

    const checkoutCount =
        document.getElementById("checkout-count");

    const submitOrderBtn =
        document.getElementById("submit-order");

    const submitOrderMobile =
        document.getElementById("submit-order-mobile");


    const fullnameInput =
        document.getElementById("fullname");

    const mobileInput =
        document.getElementById("mobile");

    const addressInput =
        document.getElementById("address");

    const postalInput =
        document.getElementById("postal-code");


    /* =================================================
       CLEAR FORM
    ================================================= */

    fullnameInput.value = "";
    mobileInput.value = "";
    addressInput.value = "";
    postalInput.value = "";


    /* =================================================
       GET CART
    ================================================= */

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    /* =================================================
       EMPTY CART
    ================================================= */

    if (cart.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-cart">

                <div style="font-size:40px; margin-bottom:10px;">
                    🛒
                </div>

                <div>
                    سبد خرید شما خالی است.
                </div>

            </div>
        `;

        checkoutCount.textContent =
            "هیچ محصولی در سبد خرید نیست";

        checkoutTotal.textContent =
            "۰ تومان";

        checkoutDiscount.textContent =
            "۰ تومان";

        checkoutFinal.textContent =
            "۰ تومان";

        return;
    }


    /* =================================================
       VARIABLES
    ================================================= */

    let total = 0;

    let discountTotal = 0;

    let totalQuantity = 0;


    /* =================================================
       DISPLAY PRODUCTS
    ================================================= */

    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;

        const discount =
            Number(item.discount) || 0;

        const quantity =
            Number(item.quantity) || 1;


        const discountAmount =
            (price * discount) / 100;


        const finalPrice =
            price - discountAmount;


        total +=
            price * quantity;


        discountTotal +=
            discountAmount * quantity;


        totalQuantity +=
            quantity;


        const productElement =
            document.createElement("div");


        productElement.className =
            "checkout-product";


        /* =============================================
           IMAGE
        ============================================= */

        let imageHTML = "";

        if (item.image) {

            imageHTML = `
                <img
                    class="product-image"
                    src="${item.image}"
                    alt="${item.title || "محصول"}"
                >
            `;

        } else {

            imageHTML = `
                <div class="product-image"
                     style="
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:25px;
                     ">
                    🛍️
                </div>
            `;
        }


        /* =============================================
           PRODUCT HTML
        ============================================= */

        productElement.innerHTML = `

            ${imageHTML}

            <div class="product-info">

                <span class="product-title">
                    ${item.title || "محصول"}
                </span>

                <div class="product-quantity">
                    تعداد: ${quantity}
                </div>

                <div class="product-price">

                    ${finalPrice.toLocaleString("fa-IR")}

                    تومان

                </div>

            </div>

        `;


        productsContainer.appendChild(
            productElement
        );

    });


    /* =================================================
       FINAL PRICE
    ================================================= */

    const finalTotal =
        total - discountTotal;


    /* =================================================
       DISPLAY TOTALS
    ================================================= */

    checkoutTotal.textContent =
        total.toLocaleString("fa-IR")
        + " تومان";


    checkoutDiscount.textContent =
        discountTotal.toLocaleString("fa-IR")
        + " تومان";


    checkoutFinal.textContent =
        finalTotal.toLocaleString("fa-IR")
        + " تومان";


    checkoutCount.textContent =
        totalQuantity.toLocaleString("fa-IR")
        + " کالا در سبد خرید";


    /* =================================================
       MOBILE NORMALIZATION
    ================================================= */

    mobileInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

        }
    );


    postalInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

        }
    );


    /* =================================================
       VALIDATION
    ================================================= */

    function validateOrder() {


        const fullname =
            fullnameInput.value.trim();


        const mobile =
            mobileInput.value.trim();


        const address =
            addressInput.value.trim();


        const postalCode =
            postalInput.value.trim();


        /* =============================================
           FULL NAME
        ============================================= */

        if (fullname === "") {

            alert(
                "لطفاً نام و نام خانوادگی را وارد کنید."
            );

            fullnameInput.focus();

            return false;
        }


        /* =============================================
           MOBILE
        ============================================= */

        if (mobile === "") {

            alert(
                "لطفاً شماره موبایل را وارد کنید."
            );

            mobileInput.focus();

            return false;
        }


        if (!/^09\d{9}$/.test(mobile)) {

            alert(
                "شماره موبایل وارد شده صحیح نیست."
            );

            mobileInput.focus();

            return false;
        }


        /* =============================================
           ADDRESS
        ============================================= */

        if (address === "") {

            alert(
                "لطفاً آدرس کامل را وارد کنید."
            );

            addressInput.focus();

            return false;
        }


        if (address.length < 10) {

            alert(
                "لطفاً آدرس کامل‌تری وارد کنید."
            );

            addressInput.focus();

            return false;
        }


        /* =============================================
           POSTAL CODE
        ============================================= */

        if (postalCode === "") {

            alert(
                "لطفاً کد پستی را وارد کنید."
            );

            postalInput.focus();

            return false;
        }


        if (!/^\d{10}$/.test(postalCode)) {

            alert(
                "کد پستی باید دقیقاً ۱۰ رقم باشد."
            );

            postalInput.focus();

            return false;
        }


        return true;
    }


    /* =================================================
       SUBMIT ORDER
    ================================================= */

function submitOrder() {

    if (!validateOrder()) {
        return;
    }


    const orderData = {

        fullname:
            fullnameInput.value.trim(),

        mobile:
            mobileInput.value.trim(),

        address:
            addressInput.value.trim(),

        postalCode:
            postalInput.value.trim(),

        cart:
            cart,

        total:
            total,

        discount:
            discountTotal,

        finalTotal:
            finalTotal,

        createdAt:
            new Date().toISOString()

    };


    /* =====================================================
       SAVE PENDING ORDER
       
       سفارش هنوز پرداخت نشده است،
       بنابراین موقتاً با نام pendingOrder ذخیره می‌شود.
    ===================================================== */

    localStorage.setItem(
        "pendingOrder",
        JSON.stringify(orderData)
    );


    /* =====================================================
       REDIRECT TO PAYMENT
    ===================================================== */

    window.location.href = "payment.html";

}

    /* =================================================
       BUTTON EVENTS
    ================================================= */

    if (submitOrderBtn) {

        submitOrderBtn.addEventListener(
            "click",
            submitOrder
        );

    }


    if (submitOrderMobile) {

        submitOrderMobile.addEventListener(
            "click",
            submitOrder
        );

    }

});


// alert(window.innerHeight);
// alert(document.body.scrollWidth);
