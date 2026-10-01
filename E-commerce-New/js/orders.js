document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const ordersContainer =
        document.getElementById("orders-container");

    const cartCounter =
        document.getElementById("cart-counter");


    /* =====================================================
       PERSIAN DIGITS
    ===================================================== */

    function toPersianDigits(value) {

        return String(value ?? "").replace(
            /\d/g,
            function (digit) {

                return "۰۱۲۳۴۵۶۷۸۹"[digit];

            }
        );

    }


    /* =====================================================
       NUMBER
    ===================================================== */

    function toNumber(value) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            return 0;

        }


        const normalized =
            String(value)
                .replace(/,/g, "")
                .replace(/٬/g, "")
                .replace(/[۰-۹]/g, function (digit) {

                    return "۰۱۲۳۴۵۶۷۸۹".indexOf(
                        digit
                    );

                });


        return Number(normalized) || 0;

    }


    /* =====================================================
       MONEY
    ===================================================== */

    function formatMoney(value) {

        return (
            toNumber(value)
                .toLocaleString("fa-IR") +
            " تومان"
        );

    }


    /* =====================================================
       DATE
    ===================================================== */

    function formatDate(value) {

        if (!value) {

            return "-";

        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "-";

        }


        return date.toLocaleString(
            "fa-IR",
            {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =====================================================
       CART COUNTER
    ===================================================== */

    function updateCartCounter() {

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        let totalQuantity = 0;


        cart.forEach(
            function (item) {

                totalQuantity +=
                    Math.max(
                        0,
                        toNumber(item.quantity)
                    );

            }
        );


        if (cartCounter) {

            cartCounter.textContent =
                toPersianDigits(
                    totalQuantity
                );

        }

    }


    /* =====================================================
       GET LAST ORDER
    ===================================================== */

    let lastOrder = null;


    try {

        lastOrder =
            JSON.parse(
                localStorage.getItem(
                    "lastOrder"
                )
            );

    } catch (error) {

        console.error(
            "خطا در خواندن سفارش:",
            error
        );

    }


    /* =====================================================
       NO ORDER
    ===================================================== */

    if (!lastOrder) {

        ordersContainer.innerHTML = `

            <div class="orders-empty">

                <div class="orders-empty-icon">
                    🛍️
                </div>

                <h2>
                    هنوز سفارشی ثبت نکرده‌اید
                </h2>

                <p>
                    بعد از ثبت اولین سفارش،
                    اطلاعات آن در این قسمت نمایش داده می‌شود.
                </p>

                <button
                    id="go-shopping"
                    type="button"
                >
                    شروع خرید
                </button>

            </div>

        `;


        const goShopping =
            document.getElementById(
                "go-shopping"
            );


        if (goShopping) {

            goShopping.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "index.html";

                }
            );

        }


        updateCartCounter();

        return;

    }


    /* =====================================================
       ORDER DATA
    ===================================================== */

    const orderNumber =
        lastOrder.orderNumber || "-";


    const paymentDate =
        formatDate(
            lastOrder.paymentDate ||
            lastOrder.createdAt
        );


    const finalTotal =
        formatMoney(
            lastOrder.finalTotal
        );


    const products =
        Array.isArray(lastOrder.cart)
            ? lastOrder.cart
            : [];


    /* =====================================================
       PRODUCTS
    ===================================================== */

    let productsHTML = "";


    products.forEach(
        function (item) {

            const quantity =
                Math.max(
                    1,
                    toNumber(
                        item.quantity
                    )
                );


            const price =
                toNumber(
                    item.price
                );


            const discount =
                Math.max(
                    0,
                    toNumber(
                        item.discount
                    )
                );


            const finalPrice =
                discount > 0
                    ? price *
                      (
                          1 -
                          discount / 100
                      )
                    : price;


            productsHTML += `

                <div class="order-product">

                    <img
                        src="${item.image || ""}"
                        alt="${item.title || "محصول"}"
                    >

                    <div class="order-product-info">

                        <h3>
                            ${item.title || "-"}
                        </h3>

                        <p>
                            تعداد:
                            ${toPersianDigits(quantity)}
                        </p>

                        <strong>
                            ${formatMoney(finalPrice)}
                        </strong>

                    </div>

                </div>

            `;

        }
    );


    /* =====================================================
       ORDER STATUS
    ===================================================== */

    const paymentStatus =
        lastOrder.paymentStatus === "success"
            ? "پرداخت موفق"
            : "پرداخت نامشخص";


    /* =====================================================
       DISPLAY ORDER
    ===================================================== */

    ordersContainer.innerHTML = `

        <div class="order-card">

            <div class="order-card-header">

                <div>

                    <span>
                        شماره سفارش
                    </span>

                    <strong>
                        ${toPersianDigits(orderNumber)}
                    </strong>

                </div>


                <div class="order-status">

                    ✓
                    ${paymentStatus}

                </div>

            </div>


            <div class="order-info">

                <div>

                    <span>
                        تاریخ سفارش
                    </span>

                    <strong>
                        ${paymentDate}
                    </strong>

                </div>


                <div>

                    <span>
                        مبلغ پرداختی
                    </span>

                    <strong>
                        ${finalTotal}
                    </strong>

                </div>

            </div>


            <div class="order-products">

                <h2>
                    کالاهای سفارش
                </h2>

                ${productsHTML}

            </div>


            <div class="order-footer">

                <button
                    id="print-order"
                    type="button"
                >
                    چاپ رسید
                </button>

            </div>

        </div>

    `;


    /* =====================================================
       PRINT ORDER
    ===================================================== */

    const printOrder =
        document.getElementById(
            "print-order"
        );


    if (printOrder) {

        printOrder.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }


    /* =====================================================
       CART
    ===================================================== */

    updateCartCounter();

});