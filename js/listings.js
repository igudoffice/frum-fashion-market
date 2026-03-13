// ===== Homepage Listings Logic =====

let currentFilters = {
  search: '',
  forWhom: '',
  clothingType: '',
  ageRange: '',
  size: '',
  condition: '',
  maxPrice: ''
};

function populateFilters() {
  const typeSelect = document.getElementById('filterType');
  const conditionSelect = document.getElementById('filterCondition');
  const ageRangeSelect = document.getElementById('filterAgeRange');

  FFM.CLOTHING_TYPES.forEach(item => {
    typeSelect.appendChild(new Option(item, item));
  });

  FFM.CONDITIONS.forEach(item => {
    conditionSelect.appendChild(new Option(item, item));
  });

  FFM.AGE_RANGES.forEach(item => {
    ageRangeSelect.appendChild(new Option(item + ' years', item));
  });

  updateSizeFilterOptions('');
}

function updateSizeFilterOptions(forWhom) {
  const sizeSelect = document.getElementById('filterSize');
  if (!sizeSelect) return;
  const current = sizeSelect.value;
  sizeSelect.innerHTML = '<option value="">Any</option>';

  let sizes = [];
  if (!forWhom || forWhom === 'Women') sizes = [...sizes, ...FFM.UK_SIZES];
  if (!forWhom || forWhom === 'Men') sizes = [...sizes, ...FFM.MENS_SIZES];
  if (!forWhom || ['Girls', 'Boys', 'Children'].includes(forWhom)) sizes = [...sizes, ...FFM.KIDS_SIZES];
  if (!forWhom) sizes = [...sizes, ...FFM.SHOE_SIZES];

  const unique = ['One Size', ...new Set(sizes)];
  unique.forEach(s => sizeSelect.appendChild(new Option(s, s)));

  if (current && unique.includes(current)) sizeSelect.value = current;
}

function renderListings() {
  const grid = document.getElementById('listingsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');

  const filters = {};
  if (currentFilters.search) filters.search = currentFilters.search;
  if (currentFilters.forWhom) filters.forWhom = currentFilters.forWhom;
  if (currentFilters.clothingType) filters.clothingType = currentFilters.clothingType;
  if (currentFilters.ageRange) filters.ageRange = currentFilters.ageRange;
  if (currentFilters.size) filters.size = currentFilters.size;
  if (currentFilters.condition) filters.condition = currentFilters.condition;
  if (currentFilters.maxPrice) filters.maxPrice = parseInt(currentFilters.maxPrice, 10);

  const listings = filterListings(filters);

  grid.innerHTML = '';

  if (listings.length === 0) {
    emptyState.style.display = 'block';
    resultsCount.textContent = '0 items';
    return;
  }

  emptyState.style.display = 'none';
  resultsCount.textContent = `${listings.length} item${listings.length !== 1 ? 's' : ''}`;
  listings.forEach(listing => {
    grid.appendChild(createListingCard(listing));
  });
}

function setupFilterListeners() {
  const typeSelect = document.getElementById('filterType');
  const conditionSelect = document.getElementById('filterCondition');
  const maxPriceSelect = document.getElementById('filterMaxPrice');
  const sizeSelect = document.getElementById('filterSize');
  const ageRangeSelect = document.getElementById('filterAgeRange');
  const ageRangeGroup = document.getElementById('ageRangeGroup');
  const clearBtn = document.getElementById('clearFilters');
  const heroSearch = document.getElementById('heroSearch');
  const heroSearchBtn = document.getElementById('heroSearchBtn');

  // For Whom chip buttons (toggle on click, click again to deselect)
  document.querySelectorAll('#filterForWhomChips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.dataset.value;
      const isActive = chip.classList.contains('active');

      // Deactivate all chips first
      document.querySelectorAll('#filterForWhomChips .chip').forEach(c => c.classList.remove('active'));

      if (!isActive) {
        chip.classList.add('active');
        currentFilters.forWhom = val;
        if (['Children', 'Girls', 'Boys'].includes(val)) {
          ageRangeGroup.style.display = 'flex';
        } else {
          ageRangeGroup.style.display = 'none';
          currentFilters.ageRange = '';
          ageRangeSelect.value = '';
        }
      } else {
        // Clicking active chip deselects it
        currentFilters.forWhom = '';
        ageRangeGroup.style.display = 'none';
        currentFilters.ageRange = '';
        ageRangeSelect.value = '';
      }

      updateSizeFilterOptions(currentFilters.forWhom);
      renderListings();
    });
  });

  typeSelect.addEventListener('change', e => {
    currentFilters.clothingType = e.target.value;
    renderListings();
  });

  conditionSelect.addEventListener('change', e => {
    currentFilters.condition = e.target.value;
    renderListings();
  });

  maxPriceSelect.addEventListener('change', e => {
    currentFilters.maxPrice = e.target.value;
    renderListings();
  });

  sizeSelect.addEventListener('change', e => {
    currentFilters.size = e.target.value;
    renderListings();
  });

  ageRangeSelect.addEventListener('change', e => {
    currentFilters.ageRange = e.target.value;
    renderListings();
  });

  clearBtn.addEventListener('click', () => {
    currentFilters = { search: '', forWhom: '', clothingType: '', ageRange: '', size: '', condition: '', maxPrice: '' };
    document.querySelectorAll('#filterForWhomChips .chip').forEach(c => c.classList.remove('active'));
    typeSelect.value = '';
    conditionSelect.value = '';
    maxPriceSelect.value = '';
    ageRangeSelect.value = '';
    sizeSelect.value = '';
    ageRangeGroup.style.display = 'none';
    heroSearch.value = '';
    updateSizeFilterOptions('');
    renderListings();
  });

  const doSearch = () => {
    currentFilters.search = heroSearch.value.trim();
    renderListings();
  };

  heroSearchBtn.addEventListener('click', doSearch);
  heroSearch.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });

  let searchTimeout;
  heroSearch.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(doSearch, 300);
  });
}

function setFilter(key, value) {
  currentFilters[key] = value;
  if (key === 'forWhom') {
    document.querySelectorAll('#filterForWhomChips .chip').forEach(c => {
      c.classList.toggle('active', c.dataset.value === value);
    });
    if (['Children', 'Girls', 'Boys'].includes(value)) {
      document.getElementById('ageRangeGroup').style.display = 'flex';
    }
    updateSizeFilterOptions(value);
  } else {
    const select = document.getElementById(key === 'clothingType' ? 'filterType' : key);
    if (select) select.value = value;
  }
  renderListings();
  window.scrollTo({ top: document.querySelector('.listings-section').offsetTop - 80, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  populateFilters();
  setupFilterListeners();

  const params = new URLSearchParams(window.location.search);
  if (params.get('forWhom')) {
    const val = params.get('forWhom');
    currentFilters.forWhom = val;
    document.querySelectorAll('#filterForWhomChips .chip').forEach(c => {
      if (c.dataset.value === val) c.classList.add('active');
    });
    updateSizeFilterOptions(val);
    if (['Children', 'Girls', 'Boys'].includes(val)) {
      document.getElementById('ageRangeGroup').style.display = 'flex';
    }
  }
  if (params.get('type')) {
    currentFilters.clothingType = params.get('type');
    document.getElementById('filterType').value = params.get('type');
  }

  renderListings();
});
