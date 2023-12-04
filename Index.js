// Get a reference to the partyContainer and partyForm elements
const partyContainer = document.getElementById('partyContainer');
const partyForm = document.getElementById('partyForm');

// Fetch party data from the API
fetch('/events')
  .then(response => response.json())
  .then(data => renderParties(data))
  .catch(error => console.error(error));

// Render the list of parties
function renderParties(parties) {
  // Clear the partyContainer
  partyContainer.innerHTML = '';

  // Loop through each party and create a party item
  parties.forEach(party => {
    const partyItem = document.createElement('div');
    partyItem.innerHTML = `
      <h3>${party.name}</h3>
      <p>Date: ${party.date}</p>
      <p>Time: ${party.time}</p>
      <p>Location: ${party.location}</p>
      <p>Description: ${party.description}</p>
      <button onclick="deleteParty(${party.id})">Delete</button>
    `;
    partyContainer.appendChild(partyItem);
  });
}

// Add a new party
partyForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;

 
  fetch('/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, date, time, location, description })
  })
    .then(response => response.json())
    .then(data => {
      // Fetch the updated list of parties from the API
      fetch('/events')
        .then(response => response.json())
        .then(data => renderParties(data))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

// Delete a party
function deleteParty(id) {
  // Send a DELETE request to the API to delete the party
  fetch(`/events/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // Fetch the updated list of parties from the API
        fetch('/events')
          .then(response => response.json())
          .then(data => renderParties(data))
          .catch(error => console.error(error));
      } else {
        throw new Error('Failed to delete party');
      }
    })
    .catch(error => console.error(error));
}