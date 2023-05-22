// app.js

const addForm = document.getElementById('add-form');
const submitMessage = document.getElementById('submit-message');

addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the form values
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  // Create a new entry object
  const newEntry = {
    name: name,
    age: age,
    weight: weight,
    height: height
  };

  // Call a function to append the new entry to the fitness_data.json file
  appendData(newEntry);

  // Reset the form
  addForm.reset();

  // Display the submit message
  submitMessage.textContent = 'Submitted';
  setTimeout(function() {
    submitMessage.textContent = '';
  }, 3000);
});

function appendData(newEntry) {
  // Read the existing data from the fitness_data.json file
  fetch('/data/fitness_data.json')
    .then(response => response.json())
    .then(data => {
      // Append the new entry to the existing data
      data.push(newEntry);

      // Write the updated data back to the fitness_data.json file
      fetch('/data/fitness_data.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    });
}
