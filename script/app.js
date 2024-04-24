document.addEventListener('DOMContentLoaded', function() {
    const optionForm = document.getElementById('optionForm');
    const inputFields = document.getElementById('inputFields');
    const output = document.getElementById('output');
    let allResults = []; // Liste pour stocker tous les resultats

    optionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedOption = document.getElementById('option').value;
        let formData = new FormData(optionForm);
        let requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });
        fetch('/api/' + selectedOption, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            output.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('option').addEventListener('change', function(event) {
        const selectedOption = event.target.value;
        if (selectedOption === 'addBook' || selectedOption === 'removeBook' || selectedOption === 'returnBook' || selectedOption === 'borrowBook') {
            inputFields.innerHTML = `
                <label for="title">Titre :</label>
                <input type="text" id="title" name="title">
                <label for="author">Auteur :</label>
                <input type="text" id="author" name="author">
                <label for="genre">Genre :</label>
                <input type="text" id="genre" name="genre">
            `;
        } else if (selectedOption === 'searchBook' || selectedOption === 'searchBookByAuthor' || selectedOption === 'searchBookByGenre') {
            inputFields.innerHTML = `
                <label for="query">Recherche :</label>
                <input type="text" id="query" name="query">
            `;
        } else {
            inputFields.innerHTML = '';
        }
    });
    function displayAllResults() {
        let html = '';
        allResults.forEach((result, index) => {
            html += `<p><strong>Option ${index + 1}: ${result.option}</strong></p>`;
            html += `<pre>${JSON.stringify(result.result, null, 2)}</pre>`;
        });
        output.innerHTML = html;
    }
});