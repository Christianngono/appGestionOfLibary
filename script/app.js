document.addEventListener('DOMContentLoaded', function() {
    const optionForm = document.getElementById('optionForm');
    const inputFields = document.getElementById('inputFields');
    let allResults = []; // Liste pour stocker tous les resultats

    optionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedOption = document.getElementById('option').value;
        let formData = new FormData(optionForm);
        let requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });
        fetch('/api/books/' + selectedOption, {
            method: selectedOption === 'sortBooks' ? 'GET' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            allResults.push(data);
            displayResult(data);
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('optionSelect').addEventListener('change', function(event) {
        const selectedOption = event.target.value;
        if (selectedOption === 'addBook' || selectedOption === 'removeBook' || selectedOption === 'returnBook' || selectedOption === 'borrowBook') {
            inputFields.innerHTML = `
                <label for="inputTitle">Titre :</label>
                <input type="text" id="inputTitle" name="title">
                <label for="inputAuthor">Auteur :</label>
                <input type="text" id="inputAuthor" name="author">
                <label for="inputGenre">Genre :</label>
                <input type="text" id="inputGenre" name="genre">
            `;
        } else if (selectedOption === 'searchBookByTitle' || selectedOption === 'searchBookByAuthor' || selectedOption === 'searchBookByGenre') {
            inputFields.innerHTML = `
                <label for="query">Recherche :</label>
                <input type="text" id="query" name="query">
            `;
        } else {
            inputFields.innerHTML = '';
        }
        inputFields.classList.toggle('hidden', selectedOption === 'getBooks' || selectedOption === 'getBorrowedBooks' || selectedOption === 'getOverdueBooks' || selectedOption === 'getAvailableBooks');
    });

    function displayResult(data) {
        const output = document.getElementById('output');
        const resultDiv = document.createElement('div');
        resultDiv.textContent = JSON.stringify(data, null, 2);
        output.appendChild(resultDiv);
    }

    function displayAllResults() {
        const output = document.getElementById('output');
        output.innerHTML = '';
        allResults.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = JSON.stringify(result, null, 2);
            output.appendChild(resultDiv);
        });
        allResults = [];
    }

    document.getElementById('displayAllResults').addEventListener('click', function() {
        displayAllResults();
    });
});
