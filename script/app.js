document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const displayAllResultsBtn = document.querySelector('#displayAllResultsBtn');
    const addBookBtn = document.getElementById('addBookBtn');
    const deleteBookBtn = document.getElementById('deleteBookBtn');
    const borrowBookBtn = document.getElementById('borrowBookBtn');
    const returnBookBtn = document.getElementById('returnBookBtn');
    const searchForm = document.getElementById('searchForm');

    const API_URL = '/api/books/getBooks';

    function displayResult(data) {
        output.innerHTML = '';
        data.forEach(book => {
            output.innerHTML += `<div>${book.id} - ${book.title}</div>`;
            output.innerHTML += `<div>${book.author}</div>`;
            output.innerHTML += `<div>${book.genre}</div>`;
            output.innerHTML += `<div>${book.borrowed ? 'Emprunté' : 'Disponible'}</div>`;
            output.innerHTML += `<div>${book.dueDate}</div>`;
        });
    }

    displayAllResultsBtn.addEventListener('click', function () {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                displayResult(data);
            })
            .catch(error => console.error('Error:', error));
    });

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('searchQuery').value;
        fetch('/searchResults', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchQuery })
        })
        .then(response => response.json())
        .then(data => {
            displayResult(data);
        })
        .catch(error => console.error('Error:', error));
    });

    addBookBtn.addEventListener('click', function() {
        fetch('/addBook', {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                console.log('Livre ajouté avec succès');
                location.reload();
            } else {
                console.error('Erreur lors de l\'ajout du livre');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    deleteBookBtn.addEventListener('click', function() {
        const bookId = prompt('Entrez l\'ID du livre à supprimer :');
        if (bookId) {
            fetch(`/deleteBook/${bookId}`, {
                method: 'POST'
            })
            .then(response => {
                if (response.ok) {
                    console.log('Livre supprimé avec succès');
                    location.reload();
                } else {
                    console.error('Erreur lors de la suppression du livre');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });

    borrowBookBtn.addEventListener('click', function() {
        const bookId = prompt('Entrez l\'ID du livre à emprunter :');
        const dueDate = prompt('Entrez la date d\'échéance :');
        if (bookId && dueDate) {
            fetch(`/borrowBook/${bookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dueDate })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Livre emprunté avec succès');
                    location.reload();
                } else {
                    console.error('Erreur lors de l\'emprunt du livre');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });

    returnBookBtn.addEventListener('click', function() {
        const bookId = prompt('Entrez l\'ID du livre à retourner :');
        if (bookId) {
            fetch(`/returnBook/${bookId}`, {
                method: 'POST'
            })
            .then(response => {
                if (response.ok) {
                    console.log('Livre retourné avec succès');
                    location.reload();
                } else {
                    console.error('Erreur lors du retour du livre');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});