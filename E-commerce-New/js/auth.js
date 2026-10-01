document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // عناصر صفحه
  // =========================

  const loginTab = document.querySelector("#loginTab");
  const registerTab = document.querySelector("#registerTab");

  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");
  const forgotForm = document.querySelector("#forgotForm");

  const loginbtn = document.querySelector("#loginbtn");
  const registerbtn = document.querySelector("#registerbtn");

  const loginMobile = document.querySelector("#loginMobile");
  const loginPassword = document.querySelector("#loginPassword");

  const registerName = document.querySelector("#registerName");
  const registerMobile = document.querySelector("#registerMobile");
  const registerPassword = document.querySelector("#registerPassword");
  const confirmPassword = document.querySelector("#confirmPassword");

  const forgotPassword = document.querySelector("#forgotPassword");

  const forgotMobile = document.querySelector("#forgotMobile");
  const fnewPassword = document.querySelector("#fnewPassword");
  const fconfirmNewPassword =
    document.querySelector("#fconfirmNewPassword");

  const changePassword =
    document.querySelector("#changePassword");


  // =========================
  // تب ثبت نام
  // =========================

  registerTab.addEventListener("click", function () {

    loginForm.classList.add("hidden");
    forgotForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.add("active");

    registerName.focus();

  });


  // =========================
  // تب ورود
  // =========================

  loginTab.addEventListener("click", function () {

    registerForm.classList.add("hidden");
    forgotForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

    registerTab.classList.remove("active");
    loginTab.classList.add("active");

    loginMobile.focus();

  });


  // =========================
  // فراموشی رمز عبور
  // =========================

  forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");

    forgotForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.remove("active");

    forgotMobile.focus();

  });


  // =========================
  // بررسی URL
  // =========================

  const urlParams =
    new URLSearchParams(window.location.search);


  // =========================
  // ورود مستقیم به ثبت نام
  // auth.html?register=true
  // =========================

  if (urlParams.get("register") === "true") {

    loginForm.classList.add("hidden");
    forgotForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.add("active");

    registerName.focus();

  }


  // =========================
  // ورود مستقیم به بازیابی رمز
  // auth.html?forgot=true
  // =========================

  else if (urlParams.get("forgot") === "true") {

    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");

    forgotForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.remove("active");

    forgotMobile.focus();

  }


  // =========================
  // حالت عادی
  // =========================

  else {

    loginMobile.focus();

  }


  // =========================
  // ورود
  // =========================

  loginbtn.addEventListener("click", function (event) {

    event.preventDefault();


    if (loginMobile.value.trim() === "") {

      alert("موبایل خالی است");
      return;

    }


    if (loginPassword.value.trim() === "") {

      alert("پسورد خالی است");
      return;

    }


    const mobileuser =
      localStorage.getItem("dordouneh-mobile");

    const nameuser =
      localStorage.getItem("dordouneh-Name");

    const pwuser =
      localStorage.getItem("dordouneh-pw");


    if (
      mobileuser === loginMobile.value &&
      pwuser === loginPassword.value
    ) {

      localStorage.setItem(
        "dordouneh-login",
        "true"
      );

      alert(
        nameuser +
        " شما با موفقیت وارد اشتراک خود شده اید"
      );

    } else {

      alert(
        "نام کاربری یا کلمه عبور صحیح نمی باشد"
      );

    }


    loginMobile.value = "";
    loginPassword.value = "";

  });


  // =========================
  // ثبت نام
  // =========================

  registerbtn.addEventListener("click", function (event) {

    event.preventDefault();


    if (registerName.value.trim() === "") {

      alert("نام خالی است");
      return;

    }


    if (registerMobile.value.trim() === "") {

      alert("موبایل خالی است");
      return;

    }


    if (registerPassword.value.trim() === "") {

      alert("پسورد خالی است");
      return;

    }


    if (confirmPassword.value.trim() === "") {

      alert("تکرار پسورد خالی است");
      return;

    }


    if (
      registerPassword.value.trim() !==
      confirmPassword.value.trim()
    ) {

      alert(
        "پسورد با تکرارش یکسان نمی باشد"
      );

      return;

    }


    localStorage.setItem(
      "dordouneh-mobile",
      registerMobile.value
    );

    localStorage.setItem(
      "dordouneh-pw",
      registerPassword.value
    );

    localStorage.setItem(
      "dordouneh-Name",
      registerName.value
    );


    alert(
      "ثبت نام با موفقیت انجام شد"
    );


    registerName.value = "";
    registerMobile.value = "";
    registerPassword.value = "";
    confirmPassword.value = "";

  });


  // =========================
  // تغییر رمز عبور
  // =========================

  changePassword.addEventListener(
    "click",
    function (event) {

      event.preventDefault();


      const enteredMobile =
        forgotMobile.value.trim();

      const newPassword =
        fnewPassword.value.trim();

      const confirmNewPassword =
        fconfirmNewPassword.value.trim();


      const savedMobile =
        localStorage.getItem(
          "dordouneh-mobile"
        );


      if (enteredMobile === "") {

        alert(
          "شماره موبایل را وارد کنید"
        );

        return;

      }


      if (newPassword === "") {

        alert(
          "رمز عبور جدید را وارد کنید"
        );

        return;

      }


      if (confirmNewPassword === "") {

        alert(
          "تکرار رمز عبور را وارد کنید"
        );

        return;

      }


      if (enteredMobile !== savedMobile) {

        alert(
          "شماره موبایل پیدا نشد"
        );

        return;

      }


      if (
        newPassword !== confirmNewPassword
      ) {

        alert(
          "رمزهای عبور یکسان نیستند"
        );

        return;

      }


      localStorage.setItem(
        "dordouneh-pw",
        newPassword
      );


      alert(
        "رمز عبور با موفقیت تغییر کرد"
      );


      forgotMobile.value = "";
      fnewPassword.value = "";
      fconfirmNewPassword.value = "";

    }
  );

});