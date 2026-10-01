document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const paymentAmount =
        document.getElementById("payment-amount");

    const cardNumberInput =
        document.getElementById("card-number");

    const cvv2Input =
        document.getElementById("cvv2");

    const expireDateInput =
        document.getElementById("expire-date");

    const secondPasswordInput =
        document.getElementById("second-password");

    const payButton =
        document.getElementById("pay-button");

    const cancelButton =
        document.getElementById("cancel-payment");

    const cardNumberPreview =
        document.getElementById("card-number-preview");


    /* =========================================================
       GET PENDING ORDER
    ========================================================= */

    const pendingOrder =
        JSON.parse(
            localStorage.getItem("pendingOrder")
        );


    /* =========================================================
       CHECK ORDER
    ========================================================= */

    if (!pendingOrder) {

        alert(
            "اطلاعات سفارش پیدا نشد."
        );

        window.location.href =
            "checkout.html";

        return;
    }


    /* =========================================================
       GET FINAL TOTAL
    ========================================================= */

    const finalTotal =
        Number(pendingOrder.finalTotal) || 0;


    /* =========================================================
       SHOW PAYMENT AMOUNT
    ========================================================= */

    paymentAmount.textContent =
        finalTotal.toLocaleString("fa-IR")
        + " تومان";


    /* =========================================================
       CARD NUMBER
    ========================================================= */

    cardNumberInput.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(/\D/g, "");

            value =
                value.substring(0, 16);

            let formatted =
                value.match(/.{1,4}/g);

            this.value =
                formatted
                    ? formatted.join(" ")
                    : "";


            /* =============================================
               CARD PREVIEW
            ============================================= */

            if (value.length === 0) {

                cardNumberPreview.textContent =
                    "••••  ••••  ••••  ••••";

                return;
            }


            let preview = "";

            for (let i = 0; i < 16; i += 4) {

                const group =
                    value.substring(i, i + 4);

                if (group.length === 4) {

                    preview += group;

                } else if (group.length > 0) {

                    preview +=
                        group.padEnd(4, "•");

                } else {

                    preview += "••••";
                }

                if (i < 12) {
                    preview += "   ";
                }
            }


            cardNumberPreview.textContent =
                preview;

        }
    );



    /* =========================================================
       CVV2
    ========================================================= */

    cvv2Input.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

        }
    );



    /* =========================================================
       EXPIRY DATE
    ========================================================= */

    expireDateInput.addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(/\D/g, "")
                    .substring(0, 4);


            if (value.length > 2) {

                value =
                    value.substring(0, 2)
                    + "/"
                    + value.substring(2);

            }


            this.value = value;

        }
    );



    /* =========================================================
       OTP
    ========================================================= */

    secondPasswordInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .substring(0, 6);

        }
    );



    /* =========================================================
       VALIDATE PAYMENT
    ========================================================= */

    function validatePayment() {


        const cardNumber =
            cardNumberInput.value
                .replace(/\s/g, "");


        const cvv2 =
            cvv2Input.value.trim();


        const expireDate =
            expireDateInput.value.trim();


        const secondPassword =
            secondPasswordInput.value.trim();



        /* =====================================================
           CARD NUMBER
        ===================================================== */

        if (cardNumber === "") {

            alert(
                "لطفاً شماره کارت را وارد کنید."
            );

            cardNumberInput.focus();

            return false;
        }


        if (!/^\d{16}$/.test(cardNumber)) {

            alert(
                "شماره کارت باید ۱۶ رقم باشد."
            );

            cardNumberInput.focus();

            return false;
        }



        /* =====================================================
           CVV2
        ===================================================== */

        if (cvv2 === "") {

            alert(
                "لطفاً CVV2 را وارد کنید."
            );

            cvv2Input.focus();

            return false;
        }


        if (!/^\d{3,4}$/.test(cvv2)) {

            alert(
                "CVV2 باید ۳ یا ۴ رقم باشد."
            );

            cvv2Input.focus();

            return false;
        }



        /* =====================================================
           EXPIRY
        ===================================================== */

        if (expireDate === "") {

            alert(
                "لطفاً تاریخ انقضای کارت را وارد کنید."
            );

            expireDateInput.focus();

            return false;
        }


        if (!/^\d{2}\/\d{2}$/.test(expireDate)) {

            alert(
                "تاریخ انقضا را به صورت MM/YY وارد کنید."
            );

            expireDateInput.focus();

            return false;
        }



        /* =====================================================
           OTP
        ===================================================== */

        if (secondPassword === "") {

            alert(
                "لطفاً رمز پویا را وارد کنید."
            );

            secondPasswordInput.focus();

            return false;
        }


        if (!/^\d{6}$/.test(secondPassword)) {

            alert(
                "رمز پویا باید ۶ رقم باشد."
            );

            secondPasswordInput.focus();

            return false;
        }


        return true;
    }



    /* =========================================================
       PAYMENT PROCESS
    ========================================================= */

    function processPayment() {


        /* =====================================================
           VALIDATION
        ===================================================== */

        if (!validatePayment()) {
            return;
        }



        /* =====================================================
           DISABLE BUTTON
        ===================================================== */

        payButton.disabled = true;


        const buttonText =
            payButton.querySelector(
                ".pay-button-text"
            );


        if (buttonText) {

            buttonText.textContent =
                "در حال پردازش...";

        }


        /* =====================================================
           SIMULATE BANK
        ===================================================== */

        setTimeout(function () {


            /* =================================================
               CREATE FINAL ORDER
            ================================================= */

            const finalOrder = {

                ...pendingOrder,

                paymentStatus:
                    "success",

                paymentDate:
                    new Date().toISOString(),

                orderNumber:
                    "DR"
                    + Date.now()
                        .toString()
                        .slice(-8)

            };



            /* =================================================
               SAVE FINAL ORDER
            ================================================= */

// ذخیره آخرین سفارش
localStorage.setItem(
    "lastOrder",
    JSON.stringify(finalOrder)
);


// ذخیره سفارش در تاریخچه سفارش‌ها
let orders = [];

try {

    orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    if (!Array.isArray(orders)) {
        orders = [];
    }

} catch (error) {

    console.error(
        "خطا در خواندن تاریخچه سفارش‌ها:",
        error
    );

    orders = [];

}


// اضافه کردن سفارش جدید
orders.unshift(finalOrder);


// ذخیره تاریخچه سفارش‌ها
localStorage.setItem(
    "orders",
    JSON.stringify(orders)
);


            /* =================================================
               CLEAR PENDING ORDER
            ================================================= */

            localStorage.removeItem(
                "pendingOrder"
            );



            /* =================================================
               CLEAR CART
            ================================================= */

            localStorage.removeItem(
                "cart"
            );



            /* =================================================
               GO SUCCESS PAGE
            ================================================= */

            window.location.href =
                "success.html";


        }, 1500);

    }



    /* =========================================================
       PAY BUTTON
    ========================================================= */

    if (payButton) {

        payButton.addEventListener(
            "click",
            processPayment
        );

    }



    /* =========================================================
       CANCEL PAYMENT
    ========================================================= */

    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                /*
                 * سفارش موقت باقی می‌ماند
                 * تا کاربر بتواند دوباره وارد
                 * صفحه پرداخت شود.
                 */

                window.location.href =
                    "checkout.html";

            }
        );

    }


});