// ===== Demo Sample Listings =====
const DEMO_LISTINGS = [
  {
    id: '1',
    title: 'Navy Shabbos Dress - Stunning Lace Detail',
    description: 'Beautiful navy dress with lace overlay, perfect for Shabbos and Yom Tov. Worn twice to simchas. Midi length, fully lined. Modest neckline with elbow-length sleeves.',
    price: 45,
    forWhom: 'Women',
    clothingType: 'Shabbos & Yom Tov',
    size: '12',
    condition: 'Excellent',
    location: 'London - Golders Green',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-03-08T10:00:00Z'
  },
  {
    id: '2',
    title: 'Black Pencil Skirt - Office/Everyday',
    description: 'Classic black pencil skirt, below-the-knee length. Perfect for work or everyday wear. Stretch fabric, very comfortable. Small slit at back for ease of walking.',
    price: 15,
    forWhom: 'Women',
    clothingType: 'Skirts',
    size: '10',
    condition: 'Good',
    location: 'London - Hendon',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'whatsapp',
    contactValue: '447700000002',
    images: [],
    createdAt: '2026-03-07T14:30:00Z'
  },
  {
    id: '3',
    title: 'Girls Shabbos Dress - Pink Satin',
    description: 'Gorgeous pink satin dress for girls. Perfect for Shabbos or a simcha. Puff sleeves, sash at waist. Only worn a handful of times before being outgrown.',
    price: 20,
    forWhom: 'Girls',
    ageRange: '5-8',
    clothingType: 'Shabbos & Yom Tov',
    size: '5-6y',
    condition: 'Excellent',
    location: 'Manchester',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-03-06T09:15:00Z'
  },
  {
    id: '4',
    title: 'Men\'s Dark Suit - Slim Fit',
    description: 'Smart dark charcoal suit, slim fit. Worn to a few simchas. Jacket and trousers included. Dry cleaned and ready to wear.',
    price: 65,
    forWhom: 'Men',
    clothingType: 'Suits & Jackets',
    size: 'L',
    condition: 'Good',
    location: 'London - Stamford Hill',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'phone',
    contactValue: '02012345678',
    images: [],
    createdAt: '2026-03-05T16:45:00Z'
  },
  {
    id: '5',
    title: 'Cream Blouse - Elegant Shell Top',
    description: 'Elegant cream shell top blouse. High neckline, three-quarter sleeves. Lightweight crepe fabric. Perfect layering piece for work or Shabbos.',
    price: 12,
    forWhom: 'Women',
    clothingType: 'Tops & Shirts / Blouses',
    size: '14',
    condition: 'Good',
    location: 'London - Edgware',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-03-04T11:20:00Z'
  },
  {
    id: '6',
    title: 'Winter Coat - Long Navy Wool Blend',
    description: 'Warm long winter coat in navy. Wool blend fabric, fully lined. Double-breasted with gold buttons. Falls below the knee. Hardly worn - like new!',
    price: 55,
    forWhom: 'Women',
    clothingType: 'Coats & Outerwear',
    size: '16',
    condition: 'Excellent',
    location: 'Gateshead',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'email',
    contactValue: 'rivka@example.com',
    images: [],
    createdAt: '2026-03-03T08:00:00Z'
  },
  {
    id: '7',
    title: 'Boys Shabbos Shirt - White Dress Shirt',
    description: 'Smart white dress shirt for boys. Button-down collar, long sleeves. Perfect for Shabbos. Only worn a few times.',
    price: 8,
    forWhom: 'Boys',
    ageRange: '8-12',
    clothingType: 'Shabbos & Yom Tov',
    size: '9-10y',
    condition: 'Good',
    location: 'London - Golders Green',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-03-02T13:10:00Z'
  },
  {
    id: '8',
    title: 'Silk Tichel / Headscarf Collection',
    description: 'Set of 3 beautiful silk headscarves in earth tones (olive, burgundy, taupe). Great quality, soft and easy to tie. Selling as a bundle.',
    price: 25,
    forWhom: 'Women',
    clothingType: 'Accessories',
    size: 'One Size',
    condition: 'Good',
    location: 'London - Hendon',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'whatsapp',
    contactValue: '447700000002',
    images: [],
    createdAt: '2026-03-01T17:30:00Z'
  },
  {
    id: '9',
    title: 'Maternity Shabbos Dress - Burgundy',
    description: 'Beautiful burgundy maternity dress, perfect for Shabbos. Empire waist, flowing skirt. Very flattering and comfortable. Elbow-length sleeves.',
    price: 30,
    forWhom: 'Women',
    clothingType: 'Maternity',
    size: '12',
    condition: 'Excellent',
    location: 'Manchester',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-02-28T10:45:00Z'
  },
  {
    id: '10',
    title: 'School Uniform Bundle - Girls',
    description: 'Bundle of school uniform items: 2 navy pinafores, 3 white polo shirts, 1 navy cardigan. All in good condition with plenty of wear left.',
    price: 18,
    forWhom: 'Girls',
    ageRange: '5-8',
    clothingType: 'School Uniform',
    size: '6-7y',
    condition: 'Good',
    location: 'London - Stamford Hill',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'phone',
    contactValue: '02012345679',
    images: [],
    createdAt: '2026-02-27T15:20:00Z'
  },
  {
    id: '11',
    title: 'Wedding Guest Outfit - Champagne & Gold',
    description: 'Stunning champagne and gold outfit perfect for a wedding. Two-piece set: long skirt and matching top with gold embroidery. Worn once. Truly special!',
    price: 85,
    forWhom: 'Women',
    clothingType: 'Simcha Wear',
    size: '14',
    condition: 'Excellent',
    location: 'London - Finchley',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-02-26T12:00:00Z'
  },
  {
    id: '12',
    title: 'Baby Boy Outfit Set - 6 Pieces',
    description: 'Adorable baby boy set: 2 bodysuits, 2 sleepsuits, hat, and scratch mittens. All in white and blue. Great condition, from a smoke-free home.',
    price: 14,
    forWhom: 'Children',
    ageRange: '0-2',
    clothingType: 'Everyday Wear',
    size: '3-6m',
    condition: 'Good',
    location: 'Leeds',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'whatsapp',
    contactValue: '447700000002',
    images: [],
    createdAt: '2026-02-25T09:30:00Z'
  },
  {
    id: '13',
    title: 'Denim A-Line Skirt - Midi Length',
    description: 'Modest denim A-line skirt in dark wash. Midi length, sits at natural waist. Very versatile - works for casual everyday wear. Barely worn.',
    price: 18,
    forWhom: 'Women',
    clothingType: 'Everyday Wear',
    size: '10',
    condition: 'Excellent',
    location: 'London - Golders Green',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-02-24T14:15:00Z'
  },
  {
    id: '14',
    title: 'Men\'s White Dress Shirts x3',
    description: 'Bundle of 3 white dress shirts. All in good condition, perfect for Shabbos or work. Regular fit, button cuffs.',
    price: 22,
    forWhom: 'Men',
    clothingType: 'Tops & Shirts / Blouses',
    size: 'M',
    condition: 'Good',
    location: 'London - Hendon',
    sellerName: 'Rivka Levy',
    sellerId: 'seller2',
    contactType: 'whatsapp',
    contactValue: '447700000002',
    images: [],
    createdAt: '2026-02-23T11:00:00Z'
  },
  {
    id: '15',
    title: 'Girls Party Dress - Velvet Emerald',
    description: 'Beautiful emerald green velvet dress for girls. Perfect for a simcha or special occasion. Full skirt with tulle underskirt. Really stunning!',
    price: 28,
    forWhom: 'Girls',
    ageRange: '8-12',
    clothingType: 'Simcha Wear',
    size: '10-11y',
    condition: 'Excellent',
    location: 'Birmingham',
    sellerName: 'Sarah Cohen',
    sellerId: 'seller1',
    contactType: 'whatsapp',
    contactValue: '447700000001',
    images: [],
    createdAt: '2026-02-22T16:30:00Z'
  }
];

