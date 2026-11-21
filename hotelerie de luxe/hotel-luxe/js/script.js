/* =========================================================
   MAISON ÉLYSIA — Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Préchargement ---------- */
  const hidePreloader = () => {
    $("#preloader").classList.add("hidden");
    document.body.classList.add("loaded");
  };
  window.addEventListener("load", () => setTimeout(hidePreloader, 600));
  setTimeout(hidePreloader, 3500); // sécurité si une image tarde

  /* ---------- Année du footer ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
  };

  /* ---------- Header au défilement + retour en haut ---------- */
  const header = $("#header");
  const backTop = $("#backTop");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 60);
    backTop.classList.toggle("visible", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Menu mobile ---------- */
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");
  const toggleMenu = (force) => {
    const open = force ?? !navMenu.classList.contains("open");
    navMenu.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
    document.body.classList.toggle("no-scroll", open);
  };
  navToggle.addEventListener("click", () => toggleMenu());
  $$("a", navMenu).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Lien actif selon la section ---------- */
  const navLinks = $$(".nav__link");
  const sections = navLinks
    .map((l) => $(l.getAttribute("href")))
    .filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Diaporama hero ---------- */
  const slides = $$(".hero__slide");
  const dots = $$("#heroDots button");
  let current = 0;
  let heroTimer;
  const goToSlide = (i) => {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  };
  const startHero = () => {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goToSlide(current + 1), 6000);
  };
  dots.forEach((d, i) => d.addEventListener("click", () => { goToSlide(i); startHero(); }));
  startHero();

  /* ---------- Apparition au défilement ---------- */
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    revealObs.observe(el);
  });

  /* ---------- Compteurs animés ---------- */
  const counterObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const duration = 1800;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("fr-FR");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => counterObs.observe(el));

  /* ---------- Filtres des suites ---------- */
  const filters = $$(".filter");
  const rooms = $$(".room");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      rooms.forEach((room) => {
        const show = cat === "all" || room.dataset.category === cat;
        room.classList.toggle("hide", !show);
      });
    })
  );

  /* ---------- Parallaxe gastronomie ---------- */
  const gastroBg = $(".gastronomy__bg");
  const gastro = $(".gastronomy");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    window.addEventListener(
      "scroll",
      () => {
        const rect = gastro.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = (rect.top - window.innerHeight / 2) * -0.15;
        gastroBg.style.transform = `translateY(${offset}px)`;
      },
      { passive: true }
    );
  }

  /* ---------- Galerie + lightbox ---------- */
  const galleryImgs = $$(".gallery__item img");
  const lightbox = $("#lightbox");
  const lbImg = $("#lightboxImg");
  let lbIndex = 0;

  const showLb = (i) => {
    lbIndex = (i + galleryImgs.length) % galleryImgs.length;
    const img = galleryImgs[lbIndex];
    lbImg.src = img.src.replace(/w=\d+/, "w=1800");
    lbImg.alt = img.alt;
  };
  const openLb = (i) => {
    showLb(i);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };
  const closeLb = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  galleryImgs.forEach((img, i) => img.parentElement.addEventListener("click", () => openLb(i)));
  $("#lightboxClose").addEventListener("click", closeLb);
  $("#lightboxPrev").addEventListener("click", () => showLb(lbIndex - 1));
  $("#lightboxNext").addEventListener("click", () => showLb(lbIndex + 1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
  });

  /* ---------- Témoignages ---------- */
  const testis = $$(".testimonial");
  const testiCount = $("#testiCount");
  let tIndex = 0;
  let testiTimer;
  const pad = (n) => String(n).padStart(2, "0");
  const showTesti = (i) => {
    testis[tIndex].classList.remove("active");
    tIndex = (i + testis.length) % testis.length;
    testis[tIndex].classList.add("active");
    testiCount.textContent = `${pad(tIndex + 1)} / ${pad(testis.length)}`;
  };
  const startTesti = () => {
    clearInterval(testiTimer);
    testiTimer = setInterval(() => showTesti(tIndex + 1), 7000);
  };
  $("#prevTesti").addEventListener("click", () => { showTesti(tIndex - 1); startTesti(); });
  $("#nextTesti").addEventListener("click", () => { showTesti(tIndex + 1); startTesti(); });
  startTesti();

  /* ---------- Dates : minimum = aujourd'hui ---------- */
  const toISO = (d) => {
    const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().split("T")[0];
  };
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);

  const linkDates = (arrival, departure) => {
    arrival.min = toISO(today);
    departure.min = toISO(tomorrow);
    arrival.addEventListener("change", () => {
      if (!arrival.value) return;
      const next = new Date(arrival.value);
      next.setDate(next.getDate() + 1);
      departure.min = toISO(next);
      if (!departure.value || departure.value <= arrival.value) departure.value = toISO(next);
      departure.dispatchEvent(new Event("change"));
    });
  };

  const qbArrival = $("#qbArrival");
  const qbDeparture = $("#qbDeparture");
  const arrival = $("#arrival");
  const departure = $("#departure");
  linkDates(qbArrival, qbDeparture);
  linkDates(arrival, departure);

  /* ---------- Réservation rapide → formulaire complet ---------- */
  $("#quickBook").addEventListener("submit", (e) => {
    e.preventDefault();
    arrival.value = qbArrival.value;
    departure.value = qbDeparture.value;
    $("#guests").value = $("#qbGuests").value;
    arrival.dispatchEvent(new Event("change"));
    updateSummary();
    $("#reservation").scrollIntoView({ behavior: "smooth" });
    showToast("Excellentes dates ! Complétez votre demande ci-dessous.");
  });

  /* ---------- Bouton "Réserver" d'une suite → pré-sélection ---------- */
  const roomSelect = $("#room");
  $$(".room__link").forEach((link) =>
    link.addEventListener("click", () => {
      roomSelect.value = link.dataset.room;
      updateSummary();
    })
  );

  /* ---------- Résumé du prix ---------- */
  const sumNights = $("#sumNights");
  const sumTotal = $("#sumTotal");
  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  function getNights() {
    if (!arrival.value || !departure.value) return 0;
    const diff = (new Date(departure.value) - new Date(arrival.value)) / 86400000;
    return diff > 0 ? Math.round(diff) : 0;
  }
  function updateSummary() {
    const nights = getNights();
    const price = +roomSelect.selectedOptions[0].dataset.price;
    sumNights.textContent = nights ? `${nights} nuit${nights > 1 ? "s" : ""}` : "—";
    sumTotal.textContent = nights ? euro.format(nights * price) : "—";
  }
  [arrival, departure, roomSelect].forEach((el) => el.addEventListener("change", updateSummary));

  /* ---------- Validation du formulaire ---------- */
  const form = $("#bookingForm");
  const setError = (input, msg) => {
    const group = input.closest(".form-group");
    group.classList.toggle("invalid", !!msg);
    $(".error", group).textContent = msg || "";
  };

  const validators = {
    name: (v) => (v.trim().length < 2 ? "Merci d'indiquer votre nom." : ""),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Adresse e-mail invalide."),
    arrival: (v) => (v ? "" : "Choisissez une date d'arrivée."),
    departure: (v) => {
      if (!v) return "Choisissez une date de départ.";
      return getNights() > 0 ? "" : "Le départ doit suivre l'arrivée.";
    },
  };

  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => setError(input, validators[name](input.value)));
    input.addEventListener("input", () => {
      if (input.closest(".form-group").classList.contains("invalid")) {
        setError(input, validators[name](input.value));
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(validators).forEach((name) => {
      const input = form.elements[name];
      const msg = validators[name](input.value);
      setError(input, msg);
      if (msg) valid = false;
    });
    if (!valid) {
      showToast("Merci de vérifier les champs indiqués.");
      return;
    }
    const firstName = form.elements.name.value.trim().split(" ")[0];
    showToast(`Merci ${firstName} ! Notre conciergerie vous contactera sous 24 h.`);
    form.reset();
    updateSummary();
  });

  /* ---------- Newsletter ---------- */
  $("#newsletter").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Bienvenue dans le cercle privilège de Maison Élysia.");
  });
});
