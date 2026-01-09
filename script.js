let listings = [];
let selectedForCompare = [];

fetch('listings.json')
  .then(res => res.json())
  .then(data => {
    listings = data;
    displayListings(listings);
  });

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
      <img src="${item.image}" alt="${item.title}" width="250"><br>
      <input type="checkbox" onchange="toggleCompare(${index}, this)"> Compare
    `;
    container.appendChild(div);
  });
  document.getElementById('compareBtn').style.display = selectedForCompare.length > 0 ? 'block' : 'none';
}

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
  selectedForCompare.forEach(item => table += `<td><img src="${item.image}" width="100"></td>`);
  table += '</tr></table>';
  container.innerHTML += table;
}

function showCategory(cat) {
  if (cat === 'all') displayListings(listings);
  else displayListings(listings.filter(l => l.category === cat));
}

function searchListings() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  displayListings(listings.filter(l => 
    l.title.toLowerCase().includes(term) ||
    l.description.toLowerCase().includes(term) ||
    l.subcategory.toLowerCase().includes(term)
  ));
}

function submitContactForm(e) {
  e.preventDefault();
  alert('Thank you! We will get back to you soon.');
  document.getElementById('contactForm').reset();
}
