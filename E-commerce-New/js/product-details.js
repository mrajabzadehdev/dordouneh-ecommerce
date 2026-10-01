document.addEventListener("DOMContentLoaded", function () {

  // =========================================
  // دریافت ID محصول از URL
  // =========================================

  const urlParams =
      new URLSearchParams(window.location.search);

  const productId =
      Number(urlParams.get("id"));


  // =========================================
  // ترکیب محصولات
  // =========================================

  const allProducts =
      [...products, ...cardsnew];


  // =========================================
  // ELEMENTS
  // =========================================

  const cartCounter =
      document.querySelector("#cart-counter");

  const cartBox =
      document.querySelector(".cart-box");


  // =========================================
  // دریافت محصول
  // =========================================

  const selectedProduct =
      allProducts.find(function (product) {

          return Number(product.id) === productId;

      });


  // =========================================
  // اگر محصول پیدا نشد
  // =========================================

  if (!selectedProduct) {

      document.querySelector(".product-page").innerHTML = `

          <div style="
              background:white;
              padding:60px;
              text-align:center;
              border-radius:20px;
          ">

              <h2>
                  محصول مورد نظر پیدا نشد.
              </h2>

              <a href="index.html">
                  بازگشت به فروشگاه
              </a>

          </div>

      `;

      return;
  }


  // =========================================
  // CART HELPERS
  // =========================================

  function getCart() {

      return JSON.parse(
          localStorage.getItem("cart")
      ) || [];

  }


  function getTotalQuantity() {

      const cart =
          getCart();

      let totalQuantity = 0;


      cart.forEach(function (product) {

          totalQuantity +=
              Number(product.quantity) || 1;

      });


      return totalQuantity;

  }


  // =========================================
  // UPDATE CART VISUAL
  // دقیقاً مشابه shopping-cart
  // =========================================

  function updateCartVisual() {

      if (!cartBox) {
          return;
      }


      const totalQuantity =
          getTotalQuantity();


      cartBox.classList.toggle(
          "cart-has-items",
          totalQuantity > 0
      );

  }


  // =========================================
  // UPDATE CART COUNTER
  // =========================================

  function updateCartCount(pop = false) {

      if (!cartCounter) {
          return;
      }


      const totalQuantity =
          getTotalQuantity();


      cartCounter.textContent =
          totalQuantity.toLocaleString("fa-IR");


      // =====================================
      // Counter Pop
      // =====================================

      if (pop) {

          cartCounter.classList.remove(
              "cart-counter-pop"
          );


          /*
           * اجرای مجدد Animation
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


  // =========================================
  // FLY TO CART
  // دقیقاً مشابه shopping-cart
  // =========================================

  function flyToCart(sourceElement) {

      if (!sourceElement || !cartBox) {
          return;
      }


      // =====================================
      // موقعیت دکمه
      // =====================================

      const sourceRect =
          sourceElement.getBoundingClientRect();


      // =====================================
      // موقعیت سبد
      // =====================================

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


      // =====================================
      // ساخت توپ نورانی
      // =====================================

      const dot =
          document.createElement("span");


      dot.className =
          "cart-fly-dot";


      dot.style.left =
          `${startX}px`;

      dot.style.top =
          `${startY}px`;


      document.body.appendChild(dot);


      // =====================================
      // انیمیشن حرکت
      // =====================================

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


      // =====================================
      // برخورد با سبد
      // =====================================

      animation.onfinish =
          function () {

              dot.remove();


              cartBox.classList.remove(
                  "cart-bounce"
              );


              /*
               * اجرای مجدد Animation
               */

              void cartBox.offsetWidth;


              cartBox.classList.add(
                  "cart-bounce"
              );


              setTimeout(function () {

                  cartBox.classList.remove(
                      "cart-bounce"
                  );

              }, 750);

          };

  }


  // =========================================
  // نمایش اطلاعات محصول
  // =========================================

  document.querySelector(
      "#product-image"
  ).src =
      selectedProduct.image;


  document.querySelector(
      "#product-image"
  ).alt =
      selectedProduct.title;


  document.querySelector(
      "#thumbnail-image"
  ).src =
      selectedProduct.image;


  document.querySelector(
      "#product-title"
  ).textContent =
      selectedProduct.title;


  document.querySelector(
      "#breadcrumb-title"
  ).textContent =
      selectedProduct.title;


  document.querySelector(
      "#product-category"
  ).textContent =
      selectedProduct.category ||
      "محصول";


  document.querySelector(
      "#product-rating"
  ).textContent =
      selectedProduct.rating ||
      "0";


  document.querySelector(
      "#product-description"
  ).textContent =
      selectedProduct.describe ||
      "توضیحی برای این محصول ثبت نشده است.";


  // =========================================
  // قیمت
  // =========================================

  const price =
      Number(selectedProduct.price) || 0;


  document.querySelector(
      "#product-price"
  ).textContent =
      price.toLocaleString("fa-IR");


  // =========================================
  // تخفیف
  // =========================================

  const discount =
      Number(selectedProduct.discount) || 0;


  document.querySelector(
      "#product-discount"
  ).textContent =
      discount + "% تخفیف";


  // =========================================
  // قیمت قبل از تخفیف
  // =========================================

  const offPrice =
      document.querySelector(
          "#off-price"
      );


  const newPrice =
      document.querySelector(
          "#new-price"
      );


  if (discount > 0) {

      const calculatedOldPrice =
          Math.round(
              price *
              (discount / 100)
          );


      const calculatedNewPrice =
          Math.round(
              price *
              ((100 - discount) / 100)
          );


      offPrice.textContent =
          " تخفیف " +
          calculatedOldPrice.toLocaleString("fa-IR") +
          " تومان";


      newPrice.textContent =
          calculatedNewPrice.toLocaleString("fa-IR") +
          " تومان";

  } else {

      offPrice.style.display =
          "none";

  }


  // =========================================
  // نمایش ستاره
  // =========================================

  const stars =
      document.querySelector(".stars");


  const rating =
      Number(
          String(selectedProduct.rating)
              .replace(",", ".")
      ) || 0;


  const roundedRating =
      Math.round(rating);


  stars.textContent =
      "★".repeat(roundedRating) +
      "☆".repeat(5 - roundedRating);


  // =========================================
  // خواندن سبد خرید
  // =========================================

  let cart =
      getCart();


  // =========================================
  // پیدا کردن محصول در سبد
  // =========================================

  let cartProduct =
      cart.find(function (item) {

          return (
              Number(item.id) ===
              productId
          );

      });


  // =========================================
  // تعداد اولیه
  // =========================================

  let quantity = 1;


  if (cartProduct) {

      quantity =
          Number(cartProduct.quantity) ||
          1;

  }


  // =========================================
  // نمایش تعداد
  // =========================================

  document.querySelector(
      "#quantity"
  ).textContent =
      quantity.toLocaleString("fa-IR");


  // =========================================
  // افزایش تعداد
  // =========================================

  document.querySelector(
      "#increase"
  ).addEventListener(
      "click",
      function () {

          quantity++;


          document.querySelector(
              "#quantity"
          ).textContent =
              quantity.toLocaleString("fa-IR");

      }
  );


  // =========================================
  // کاهش تعداد
  // =========================================

  document.querySelector(
      "#decrease"
  ).addEventListener(
      "click",
      function () {

          if (quantity > 1) {

              quantity--;


              document.querySelector(
                  "#quantity"
              ).textContent =
                  quantity.toLocaleString("fa-IR");

          }

      }
  );


  // =========================================
  // ADD TO CART
  // =========================================

  document.querySelector(
      "#add-to-cart"
  ).addEventListener(
      "click",
      function () {

          // =================================
          // دوباره خواندن LocalStorage
          // =================================

          cart =
              getCart();


          // =================================
          // پیدا کردن محصول
          // =================================

          const existingProduct =
              cart.find(function (item) {

                  return (
                      Number(item.id) ===
                      productId
                  );

              });


          if (existingProduct) {

              existingProduct.quantity =
                  quantity;

          } else {

              cart.push({

                  ...selectedProduct,

                  quantity:
                      quantity

              });

          }


          // =================================
          // ذخیره سبد
          // =================================

          localStorage.setItem(
              "cart",
              JSON.stringify(cart)
          );


          // =================================
          // انیمیشن توپ
          // =================================

          const button =
              document.querySelector(
                  "#add-to-cart"
              );


          flyToCart(button);


          // =================================
          // آپدیت Header
          // =================================

          updateCartCount(true);


          // =================================
          // تغییر حالت دکمه
          // =================================

          button.classList.add(
              "cart-success"
          );


          button.textContent =
              "✓ به سبد خرید اضافه شد";


          setTimeout(function () {

              button.classList.remove(
                  "cart-success"
              );


              button.textContent =
                  "🛒 افزودن به سبد خرید";

          }, 1800);

      }
  );


  // =========================================
  // BUY NOW
  // =========================================

  document.querySelector(
      "#buy-now"
  ).addEventListener(
      "click",
      function () {

          cart =
              getCart();


          const existingProduct =
              cart.find(function (item) {

                  return (
                      Number(item.id) ===
                      productId
                  );

              });


          if (existingProduct) {

              existingProduct.quantity =
                  quantity;

          } else {

              cart.push({

                  ...selectedProduct,

                  quantity:
                      quantity

              });

          }


          localStorage.setItem(
              "cart",
              JSON.stringify(cart)
          );


          window.location.href =
              "checkout.html";

      }
  );


  // =========================================
  // HEADER CART CLICK
  // =========================================

  if (cartBox) {

      cartBox.addEventListener(
          "click",
          function () {

              /*
               * ابتدا Bounce
               */

              cartBox.classList.remove(
                  "cart-bounce"
              );


              void cartBox.offsetWidth;


              cartBox.classList.add(
                  "cart-bounce"
              );


              /*
               * رفتن به سبد خرید
               */

              setTimeout(function () {

                  window.location.href =
                      "shopping-cart.html";

              }, 250);

          }
      );


      // =====================================
      // Enter / Space
      // =====================================

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


  // =========================================
  // INITIAL CART HEADER
  // =========================================

  updateCartCount(false);

});
