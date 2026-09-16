# Karachi Business Demos

A unified multi-client portfolio of high-end frontend website demos tailored for premier Karachi businesses, fashion labels, and retail brands.

## Active Client Demos

| Client Brand | Category | Direct Route |
| :--- | :--- | :--- |
| **Unofficial Clothing** | Luxury Contemporary RTW & Structured Streetwear | [`/demo/unofficial-clothing`](https://karachi-business-demos.vercel.app/demo/unofficial-clothing) |

---

### Unofficial Clothing Overview
- **Brand Aesthetic**: Subversive elegance meets architectural metropolitan tailoring. Neutral luxury palette (obsidian black, warm alabaster, ecru/sand, champagne gold).
- **Location**: Shop #G-36, Madni Mall, Block 14, Federal B Area, Karachi, Pakistan.
- **Contact & WhatsApp Concierge**: 0312-8400431.
- **Key Features**:
  - Live currency converter (`PKR`, `USD`, `AED`, `GBP`).
  - Slide-out Cart Drawer with dynamic voucher code discount (`KARACHI10`).
  - Quick View garment modal with multi-image gallery & size selector.
  - Live real-time search with instant filtering and trending tag chips.
  - Wishlist drawer with one-click transfer to shopping bag.
  - Interactive Pret Size Guide with cm/inches breakdown.
  - Fully responsive from 1440px desktop down to 390px mobile.

---

## Multi-Client Routing Architecture

Demos are organized into independent modular folders inside the `demo/` directory:

```
├── demo/
│   ├── unofficial-clothing/
│   │   ├── index.html
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── components.css
│   │   ├── js/
│   │   │   ├── products.js
│   │   │   ├── animations.js
│   │   │   └── app.js
│   │   └── assets/
├── index.html         # Root gateway redirecting to active demo
├── vercel.json        # Routing, wildcards, and clean URL redirects for Vercel
├── serve.js           # Lightweight local HTTP preview server
└── package.json
```

### Adding New Client Demos
To add a new client demo in the future:
1. Create a new folder under `demo/<client-name>/` (e.g. `demo/fancy-nagra/`, `demo/wear-zone/`).
2. Add the client's `index.html`, `css/`, and `js/`.
3. The routing rules in `vercel.json` automatically handle `/demo/:client` routing, clean URLs, and trailing-slash normalization with zero additional configuration.

---

## Local Development

Start the preview server:

```bash
node serve.js
```

Or via npm:

```bash
npm start
```

Preview at: [http://127.0.0.1:4173/demo/unofficial-clothing/](http://127.0.0.1:4173/demo/unofficial-clothing/)
