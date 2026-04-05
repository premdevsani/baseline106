/* ============================================
   BASELINE — JavaScript Features
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // 1. MOBILE NAVIGATION TOGGLE
  // ============================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // ============================
  // 2. STICKY NAV SCROLL EFFECT
  // ============================
  const topNav = document.querySelector(".top-nav");
  if (topNav) {
    window.addEventListener("scroll", () => {
      topNav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // ============================
  // 3. BACK-TO-TOP BUTTON
  // ============================
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ============================
  // 4. SCROLL REVEAL ANIMATIONS
  // ============================
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ============================
  // 5. TYPEWRITER EFFECT (Home)
  // ============================
  const typewriterEl = document.querySelector(".typewriter-text");
  if (typewriterEl) {
    const phrases = [
      "Elegance Redefined.",
      "Crafted for the Bold.",
      "Luxury Meets Innovation.",
      "Timeless Fashion, Modern Soul.",
      "Where Style Speaks.",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typewrite() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.innerHTML =
          currentPhrase.substring(0, charIndex - 1) +
          '<span class="typewriter-cursor">|</span>';
        charIndex--;
      } else {
        typewriterEl.innerHTML =
          currentPhrase.substring(0, charIndex + 1) +
          '<span class="typewriter-cursor">|</span>';
        charIndex++;
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }

      setTimeout(typewrite, delay);
    }

    setTimeout(typewrite, 1200);
  }

  // ============================
  // 6. ANIMATED COUNTER (Stats)
  // ============================
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute("data-target");
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          function updateCounter() {
            current += increment;
            if (current < target) {
              entry.target.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.textContent =
                target + (entry.target.dataset.suffix || "");
            }
          }

          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterObserver.observe(c));

  // ============================
  // 7. PRODUCT FILTER (Products)
  // ============================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      productCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
          card.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ============================
  // 8. QUICK VIEW MODAL (Products)
  // ============================
  const quickViewBtns = document.querySelectorAll(".quick-view");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");

  if (modalOverlay) {
    quickViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        const name = card.querySelector("h4").textContent;
        const price = card.querySelector(".price").textContent;
        const img = card.querySelector(".image-wrapper img").src;

        document.getElementById("modal-img").src = img;
        document.getElementById("modal-name").textContent = name;
        document.getElementById("modal-price").textContent = price;

        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    modalClose?.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    function closeModal() {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // ============================
  // 9. EVENT COUNTDOWN TIMERS
  // ============================
  const countdowns = document.querySelectorAll(".event-countdown");

  function updateCountdowns() {
    countdowns.forEach((cd) => {
      const targetDate = new Date(cd.dataset.date).getTime();
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        cd.innerHTML =
          '<span style="color:var(--color-secondary); font-weight:600;">Event has started!</span>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      cd.querySelector(".cd-days").textContent = days;
      cd.querySelector(".cd-hours").textContent = hours;
      cd.querySelector(".cd-mins").textContent = mins;
      cd.querySelector(".cd-secs").textContent = secs;
    });
  }

  if (countdowns.length > 0) {
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
  }

  // ============================
  // 10. FORM VALIDATION (Contact)
  // ============================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      contactForm.querySelectorAll(".form-group").forEach((g) => {
        g.classList.remove("has-error", "success");
      });

      // Validate Name
      const name = document.getElementById("inp-name");
      if (name.value.trim().length < 2) {
        showError(name, "Please enter your full name");
        isValid = false;
      } else {
        markSuccess(name);
      }

      // Validate Email
      const email = document.getElementById("inp-email");
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) {
        showError(email, "Please enter a valid email address");
        isValid = false;
      } else {
        markSuccess(email);
      }

      // Validate Phone
      const phone = document.getElementById("inp-phone");
      if (phone.value.trim().length < 7) {
        showError(phone, "Please enter a valid phone number");
        isValid = false;
      } else {
        markSuccess(phone);
      }

      // Validate Subject
      const subject = document.getElementById("inp-subject");
      if (!subject.value) {
        showError(subject, "Please select a subject");
        isValid = false;
      } else {
        markSuccess(subject);
      }

      // Validate Date
      const date = document.getElementById("inp-date");
      if (date && date.value) {
        const selected = new Date(date.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          showError(date, "Please select a future date");
          isValid = false;
        } else {
          markSuccess(date);
        }
      }

      // Validate Message
      const message = document.getElementById("inp-message");
      if (message.value.trim().length < 10) {
        showError(message, "Message must be at least 10 characters");
        isValid = false;
      } else {
        markSuccess(message);
      }

      if (isValid) {
        showToast("Your inquiry has been submitted successfully!", "success");
        contactForm.reset();
        contactForm.querySelectorAll(".form-group").forEach((g) => {
          g.classList.remove("success");
        });
      }
    });

    function showError(input, msg) {
      const group = input.closest(".form-group");
      group.classList.add("has-error");
      const errEl = group.querySelector(".error-msg");
      if (errEl) errEl.textContent = msg;
    }

    function markSuccess(input) {
      input.closest(".form-group").classList.add("success");
    }
  }

  // ============================
  // 11. TOAST NOTIFICATIONS
  // ============================
  window.showToast = function (message, type = "") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // ============================
  // 12. CURRENT YEAR IN FOOTER
  // ============================
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ============================
  // 13. DARK MODE TOGGLE (All pages)
  // ============================
  const darkToggle = document.getElementById("dark-mode-toggle");
  if (darkToggle) {
    // Check saved preference
    if (localStorage.getItem("baseline-dark") === "true") {
      document.body.classList.add("dark-mode");
      darkToggle.textContent = "☀️";
    }

    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("baseline-dark", isDark);
      darkToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // ============================
  // 14. IMAGE LAZY LOADING
  // ============================
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // ============================
  // 15. TRUSTEE CARD HOVER SOUND (About - fun JS feature)
  // ============================
  const trusteeCards = document.querySelectorAll(".trustee-card");
  trusteeCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
    });
  });

  // ============================
  // 16. DOM TREE TOGGLE (DOM Page)
  // ============================
  const domNodes = document.querySelectorAll(".dom-node[data-expandable]");
  domNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const children = node.nextElementSibling;
      if (children && children.classList.contains("dom-branch-children")) {
        children.classList.toggle("collapsed");
        node.classList.toggle("expanded");
      }
    });
  });

  // ============================
  // 17. ACTIVE NAV LINK HIGHLIGHT
  // ============================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // ============================
  // 18. REAL-TIME CLOCK (All pages via marquee)
  // ============================
  const clockEl = document.getElementById("live-clock");
  if (clockEl) {
    function updateClock() {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
    updateClock();
    setInterval(updateClock, 1000);
  }
});
