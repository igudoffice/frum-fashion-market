// ===== Seller Dashboard Logic =====

let uploadedImages = [];
let editingListing = null;

// Populate form dropdowns
function populateFormDropdowns() {
  const forWhomSelect = document.getElementById('itemForWhom');
  const typeSelect = document.getElementById('itemType');
  const conditionSelect = document.getElementById('itemCondition');
  const locationSelect = document.getElementById('itemLocation');
  const ageRangeSelect = document.getElementById('itemAgeRange');

  forWhomSelect.innerHTML = '<option value="">Select...</option>';
  FFM.FOR_WHOM.forEach(item => {
    forWhomSelect.appendChild(new Option(item, item));
  });

  typeSelect.innerHTML = '<option value="">Select...</option>';
  FFM.CLOTHING_TYPES.forEach(item => {
    typeSelect.appendChild(new Option(item, item));
  });

  conditionSelect.innerHTML = '<option value="">Select...</option>';
  FFM.CONDITIONS.forEach(item => {
    conditionSelect.appendChild(new Option(item, item));
  });

  locationSelect.innerHTML = '<option value="">Select...</option>';
  FFM.LOCATIONS.forEach(item => {
    locationSelect.appendChild(new Option(item, item));
  });

  FFM.AGE_RANGES.forEach(item => {
    ageRangeSelect.appendChild(new Option(item + ' years', item));
  });
}

// Update size options based on forWhom selection
function updateSizeOptions(forWhom) {
  const sizeSelect = document.getElementById('itemSize');
  sizeSelect.innerHTML = '<option value="">Select size</option>';

  let sizes = [];
  if (forWhom === 'Women') {
    sizes = FFM.UK_SIZES;
  } else if (forWhom === 'Men') {
    sizes = FFM.MENS_SIZES;
  } else if (['Girls', 'Boys', 'Children'].includes(forWhom)) {
    sizes = FFM.KIDS_SIZES;
  }

  // Add One Size option for accessories
  sizes = ['One Size', ...sizes];

  sizes.forEach(s => {
    sizeSelect.appendChild(new Option(s, s));
  });
}

// Check if user is logged in
function checkAuth() {
  const user = Storage.getUser();
  const authSection = document.getElementById('authSection');
  const dashboard = document.getElementById('dashboard');

  if (user) {
    authSection.style.display = 'none';
    dashboard.style.display = 'block';
    document.getElementById('userName').textContent = user.name;
    renderMyListings();
  } else {
    authSection.style.display = 'block';
    dashboard.style.display = 'none';
  }
}

// Setup auth event listeners
function setupAuth() {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const logoutBtn = document.getElementById('logoutBtn');

  // Toggle between login and register
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  });

  // Login
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');

    if (!email || !password) {
      errorEl.textContent = 'Please enter your email and password.';
      errorEl.style.display = 'block';
      return;
    }

    const user = Storage.authenticate(email, password);
    if (user) {
      checkAuth();
      showToast(`Welcome back, ${user.name}!`);
    } else {
      errorEl.textContent = 'Invalid email or password. Try demo@frumfashion.co.uk / demo123';
      errorEl.style.display = 'block';
    }
  });

  // Register
  registerBtn.addEventListener('click', () => {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const errorEl = document.getElementById('registerError');

    if (!name || !email || !password) {
      errorEl.textContent = 'Please fill in all fields.';
      errorEl.style.display = 'block';
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = 'Password must be at least 6 characters.';
      errorEl.style.display = 'block';
      return;
    }

    const user = Storage.register(email, password, name);
    if (user) {
      checkAuth();
      showToast(`Account created! Welcome, ${user.name}!`);
    } else {
      errorEl.textContent = 'An account with this email already exists.';
      errorEl.style.display = 'block';
    }
  });

  // Allow Enter key to submit
  document.getElementById('loginPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loginBtn.click();
  });
  document.getElementById('regPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') registerBtn.click();
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    Storage.clearUser();
    checkAuth();
    showToast('Signed out successfully');
  });
}

// Setup listing form
function setupListingForm() {
  const forWhomSelect = document.getElementById('itemForWhom');
  const ageRangeGroup = document.getElementById('ageRangeFormGroup');
  const submitBtn = document.getElementById('submitListing');
  const cancelBtn = document.getElementById('cancelEdit');
  const imageArea = document.getElementById('imageUploadArea');
  const imageInput = document.getElementById('imageInput');

  // Show/hide age range and update sizes when forWhom changes
  forWhomSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (['Children', 'Girls', 'Boys'].includes(val)) {
      ageRangeGroup.style.display = 'block';
    } else {
      ageRangeGroup.style.display = 'none';
      document.getElementById('itemAgeRange').value = '';
    }
    updateSizeOptions(val);
  });

  // Image upload
  imageArea.addEventListener('click', () => imageInput.click());
  imageInput.addEventListener('change', handleImageUpload);

  // Submit listing
  submitBtn.addEventListener('click', submitListing);

  // Cancel edit
  cancelBtn.addEventListener('click', () => {
    resetForm();
  });
}

// Handle image upload
function handleImageUpload(e) {
  const files = Array.from(e.target.files);
  const remaining = FFM.MAX_IMAGES - uploadedImages.length;

  if (remaining <= 0) {
    showToast(`Maximum ${FFM.MAX_IMAGES} images allowed`, true);
    return;
  }

  const toProcess = files.slice(0, remaining);

  toProcess.forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      uploadedImages.push(ev.target.result);
      renderImagePreviews();
    };
    reader.readAsDataURL(file);
  });

  e.target.value = '';
}

