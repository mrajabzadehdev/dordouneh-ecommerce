/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 9000000,
    title: "کالسکه کودک",
    price: 25000000,
    category: "لوازم کودک",
    discount: 10,
    rating: 3.9,
    image: "/E-commerce-New/images/goods/pish1.webp",
    describe: "",
    salesCount: 1025,
    createdAt: "2026-09-30",
  },

  {
    id: 9000001,
    title: "ایرپاد",
    price: 3500000,
    category: "کالای دیجیتال",
    discount: 25,
    rating: 3.7,
    image: "/E-commerce-New/images/goods/pish2.webp",
    describe: "",
    salesCount: 15,
    createdAt: "2031-09-30",
  },

  {
    id: 9000002,
    title: "لپ تاپ",
    price: 75000000,
    category: "لپ‌تاپ و کامپیوتر",
    discount: 15,
    rating: 5,
    image: "/E-commerce-New/images/goods/pish3.webp",
    describe: "",
    salesCount: 12,
    createdAt: "2020-09-30",
  },

  {
    id: 9000003,
    title: "مانیتور 40 اینچی",
    price: 12000000,
    category: "مانیتور",
    discount: 8,
    rating: 4.8,
    image: "/E-commerce-New/images/goods/pish4.webp",
    describe: "",
    salesCount: 5,
    createdAt: "2027-09-30",
  },

  {
    id: 9000004,
    title: "اسپری مو",
    price: 450000,
    category: "زیبایی و سلامت",
    discount: 25,
    rating: 4.2,
    image: "/E-commerce-New/images/goods/pish5.webp",
    describe: "",
    salesCount: 135,
    createdAt: "2026-07-30",
  },
];

/* =========================================================
   PRODUCTS CONTAINER
========================================================= */

const productsContainer =
  document.querySelector("#products-Container");

