document.addEventListener('DOMContentLoaded', function() {
    const optionForm = document.getElementById('optionForm');
    const output = document.getElementById('output');
    const displayAllResultsBtn = document.querySelector('button');

    // Charger les données des livres lors du chargement de la page
    fetch('/api/books/getBooks')
        .then(response => response.json())
        .then(data => {
            displayAllResults(data);
        })
        .catch(error => console.error('Error:', error));

    optionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedOption = document.getElementById('option').value;
        const formData = new FormData(optionForm);
        const requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });
        fetch(`/api/books/${selectedOption}`, {
            method: selectedOption === 'sortBooks' ? 'GET' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            displayResult(data);
            // Si l'option sélectionnée est "getBooks", afficher le bouton pour afficher tous les résultats
            if (selectedOption === 'getBooks') {
                displayAllResultsBtn.classList.remove('hidden');
            } else {
                displayAllResultsBtn.classList.add('hidden');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Écouter les clics sur le bouton "Afficher tous les résultats"
    displayAllResultsBtn.addEventListener('click', function () {
        fetch('/api/books/getBooks')
            .then(response => response.json())
            .then(data => {
                displayAllResults(data);
            })
            .catch(error => console.error('Error:', error));
    });
    
    function displayResult(data) {
        output.innerHTML = ''; // Clear previous result 
        const resultDiv = document.createElement('div');
        resultDiv.textContent = JSON.stringify(data, null, 2);
        output.appendChild(resultDiv);
    }

    function displayAllResults(data) {
        output.innerHTML = '';
        const resultDiv = document.createElement('div');
        resultDiv.textContent = JSON.stringify(data, null, 2);
        output.appendChild(resultDiv);   
    }
});