// انتقال به سبد خرید

document.querySelectorAll(".basket999, .tooltip1, .cart-counter").forEach(button => {

    button.addEventListener("click", () => {

        window.location.href = "shopping-cart.html";

    });

});