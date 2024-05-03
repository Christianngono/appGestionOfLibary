const express = require('express');
const app = express();
const path = require('path');
const booksData = require('./booksData.json');

// Configuration du moteur de modèle EJS
app.set('view engine', 'ejs');

// Middleware pour servir les fichiers statiques (CSS, JavaScript, etc)
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));


// Route pour la page d'accueil
app.get('/', function(req, res) {
    res.render('index', { books: booksData, page: 'Accueil', request: req });
});

// Route pour la page d'ajout de livre
app.get('/addBook', function(req, res) {
    res.render('addBook', { books: booksData, page: 'Ajouter un livre', request: req });
});

// Route pour afficher les détails d'un livre
app.get('/book/: id', function(req, res) {
    const bookId = parseInt(req.params.id);
    const book = booksData.find(book => book.id === bookId);
    if (!book) {
        res.status(404).send('Livre non trouvé.');
    } else {
        res.render('bookDetails', { book, page: 'Détails du livre', request: req });
    }       
});


// Route pour la page d'emprunt de livre
app.get('/book/:id/borrow', function(req, res) {
    const bookId = parseInt(req.params.id);
    const book = booksData.find(book => book.id === bookId);
    if (!book) {
        res.status(404).send('Livre non trouvé.');
    } else {
        res.render('borrowBook', { book, page: 'Emprunter un livre', request: req });
    }   
});

// Route pour la page de retour de livre
app.get('/returnBook', function(req, res) {
    res.render('returnBook', { books: booksData, page: 'Rendre un livre', request: req });
});

// Route pour la page de résultats de recherche
app.get('/searchResults', function(req, res) {
    res.render('searchResults', { books: booksData, page: 'Résultats de recherche', request: req });
});

// Route pour la page d'erreur
app.get('/error', function(req, res) {
    res.render('error', { books: booksData, page: 'Erreur', request: req });
});

// Route pour récupérer les données des livres au format JSON
app.get('/api/books/getBooks', function(req, res) {
    // Accéder aux données de la requête ou pour effectuer les opérations basées sur la requête.
    console.log(req.query);
    res.json(booksData);
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server listening at http://localhost:${port}`);
});