function displayProducts(list = products) {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  list.forEach(function (product) {
    productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                        class="product-detail-image"
                        data-id="${product.id}"
                    >

                </div>


                <h3>${product.title}</h3>


                <p class="category">
                    ${product.category}
                </p>


                <div class="rating">
                    ⭐ ${product.rating.toLocaleString("fa-IR")}
                </div>


                <div class="price">
                    ${product.price.toLocaleString("fa-IR")} تومان
                </div>


                <div class="discount1">
                    ${product.discount.toLocaleString("fa-IR")}% تخفیف
                </div>


                <button
                    class="add-to-cart"
                    data-id="${product.id}"
                >
                    افزودن به سبد خرید
                </button>

            </div>

        `;
  });

  productsContainer.innerHTML += `
        <img
            class="shegeft"
            src="/E-commerce-New/images/goods/shegeftangiz1---.jpg"
            alt=""
        >
    `;
}

if (productsContainer) {
  displayProducts();
}

/* =========================================================
   پیشنهادات / محصولات ردیف دوم
========================================================= */

const cardsnew = [
  {
    id: 1,
    title: "قطره خوراکی",
    price: 110000,
    category: "زیبایی و سلامت",
    rating: 3.9,
    describe: "قطره خوراکی کلروفیل مایع ارگانیک و طبیعی",
    image: "/E-commerce-New/images/goods/k1.webp",
    discount: 0,
    salesCount: 105,
    createdAt: "2016-09-30",
  },

  {
    id: 2,
    title: "کرم دست‌ و صورت آرن‌ویدا",
    price: 350000,
    category: "زیبایی و سلامت",
    rating: 3.7,
    describe:
      "مناسب برای پوست های خشک و بدست آمده از عصاره گیاهان",
    image: "/E-commerce-New/images/goods/k2.webp",
    discount: 0,
    salesCount: 145,
    createdAt: "2026-09-10",
  },

  {
    id: 3,
    title: "عسل طبیعی سبلان بسته بندی فلزی",
    price: 1400000,
    category: "مواد غذایی",
    rating: 5,
    describe:
      "با کیفیت و در انواع مختلف و بابسته بندی یک کیلویی",
    image: "/E-commerce-New/images/goods/k4.webp",
    discount: 0,
    salesCount: 250,
    createdAt: "2026-01-30",
  },

  {
    id: 4,
    title: "عسل طبیعی سبلان",
    price: 1050000,
    category: "مواد غذایی",
    rating: 4.8,
    describe:
      "با کیفیت و در انواع مختلف و بابسته بندی نیم کیلویی",
    image: "/E-commerce-New/images/goods/k5.webp",
    discount: 0,
    salesCount: 1,
    createdAt: "2020-09-30",
  },

  {
    id: 5,
    title: "انواع چمدان مسافرتی",
    price: 21000000,
    category: "ورزش و سفر",
    rating: 4.1,
    describe:
      "در مدلهای جدید و بسیار مقاوم و در سایزهای مختلف",
    image: "/E-commerce-New/images/goods/k6.webp",
    discount: 0,
    salesCount: 5,
    createdAt: "2021-09-30",
  },

  {
    id: 6,
    title: "قطره خوراکی",
    price: 110000,
    category: "زیبایی و سلامت",
    rating: 3.9,
    describe: "قطره خوراکی کلروفیل مایع ارگانیک و طبیعی",
    image: "/E-commerce-New/images/goods/k1.webp",
    discount: 0,
    salesCount: 225,
    createdAt: "2027-09-30",
  },

  {
    id: 7,
    title: "کرم دست‌ و صورت آرن‌ویدا",
    price: 350000,
    category: "زیبایی و سلامت",
    rating: 3.7,
    describe:
      "مناسب برای پوست های خشک و بدست آمده از عصاره گیاهان",
    image: "/E-commerce-New/images/goods/k2.webp",
    discount: 0,
    salesCount: 125,
    createdAt: "2026-09-30",
  },

  {
    id: 8,
    title: "عسل طبیعی سبلان بسته بندی فلزی",
    price: 1510000,
    category: "مواد غذایی",
    rating: 5,
    describe:
      "با کیفیت و در انواع مختلف و بابسته بندی یک کیلویی",
    image: "/E-commerce-New/images/goods/k4.webp",
    discount: 0,
    salesCount: 100,
    createdAt: "2025-09-30",
  },

  {
    id: 9,
    title: "عسل طبیعی سبلان",
    price: 1200000,
    category: "مواد غذایی",
    rating: 4.8,
    describe:
      "با کیفیت و در انواع مختلف و بابسته بندی نیم کیلویی",
    image: "/E-commerce-New/images/goods/k5.webp",
    discount: 0,
    salesCount: 1,
    createdAt: "2016-09-30",
  },

  {
    id: 10,
    title: "انواع چمدان مسافرتی",
    price: 20000000,
    category: "ورزش و سفر",
    rating: 4.2,
    describe:
      "در مدلهای جدید و بسیار مقاوم و در سایزهای مختلف",
    image: "/E-commerce-New/images/goods/k6.webp",
    discount: 0,
    salesCount: 0,
    createdAt: "2017-09-30",
  },

  {
    id: 11,
    title: "قطره خوراکی",
    price: 110000,
    category: "بهداشتی و آرایشی",
    rating: 3.9,
    describe: "قطره خوراکی کلروفیل مایع ارگانیک و طبیعی",
    image: "/E-commerce-New/images/goods/k1.webp",
    discount: 0,
    salesCount: 1,
    createdAt: "2027-01-30",
  },

  {
    id: 12,
    title: "کرم دست‌ و صورت آرن‌ویدا",
    price: 350000,
    category: "زیبایی و سلامت",
    rating: 3.7,
    describe:
      "مناسب برای پوست های خشک و بدست آمده از عصاره گیاهان",
    image: "/E-commerce-New/images/goods/k2.webp",
    discount: 0,
    salesCount: 2,
    createdAt: "2026-09-10",
  },

  {
    id: 13,
    title: "عسل طبیعی سبلان بسته بندی فلزی",
    price: 1500000,
    category: "مواد غذایی",
    rating: 5,
    describe:
      "با کیفیت و در انواع مختلف و بابسته بندی یک کیلویی",
    image: "/E-commerce-New/images/goods/k4.webp",
    discount: 0,
    salesCount: 1,
    createdAt: "2027-09-10",
  },

  {
    id: 14,
    title: "عسل طبیعی سبلان",
    price: 1100000,
    category: "مواد غذایی",
    rating: 4.8,
    describe:
      "با کیفیت و در انواع مختلف و بابسته بندی نیم کیلویی",
    image: "/E-commerce-New/images/goods/k5.webp",
    discount: 0,
    salesCount: 5,
    createdAt: "2021-09-30",
  },

  {
    id: 15,
    title: "انواع چمدان مسافرتی",
    price: 22000000,
    category: "ورزش و سفر",
    rating: 4.0,
    describe:
      "در مدلهای جدید و بسیار مقاوم و در سایزهای مختلف",
    image: "/E-commerce-New/images/goods/k6.webp",
    discount: 0,
    salesCount: 12,
    createdAt: "2021-09-02",
  },
];

/* =========================================================
   CARDS NEW CONTAINER
========================================================= */

const cardsnewContainer =
  document.querySelector("#cards-new-Container");

function displaycards(list = cardsnew) {
  if (!cardsnewContainer) return;

  cardsnewContainer.innerHTML = "";

  list.forEach(function (cardsnew1) {
    cardsnewContainer.innerHTML += `

            <div class="card-card">

                <div class="product-img">

                    <img
                        src="${cardsnew1.image}"
                        alt="${cardsnew1.title}"
                        class="product-detail-image"
                        data-id="${cardsnew1.id}"
                    >

                </div>


                <div class="title10">
                    <h3>${cardsnew1.title}</h3>
                </div>


                <div class="describe1">
                    ${cardsnew1.describe}
                </div>


                <div class="rating1">
                    ⭐ ${cardsnew1.rating.toLocaleString("fa-IR")}
                </div>


                <div class="price1">
                    ${cardsnew1.price.toLocaleString("fa-IR")} تومان
                </div>


                <button
                    class="add-to-cart1"
                    data-id="${cardsnew1.id}"
                >
                    افزودن به سبد خرید
                </button>

            </div>

        `;
  });
}

if (cardsnewContainer) {
  displaycards();
}

/* =========================================================
   CART
========================================================= */

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {
  const cartCount =
    document.querySelector("#cart-counter");

  let totalQuantity = 0;

  cart.forEach(function (product) {
    totalQuantity +=
      Number(product.quantity) || 0;
  });

  if (cartCount) {
    cartCount.textContent =
      totalQuantity.toLocaleString("fa-IR");
  }

  // بررسی وضعیت نور سبد
  updateCartGlow();
}

/* =========================================================
   UPDATE CART GLOW
========================================================= */

function updateCartGlow() {
  const cartIcon =
    document.querySelector(".basket999");

  if (!cartIcon) return;

  const currentCart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const hasItems =
    currentCart.length > 0 &&
    currentCart.some(function (product) {
      return Number(product.quantity) > 0;
    });

  if (hasItems) {
    cartIcon.classList.add(
      "cart-has-items"
    );
  } else {
    cartIcon.classList.remove(
      "cart-has-items"
    );
  }
}

/* =========================================================
   ADD TO CART - محصولات اصلی
========================================================= */

const cartButtons0 =
  document.querySelectorAll(
    ".add-to-cart"
  );

cartButtons0.forEach(function (button) {
  button.addEventListener(
    "click",
    function () {
      const productId =
        Number(this.dataset.id);

      const selectedProduct =
        products.find(function (p) {
          return p.id === productId;
        });

      if (!selectedProduct) return;

      const existingProduct =
        cart.find(function (p) {
          return p.id === productId;
        });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          ...selectedProduct,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      updateCartCount();
    }
  );
});

/* =========================================================
   ADD TO CART - پیشنهادات
========================================================= */

const cartButtons1 =
  document.querySelectorAll(
    ".add-to-cart1"
  );

cartButtons1.forEach(function (button) {
  button.addEventListener(
    "click",
    function () {
      const productId =
        Number(this.dataset.id);

      const selectedProduct =
        cardsnew.find(function (p) {
          return p.id === productId;
        });

      if (!selectedProduct) return;

      const existingProduct =
        cart.find(function (p) {
          return p.id === productId;
        });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          ...selectedProduct,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      updateCartCount();
    }
  );
});

/* =========================================================
   PRODUCT DETAILS
========================================================= */

document
  .querySelectorAll(
    ".product-detail-image"
  )
  .forEach(function (image) {
    image.addEventListener(
      "click",
      function () {
        const productId =
          this.dataset.id;

        window.location.href =
          `product-details.html?id=${productId}`;
      }
    );
  });

/* =========================================================
   PROFESSIONAL ADD TO CART ANIMATION
========================================================= */

document.addEventListener(
  "click",
  function (e) {
    const button =
      e.target.closest(
        ".add-to-cart, .add-to-cart1"
      );

    if (!button) return;

    const card =
      button.closest(
        ".product-card, .card-card"
      );

    if (!card) return;

    const titleElement =
      card.querySelector("h3");

    const productTitle =
      titleElement
        ? titleElement.textContent.trim()
        : "محصول";

    /* =====================================================
       1. افکت کارت
    ===================================================== */

    card.classList.remove(
      "cart-added"
    );

    void card.offsetWidth;

    card.classList.add(
      "cart-added"
    );

    /* =====================================================
       2. تغییر دکمه
    ===================================================== */

    const oldText =
      button.textContent;

    button.classList.add(
      "cart-success"
    );

    button.textContent =
      "✓ اضافه شد";

    /* =====================================================
       3. پیدا کردن سبد
    ===================================================== */

    const cartIcon =
      document.querySelector(
        ".basket999"
      );

    const counter =
      document.querySelector(
        "#cart-counter"
      );

    /* =====================================================
       4. توپ نورانی
    ===================================================== */

    if (cartIcon) {
      const buttonRect =
        button.getBoundingClientRect();

      const cartRect =
        cartIcon.getBoundingClientRect();

      const dot =
        document.createElement("div");

      dot.className =
        "cart-fly-dot";

      const startX =
        buttonRect.left +
        buttonRect.width / 2;

      const startY =
        buttonRect.top +
        buttonRect.height / 2;

      const endX =
        cartRect.left +
        cartRect.width / 2;

      const endY =
        cartRect.top +
        cartRect.height / 2;

      dot.style.left =
        startX + "px";

      dot.style.top =
        startY + "px";

      document.body.appendChild(
        dot
      );

      /* =================================================
           حرکت توپ
      ================================================= */

      const animation =
        dot.animate(
          [
            {
              left:
                startX + "px",
              top:
                startY + "px",
              transform:
                "translate(-50%, -50%) scale(1)",
            },

            {
              left:
                (startX + endX) / 2 +
                "px",

              top:
                (startY + endY) / 2 -
                70 +
                "px",

              transform:
                "translate(-50%, -50%) scale(1.35)",
            },

            {
              left:
                endX + "px",

              top:
                endY + "px",

              transform:
                "translate(-50%, -50%) scale(.25)",
            },
          ],
          {
            duration: 650,
            easing:
              "cubic-bezier(.22,.61,.36,1)",
            fill: "forwards",
          }
        );

      /* =================================================
           بعد از رسیدن توپ به سبد
      ================================================= */

      animation.finished.then(
        function () {
          dot.remove();

          cartIcon.classList.remove(
            "cart-bounce"
          );

          void cartIcon.offsetWidth;

          cartIcon.classList.add(
            "cart-bounce"
          );

          if (counter) {
            counter.classList.remove(
              "cart-counter-pop"
            );

            void counter.offsetWidth;

            counter.classList.add(
              "cart-counter-pop"
            );
          }
        }
      );
    }

    /* =====================================================
       5. Toast
    ===================================================== */

    showCartToast(
      `«${productTitle}» به سبد خرید اضافه شد ✓`
    );

    /* =====================================================
       6. برگرداندن متن دکمه
    ===================================================== */

    setTimeout(function () {
      button.classList.remove(
        "cart-success"
      );

      button.textContent =
        oldText;
    }, 1100);

    /* =====================================================
       7. حذف افکت کارت
    ===================================================== */

    setTimeout(function () {
      card.classList.remove(
        "cart-added"
      );
    }, 700);
  }
);

/* =========================================================
   TOAST
========================================================= */

function showCartToast(message) {
  let toast =
    document.querySelector(
      ".cart-toast"
    );

  if (!toast) {
    toast =
      document.createElement("div");

    toast.className =
      "cart-toast success";

    document.body.appendChild(
      toast
    );
  }

  toast.textContent =
    message;

  toast.classList.remove(
    "show"
  );

  void toast.offsetWidth;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    window.cartToastTimer
  );

  window.cartToastTimer =
    setTimeout(function () {
      toast.classList.remove(
        "show"
      );
    }, 2200);
}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    updateCartCount();
  }
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const notificationCount =
      document.querySelector(
        ".notifi-bell-count"
      );

    if (notificationCount) {
      const number =
        Number(
          notificationCount.textContent.trim()
        ) || 0;

      notificationCount.textContent =
        number.toLocaleString("fa-IR");
    }
  }
);