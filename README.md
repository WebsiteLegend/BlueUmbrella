# Blue Umbrella Cafe & Restaurant — Website

A fast, responsive, one-page website for **Blue Umbrella Cafe & Restaurant**,
Gate No. 2, 2/117, opposite Ramleela Ground, Block 2, Geeta Colony, Delhi 110031.
Open daily 1 PM – 1 AM · +91 95990 06936 · 4.0 ★ from 169 Google reviews.

Everything you can read on the page lives in **one file**: `js/content.js`.

---

## 1. Run the site

This website lives in its own folder, `blue-umbrella-cafe/`, next to the other
sites in the project. Open the site from inside this folder.

No build step, no installation.

- Double-click `index.html`, **or**
- Serve this folder (recommended, so the map and fonts load cleanly):

```bash
cd blue-umbrella-cafe
python -m http.server 5173
# then open http://localhost:5173
```

To put it online, upload `index.html`, `css/` and `js/` to any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel — all fine).

---

## 2. Where to edit what (all in `js/content.js`)

| What you want to change | Where |
| --- | --- |
| Name, category, area, tagline | `business` |
| Address, phone, WhatsApp, email, Instagram | `business` |
| Google Maps link, "Get Directions", review link | `business.googleMaps` / `.directions` / `.googleReview` |
| Star rating + review count | `business.rating`, `business.reviewCount` |
| Menu items in the header | `nav` |
| Big headline and buttons at the top | `hero` |
| Scrolling strip of facts | `ticker` |
| "The place" paragraph and four numbered facts | `about` |
| The three room photos | `atmosphere.images` |
| Menu section / "ask us what's on today" card | `menu` |
| Guest quotes | `reviews.items` |
| Star-rating widget text | `reviews.widget` |
| Address, hours table, buttons in "Visit" | `visit` |
| Footer text | `footer` |

Change a value once — the phone number, for example — and every button,
the footer, the drawer and the floating Call button all update together.

### The phone number appears in these places automatically
`business.phone` and `business.phoneTel` (the `tel:` version — keep the `+91`
and drop the spaces) drive the header Call button, the floating Call button,
the mobile Call bar, the menu card, the Visit section, the footer and the
"call to reserve" buttons.

---

## 3. Changing images

`atmosphere.images` holds one object per photo:

```js
{ src: "assets/room-1.jpg", alt: "Café seating at dusk", caption: "The evening table" }
```

- **Replace:** put your photo in an `assets/` folder and set `src: "assets/room-1.jpg"`.
- **Remove:** delete that object from the list. The grid re-flows on its own, with no broken-image icons or gaps.
- **Add:** add another object. Three look best, two also work.
- **Alt text** describes the photo for screen readers and search engines — always fill it in.
- The hero photo is `hero.image` with `hero.imageAlt`.

The images shipped with the site are **placeholders** (free-to-use Unsplash
photographs of café interiors) because the café's own photographs were not
supplied. Replace them with the café's pictures before launch.

---

## 4. The menu (read this before adding food)

The site deliberately shows **no dishes and no prices**. The Google listing does
not include a verified menu, and inventing one was not acceptable.

`menu.categories` is an empty list. As soon as you add real, owner-confirmed
items, the "Ask us what's on today" card disappears and a proper tabbed menu
appears:

```js
categories: [
  {
    name: "Starters",
    items: [
      { name: "Dish name", desc: "One short line", price: "₹000" }
    ]
  },
  {
    name: "Main course",
    items: [
      { name: "Another dish", desc: "", price: "₹000" }
    ]
  }
]
```

Only publish dishes and prices the café owner has confirmed. Send the menu over
and it can be added in a couple of minutes.

---

## 5. Colours, fonts and spacing

Open `css/styles.css` and edit the `:root` block at the top:

```css
--ink: #0a1a2b;        /* deep night blue — hero, menu, footer */
--paper: #f6f2e9;      /* warm cream — page background */
--blue: #2f6fd0;       /* umbrella blue — buttons and links */
--brass: #c69a52;      /* brass accent — stars and small labels */
--font-display: "Fraunces", serif;     /* headings */
--font-body: "Manrope", sans-serif;    /* body text */
--pad-y: clamp(64px, 8vw, 116px);      /* space between sections */
--maxw: 1180px;                        /* page width */
```

Change one value and every section, button and card follows.

Fonts are loaded from Google Fonts in `index.html` (the `<link>` near the top).

---

## 6. Adding or removing sections

Sections are marked in `index.html` with comments (`<!-- ABOUT -->`,
`<!-- MENU -->` …). Each one is a `<section class="section" id="…">` block.

- **Remove:** delete that whole `<section>` block, and delete its `init…()`
  call near the bottom of `js/main.js`. Also remove the matching `nav` entry in
  `content.js` so the link disappears.
- **Duplicate:** copy a `<section>` block, give it a new `id`, add a matching
  `init` block in `js/main.js`, and add a `nav` entry.
- **Reorder:** move the `<section>` blocks up or down. Nav links use `#id`, so
  order does not break them.

---

## 7. What works, and what needs a decision

Working now:
- Call buttons (`tel:`), WhatsApp buttons (`wa.me`), Get Directions (real Google
  Maps directions link), "View on Google Maps", the embedded map, the mobile
  menu, the menu section, and the star-rating widget.
- Every rating from 1 to 5 gets the **same two options**: post the review on
  Google, or send it privately on WhatsApp. There is no "happy customers only"
  filtering.

Waiting on the café:
1. **Direct Google review link.** The widget currently opens the café's Google
   Maps listing, where "Write a review" is one tap away. For the ideal flow,
   paste the café's direct review-form link (Google Business Profile → Share
   review form) into `business.googleReview`.
2. **WhatsApp confirmation.** `business.whatsapp` uses the listed mobile number
   `+91 95990 06936`, which is not confirmed to be on WhatsApp. If it is not,
   set `whatsapp: ""` and the "Send on WhatsApp" button becomes a Call button.
3. **Menu and prices** — none published, as explained above.
4. **The café's own photos** — placeholders are in use.
5. **Online table booking / ordering** — no verified booking or ordering URL
   exists, so no fake form or button was created. The site asks people to call.

There is **no enquiry form** anywhere: a form that silently goes nowhere would
be misleading. Calling and WhatsApp are the real, working contact routes.

---

## 8. Business facts used (and where they came from)

All of the following was read from the Google Maps listing supplied by the
client on 18 November 2026:

- Name: Blue Umbrella Cafe & Restaurant
- Category: Restaurant
- Address: Gate No. 2, 2/117, opposite Ramleela Ground, Block 2, Geeta Colony, Delhi 110031
- Phone: +91 95990 06936
- Hours: daily 1:00 PM – 1:00 AM ("hours might differ")
- Rating: 4.0 from 169 reviews
- Plus code: M73F+RF Delhi
- Review quotes reproduced verbatim, and attributed

Not available / not published: menu, prices, email, Instagram, founding year,
cost for two, amenities, direct booking or ordering links.

Hours and ratings change — update `visit.hours` and `business.rating` when the
café tells you they have.
