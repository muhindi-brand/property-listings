// Listings array
let listings = [
  // Example Airbnb listing
  {
    title: "Furnished Airbnb Studio – Witeithie",
    category: "airbnb",
    location: "Witeithie Estate",
    price: "2,500 per night",
    description: "Fully furnished studio with Wi-Fi, hot shower, and secure parking. Ideal for short stays.",
    image: "images/airbnb1.jpg",
    contact: "+2547XXXXXXXX"
  }
];

let selectedForCompare = [];

// Fetch additional listings from JSON (houses, hostels, etc.)
fetch('listings.json')
  .then(res => res.json())
  .then(data => {
    listings = listings.concat(data); // keep Airbnb + add JSON listings
    displayListings(listings);
  })
  .catch(err => {
    console.error("Failed to load listings.json", err);
    displayListings(listings); // show Airbnb only if JSON fails
  });

// Display listings in the main container
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

// Compare listings
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

// Show specific category (houses, hostels, airbnb, etc.)
function showCategory(cat) {
  if (cat === 'all') displayListings(listings);
  else displayListings(listings.filter(l => l.category === cat));
}

// Search listings
function searchListings() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  displayListings(listings.filter(l => 
    l.title.toLowerCase().includes(term) ||
    l.description.toLowerCase().includes(term) ||
    (l.subcategory && l.subcategory.toLowerCase().includes(term))
  ));
}

// Contact form submission
function submitContactForm(e) {
  e.preventDefault();
  alert('Thank you! We will get back to you soon.');
  document.getElementById('contactForm').reset();
}
