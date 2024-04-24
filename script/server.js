const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Analyse le corps des requêtes au format JSON
app.use(bodyParser.json());

// Définition des routes pour chaque option
app.post('/api/getBooks', (req, res) => {
    // Traitement pour récupérer la collection de livres
    const books = []; // Remplacer cela par votre traitement réel pour récupérer les livres
    res.json(books);
});

// Définir d'autres routes pour chaque option ici...

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});