// Initialize listings in storage if not already present
function initializeListings() {
  const existing = Storage.getListings();
  if (!existing) {
    Storage.saveListings(DEMO_LISTINGS);
  }
}

// Get all listings
function getAllListings() {
  initializeListings();
  return Storage.getListings();
}

// Get a single listing by ID
function getListingById(id) {
  const listings = getAllListings();
  return listings.find(l => l.id === id);
}

// Add a new listing
function addListing(listing) {
  const listings = getAllListings();
  listing.id = 'listing_' + Date.now();
  listing.createdAt = new Date().toISOString();
  listings.unshift(listing);
  Storage.saveListings(listings);
  return listing;
}

// Update a listing
function updateListing(id, updates) {
  const listings = getAllListings();
  const index = listings.findIndex(l => l.id === id);
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updates };
    Storage.saveListings(listings);
    return listings[index];
  }
  return null;
}

// Delete a listing
function deleteListing(id) {
  let listings = getAllListings();
  listings = listings.filter(l => l.id !== id);
  Storage.saveListings(listings);
}

// Filter listings
function filterListings({ search, forWhom, clothingType, size, ageRange, condition, minPrice, maxPrice } = {}) {
  let listings = getAllListings();

  if (search) {
    const q = search.toLowerCase();
    listings = listings.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q)
    );
  }

  if (forWhom) {
    listings = listings.filter(l => l.forWhom === forWhom);
  }

  if (clothingType) {
    listings = listings.filter(l => l.clothingType === clothingType);
  }

  if (size) {
    listings = listings.filter(l => l.size === size);
  }

  if (ageRange) {
    listings = listings.filter(l => l.ageRange === ageRange);
  }

  if (condition) {
    listings = listings.filter(l => l.condition === condition);
  }

  if (minPrice !== undefined) {
    listings = listings.filter(l => l.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    listings = listings.filter(l => l.price <= maxPrice);
  }

  return listings;
}

// Get listings for a specific seller
function getSellerListings(sellerId) {
  return getAllListings().filter(l => l.sellerId === sellerId);
}

// Format date for display
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// Generate placeholder color based on item properties
function getPlaceholderColor(listing) {
  const colors = [
    '#e8d5d5', '#d5dbe8', '#d5e8d9', '#e8e5d5',
    '#ddd5e8', '#d5e3e8', '#e8d5de', '#d9e8d5'
  ];
  const hash = listing.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Clothing type icons (emoji)
const TYPE_ICONS = {
  'Shabbos & Yom Tov': '✨',
  'Everyday Wear': '👕',
  'Skirts': '👗',
  'Tops & Shirts / Blouses': '👚',
  'Dresses': '👗',
  'Suits & Jackets': '🤵',
  'Coats & Outerwear': '🧥',
  'Accessories': '🧣',
  'Maternity': '🤱',
  'Shoes': '👞',
  'School Uniform': '🎒',
  'Simcha Wear': '🎉'
};
