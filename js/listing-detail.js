// ===== Listing Detail Page Logic =====

function renderListingDetail() {
  // Get listing ID from hash (e.g. /listing/#1) or query param as fallback
  let id = window.location.hash.replace('#', '');
  if (!id) {
    const params = new URLSearchParams(window.location.search);
    id = params.get('id');
  }

  if (!id) {
    window.location.href = '/';
    return;
  }

  const listing = getListingById(id);

  if (!listing) {
    document.getElementById('detailContent').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">😕</div>
        <h3>Listing not found</h3>
        <p>This item may have been removed or the link is incorrect.</p>
        <a href="/" style="margin-top:16px;display:inline-block" class="btn-primary">Browse All Items</a>
      </div>
    `;
    return;
  }

  // Update page title
  document.title = `${listing.title} - Frum Fashion Market`;

  const bgColor = getPlaceholderColor(listing);
  const icon = TYPE_ICONS[listing.clothingType] || '👕';

  const imageHtml = listing.images && listing.images.length > 0
    ? `<img src="${listing.images[0]}" alt="${listing.title}">`
    : `<div class="placeholder-icon">${icon}</div>`;

  // Build contact button
  let contactHtml = '';
  if (listing.contactType === 'whatsapp') {
    contactHtml = `
      <a href="https://wa.me/${listing.contactValue}?text=${encodeURIComponent('Hi, I\'m interested in your listing on Frum Fashion Market: ' + listing.title)}"
         target="_blank" class="btn-contact">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.637l4.653-1.448A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.308-.724-5.993-1.953a.5.5 0 00-.395-.077l-3.071.955.983-3.164a.5.5 0 00-.064-.416A9.946 9.946 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        Contact via WhatsApp
      </a>
    `;
  } else if (listing.contactType === 'phone') {
    contactHtml = `
      <a href="tel:${listing.contactValue}" class="btn-contact" style="background:var(--navy)">
        📞 Call ${listing.contactValue}
      </a>
    `;
  } else if (listing.contactType === 'email') {
    contactHtml = `
      <a href="mailto:${listing.contactValue}?subject=${encodeURIComponent('Frum Fashion Market: ' + listing.title)}" class="btn-contact-alt">
        ✉️ Email Seller
      </a>
    `;
  }

  // Age range display
  const ageDisplay = listing.ageRange ? `
    <div class="spec-item">
      <div class="spec-label">Age Range</div>
      <div class="spec-value">${listing.ageRange} years</div>
    </div>
  ` : '';

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-gallery">
      <div class="detail-main-image" style="background:${bgColor}">
        ${imageHtml}
      </div>
    </div>
    <div class="detail-info">
      <h1>${listing.title}</h1>
      <div class="detail-price">${FFM.CURRENCY}${listing.price}</div>

      <div class="detail-specs">
        <div class="spec-item">
          <div class="spec-label">Size</div>
          <div class="spec-value">${listing.size}</div>
        </div>
        <div class="spec-item">
          <div class="spec-label">Condition</div>
          <div class="spec-value">${listing.condition}</div>
        </div>
        <div class="spec-item">
          <div class="spec-label">Category</div>
          <div class="spec-value">${listing.clothingType}</div>
        </div>
        <div class="spec-item">
          <div class="spec-label">For</div>
          <div class="spec-value">${listing.forWhom}</div>
        </div>
        ${ageDisplay}
        <div class="spec-item">
          <div class="spec-label">Posted</div>
          <div class="spec-value">${formatDate(listing.createdAt)}</div>
        </div>
      </div>

      <div class="detail-description">
        <h3>Description</h3>
        <p>${listing.description}</p>
      </div>

      <div class="detail-seller">
        <div class="seller-name">${listing.sellerName}</div>
        <div class="seller-location">📍 ${listing.location}</div>
        ${contactHtml}
      </div>
    </div>
  `;

  // Load related listings
  loadRelatedListings(listing);
}

function loadRelatedListings(listing) {
  const all = getAllListings().filter(l => l.id !== listing.id);

  // Find related: same forWhom or same clothingType
  let related = all.filter(l => l.forWhom === listing.forWhom || l.clothingType === listing.clothingType);

  // If not enough, just grab recent ones
  if (related.length < 4) {
    const extra = all.filter(l => !related.includes(l));
    related = [...related, ...extra];
  }

  related = related.slice(0, 4);

  if (related.length > 0) {
    const section = document.getElementById('relatedSection');
    const grid = document.getElementById('relatedGrid');
    section.style.display = 'block';

    related.forEach(item => {
      const card = createRelatedCard(item);
      grid.appendChild(card);
    });
  }
}

function createRelatedCard(listing) {
  const card = document.createElement('a');
  card.className = 'listing-card';
  card.href = `/listing/?id=${listing.id}`;

  const bgColor = getPlaceholderColor(listing);
  const icon = TYPE_ICONS[listing.clothingType] || '👕';

  const imageHtml = listing.images && listing.images.length > 0
    ? `<img src="${listing.images[0]}" alt="${listing.title}">`
    : `<div class="placeholder-icon">${icon}</div>`;

  card.innerHTML = `
    <div class="card-image" style="background:${bgColor}">
      ${imageHtml}
    </div>
    <div class="card-body">
      <h3>${listing.title}</h3>
      <div class="card-price">${FFM.CURRENCY}${listing.price}</div>
      <div class="card-meta">
        <span>📐 ${listing.size}</span>
        <span>📍 ${listing.location.split(' - ')[0]}</span>
      </div>
    </div>
  `;

  return card;
}

document.addEventListener('DOMContentLoaded', renderListingDetail);