// Render image previews
function renderImagePreviews() {
  const container = document.getElementById('imagePreviews');
  container.innerHTML = '';

  uploadedImages.forEach((img, index) => {
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    preview.innerHTML = `
      <img src="${img}" alt="Preview ${index + 1}">
      <span class="remove-image" data-index="${index}">&times;</span>
    `;
    container.appendChild(preview);
  });

  // Attach remove handlers
  container.querySelectorAll('.remove-image').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      uploadedImages.splice(idx, 1);
      renderImagePreviews();
    });
  });
}

// Submit / update listing
function submitListing() {
  const user = Storage.getUser();
  if (!user) return;

  const title = document.getElementById('itemTitle').value.trim();
  const description = document.getElementById('itemDescription').value.trim();
  const forWhom = document.getElementById('itemForWhom').value;
  const ageRange = document.getElementById('itemAgeRange').value;
  const clothingType = document.getElementById('itemType').value;
  const size = document.getElementById('itemSize').value;
  const price = parseFloat(document.getElementById('itemPrice').value);
  const condition = document.getElementById('itemCondition').value;
  const location = document.getElementById('itemLocation').value;
  const contactType = document.getElementById('itemContactType').value;
  const contactValue = document.getElementById('itemContactValue').value.trim();
  const editingId = document.getElementById('editingId').value;

  // Validation
  if (!title || !description || !forWhom || !clothingType || !size || !price || !condition || !location || !contactValue) {
    showToast('Please fill in all required fields', true);
    return;
  }

  const listingData = {
    title,
    description,
    forWhom,
    ageRange: ['Children', 'Girls', 'Boys'].includes(forWhom) ? ageRange : '',
    clothingType,
    size,
    price,
    condition,
    location,
    sellerName: user.name,
    sellerId: user.id,
    contactType,
    contactValue,
    images: uploadedImages
  };

  if (editingId) {
    updateListing(editingId, listingData);
    showToast('Listing updated successfully!');
  } else {
    addListing(listingData);
    showToast('Listing published successfully!');
  }

  resetForm();
  renderMyListings();
}

// Reset form
function resetForm() {
  document.getElementById('editingId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Listing';
  document.getElementById('itemTitle').value = '';
  document.getElementById('itemDescription').value = '';
  document.getElementById('itemForWhom').value = '';
  document.getElementById('itemAgeRange').value = '';
  document.getElementById('itemType').value = '';
  document.getElementById('itemSize').innerHTML = '<option value="">Select size</option>';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemCondition').value = '';
  document.getElementById('itemLocation').value = '';
  document.getElementById('itemContactType').value = 'whatsapp';
  document.getElementById('itemContactValue').value = '';
  document.getElementById('ageRangeFormGroup').style.display = 'none';
  document.getElementById('cancelEdit').style.display = 'none';
  document.getElementById('submitListing').textContent = 'Publish Listing';
  uploadedImages = [];
  renderImagePreviews();
}

// Edit a listing
function editListing(id) {
  const listing = getListingById(id);
  if (!listing) return;

  editingListing = listing;
  document.getElementById('editingId').value = id;
  document.getElementById('formTitle').textContent = 'Edit Listing';
  document.getElementById('itemTitle').value = listing.title;
  document.getElementById('itemDescription').value = listing.description;
  document.getElementById('itemForWhom').value = listing.forWhom;
  document.getElementById('itemType').value = listing.clothingType;
  document.getElementById('itemPrice').value = listing.price;
  document.getElementById('itemCondition').value = listing.condition;
  document.getElementById('itemLocation').value = listing.location;
  document.getElementById('itemContactType').value = listing.contactType || 'whatsapp';
  document.getElementById('itemContactValue').value = listing.contactValue || '';

  // Handle forWhom-dependent fields
  if (['Children', 'Girls', 'Boys'].includes(listing.forWhom)) {
    document.getElementById('ageRangeFormGroup').style.display = 'block';
    document.getElementById('itemAgeRange').value = listing.ageRange || '';
  }

  updateSizeOptions(listing.forWhom);
  document.getElementById('itemSize').value = listing.size;

  uploadedImages = listing.images ? [...listing.images] : [];
  renderImagePreviews();

  document.getElementById('cancelEdit').style.display = 'block';
  document.getElementById('submitListing').textContent = 'Update Listing';

  // Scroll to form
  document.querySelector('.listing-form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render my listings
function renderMyListings() {
  const user = Storage.getUser();
  if (!user) return;

  const container = document.getElementById('myListingsContent');
  const myItems = getSellerListings(user.id);

  if (myItems.length === 0) {
    container.innerHTML = `
      <div class="no-listings">
        <p>You haven't listed any items yet. Use the form above to add your first listing!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = myItems.map(item => {
    const bgColor = getPlaceholderColor(item);
    const icon = TYPE_ICONS[item.clothingType] || '👕';

    return `
      <div class="my-listing-item">
        <div class="my-listing-thumb" style="background:${bgColor};display:flex;align-items:center;justify-content:center">
          ${item.images && item.images.length > 0
            ? `<img src="${item.images[0]}" alt="${item.title}">`
            : `<span style="font-size:24px">${icon}</span>`}
        </div>
        <div class="my-listing-info">
          <h4>${item.title}</h4>
          <p>${FFM.CURRENCY}${item.price} &middot; Size ${item.size} &middot; ${item.condition} &middot; ${formatDate(item.createdAt)}</p>
        </div>
        <div class="my-listing-actions">
          <button class="btn-icon" onclick="editListing('${item.id}')" title="Edit">✏️</button>
          <button class="btn-icon delete" onclick="confirmDelete('${item.id}')" title="Delete">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

// Confirm delete
function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this listing?')) {
    deleteListing(id);
    renderMyListings();
    showToast('Listing deleted');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateFormDropdowns();
  setupAuth();
  setupListingForm();
  checkAuth();
});
