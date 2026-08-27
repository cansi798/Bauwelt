/* ============================================================
   BAUWELT HANDWERK - Interaktion
   ============================================================ */
(function () {
  "use strict";

  /* ---- Kleiner Helfer ---- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     1) BADKALKULATOR
     ------------------------------------------------------------
     >>> PLATZHALTER-PREISE – bitte durch echte Werte ersetzen. <<<
     Alle Preise als Richtwerte in Euro.
     ============================================================ */
  const PRICING = {
    grundpauschale: 4500,          // fixe Basis (Demontage, Baustelle, Planung)
    proQm: {                       // Preis pro Quadratmeter je Ausstattung
      standard: 2200,
      komfort: 3000,
      premium: 4200
    },
    spanne: 0.10                   // +/- 10 % Preisspanne
  };

  const calcForm = $("#calcForm");
  if (calcForm) {
    const sizeInput = $("#calcSize");
    const sizeOut = $("#sizeOut");
    const priceOut = $("#priceOut");
    const rangeOut = $("#rangeOut");

    const euro = (n) => Math.round(n).toLocaleString("de-DE");

    function recalc() {
      const qm = parseInt(sizeInput.value, 10);
      const tier = ($('input[name="tier"]:checked') || {}).value || "standard";
      const extras = $$('input[name="extra"]:checked')
        .reduce((sum, el) => sum + Number(el.value), 0);

      const base = PRICING.grundpauschale + qm * PRICING.proQm[tier] + extras;
      const low = base * (1 - PRICING.spanne);
      const high = base * (1 + PRICING.spanne);

      sizeOut.textContent = qm + " m²";
      priceOut.textContent = euro(base);
      rangeOut.textContent = `ca. ${euro(low)} € – ${euro(high)} € inkl. Material und Arbeit`;
    }

    calcForm.addEventListener("input", recalc);
    recalc();
  }

  /* ============================================================
     2) REFERENZEN-GALERIE (Platzhalter-Kacheln + Filter)
     ============================================================ */
  const gallery = $("#gallery");
  if (gallery) {
    // Platzhalter-Projekte. Bilder mit KI erstellbar – "prompt" ist die fertige
    // Bildbeschreibung. Alternativ echte Projektfotos (4:3) einsetzen.
    const projects = [
      { title: "Wannenbad in Eiche", place: "Norderstedt", cat: "bad", file: "ref-01-wannenbad.jpg",
        prompt: "Modernes Badezimmer mit freistehender Badewanne, Eichenholz-Möbeln und warmem Licht, fotorealistisch, 4:3" },
      { title: "Bodengleiche Dusche", place: "Hamburg-Nord", cat: "bad", file: "ref-02-bodengleiche-dusche.jpg",
        prompt: "Bad mit großer bodengleicher Regendusche, Glaswand und anthrazitfarbenen Fliesen, hell, 4:3" },
      { title: "Gäste-WC kompakt", place: "Quickborn", cat: "bad", file: "ref-03-gaeste-wc.jpg",
        prompt: "Kleines elegantes Gäste-WC mit Aufsatzwaschbecken und indirekter Beleuchtung, 4:3" },
      { title: "Altbau-Modernisierung", place: "Hamburg", cat: "sanierung", file: "ref-04-altbau.jpg",
        prompt: "Sanierter Altbau-Wohnraum mit Fischgrätparkett, hohen Decken und viel Tageslicht, 4:3" },
      { title: "Wohnung komplett saniert", place: "Kaltenkirchen", cat: "sanierung", file: "ref-05-wohnung.jpg",
        prompt: "Modern sanierte Wohnung, offener Grundriss, neutrale warme Farben, fotorealistisch, 4:3" },
      { title: "Dachsanierung", place: "Henstedt-Ulzburg", cat: "aussen", file: "ref-06-dach.jpg",
        prompt: "Neu eingedecktes Steildach eines Einfamilienhauses, sauber, blauer Himmel, 4:3" }
    ];

    projects.forEach((p) => {
      const tile = document.createElement("figure");
      tile.className = "tile";
      tile.dataset.cat = p.cat;
      // Bild erscheint automatisch, sobald die Datei existiert (siehe BILDER.md).
      // Fehlt sie, entfernt onerror das <img> und der KI-Platzhalter bleibt sichtbar.
      tile.innerHTML = `
        <div class="ph" data-prompt="${p.prompt}">
          <span class="ph__label">
            <span class="ph__ki"><svg width="14" height="14" aria-hidden="true"><use href="#icon-image"/></svg> KI-Bild</span>
            <span class="ph__prompt">${p.prompt}</span>
          </span>
        </div>
        <img class="tile__img" src="assets/img/${p.file}" alt="${p.title}, ${p.place}" loading="lazy" onerror="this.remove()" />
        <figcaption class="tile__overlay">
          <span class="tile__title">${p.title}</span>
          <span class="tile__place">${p.place}</span>
        </figcaption>`;
      gallery.appendChild(tile);
    });

    $$(".filter button").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        $$(".tile", gallery).forEach((t) => {
          t.style.display = f === "all" || t.dataset.cat === f ? "" : "none";
        });
      });
    });
  }

  /* ============================================================
     3) HEADER: schrumpfen beim Scrollen + Zurück-nach-oben
     ============================================================ */
  const header = $(".header");
  const toTop = $(".to-top");
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    );
  }

  /* ============================================================
     4) MOBILES MENÜ
     ============================================================ */
  const burger = $(".burger");
  const menu = $("#mobileMenu");
  if (burger && menu) {
    const close = $(".mobile-menu__close", menu);
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      menu.setAttribute("aria-hidden", String(!open));
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => setOpen(true));
    close.addEventListener("click", () => setOpen(false));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ============================================================
     5) ZAHLEN HOCHZÄHLEN beim Sichtbarwerden (CI 6.3)
     ============================================================ */
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const unit = el.querySelector(".unit");
        const unitHTML = unit ? unit.outerHTML : "";
        if (reduceMotion) {
          el.innerHTML = target + unitHTML;
        } else {
          let n = 0;
          const step = Math.max(1, Math.round(target / 40));
          const tick = () => {
            n = Math.min(target, n + step);
            el.innerHTML = n + unitHTML;
            if (n < target) requestAnimationFrame(tick);
          };
          tick();
        }
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  /* ============================================================
     6) SCROLL-EINBLENDUNG (kurz, CI: keine Dauerschleifen)
     ============================================================ */
  const reveals = $$(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }

  /* ============================================================
     7) KONTAKTFORMULAR (Demo-Validierung ohne Backend)
     ============================================================ */
  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      // TODO: Anbindung an Formular-Backend / E-Mail-Versand.
      $("#formSuccess").classList.add("show");
      contactForm.querySelector("button[type=submit]").disabled = true;
      $("#formSuccess").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  }

  /* ============================================================
     8) FAQ-AKKORDEON (CI 6.6)
     ============================================================ */
  $$(".faq__item").forEach((item) => {
    const q = $(".faq__q", item);
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
    });
  });

  /* ============================================================
     9) Aktueller Menüpunkt + Jahr
     ============================================================ */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navLinks = $$(".nav a");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + id)
          );
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => io.observe(s));
  }
})();
