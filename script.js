const kartochki = document.getElementById('kartochki');
const btn = document.getElementById('btn');
const body = document.querySelector('body');
const input = document.getElementById('input');

let usersData = [];
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    usersData = data; 
    renderCards(data);
  });

function renderCards(data) {
  kartochki.innerHTML = '';
  data.forEach(element => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${element.name}</h3>
      <p>${element.email}</p>
      <p>${element.phone}</p>
      <p>${element.address.city}, ${element.address.street}</p>
    `;
    kartochki.appendChild(card);
  });
}

function search() {
  const searchValue = input.value.toLowerCase().trim();
  const filtered = usersData.filter(element => {
    const name = element.name.trim().toLowerCase();
    return name.includes(searchValue);
  });

  if (filtered.length > 0) {
    renderCards(filtered); 
  } else {
    kartochki.innerHTML = `<p>НЕ НАЙДЕНО</p>`; 
  }
}

input.addEventListener('input', search);
btn.addEventListener('click', () => {
  body.classList.toggle('color');
});
