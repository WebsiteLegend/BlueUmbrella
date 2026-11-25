/* ============================================================
   main.js — renders the page from js/content.js.
   You should not need to edit this file to change content.
   ============================================================ */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return ESC[c]; }); };
  var byId = function (id) { return document.getElementById(id); };

  function setText(id, value) {
    var el = byId(id);
    if (el) el.textContent = value == null ? "" : value;
  }
  function setHTML(id, value) {
    var el = byId(id);
    if (el) el.innerHTML = value;
  }

  /* ---------- links ---------- */
  function whatsappLink(message) {
    if (!S.business.whatsapp) return "";
    var text = message || S.business.whatsappMessage || "";
    return S.business.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  function resolve(href) {
    if (!href) return "";
    switch (href) {
      case "auto:phone": return S.business.phoneTel;
      case "auto:maps": return S.business.googleMaps;
      case "auto:directions": return S.business.directions;
      case "auto:whatsapp": return whatsappLink();
      case "auto:review": return S.business.googleReview;
      default: return href;
    }
  }

  function setLink(id, href, label) {
    var el = byId(id);
    if (!el) return;
    var url = resolve(href);
    if (url) {
      el.href = url;
      el.hidden = false;
      if (/^https?:/i.test(url) && el.target !== "_blank") {
        el.target = "_blank";
        el.rel = "noopener";
      }
    } else {
      el.removeAttribute("href");
      el.hidden = true;
    }
    if (label != null) el.textContent = label;
  }

  /* ---------- images ---------- */
  function loadImage(img, src, alt) {
    if (!img) return;
    if (!src) {
      img.removeAttribute("src");
      if (img.parentElement) img.parentElement.classList.add("no-image");
      return;
    }
    img.alt = alt || "";
    img.addEventListener("error", function () {
      img.style.display = "none";
      if (img.parentElement) img.parentElement.classList.add("no-image");
    }, { once: true });
    img.src = src;
  }

  /* ---------- opening status ---------- */
  function getStatus() {
    var h = S.visit.hours;
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    var openM = h.openHour * 60;
    var closeM = h.closeHour * 60;
    var open = closeM <= openM ? (mins >= openM || mins < closeM) : (mins >= openM && mins < closeM);
    return {
      open: open,
      label: open ? "Open now · closes " + h.closeLabel : "Closed now · opens " + h.openLabel
    };
  }

  function paintStatus() {
    var status = getStatus();
    [["heroStatus", "heroStatusText"], ["drawerStatus", "drawerStatusText"]].forEach(function (pair) {
      var wrap = byId(pair[0]);
      if (!wrap) return;
      wrap.classList.toggle("is-open", status.open);
      wrap.classList.toggle("is-closed", !status.open);
      setText(pair[1], status.label);
    });
  }

  /* ============================================================
     HEADER / NAV
     ============================================================ */
  function initHeader() {
    setText("brandName", S.business.shortName);
    setText("brandSub", S.business.category);
    setText("headerCallLabel", "Call");
    byId("headerCall").setAttribute("aria-label", "Call " + S.business.name + " on " + S.business.phone);
    byId("headerCall").href = S.business.phoneTel;
    byId("fab").href = S.business.phoneTel;
    byId("mobileCall").href = S.business.phoneTel;
    byId("mobileDir").href = S.business.directions;
    byId("fab").setAttribute("aria-label", "Call " + S.business.name + " on " + S.business.phone);
    byId("drawerCall").href = S.business.phoneTel;
    byId("drawerCall").textContent = "Call " + S.business.phone;
    byId("drawerDir").href = S.business.directions;

    var nav = byId("navLinks");
    var drawerNav = byId("drawerNav");

    S.nav.forEach(function (item, i) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      nav.appendChild(a);

      var d = document.createElement("a");
      d.href = item.href;
      d.className = "drawer-link";
      d.innerHTML = '<span class="drawer-num">0' + (i + 1) + "</span>" + esc(item.label);
      drawerNav.appendChild(d);
    });

    var drawerStatus = document.createElement("span");
    drawerStatus.className = "status drawer-status";
    drawerStatus.id = "drawerStatus";
    drawerStatus.innerHTML = '<span class="dot" aria-hidden="true"></span><span id="drawerStatusText"></span>';
    drawerNav.appendChild(drawerStatus);
  }

  function initDrawer() {
    var toggle = byId("navToggle");
    var drawer = byId("drawer");
    var body = document.body;

    function setOpen(open) {
      drawer.classList.toggle("open", open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      body.classList.toggle("no-scroll", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(!drawer.classList.contains("open"));
    });

    $$("#drawer a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && drawer.classList.contains("open")) setOpen(false);
    });
  }

  function initScrollState() {
    var header = byId("siteHeader");
    var ticking = false;

    function update() {
      header.classList.toggle("scrolled", window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();

    /* active nav link */
    var links = $$("#navLinks a");
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ============================================================
     HERO
     ============================================================ */
  function initHero() {
    var h = S.hero;
    setText("heroEyebrow", h.eyebrow);
    setText("heroLine1", h.titleLine1);
    setText("heroLine2", h.titleLine2);
    setText("heroSub", h.subtitle);
    setLink("heroPrimary", h.ctaPrimary.href, h.ctaPrimary.label);
    setLink("heroSecondary", h.ctaSecondary.href, h.ctaSecondary.label);
    loadImage(byId("heroImage"), h.image, h.imageAlt);

    setText("factRating", "★ " + S.business.rating + " · " + S.business.reviewCount + " reviews");
    setText("factHours", S.visit.hours.openLabel + " – " + S.visit.hours.closeLabel);
    setText("factArea", S.business.area);
    setText("heroNoteTitle", h.noteTitle);
    setText("heroNoteText", S.business.address);
    paintStatus();
  }

  function initTicker() {
    var track = byId("tickerTrack");
    if (!track || !S.ticker || !S.ticker.length) return;
    var run = S.ticker.map(function (t) {
      return '<span class="ticker-item">' + esc(t) + "</span>";
    }).join("");
    track.innerHTML = run + run;
  }

  /* ============================================================
     ABOUT
     ============================================================ */
  function initAbout() {
    setText("aboutTitle", S.about.title);
    setText("aboutSub", S.about.sub);

    setHTML("aboutText", S.about.paragraphs.map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join(""));

    setLink("aboutLink", S.business.googleMaps, null);
    setText("aboutLinkLabel", S.about.linkLabel);

    setHTML("aboutList", S.about.facts.map(function (f, i) {
      return '<li class="about-item reveal"><span class="about-num">0' + (i + 1) + "</span>" +
        "<div><h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></div></li>";
    }).join(""));

    setText("atmosTitle", S.atmosphere.title);
    setText("atmosNote", S.atmosphere.note);
    setHTML("atmosGrid", S.atmosphere.images.map(function (img, i) {
      return '<figure class="atmos-item reveal" style="--i:' + i + '">' +
        '<div class="atmos-media"><img src="' + esc(img.src) + '" alt="' + esc(img.alt) +
        '" loading="lazy" decoding="async" data-fallback /></div>' +
        '<figcaption>' + esc(img.caption) + "</figcaption></figure>";
    }).join(""));

    $$("#atmosGrid img").forEach(function (img) {
      loadImage(img, img.getAttribute("src"), img.getAttribute("alt"));
    });
  }

  /* ============================================================
     MENU
     ============================================================ */
  function initMenu() {
    setText("menuTitle", S.menu.title);
    setText("menuSub", S.menu.sub);
    setText("menuNote", S.menu.noteText);

    var body = byId("menuBody");
    var cats = S.menu.categories || [];

    if (!cats.length) {
      var p = S.menu.placeholder;
      body.innerHTML =
        '<div class="menu-empty reveal">' +
          '<div class="menu-empty-copy">' +
            "<h3>" + esc(p.title) + "</h3>" +
            "<p>" + esc(p.text) + "</p>" +
          "</div>" +
          '<div class="menu-empty-actions">' +
            '<a class="btn btn-primary" href="' + esc(resolve(p.ctaPrimary.href)) + '">' +
              esc(p.ctaPrimary.label) + "</a>" +
            '<a class="btn btn-outline btn-light" href="' + esc(resolve(p.ctaSecondary.href)) +
              '" target="_blank" rel="noopener">' + esc(p.ctaSecondary.label) + "</a>" +
          "</div>" +
        "</div>";
      return;
    }

    var tabs = cats.map(function (c, i) {
      return '<button type="button" class="menu-tab' + (i === 0 ? " active" : "") +
        '" role="tab" aria-selected="' + (i === 0) + '" data-index="' + i + '">' + esc(c.name) + "</button>";
    }).join("");

    var panels = cats.map(function (c, i) {
      var items = (c.items || []).map(function (it) {
        return '<li class="menu-item">' +
          '<div class="menu-item-main">' +
            '<span class="menu-item-name">' + esc(it.name) + "</span>" +
            (it.desc ? '<span class="menu-item-desc">' + esc(it.desc) + "</span>" : "") +
          "</div>" +
          '<span class="menu-item-price">' + esc(it.price || "") + "</span>" +
        "</li>";
      }).join("");
      return '<div class="menu-panel' + (i === 0 ? " active" : "") + '" role="tabpanel">' +
        '<ul class="menu-list">' + items + "</ul></div>";
    }).join("");

    body.innerHTML = '<div class="menu-tabs" role="tablist">' + tabs + "</div>" +
      '<div class="menu-panels">' + panels + "</div>";

    $$(".menu-tab", body).forEach(function (tab) {
      tab.addEventListener("click", function () {
        var i = Number(tab.getAttribute("data-index"));
        $$(".menu-tab", body).forEach(function (t, idx) {
          t.classList.toggle("active", idx === i);
          t.setAttribute("aria-selected", String(idx === i));
        });
        $$(".menu-panel", body).forEach(function (panel, idx) {
          panel.classList.toggle("active", idx === i);
        });
      });
    });
  }

  /* ============================================================
     REVIEWS + RATING WIDGET
     ============================================================ */
  function initReviews() {
    setText("reviewsEyebrow", S.reviews.eyebrow);
    setText("reviewsTitle", S.reviews.title);
    setText("reviewsSub", S.reviews.sub);

    setHTML("reviewsGrid", S.reviews.items.map(function (r, i) {
      return '<figure class="review-card reveal" style="--i:' + i + '">' +
        '<span class="quote-mark" aria-hidden="true">&ldquo;</span>' +
        '<blockquote>' + esc(r.text) + "</blockquote>" +
        '<figcaption><span class="review-name">' + esc(r.name) + "</span>" +
        '<span class="review-meta">' + esc(r.meta) + "</span></figcaption></figure>";
    }).join(""));

    setText("rateTitle", S.reviews.widget.title);
    setText("rateSub", S.reviews.widget.sub);
    setText("ratePanelTitle", S.reviews.widget.panelTitle);
    setText("rateFine", S.reviews.widget.fine);
    byId("rateNote").placeholder = S.reviews.widget.notePlaceholder;

    var stars = $$("#rateStars .star");
    var panel = byId("ratePanel");
    var picked = byId("ratePicked");
    var note = byId("rateNote");
    var googleBtn = byId("rateGoogle");
    var waBtn = byId("rateWhatsApp");
    var rating = 0;

    googleBtn.textContent = S.reviews.widget.googleLabel;
    googleBtn.href = S.business.googleReview;

    function paint(value) {
      stars.forEach(function (star, i) { star.classList.toggle("on", i < value); });
    }

    function updateShare() {
      var text = note.value.trim();
      var message = "Hi Blue Umbrella — I'd rate my visit " + rating + "/5.";
      if (text) message += " " + text;
      var wa = whatsappLink(message);
      if (wa) {
        waBtn.href = wa;
        waBtn.textContent = S.reviews.widget.whatsappLabel;
      } else {
        waBtn.href = S.business.phoneTel;
        waBtn.textContent = "Call the café";
      }
    }

    function select(value) {
      rating = value;
      paint(value);
      stars.forEach(function (star, i) {
        star.setAttribute("aria-pressed", String(i < value));
      });
      picked.textContent = value + " of 5";
      panel.hidden = false;
      updateShare();
    }

    stars.forEach(function (star, i) {
      var value = i + 1;
      star.addEventListener("mouseenter", function () { paint(value); });
      star.addEventListener("mouseleave", function () { paint(rating); });
      star.addEventListener("focus", function () { paint(value); });
      star.addEventListener("blur", function () { paint(rating); });
      star.addEventListener("click", function () { select(value); });
    });

    note.addEventListener("input", function () {
      if (rating) updateShare();
    });
  }

  /* ============================================================
     VISIT
     ============================================================ */
  function initVisit() {
    var v = S.visit;
    setText("visitEyebrow", v.eyebrow);
    setText("visitTitle", v.title);
    setText("visitSub", v.sub);

    setText("visitAddressLabel", v.labels.address);
    setText("visitAddress", S.business.addressLines.join(", "));
    setText("visitPlusCode", "Plus code " + S.business.plusCode);
    setLink("visitDirections", S.business.directions, v.labels.directions);

    setText("visitPhoneLabel", v.labels.phone);
    setLink("visitPhone", S.business.phoneTel, S.business.phone);
    setLink("visitWhatsApp", "auto:whatsapp", v.labels.whatsapp);
    setLink("visitMaps", S.business.googleMaps, v.labels.maps);

    setText("visitHoursLabel", v.labels.hours);
    var todayIdx = (new Date().getDay() + 6) % 7;
    setHTML("hoursList", v.hours.rows.map(function (row, i) {
      return '<li class="hour-row' + (i === todayIdx ? " today" : "") + '">' +
        "<span>" + esc(row.day) + (i === todayIdx ? ' <em class="today-tag">today</em>' : "") +
        "</span><span>" + esc(row.time) + "</span></li>";
    }).join(""));
    setText("hoursNote", v.hours.note);

    var frame = byId("mapFrame");
    frame.title = v.labels.mapTitle;
    frame.src = S.business.mapEmbed;
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function initFooter() {
    setText("footerWordmark", S.business.shortName);
    setText("footerBlurb", S.footer.blurb);
    setText("footerExploreLabel", S.footer.columns.explore);
    setText("footerVisitLabel", S.footer.columns.visit);
    setText("footerHoursLabel", S.footer.columns.hours);
    setText("footerAddress", S.business.addressLines.join(", "));
    setLink("footerPhone", S.business.phoneTel, S.business.phone);
    setLink("footerDirections", S.business.directions, null);
    setText("footerHours", "Daily · " + S.visit.hours.openLabel + " – " + S.visit.hours.closeLabel);
    setText("footerHoursNote", "Hours may differ on festivals.");
    setText("footerCopyright", S.footer.copyright);

    setHTML("footerLinks", S.nav.map(function (n) {
      return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
    }).join(""));

    if (S.business.instagram) {
      byId("footerLinks").insertAdjacentHTML("beforeend",
        '<a href="' + esc(S.business.instagram) + '" target="_blank" rel="noopener">' +
        esc(S.business.instagramHandle || "Instagram") + "</a>");
    }
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  function initReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  document.body.classList.add("js-ready");
  initHeader();
  initDrawer();
  initHero();
  initTicker();
  initAbout();
  initMenu();
  initReviews();
  initVisit();
  initFooter();
  initReveal();
  initScrollState();
  paintStatus();
})();
