document.addEventListener('DOMContentLoaded', function() {
    const optionForm = document.getElementById('optionForm');
    const output = document.getElementById('output');
    const displayAllResultsBtn = document.querySelector('button');
    const API_URL = '/api/books/getBooks'; // URL de l'API pour récupérer les livres

    // Variable pour stocker l'option sélectionnée
    let selectedOption;

    // Charger les données des livres lors du chargement de la page
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Traitement des données retournées
            displayResult(data);
            // Si l'option sélectionnée est "getBooks", afficher le bouton pour afficher tous les résultats
            if (selectedOption === 'getBooks') {
                displayAllResultsBtn.classList.remove('hidden');
            } else {
                displayAllResultsBtn.classList.add('hidden');
            }
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
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                displayAllResults(data);
            })
            .catch(error => console.error('Error:', error));
    });
    
    function displayResult(data) {
        output.innerHTML = ''; // Clear previous result 
        // Boucle sur les données et affichage approprié
        data.forEach(book => {
          output.innerHTML += `<div>${book.id} - ${book.title}</div>`;
          output.innerHTML += `<div>${book.author}</div>`;
          output.innerHTML += `<div>${book.genre}</div>`;
          output.innerHTML += `<div>${book.borrowed}</div>`;
          output.innerHTML += `<div>${book.dueDate}</div>`;
        });
    }

    function displayAllResults(data) {
        output.innerHTML = '';
        data.forEach(book => {
            output.innerHTML += `<div>${book.id} - ${book.title}</div>`;
            output.innerHTML += `<div>${book.author}</div>`;
            output.innerHTML += `<div>${book.genre}</div>`;
            output.innerHTML += `<div>${book.borrowed}</div>`;
            output.innerHTML += `<div>${book.dueDate}</div>`;
        });
    }
});