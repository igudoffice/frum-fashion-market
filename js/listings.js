// ===== Homepage Listings Logic =====

let currentFilters = {
  search: '',
  forWhom: '',
  clothingType: '',
  ageRange: '',
  condition: '',
  maxPrice: ''
};

// Populate filter dropdowns
function populateFilters() {
  const forWhomSelect = document.getElementById('filterForWhom');
  const typeSelect = document.getElementById('filterType');
  const conditionSelect = document.getElementById('filterCondition');
  const ageRangeSelect = document.getElementById('filterAgeRange');

  FFM.FOR_WHOM.forEach(item => {
    forWhomSelect.appendChild(new Option(item, item));
  });

  FFM.CLOTHING_TYPES.forEach(item => {
    typeSelect.appendChild(new Option(item, item));
  });

  FFM.CONDITIONS.forEach(item => {
    conditionSelect.appendChild(new Option(item, item));
  });

  FFM.AGE_RANGES.forEach(item => {
    ageRangeSelect.appendChild(new Option(item + ' years', item));
  });
}

// Render a single listing card
function createListingCard(listing) {
  const card = document.createElement('a');
  card.className = 'listing-card';
  card.href = `/listing/?id=${listing.id}`;

  const bgColor = getPlaceholderColor(listing);
  const icon = TYPE_ICONS[listing.clothingType] || '👕';
  const conditionBadge = listing.condition === 'New with Tags' ? '<span class="card-badge">New with Tags</span>' : '';

  const imageHtml = listing.images && listing.images.length > 0
    ? `<img src="${listing.images[0]}" alt="${listing.title}">`
    : `<div class="placeholder-icon">${icon}</div>`;

  card.innerHTML = `
    <div class="card-image" style="background:${bgColor}">
      ${imageHtml}
      ${conditionBadge}
    </div>
    <div class="card-body">
      <h3>${listing.title}</h3>
      <div class="card-price">${FFM.CURRENCY}${listing.price}</div>
      <div class="card-meta">
        <span>📐 ${listing.size}</span>
        <span>📍 ${listing.location.split(' - ')[0]}</span>
        <span>🕐 ${formatDate(listing.createdAt)}</span>
      </div>
    </div>
  `;

  return card;
}

// Render all listings
function renderListings() {
  const grid = document.getElementById('listingsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');

  const filters = {};
  if (currentFilters.search) filters.search = currentFilters.search;
  if (currentFilters.forWhom) filters.forWhom = currentFilters.forWhom;
  if (currentFilters.clothingType) filters.clothingType = currentFilters.clothingType;
  if (currentFilters.ageRange) filters.ageRange = currentFilters.ageRange;
  if (currentFilters.condition) filters.condition = currentFilters.condition;
  if (currentFilters.maxPrice) filters.maxPrice = parseInt(currentFilters.maxPrice);

  const listings = filterListings(filters);

  grid.innerHTML = '';

  if (listings.length === 0) {
    emptyState.style.display = 'block';
    resultsCount.textContent = '0 items';
  } else {
    emptyState.style.display = 'none';
    resultsCount.textContent = `${listings.length} item${listings.length !== 1 ? 's' : ''}`;
    listings.forEach(listing => {
      grid.appendChild(createListingCard(listing));
    });
  }
}

// Handle filter changes
function setupFilterListeners() {
  const forWhomSelect = document.getElementById('filterForWhom');
  const typeSelect = document.getElementById('filterType');
  const conditionSelect = document.getElementById('filterCondition');
  const maxPriceSelect = document.getElementById('filterMaxPrice');
  const ageRangeSelect = document.getElementById('filterAgeRange');
  const ageRangeGroup = document.getElementById('ageRangeGroup');
  const clearBtn = document.getElementById('clearFilters');
  const heroSearch = document.getElementById('heroSearch');
  const heroSearchBtn = document.getElementById('heroSearchBtn');

  forWhomSelect.addEventListener('change', (e) => {
    currentFilters.forWhom = e.target.value;
    // Show age range filter for Children, Girls, Boys
    if (['Children', 'Girls', 'Boys'].includes(e.target.value)) {
      ageRangeGroup.style.display = 'flex';
    } else {
      ageRangeGroup.style.display = 'none';
      currentFilters.ageRange = '';
      ageRangeSelect.value = '';
    }
    renderListings();
  });

  typeSelect.addEventListener('change', (e) => {
    currentFilters.clothingType = e.target.value;
    renderListings();
  });

  conditionSelect.addEventListener('change', (e) => {
    currentFilters.condition = e.target.value;
    renderListings();
  });

  maxPriceSelect.addEventListener('change', (e) => {
    currentFilters.maxPrice = e.target.value;
    renderListings();
  });

  ageRangeSelect.addEventListener('change', (e) => {
    currentFilters.ageRange = e.target.value;
    renderListings();
  });

  clearBtn.addEventListener('click', () => {
    currentFilters = { search: '', forWhom: '', clothingType: '', ageRange: '', condition: '', maxPrice: '' };
    forWhomSelect.value = '';
    typeSelect.value = '';
    conditionSelect.value = '';
    maxPriceSelect.value = '';
    ageRangeSelect.value = '';
    ageRangeGroup.style.display = 'none';
    heroSearch.value = '';
    renderListings();
  });

  // Search
  const doSearch = () => {
    currentFilters.search = heroSearch.value.trim();
    renderListings();
  };

  heroSearchBtn.addEventListener('click', doSearch);
  heroSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  // Live search with debounce
  let searchTimeout;
  heroSearch.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(doSearch, 300);
  });
}

// Allow setting filters from footer links
function setFilter(key, value) {
  currentFilters[key] = value;
  const select = document.getElementById(key === 'forWhom' ? 'filterForWhom' : 'filterType');
  if (select) select.value = value;
  if (key === 'forWhom' && ['Children', 'Girls', 'Boys'].includes(value)) {
    document.getElementById('ageRangeGroup').style.display = 'flex';
  }
  renderListings();
  window.scrollTo({ top: document.querySelector('.listings-section').offsetTop - 80, behavior: 'smooth' });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateFilters();
  setupFilterListeners();

  // Check URL params for pre-set filters
  const params = new URLSearchParams(window.location.search);
  if (params.get('forWhom')) {
    currentFilters.forWhom = params.get('forWhom');
    document.getElementById('filterForWhom').value = params.get('forWhom');
  }
  if (params.get('type')) {
    currentFilters.clothingType = params.get('type');
    document.getElementById('filterType').value = params.get('type');
  }

  renderListings();
});
