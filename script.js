// Listings array - include all 3 Airbnb listings directly
let listings = [
  {
    title: "Furnished Airbnb Studio – Witeithie",
    category: "airbnb",
    location: "Witeithie Estate",
    price: "2,500 per night",
    description: "Fully furnished studio with Wi-Fi, hot shower, and secure parking. Ideal for short stays.",
    image: "images/airbnb1.jpg",
    contact: "+2547XXXXXXXX"
  },
  {
    title: "Airbnb 1-Bedroom Apartment – Thika Town",
    category: "airbnb",
    location: "Thika Town",
    price: "3,000 per night",
    description: "Spacious 1-bedroom apartment with balcony, Wi-Fi, and parking. Ideal for short stays.",
    image: "images/airbnb2.jpg",
    contact: "+2547XXXXXXXX"
  },
  {
    title: "Airbnb Studio – Juja",
    category: "airbnb",
    location: "Juja",
    price: "2,000 per night",
    description: "Cozy studio with all amenities included. Ideal for short stays.",
    image: "images/airbnb3.jpg",
    contact: "+2547XXXXXXXX"
  }
];

let selectedForCompare = [];

// -----------------------------
// Fetch additional listings (houses, hostels, schools) from JSON
// -----------------------------
fetch('listings.json')
  .then(res => res.json())
  .then(data => {
    listings = listings.concat(data); // combine Airbnb + JSON listings
    displayListings(listings);        // display all on page load
  })
  .catch(err => {
    console.error("Failed to load listings.json", err);
    displayListings(listings); // if JSON fails, show Airbnb only
  });

// -----------------------------
// Display function
// -----------------------------
function displayListings(list) {
  const container = document.getElementById('listings');
  container.innerHTML = '';
  list.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('listing-card');
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p>Price: KSh ${item.price}</p>
      ${item.image ? `<img src="${item.image}" alt="${item.title}" width="250"><br>` : ''}
      <input type="checkbox" onchange="toggleCompare(${index}, this)"> Compare
    `;
    container.appendChild(div);
  });
  document.getElementById('compareBtn').style.display = selectedForCompare.length > 0 ? 'block' : 'none';
}

// -----------------------------
// Compare listings
// -----------------------------
function toggleCompare(index, checkbox) {
  if (checkbox.checked) selectedForCompare.push(listings[index]);
  else selectedForCompare = selectedForCompare.filter(item => item !== listings[index]);
  document.getElementById('compareBtn').style.display = selectedForCompare.length > 0 ? 'block' : 'none';
}

function compareListings() {
  const container = document.getElementById('comparison');
  container.innerHTML = '<h2>Comparison</h2>';
  if (selectedForCompare.length === 0) return;
  let table = '<table border="1"><tr>';
  selectedForCompare.forEach(item => table += `<th>${item.title}</th>`);
  table += '</tr><tr>';
  selectedForCompare.forEach(item => table += `<td>${item.description}</td>`);
  table += '</tr><tr>';
  selectedForCompare.forEach(item => table += `<td>KSh ${item.price}</td>`);
  table += '</tr><tr>';
  selectedForCompare.forEach(item => table += `<td>${item.image ? `<img src="${item.image}" width="100">` : ''}</td>`);
  table += '</tr></table>';
  container.innerHTML += table;
}

// -----------------------------
// Show category
// -----------------------------
function showCategory(cat) {
  if (cat === 'all') displayListings(listings);
  else displayListings(listings.filter(l => l.category === cat));
}

// -----------------------------
// Search listings
// -----------------------------
function searchListings() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  displayListings(listings.filter(l => 
    l.title.toLowerCase().includes(term) ||
    l.description.toLowerCase().includes(term) ||
    (l.subcategory && l.subcategory.toLowerCase().includes(term))
  ));
}

// -----------------------------
// Contact form submission
// -----------------------------
function submitContactForm(e) {
  e.preventDefault();
  alert('Thank you! We will get back to you soon.');
  document.getElementById('contactForm').reset();
}

// -----------------------------
// Display all listings initially
// -----------------------------
displayListings(listings);
