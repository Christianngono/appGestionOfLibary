const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const booksDataPath = path.join(__dirname, 'booksData.json');
const booksData = require(booksDataPath);

// Configuration du moteur de modèle EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Définir le répertoire des vues

// Middleware pour servir les fichiers statiques (CSS, JavaScript, etc)
app.use('/static', express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true })); // Middleware pour parser les données POST

// Route pour la page d'accueil
app.get('/', function(req, res) {
    res.render('index', { books: booksData, page: 'Accueil', request: req });
});

// Route pour la page d'ajout de livre
app.get('/addBook', function(req, res) {
    res.render('addBook', { page: 'Ajouter un livre', request: req });
});

// Route pour ajouter un livre
app.post('/addBook', function(res) {
    const highestId = Math.max(...booksData.map(book => book.id));
    const newBookId = highestId + 1;
    booksData.push({
        id: newBookId,
        title: 'Titre du livre',
        author: 'Auteur du livre',
        genre: 'Genre du livre',
        borrowed: false,
        dueDate: ''
    });
    fs.writeFileSync(booksDataPath, JSON.stringify(booksData, null, 2));
    res.redirect('/');
});

// Route pour la page pour suppression de livres dans booksData.json
app.get('/deleteBook', function(req, res) {
    res.render('deleteBook', { page: 'Supprimer un livre', request: req });
});

// Route pour supprimer un livre
app.post('/deleteBook/:id', function(req, res){
    const bookId = parseInt(req.params.id);
    const bookIndex = booksData.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        booksData.splice(bookIndex, 1);
        fs.writeFileSync(booksDataPath, JSON.stringify(booksData, null, 2));
        res.redirect('/');
    } else {
        res.status(404).render('error', { page: 'Erreur', request: req });
    }
});

// Route pour la page d'emprunt de livres dans booksData.jon
app.get('/borrowBook', function(req, res) {
    res.render('borrowBook', { page: 'Emprunter un livre', request: req });
});

// Route pour emprunter un livre
app.post('/borrowBook/:id', function (req, res) {
    const bookId = parseInt(req.params.id);
    const book = booksData.find(book => book.id === bookId);
    if (book) {
        if (!book.borrowed) {
            book.borrowed = true;
            book.dueDate = req.body.dueDate;
            fs.writeFileSync(booksDataPath, JSON.stringify(booksData, null, 2));
            res.redirect('/');
        } else {
            res.status(400).send('Le livre est déjà emprunté.');
        }
    } else {
        res.status(404).send('Livre non trouvé.');
    }
});

// Route pour la page de retour de livres dans booksData.json
app.get('/returnBook', function(req, res) {
    res.render('returnBook', { page: 'Retourner un livre', request: req });
});
// Route pour retourner un livre
app.post('/returnBook/:id', function(req, res) {
    const bookId = parseInt(req.params.id);
    const book = booksData.find(book => book.id === bookId);
    if (book) {
        if (book.borrowed) {
            book.borrowed = false;
            book.dueDate = '';
            fs.writeFileSync(booksDataPath, JSON.stringify(booksData, null, 2));
            res.redirect('/');
        } else {
            res.status(400).send('Le livre n\'a pas été emprunté.');
        }
    } else {
        res.status(404).send('Livre non trouvé.');
    }
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server listening at http://localhost:${port}`);
});