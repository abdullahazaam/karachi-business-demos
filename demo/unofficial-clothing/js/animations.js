/**
 * Unofficial Clothing - Karachi
 * Scroll Reveals, Sticky Header Transition, and Animations
 */

(function () {
  "use strict";

  // Sticky Header Scroll Transition
  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;

    function handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 24) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Robust Scroll Reveals with In-Viewport Fast Path
  let revealObserver = null;

  function observeNewElements() {
    const targets = document.querySelectorAll(".reveal-on-scroll:not(.revealed)");
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const vh = window.innerHeight || 900;
    const viewBottom = scrollY + vh + 350;

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      const elemTop = rect.top + scrollY;
      if (elemTop <= viewBottom || rect.top <= vh + 200) {
        target.classList.add("revealed");
      } else if (revealObserver) {
        revealObserver.observe(target);
      }
    });
  }

  function initScrollReveals() {
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "50px 0px 100px 0px",
          threshold: 0.05
        }
      );
    }

    // Run immediate check
    observeNewElements();
    setTimeout(() => {
      document.documentElement.classList.add("has-scroll-anim");
    }, 150);

    // Check again on scroll, resize, and hashchange
    window.addEventListener("scroll", observeNewElements, { passive: true });
    window.addEventListener("resize", observeNewElements, { passive: true });
    window.addEventListener("hashchange", () => {
      setTimeout(observeNewElements, 100);
      setTimeout(observeNewElements, 350);
    });
  }

  // Smooth in-page anchor scrolling with offset
  function initAnchorScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "" || href.startsWith("#demo-")) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const header = document.getElementById("site-header");
          const announcement = document.querySelector(".announcement-bar");
          const offset = (header ? header.offsetHeight : 70) + (announcement ? announcement.offsetHeight : 34) + 10;

          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Ensure revealed
          setTimeout(observeNewElements, 300);
        }
      });
    });
  }

  // Expose global observer refresher
  window.observeNewElements = observeNewElements;

  // Init
  function init() {
    initHeaderScroll();
    initScrollReveals();
    initAnchorScrolling();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Extra fallback after complete asset load
  window.addEventListener("load", () => {
    setTimeout(observeNewElements, 100);
    setTimeout(observeNewElements, 500);
  });
})();
