// ===== Frum Fashion Market - Configuration =====

const FFM = {
  // Set to true and fill in Firebase credentials to use Firebase backend
  USE_FIREBASE: false,

  // Firebase configuration (fill in when ready to go live)
  FIREBASE_CONFIG: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },

  // App settings
  SITE_NAME: 'Frum Fashion Market',
  CURRENCY: '£',
  MAX_IMAGES: 4,

  // Categories
  FOR_WHOM: ['Women', 'Men', 'Girls', 'Boys', 'Children'],
  AGE_RANGES: ['0-2', '2-5', '5-8', '8-12', '12+'],
  CLOTHING_TYPES: [
    'Shabbos & Yom Tov',
    'Everyday Wear',
    'Skirts',
    'Tops & Shirts / Blouses',
    'Dresses',
    'Suits & Jackets',
    'Coats & Outerwear',
    'Accessories',
    'Maternity',
    'Shoes',
    'School Uniform',
    'Simcha Wear'
  ],
  CONDITIONS: ['New with Tags', 'Excellent', 'Good', 'Fair'],
  UK_SIZES: ['4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26'],
  KIDS_SIZES: ['0-3m', '3-6m', '6-12m', '12-18m', '18-24m', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y', '8-9y', '9-10y', '10-11y', '11-12y', '12-13y', '13-14y'],
  MENS_SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  SHOE_SIZES: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],

  // UK locations
  LOCATIONS: [
    'London - Golders Green',
    'London - Hendon',
    'London - Stamford Hill',
    'London - Edgware',
    'London - Finchley',
    'London - Other',
    'Manchester',
    'Gateshead',
    'Leeds',
    'Birmingham',
    'Bournemouth',
    'Brighton',
    'Other'
  ]
};

// ===== Storage helpers (localStorage for demo, Firebase for production) =====
const Storage = {
  getListings() {
    if (FFM.USE_FIREBASE) {
      // Firebase implementation would go here
      return [];
    }
    const data = localStorage.getItem('ffm_listings');
    return data ? JSON.parse(data) : null;
  },

  saveListings(listings) {
    if (FFM.USE_FIREBASE) return;
    localStorage.setItem('ffm_listings', JSON.stringify(listings));
  },

  getUser() {
    const data = sessionStorage.getItem('ffm_user');
    return data ? JSON.parse(data) : null;
  },

  saveUser(user) {
    sessionStorage.setItem('ffm_user', JSON.stringify(user));
  },

  clearUser() {
    sessionStorage.removeItem('ffm_user');
  },

  // Simple demo auth (replace with Firebase Auth for production)
  demoUsers: [
    { id: 'seller1', email: 'demo@frumfashion.co.uk', password: 'demo123', name: 'Sarah Cohen' },
    { id: 'seller2', email: 'rivka@frumfashion.co.uk', password: 'demo123', name: 'Rivka Levy' }
  ],

  authenticate(email, password) {
    const user = this.demoUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name };
      this.saveUser(userData);
      return userData;
    }
    return null;
  },

  register(email, password, name) {
    // Check if email already exists
    if (this.demoUsers.find(u => u.email === email)) {
      return null;
    }
    const newUser = {
      id: 'seller_' + Date.now(),
      email,
      password,
      name
    };
    this.demoUsers.push(newUser);
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    this.saveUser(userData);
    return userData;
  }
};

// Toast notification
function showToast(message, isError = false) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

document.addEventListener('DOMContentLoaded', initMobileMenu);
