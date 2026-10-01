document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const finalAmount = document.getElementById("final-amount");

  const orderNumber = document.getElementById("order-number");

  const homeButton = document.getElementById("home-button");

  const ordersButton = document.getElementById("orders-button");

  const printButton = document.getElementById("print-button");

  /* =====================================================
       PERSIAN DIGITS
    ===================================================== */

  function toPersianDigits(value) {
    return String(value ?? "").replace(/\d/g, function (digit) {
      return "۰۱۲۳۴۵۶۷۸۹"[digit];
    });
  }

  /* =====================================================
       NUMBER
    ===================================================== */

  function toNumber(value) {
    if (value === null || value === undefined || value === "") {
      return 0;
    }

    const normalized = String(value)
      .replace(/,/g, "")
      .replace(/٬/g, "")
      .replace(/[۰-۹]/g, function (digit) {
        return "۰۱۲۳۴۵۶۷۸۹".indexOf(digit);
      });

    return Number(normalized) || 0;
  }

  /* =====================================================
       MONEY
    ===================================================== */

  function formatMoney(value) {
    return toNumber(value).toLocaleString("fa-IR") + " تومان";
  }

  /* =====================================================
       DATE
    ===================================================== */

  function formatDate(value) {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /* =====================================================
       READ ORDER
    ===================================================== */

  let lastOrder = null;

  try {
    lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
  } catch (error) {
    console.error("خطا در خواندن اطلاعات سفارش:", error);
  }

  /* =====================================================
       VALIDATE
    ===================================================== */

  if (!lastOrder || lastOrder.paymentStatus !== "success") {
    alert("سفارش پرداخت‌شده‌ای پیدا نشد.");

    window.location.href = "index.html";

    return;
  }

  /* =====================================================
       SUCCESS PAGE
    ===================================================== */

  const amount = toNumber(lastOrder.finalTotal);

  if (finalAmount) {
    finalAmount.textContent = formatMoney(amount);
  }

  if (orderNumber) {
    orderNumber.textContent = toPersianDigits(lastOrder.orderNumber || "-");
  }

  /* =====================================================
       HOME
    ===================================================== */

  if (homeButton) {
    homeButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  /* =====================================================
       ORDERS
    ===================================================== */

  if (ordersButton) {
    ordersButton.addEventListener("click", function () {
      window.location.href = "orders.html";
    });
  }

  /* =====================================================
       ANIMATION
    ===================================================== */

  const successContainer = document.querySelector(".success-container");

  if (successContainer) {
    setTimeout(function () {
      successContainer.classList.add("show-success");
    }, 100);
  }

  /* =====================================================
       CREATE PRINT PAGE
    ===================================================== */

  function openPrintPage() {
    const cart = Array.isArray(lastOrder.cart) ? lastOrder.cart : [];

    /* -----------------------------------------------
           PRODUCTS HTML
        ------------------------------------------------ */

    let productsHTML = "";

    if (cart.length === 0) {
      productsHTML = `
                <tr>
                    <td colspan="5">
                        اطلاعات کالا موجود نیست
                    </td>
                </tr>
            `;
    } else {
      cart.forEach(function (item) {
        const quantity = Math.max(1, toNumber(item.quantity));

        const price = toNumber(item.price);

        const discount = Math.max(0, toNumber(item.discount));

        const unitPrice = discount > 0 ? price * (1 - discount / 100) : price;

        const total = unitPrice * quantity;

        productsHTML += `

                        <tr>

                            <td class="product-name">
                                ${item.title || "-"}
                            </td>

                            <td>
                                ${toPersianDigits(quantity)}
                            </td>

                            <td>
                                ${formatMoney(price)}
                            </td>

                            <td class="discount-text">
                                ${
                                  discount > 0
                                    ? toPersianDigits(discount) + "%"
                                    : "-"
                                }
                            </td>

                            <td>
                                ${formatMoney(total)}
                            </td>

                        </tr>

                    `;
      });
    }

    /* -----------------------------------------------
           DATA
        ------------------------------------------------ */

    const orderId = toPersianDigits(lastOrder.orderNumber || "-");

    const paymentDate = formatDate(
      lastOrder.paymentDate || lastOrder.createdAt,
    );

    const fullname = lastOrder.fullname || "-";

    const mobile = toPersianDigits(lastOrder.mobile || "-");

    const postalCode = toPersianDigits(lastOrder.postalCode || "-");

    const address = lastOrder.address || "-";

    const total = formatMoney(lastOrder.total);

    const discount = formatMoney(lastOrder.discount);

    const finalTotal = formatMoney(lastOrder.finalTotal);

    /* -----------------------------------------------
           PRINT WINDOW
        ------------------------------------------------ */

    const printWindow = window.open("", "_blank", "width=900,height=1000");

    if (!printWindow) {
      alert(
        "پنجره چاپ توسط مرورگر مسدود شده است. لطفاً اجازه باز شدن پنجره را بدهید.",
      );

      return;
    }

    /* -----------------------------------------------
           PRINT HTML
        ------------------------------------------------ */

    printWindow.document.open();

    printWindow.document.write(`

<!DOCTYPE html>

<html
    lang="fa"
    dir="rtl">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0">

<title>
    رسید سفارش ${orderId} - دردونه
</title>


<style>

/* =====================================================
   RESET
===================================================== */

* {
    box-sizing: border-box;
}


html,
body {

    margin: 0;

    padding: 0;

    width: 100%;

    min-height: 100%;

}


body {

    direction: rtl;

    font-family:
        Vazir,
        Tahoma,
        Arial,
        sans-serif;

    background: #f1f4f2;

    color: #26342d;

    -webkit-print-color-adjust: exact;

    print-color-adjust: exact;
}


/* =====================================================
   PRINT AREA
===================================================== */

.print-page {

    width: 210mm;

    min-height: 297mm;

    margin: 20px auto;

    padding: 18mm;

    background: white;

    box-shadow:
        0 10px 40px rgba(0,0,0,.12);

    position: relative;

    overflow: hidden;
}


/* =====================================================
   TOP ACCENT
===================================================== */

.top-line {

    position: absolute;

    top: 0;

    right: 0;

    left: 0;

    height: 7px;

    background:
        linear-gradient(
            90deg,
            #10955e,
            #35d48a,
            #10955e
        );
}


/* =====================================================
   HEADER
===================================================== */

.header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding-bottom: 20px;

    border-bottom:
        1px solid #e5ece8;
}


.brand {

    display: flex;

    align-items: center;

    gap: 13px;
}


.logo {

    width: 65px;

    height: 65px;

    border-radius: 17px;

    object-fit: cover;

    border:
        1px solid #dceae2;
}


.brand-title {

    display: flex;

    flex-direction: column;

    gap: 4px;
}


.brand-title strong {

    color: #139361;

    font-size: 26px;

    font-weight: 900;
}


.brand-title span {

    color: #8a9690;

    font-size: 11px;
}


.secure {

    display: flex;

    align-items: center;

    gap: 9px;

    padding: 10px 14px;

    border-radius: 13px;

    background: #effaf4;

    border:
        1px solid #d7eee1;

    color: #128c5b;

    font-size: 10px;

    font-weight: 800;
}


.secure-icon {

    width: 29px;

    height: 29px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    background: #18ac70;

    color: white;

    font-size: 15px;
}


/* =====================================================
   SUCCESS
===================================================== */

.success-banner {

    margin-top: 20px;

    padding: 18px;

    display: flex;

    align-items: center;

    gap: 14px;

    border-radius: 16px;

    background:
        linear-gradient(
            135deg,
            #effcf5,
            #f8fffb
        );

    border:
        1px solid #d8efe1;
}


.success-circle {

    width: 50px;

    height: 50px;

    flex-shrink: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    background:
        linear-gradient(
            145deg,
            #36d98c,
            #11a368
        );

    color: white;

    font-size: 27px;

    font-weight: 900;

    box-shadow:
        0 7px 18px rgba(18,163,104,.2);
}


.success-text strong {

    display: block;

    color: #138c5b;

    font-size: 17px;
}


.success-text span {

    display: block;

    margin-top: 5px;

    color: #7f8d85;

    font-size: 10px;
}


/* =====================================================
   META
===================================================== */

.meta {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 9px;

    margin-top: 16px;
}


.meta-box {

    padding: 11px;

    text-align: center;

    border-radius: 11px;

    background: #fafcfb;

    border:
        1px solid #e6ede9;
}


.meta-box span {

    display: block;

    color: #919b95;

    font-size: 8px;

    margin-bottom: 5px;
}


.meta-box strong {

    display: block;

    color: #35443c;

    font-size: 9px;

    word-break: break-word;
}


.green {

    color: #159763 !important;
}


/* =====================================================
   SECTION
===================================================== */

.section {

    margin-top: 18px;

    border:
        1px solid #e4ebe7;

    border-radius: 13px;

    overflow: hidden;
}


.section-title {

    padding: 11px 13px;

    background: #f7faf8;

    border-bottom:
        1px solid #e5ebe8;

    color: #34433b;

    font-size: 11px;

    font-weight: 900;
}


/* =====================================================
   CUSTOMER
===================================================== */

.customer {

    display: grid;

    grid-template-columns:
        1fr 1fr;
}


.customer-item {

    min-height: 55px;

    padding: 10px 13px;

    border-bottom:
        1px solid #edf1ef;

    border-left:
        1px solid #edf1ef;
}


.customer-item:nth-child(2n) {

    border-left: none;
}


.customer-item:last-child {

    grid-column:
        span 2;

    border-bottom: none;
}


.customer-item span {

    display: block;

    color: #939e98;

    font-size: 8px;

    margin-bottom: 5px;
}


.customer-item strong {

    display: block;

    color: #35433c;

    font-size: 9px;

    line-height: 1.8;
}


/* =====================================================
   PRODUCTS
===================================================== */

table {

    width: 100%;

    border-collapse: collapse;

    table-layout: fixed;
}


thead th {

    padding: 10px 7px;

    background: #f5f9f7;

    color: #65736c;

    font-size: 8px;

    border-bottom:
        1px solid #e2e9e5;
}


tbody td {

    padding: 10px 7px;

    color: #3b4942;

    font-size: 8px;

    text-align: center;

    border-bottom:
        1px solid #edf1ef;

    word-break: break-word;
}


tbody tr:last-child td {

    border-bottom: none;
}


.product-name {

    text-align: right;

    font-weight: 800;
}


.discount-text {

    color: #159d65;
}


/* =====================================================
   TOTALS
===================================================== */

.totals {

    margin-top: 16px;

    padding: 13px 15px;

    border-radius: 13px;

    background: #f8faf9;

    border:
        1px solid #e5ece8;
}


.total-row {

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 6px 0;

    color: #78857f;

    font-size: 9px;
}


.total-row strong {

    color: #4b5952;
}


.discount-row strong {

    color: #159d65;
}


.final-total {

    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-top: 8px;

    padding-top: 12px;

    border-top:
        1px solid #dce6e1;
}


.final-total span {

    color: #334139;

    font-size: 11px;

    font-weight: 900;
}


.final-total strong {

    color: #118f5b;

    font-size: 16px;

    font-weight: 900;
}


/* =====================================================
   PROGRESS
===================================================== */

.progress {

    margin-top: 17px;

    padding: 13px 15px;

    border:
        1px solid #e5ece8;

    border-radius: 13px;
}


.progress-head {

    display: flex;

    justify-content: space-between;

    font-size: 9px;

    color: #56635c;
}


.progress-head span {

    color: #159b64;

    font-weight: 900;
}


.progress-line {

    height: 5px;

    margin-top: 10px;

    overflow: hidden;

    border-radius: 20px;

    background: #e7ede9;
}


.progress-active {

    width: 33.33%;

    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            #149b64,
            #39d58c
        );
}


.steps {

    display: flex;

    justify-content: space-between;

    margin-top: 8px;

    color: #99a39e;

    font-size: 8px;
}


.steps .active {

    color: #149863;

    font-weight: 900;
}


/* =====================================================
   TRUST
===================================================== */

.trust {

    margin-top: 17px;

    padding: 12px;

    display: flex;

    align-items: center;

    gap: 9px;

    border-radius: 12px;

    background: #effaf4;

    border:
        1px solid #dcefe4;
}


.trust-icon {

    font-size: 18px;
}


.trust strong {

    display: block;

    color: #158d5d;

    font-size: 9px;

    margin-bottom: 3px;
}


.trust span {

    color: #7c8982;

    font-size: 8px;
}


/* =====================================================
   FOOTER
===================================================== */

.footer {

    margin-top: 25px;

    padding-top: 12px;

    border-top:
        1px solid #e5ebe8;

    display: flex;

    align-items: center;

    justify-content: space-between;

    color: #929d97;

    font-size: 8px;
}


.footer strong {

    color: #159765;

    font-size: 9px;
}


/* =====================================================
   PRINT
===================================================== */

@page {

    size: A4 portrait;

    margin: 0;
}


@media print {

    html,
    body {

        width: 210mm;

        min-height: 297mm;

        background: white;

    }


    .print-page {

        width: 210mm;

        min-height: 297mm;

        margin: 0;

        padding: 18mm;

        box-shadow: none;

    }
}

</style>

</head>


<body>


<div class="print-page">

    <div class="top-line"></div>


    <!-- HEADER -->

    <div class="header">

        <div class="brand">

            <img
                class="logo"
                src="E-commerce-New/images/dordouneh.jpg"
                alt="دردونه">

            <div class="brand-title">

                <strong>
                    دردونه
                </strong>

                <span>
                    فروشگاه اینترنتی
                </span>

            </div>

        </div>


        <div class="secure">

            <div class="secure-icon">
                ✓
            </div>

            <span>
                پرداخت امن
            </span>

        </div>

    </div>


    <!-- SUCCESS -->

    <div class="success-banner">

        <div class="success-circle">
            ✓
        </div>

        <div class="success-text">

            <strong>
                پرداخت با موفقیت انجام شد
            </strong>

            <span>
                سفارش شما با موفقیت ثبت شد و در حال آماده‌سازی برای ارسال است.
            </span>

        </div>

    </div>


    <!-- META -->

    <div class="meta">

        <div class="meta-box">

            <span>
                شماره سفارش
            </span>

            <strong>
                ${orderId}
            </strong>

        </div>


        <div class="meta-box">

            <span>
                تاریخ پرداخت
            </span>

            <strong>
                ${paymentDate}
            </strong>

        </div>


        <div class="meta-box">

            <span>
                وضعیت پرداخت
            </span>

            <strong class="green">
                موفق ✓
            </strong>

        </div>


        <div class="meta-box">

            <span>
                وضعیت سفارش
            </span>

            <strong>
                ثبت شده
            </strong>

        </div>

    </div>


    <!-- CUSTOMER -->

    <section class="section">

        <div class="section-title">
            👤 اطلاعات خریدار
        </div>


        <div class="customer">

            <div class="customer-item">

                <span>
                    نام و نام خانوادگی
                </span>

                <strong>
                    ${fullname}
                </strong>

            </div>


            <div class="customer-item">

                <span>
                    شماره موبایل
                </span>

                <strong>
                    ${mobile}
                </strong>

            </div>


            <div class="customer-item">

                <span>
                    کد پستی
                </span>

                <strong>
                    ${postalCode}
                </strong>

            </div>


            <div class="customer-item">

                <span>
                    آدرس
                </span>

                <strong>
                    ${address}
                </strong>

            </div>

        </div>

    </section>


    <!-- PRODUCTS -->

    <section class="section">

        <div class="section-title">
            🛍 جزئیات سفارش
        </div>


        <table>

            <thead>

                <tr>

                    <th>
                        محصول
                    </th>

                    <th>
                        تعداد
                    </th>

                    <th>
                        قیمت واحد
                    </th>

                    <th>
                        تخفیف
                    </th>

                    <th>
                        مبلغ
                    </th>

                </tr>

            </thead>


            <tbody>

                ${productsHTML}

            </tbody>

        </table>

    </section>


    <!-- TOTALS -->

    <div class="totals">

        <div class="total-row">

            <span>
                مجموع کالاها
            </span>

            <strong>
                ${total}
            </strong>

        </div>


        <div class="total-row discount-row">

            <span>
                تخفیف
            </span>

            <strong>
                ${discount}
            </strong>

        </div>


        <div class="final-total">

            <span>
                مبلغ نهایی پرداخت شده
            </span>

            <strong>
                ${finalTotal}
            </strong>

        </div>

    </div>


    <!-- PROGRESS -->

    <div class="progress">

        <div class="progress-head">

            <strong>
                مراحل سفارش
            </strong>

            <span>
                ۱ از ۳
            </span>

        </div>


        <div class="progress-line">

            <div class="progress-active"></div>

        </div>


        <div class="steps">

            <span class="active">
                ✓ پرداخت
            </span>

            <span>
                ۲ آماده‌سازی
            </span>

            <span>
                ۳ ارسال
            </span>

        </div>

    </div>


    <!-- TRUST -->

    <div class="trust">

        <span class="trust-icon">
            🔒
        </span>

        <div>

            <strong>
                پرداخت امن و مطمئن
            </strong>

            <span>
                اطلاعات تراکنش شما با امنیت کامل ثبت شده است.
            </span>

        </div>

    </div>


    <!-- FOOTER -->

    <div class="footer">

        <strong>
            دردونه | فروشگاه اینترنتی
        </strong>

        <span>
            ممنون که دردونه را انتخاب کردید ❤️
        </span>

    </div>

</div>


<script>

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                window.focus();

                window.print();

            },
            500
        );

    }
);

window.addEventListener(
    "afterprint",
    function () {

        setTimeout(
            function () {

                window.close();

            },
            300
        );

    }
);

</script>


</body>

</html>

        `);

    printWindow.document.close();
  }

  /* =====================================================
       PRINT BUTTON
    ===================================================== */

  if (printButton) {
    printButton.addEventListener("click", function () {
      openPrintPage();
    });
  }
});
