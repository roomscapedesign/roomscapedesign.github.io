/* ===== 如沐空间官网 - 交互脚本 ===== */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");

  /* ---- 滚动时导航栏加阴影 ---- */
  function onScroll() {
    header.classList.toggle("header--scrolled", window.scrollY > 10);

    /* 高亮当前 section 对应的导航链接 */
    let current = "";
    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- 移动端菜单 ---- */
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  /* 点击导航链接后关闭菜单 */
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("show");
    });
  });

  /* ---- FAQ accordion: 手风琴效果(可选) ---- */
  /* 目前用原生 details，如需手风琴取消下面注释 */
  /*
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (this.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
  */

  /* ---- 表单提交 ---- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Netlify 表单会自动处理，这里只是给用户反馈 */
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "正在提交...";
      submitBtn.disabled = true;

      /* 模拟提交（实际部署关联 Netlify Forms 后无需此段） */
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(contactForm)).toString(),
      })
        .then(function () {
          submitBtn.textContent = "已提交，我们会尽快联系你";
          submitBtn.style.background = "#4a9e5c";
          submitBtn.style.borderColor = "#4a9e5c";
          contactForm.reset();
        })
        .catch(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        })
        .finally(function () {
          setTimeout(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = "";
            submitBtn.style.borderColor = "";
          }, 3000);
        });
    });
  }
});
