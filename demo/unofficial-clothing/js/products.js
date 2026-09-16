/**
 * Unofficial Clothing - Product Catalog Data
 * Currency: PKR (Pakistani Rupee) with realistic luxury ready-to-wear pricing
 */

const PRODUCTS = [
  {
    id: "uc-01",
    name: "K-04 Raw Silk Boxy Overshirt",
    category: "men",
    tags: ["new", "men", "overshirt"],
    pricePKR: 12500,
    oldPricePKR: 15000,
    badge: "NEW ARRIVAL",
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 38,
    colors: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Raw Ecru", hex: "#E7DFD5" },
      { name: "Slate Moss", hex: "#5C6057" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Crafted in Karachi from artisanal slubbed raw silk and structured cotton blend. Designed with dropped shoulders, clean French seams, hidden horn-button placket, and exaggerated chest flap pockets.",
    details: [
      "60% Indigenous Raw Silk, 40% Combed Milled Cotton",
      "Structured boxy drape for hot metropolitan evenings",
      "Concealed matte horn-button closure",
      "Dry clean recommended / cold delicate wash",
      "Crafted in Karachi, Pakistan"
    ]
  },
  {
    id: "uc-02",
    name: "Metropolis Pleated Wide Trousers",
    category: "men",
    tags: ["men", "bestseller", "trousers"],
    pricePKR: 14800,
    oldPricePKR: null,
    badge: "BESTSELLER",
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewsCount: 64,
    colors: [
      { name: "Charcoal Slate", hex: "#2B2D2F" },
      { name: "Sandstone", hex: "#D6CFC4" }
    ],
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Deep double-pleated front with an architectural wide silhouette that breaks gently over footwear. Cut from breathable tropical-weight wool and cotton twill suited for Karachi and nationwide wear.",
    details: [
      "High-rise fit with extended tab waist closure",
      "Side adjusters with brushed nickel hardware",
      "Deep slant pockets and welt back pockets",
      "Half-lined with breathable cupro",
      "Karachi Studio Alteration Guarantee included"
    ]
  },
  {
    id: "uc-03",
    name: "380 GSM Heavy Drop-Shoulder Tee",
    category: "men",
    tags: ["new", "men", "tees"],
    pricePKR: 5850,
    oldPricePKR: 6900,
    badge: "SELLING FAST",
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 92,
    colors: [
      { name: "Chalk Off-White", hex: "#F3EFEA" },
      { name: "Washed Carbon", hex: "#232323" },
      { name: "Karachi Port Navy", hex: "#1A222D" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Our signature heavyweight streetwear foundation. Custom-knitted 380 GSM Pakistani combed cotton with tight 1x1 rib collar that maintains its shape wash after wash. Seamless dropped shoulder cut.",
    details: [
      "100% Ring-Spun Long-Staple Pakistani Cotton",
      "Pre-shrunk, enzyme-washed for an ultra-soft handle",
      "Heavyweight collar rib with double-needle topstitch",
      "Screen-printed minimal tonal logo on nape",
      "Made entirely in Sindh, Pakistan"
    ]
  },
  {
    id: "uc-04",
    name: "Clifton Linen Minimal Blazer",
    category: "women",
    tags: ["new", "women", "outerwear"],
    pricePKR: 19500,
    oldPricePKR: 22000,
    badge: "LIMITED RUN",
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 27,
    colors: [
      { name: "Desert Sand", hex: "#D8CDBD" },
      { name: "Deep Onyx", hex: "#181818" }
    ],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Deconstructed relaxed silhouette tailored from 100% natural slub linen. Features an open unstructured front, sharp notch lapels, and functional kissing sleeve buttons. Effortless day-to-night luxury.",
    details: [
      "100% European Flax Linen woven in Pakistan",
      "Unlined interior with bound contrast piping",
      "Dual jetted front pockets",
      "Lightweight shoulder padding for clean drape",
      "Designed for warm coastal climates"
    ]
  },
  {
    id: "uc-05",
    name: "Raw Selvedge Worker Jacket",
    category: "men",
    tags: ["men", "outerwear", "limited"],
    pricePKR: 18500,
    oldPricePKR: null,
    badge: "ARCHIVE EDIT",
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewsCount: 43,
    colors: [
      { name: "Raw Indigo", hex: "#1D2A44" },
      { name: "Washed Ash", hex: "#3B3D40" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "An homage to Karachi’s industrial textile legacy. Milled from 14oz shuttle-loom raw selvedge denim with antique brass shanks, triple-needle chainstitching, and utilitarian pocket partitions.",
    details: [
      "14oz Unwashed Raw Selvedge Cotton",
      "Custom branded matte antique brass hardware",
      "Reinforced bartacks at critical stress points",
      "Interior selvedge ID visible along front placket",
      "Ages and patinas uniquely to the wearer"
    ]
  },
  {
    id: "uc-06",
    name: "Monochrome Tailored Co-Ord Set",
    category: "coords",
    tags: ["new", "coords", "women", "men"],
    pricePKR: 24500,
    oldPricePKR: 28000,
    badge: "COLLECTION 04",
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 51,
    colors: [
      { name: "Alabaster Beige", hex: "#E9E3D8" },
      { name: "Midnight Black", hex: "#101010" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A two-piece ready-to-wear statement combining a relaxed mandarin-collar tunic jacket and fluid pleated wide-leg trousers. Cut from textured modal cotton that drapes with architectural poise.",
    details: [
      "Complete 2-Piece Ensemble (Jacket & Trousers)",
      "Premium Modal & Long-Staple Cotton Blend",
      "Elasticated rear waistband for tailored comfort",
      "Minimalist hidden zip closure",
      "Complimentary express delivery nationwide"
    ]
  },
  {
    id: "uc-07",
    name: "Sculptural Kimono Trench Coat",
    category: "women",
    tags: ["new", "women", "outerwear", "limited"],
    pricePKR: 22800,
    oldPricePKR: null,
    badge: "STUDIO EXCLUSIVE",
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 19,
    colors: [
      { name: "Olive Khaki", hex: "#4C5147" },
      { name: "Raw Ecru", hex: "#EDE8E1" }
    ],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Blending Japanese wrap silhouettes with contemporary South Asian minimalist cuts. Featuring an obi-style waist tie, storm flap detailing, and deep functional slip pockets.",
    details: [
      "Water-repellent structured micro-cotton gabardine",
      "Oversized notched kimono lapel",
      "Self-tie wide sash belt with tonal topstitching",
      "Full viscose lining for effortless layering",
      "Limited batch of 50 numbered pieces"
    ]
  },
  {
    id: "uc-08",
    name: "Karachi Heatcamp Linen Shirt",
    category: "men",
    tags: ["men", "shirts", "bestseller"],
    pricePKR: 8500,
    oldPricePKR: 9800,
    badge: "POPULAR",
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 78,
    colors: [
      { name: "Pebble Cream", hex: "#E8E2D6" },
      { name: "Deep Ink", hex: "#161D2B" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "The quintessential hot-weather staple. An airy open camp-collar shirt rendered in naturally textured pure flax linen, detailed with mother-of-pearl buttons and a straight vented hem.",
    details: [
      "100% Breathable Pure Washed Linen",
      "Cuban camp collar with loop closure",
      "Genuine Australian Mother-of-Pearl buttons",
      "Box pleat at back yoke for mobility",
      "Designed for effortless tropical living"
    ]
  },
  {
    id: "uc-09",
    name: "Obsidian Asymmetric Slip Dress",
    category: "women",
    tags: ["women", "limited", "dresses"],
    pricePKR: 16500,
    oldPricePKR: null,
    badge: "LIMITED RUN",
    isBestSeller: false,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 22,
    colors: [
      { name: "Obsidian Satin", hex: "#0E0E0E" },
      { name: "Bronze Champagne", hex: "#A38C6D" }
    ],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Bias-cut fluid heavy crepe satin that contours naturally without clinging. Defined by an architectural asymmetric neckline, adjustable delicate rouleau straps, and a clean side slit.",
    details: [
      "Heavyweight Japanese Washable Crepe Satin",
      "Bias-cut construction for natural give and drape",
      "Seamless invisible side zip with hook and eye",
      "Floor-grazing hem with high walking slit",
      "Crafted in Karachi, Pakistan"
    ]
  },
  {
    id: "uc-10",
    name: "Coastal Raw Hem Distressed Hoodie",
    category: "men",
    tags: ["men", "hoodies", "streetwear"],
    pricePKR: 9200,
    oldPricePKR: 10800,
    badge: "450 GSM",
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 57,
    colors: [
      { name: "Washed Taupe", hex: "#7E7569" },
      { name: "Matte Black", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "450 GSM ultra-heavyweight French loopback fleece. Cut without drawstrings for a pure sculptural neckline, accented with hand-abraded raw edges at the kangaroo pocket and cuffs.",
    details: [
      "450 GSM 100% Combed Pakistani Cotton Loopback",
      "Double-layered substantial crossover hood",
      "Custom subtle hand-distressed edge treatment",
      "Dropped shoulders with relaxed boxy body",
      "Pre-shrunk to retain fit throughout lifetime"
    ]
  },
  {
    id: "uc-11",
    name: "Artisanal Hand-Embroidered Kurta Tunic",
    category: "limited",
    tags: ["limited", "men", "women", "artisanal"],
    pricePKR: 17800,
    oldPricePKR: null,
    badge: "ARTISANAL",
    isBestSeller: false,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 31,
    colors: [
      { name: "Bone Ivory", hex: "#F6F3EC" },
      { name: "Desert Bark", hex: "#4A4036" }
    ],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Bridging Pakistani heritage craftsmanship with brutalist modern silhouettes. Features subtle geometric hand-needlework along the mandarin collar and cuffs, hand-dyed in small batches.",
    details: [
      "Handloom Khaddar Cotton and Silk Blend",
      "Intricate hand-pulled thread embroidery",
      "Deep side vents with reinforced bar tacks",
      "Real mother-of-pearl buttons",
      "Each piece takes 18 hours of artisan handwork"
    ]
  },
  {
    id: "uc-12",
    name: "Architectural Barrel-Leg Cargo Denim",
    category: "men",
    tags: ["men", "pants", "limited"],
    pricePKR: 13900,
    oldPricePKR: 16500,
    badge: "LIMITED RUN",
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 46,
    colors: [
      { name: "Faded Concrete", hex: "#8A8D8F" },
      { name: "Pitch Black", hex: "#121212" }
    ],
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85",
    hoverImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Engineered with 3D curved side seam darts that produce an organic sculptural barrel leg. Minimal low-profile cargo utility pockets integrated flush into the seam.",
    details: [
      "13.5oz Rigid Cotton Denim from Karachi Mills",
      "3D articulated knee and side seam darts",
      "Streamlined hidden magnet cargo closures",
      "Reinforced heavy twin-needle construction",
      "Custom gunmetal branded rivets"
    ]
  }
];

// Curated Instagram streetstyle images
const INSTAGRAM_POSTS = [
  {
    id: "ig-01",
    handle: "@unofficial.pk",
    location: "Federal B Area, Karachi",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    look: "K-04 Raw Silk Overshirt & Pleated Trousers",
    likes: "1,420"
  },
  {
    id: "ig-02",
    handle: "@unofficial.pk",
    location: "Old Clifton, Karachi",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    look: "Monochrome Co-Ord Set in Alabaster",
    likes: "2,840"
  },
  {
    id: "ig-03",
    handle: "@unofficial.pk",
    location: "Mohatta Palace Grounds, Karachi",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    look: "Clifton Linen Minimal Blazer",
    likes: "1,980"
  },
  {
    id: "ig-04",
    handle: "@unofficial.pk",
    location: "Sea View Coastal Promenade, Karachi",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    look: "380 GSM Heavy Tee",
    likes: "3,110"
  },
  {
    id: "ig-05",
    handle: "@unofficial.pk",
    location: "Karachi Port Trust Heritage",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    look: "Raw Selvedge Worker Jacket",
    likes: "2,205"
  },
  {
    id: "ig-06",
    handle: "@unofficial.pk",
    location: "Karachi Studio Atelier",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    look: "Sculptural Kimono Trench Coat",
    likes: "1,790"
  }
];

// Categories configuration
const CATEGORIES = [
  {
    id: "cat-raw",
    title: "Raw Ready-to-Wear",
    tagline: "Structured shirts, boxy tops & camp collars",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    count: "16 Pieces",
    filter: "men"
  },
  {
    id: "cat-tees",
    title: "The 380 GSM Drop Edit",
    tagline: "Heavyweight luxury streetwear tees & loopbacks",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
    count: "12 Pieces",
    filter: "men"
  },
  {
    id: "cat-tailored",
    title: "Tailored Silhouettes",
    tagline: "Architectural pleated trousers & tropical wools",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    count: "14 Pieces",
    filter: "men"
  },
  {
    id: "cat-coords",
    title: "Monochrome Co-Ords",
    tagline: "Harmonious two-piece suits for effortless poise",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    count: "9 Pieces",
    filter: "coords"
  },
  {
    id: "cat-outerwear",
    title: "Artisanal Outerwear",
    tagline: "Worker jackets, selvedge denim & blazers",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    count: "11 Pieces",
    filter: "limited"
  }
];

// Currencies support
const CURRENCIES = {
  PKR: { symbol: "PKR", rate: 1, label: "PKR (Rs)" },
  USD: { symbol: "$", rate: 0.0036, label: "USD ($)" },
  AED: { symbol: "AED", rate: 0.013, label: "AED (د.إ)" },
  GBP: { symbol: "£", rate: 0.0028, label: "GBP (£)" }
};

if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
  window.CATEGORIES = CATEGORIES;
  window.INSTAGRAM_POSTS = INSTAGRAM_POSTS;
  window.CURRENCIES = CURRENCIES;
}
