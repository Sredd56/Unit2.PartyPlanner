
const partyContainer = document.getElementById('partyContainer');
const partyForm = document.getElementById('partyForm');

// Fetch data from API
async function fetchParties() {
  try {
    const response = await fetch('/api/2109-CPU-RM-WEB-PT/events');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching parties:', error);
    throw error;
  }
}


// Render the list of parties
function renderParties(parties) {
 
  partyContainer.innerHTML = '';

  
  parties.forEach(party => {
    const partyItem = document.createElement('div');
    partyItem.innerHTML = `
      <h3>${party.name}</h3>
      <p>Date: ${party.date}</p>
      <p>Location: ${party.location}</p>
      <p>Description: ${party.description}</p>
      <button onclick="deleteParty(${party.id})">Delete</button>
    `;
    partyContainer.appendChild(partyItem);
  });
}


partyForm.addEventListener('submit', async event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;

  try {
    
    const response = await fetch('/api/2109-CPU-RM-WEB-PT/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, date, location, description }),
    });

    const data = await response.json();

    
    const updatedParties = await fetchParties();
    renderParties(updatedParties);
  } catch (error) {
    console.error('Error adding party:', error);
  }
});

// Delete a party
async function deleteParty(id) {(
  try {
    
    const response = await fetch('http://127.0.0.1:3000/api/2109-CPU-RM-WEB-PT/events');

      method: 'DELETE',
    });


    if (response.ok) {
    
      const updatedParties = await fetchParties();
      renderParties(updatedParties);
    } else {
      throw new Error('Failed to delete party');
    }
  } catch (error) {
    console.error('Error deleting party:', error);
  }
}


async function init() {
  try {
    const parties = await fetchParties();
    renderParties(parties);
  } catch (error) {
    console.error('Error initializing:', error);
  }
}


init();
