/* ============================================================
   CENTRAL CONTENT FILE — edit everything here, nothing else.
   Change a value once and it updates everywhere on the site.

   SOURCE OF BUSINESS FACTS: the Google Maps listing supplied
   by the client (maps.app.goo.gl/T6B8z3nPbQs7fcHx8), read on
   18 Nov 2026. Anything not on that listing is left blank on
   purpose — see README.md before adding a menu or prices.
   ============================================================ */
window.SITE = {
  business: {
    name: "Blue Umbrella Cafe & Restaurant",
    shortName: "Blue Umbrella",
    category: "Cafe & Restaurant",
    area: "Geeta Colony, Delhi",
    tagline:
      "A café and restaurant at Gate No. 2, Block 2, Geeta Colony — open daily from 1 PM until 1 AM.",

    /* ---- contact (verified on the Google listing) ---- */
    address: "Gate No. 2, 2/117, opposite Ramleela Ground, Block 2, Geeta Colony, Delhi 110031",
    addressLines: [
      "Gate No. 2, 2/117, opposite Ramleela Ground",
      "Block 2, Geeta Colony, Delhi 110031"
    ],
    plusCode: "M73F+RF Delhi",
    phone: "+91 95990 06936",
    phoneTel: "tel:+91959906936",

    /* WhatsApp is not confirmed on the listing — the link uses the
       listed mobile number. If it is not on WhatsApp, set whatsapp:"" */
    whatsapp: "https://wa.me/91959906936",
    whatsappMessage: "Hi Blue Umbrella — I'd like to ask about a table.",
    email: "", // add only if the café gives you one
    instagram: "", // add only if you have the verified profile URL
    instagramHandle: "",

    /* ---- Google links (real, from the client's listing) ---- */
    googleMaps: "https://maps.app.goo.gl/T6B8z3nPbQs7fcHx8",
    // NEEDS CONFIRMATION: ideally replace with the direct "write a review"
    // link from the café's Google Business Profile (Share review form).
    googleReview: "https://maps.app.goo.gl/T6B8z3nPbQs7fcHx8",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Blue%20Umbrella%20Cafe%20%26%20Restaurant%2C%20Gate%20No.%202%2C%202%2F117%2C%20Block%202%2C%20Geeta%20Colony%2C%20Delhi%20110031",
    mapEmbed:
      "https://www.google.com/maps?q=Blue%20Umbrella%20Cafe%20%26%20Restaurant%2C%20Block%202%2C%20Geeta%20Colony%2C%20Delhi%20110031&z=16&output=embed",

    /* ---- rating (verified: 4.0 · 169 reviews) ---- */
    rating: "4.0",
    reviewCount: "169"
  },

  nav: [
    { label: "The place", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Reviews", href: "#reviews" },
    { label: "Visit", href: "#visit" }
  ],

  hero: {
    eyebrow: "Cafe & restaurant · Geeta Colony, Delhi",
    titleLine1: "Come in from the city.",
    titleLine2: "Stay till one.",
    subtitle:
      "Blue Umbrella Cafe & Restaurant is a neighbourhood café in Block 2, Geeta Colony — open every day from 1 PM until 1 AM, and rated 4.0 by 169 guests on Google.",
    ctaPrimary: { label: "Get Directions", href: "auto:directions" },
    ctaSecondary: { label: "Call to Reserve", href: "auto:phone" },
    noteTitle: "Where you'll find us",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Warmly lit café seating — placeholder photograph"
  },

  ticker: [
    "Open daily · 1 PM – 1 AM",
    "4.0 ★ · 169 Google reviews",
    "Café & restaurant",
    "Block 2, Geeta Colony",
    "Gate No. 2 · opposite Ramleela Ground",
    "+91 95990 06936"
  ],

  about: {
    title: "A late kitchen in the middle of Geeta Colony.",
    sub:
      "A café and a restaurant in one room at Gate No. 2 — the kind of place that keeps the lights on long after the neighbourhood has gone quiet.",
    paragraphs: [
      "Blue Umbrella Cafe & Restaurant sits at Gate No. 2 in Block 2, Geeta Colony, opposite Ramleela Ground. It is both a café and a restaurant: somewhere to sit through the afternoon, and somewhere to settle in for a full meal as the evening runs on.",
      "With 169 reviews and a 4.0 rating on Google, it is a local spot rather than a chain. Guests writing there mention kind staff, a good ambience, and plates that run from North Indian mains to pizzas and pasta. Every review — the warm ones and the critical ones — is on the café's Google listing."
    ],
    linkLabel: "Read all 169 reviews on Google",
    facts: [
      {
        title: "Until 1 AM, every day",
        text: "The listed hours run 1 PM to 1 AM, seven days a week. On festivals they can change — a quick call is worth it."
      },
      {
        title: "Opposite Ramleela Ground",
        text: "Gate No. 2, 2/117, Block 2, Geeta Colony, Delhi 110031. Plus code M73F+RF."
      },
      {
        title: "4.0 on Google",
        text: "169 guests have rated the café. Read them before you come, or add your own after."
      },
      {
        title: "Tables by phone",
        text: "There is no online booking form on this site — call +91 95990 06936 and speak to the team directly."
      }
    ]
  },

  atmosphere: {
    title: "The room, at different hours",
    note: "Placeholder ambience photographs — replace them with the café's own pictures in js/content.js.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        alt: "Coffee cup on a table — placeholder photograph",
        caption: "Unhurried afternoons"
      },
      {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        alt: "Restaurant tables with warm lighting — placeholder photograph",
        caption: "The evening table"
      },
      {
        src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
        alt: "Shared plates on a café table — placeholder photograph",
        caption: "Plates to share"
      }
    ]
  },

  menu: {
    title: "The menu",
    sub:
      "We would rather leave a gap than print a guess. The café's current card, prices and daily specials are confirmed over the phone.",
    /* NO VERIFIED MENU SUPPLIED YET.
       The site intentionally lists nothing until the owner provides one.
       To publish a menu, fill in categories like this — the section
       switches from the "call us" card to a real menu automatically:

       categories: [
         {
           name: "Starters",
           items: [
             { name: "Dish name", desc: "Short description", price: "₹000" }
           ]
         }
       ]
    */
    categories: [],
    placeholder: {
      title: "Ask us what's on today.",
      text:
        "Blue Umbrella's kitchen runs a changing card, and we will not publish dishes or prices we cannot verify. Call the café for today's menu, prices and availability — or see the latest photos and guest reviews on the Google listing.",
      ctaPrimary: { label: "Call +91 95990 06936", href: "auto:phone" },
      ctaSecondary: { label: "View the Google listing", href: "auto:maps" }
    },
    noteTitle: "Why no menu?",
    noteText:
      "Menu items and prices here must come from the café itself. Send us the menu and it goes live in minutes."
  },

  reviews: {
    eyebrow: "03 — Guests",
    title: "What guests say",
    sub:
      "Three quotes from public Google reviews, reproduced as written. The café holds 4.0 from 169 reviews — including the ones that are not five stars.",
    items: [
      {
        text: "Fab food and service , polite staff and feel good asthetics.",
        name: "Google review",
        meta: "Public review · Google Maps",
        stars: 0
      },
      {
        text: "Really liked the food especially their north indian, pizzas and pasta !",
        name: "Google review",
        meta: "Public review · Google Maps",
        stars: 0
      },
      {
        text: "The staff is very kind and the taste of food is too delicious.",
        name: "Gaurav Kumar",
        meta: "Local Guide · Google review",
        stars: 0
      }
    ],
    widget: {
      title: "Rate your visit",
      sub:
        "Tap a star. However the evening went, you get the same two options — post it on Google, or send it to us privately.",
      panelTitle: "Where would you like to share it?",
      googleLabel: "Post on Google",
      whatsappLabel: "Send on WhatsApp",
      notePlaceholder: "Anything you'd like to add? (optional)",
      fine:
        "Both options are shown to every guest, whatever the rating. Thank you — we read all of it."
    }
  },

  visit: {
    eyebrow: "04 — Visit",
    title: "Find us after the rush.",
    sub:
      "Gate No. 2, Block 2, Geeta Colony — opposite Ramleela Ground. Open daily until 1 AM.",
    hours: {
      openHour: 13, // 1 PM
      closeHour: 1, // 1 AM the next morning
      openLabel: "1 PM",
      closeLabel: "1 AM",
      rows: [
        { day: "Monday", time: "1:00 PM – 1:00 AM" },
        { day: "Tuesday", time: "1:00 PM – 1:00 AM" },
        { day: "Wednesday", time: "1:00 PM – 1:00 AM" },
        { day: "Thursday", time: "1:00 PM – 1:00 AM" },
        { day: "Friday", time: "1:00 PM – 1:00 AM" },
        { day: "Saturday", time: "1:00 PM – 1:00 AM" },
        { day: "Sunday", time: "1:00 PM – 1:00 AM" }
      ],
      note: "Hours as listed on Google on 18 Nov 2026. They can change on festivals and holidays."
    },
    labels: {
      address: "Address",
      phone: "Phone",
      hours: "Opening hours",
      directions: "Get Directions",
      call: "Call the café",
      whatsapp: "WhatsApp us",
      maps: "View on Google Maps",
      mapTitle: "Blue Umbrella Cafe & Restaurant on Google Maps"
    }
  },

  footer: {
    blurb:
      "Café and restaurant in Block 2, Geeta Colony, Delhi. Open every day, 1 PM to 1 AM.",
    columns: {
      explore: "Explore",
      visit: "Visit",
      hours: "Hours"
    },
    copyright: "© " + new Date().getFullYear() + " Blue Umbrella Cafe & Restaurant. All rights reserved."
  }
};
