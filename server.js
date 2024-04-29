const express = require('express');
const app = express();
const path = require('path');

// Configuration du moteur de modèle EJS
app.set('view engine', 'ejs');

// Tableau de livres
let books = [ 
    { title:"Book 1", author:"Author 1", genre:"Fiction", borrowed: false, dueDate: null }, 
    { title:"Book 2", author:"Author 2", genre:"UnFiction", borrowed: true, dueDate: "2024-04-30" }, 
    { title:"Book 3", author:"Author 3", genre:"Love", borrowed: true, dueDate: "2024-03-20" }, 
    { title:"Book 4", author:"Author 4", genre:"Adventure", borrowed: true, dueDate: "2024-03-05"},
    { title:"Book 5", author:"Author 5", genre:"Fantasy", borrowed: false, dueDate: null }, 
    { title:"Book 6", author:"Author 6", genre:"Action", borrowed: true, dueDate: "2024-04-05"}, 
    { title:"Book 7", author:"Author 7", genre:"Mystery", borrowed: true, dueDate:"2024-04-09" },
    { title:"Book 8", author:"Author 8", genre:"Romance", borrowed: true, dueDate: "2024-04-08"}, 
    { title:"Book 9", author:"Author 9", genre:"Horror", borrowed: true, dueDate: "2024-04-15" },
    { title:"Book 10", author:"Author 10", genre:"Thriller", borrowed: true, dueDate: "2024-02-12"}, 
    { title:"Book 11", author:"Author 11", genre:"Sci-Fi", borrowed: false, dueDate: null },
    { title:"Book 12", author:"Author 12", genre:"Drama", borrowed: true, dueDate: "2024-04-15" },
    { title:"Book 13", author:"Author 13", genre:"Comedy", borrowed: true, dueDate: "2024-04-15" },
    { title:"Book 14", author:"Author 14", genre:"Biography", borrowed: true, dueDate: "2024-04-10" },
    { title:"Book 15", author:"Author 15", genre:"History", borrowed: true, dueDate: "2024-04-11" },
    { title:"Book 16", author:"Author 16", genre:"Poetry", borrowed: true, dueDate: "2024-04-13" },
    { title:"Book 17", author:"Author 17", genre:"Informatique", borrowed: true, dueDate: "2024-04-10" },
    { title:"Book 18", author:"Author 18", genre:"Philosophie", borrowed: true, dueDate: "2023-08-01" },
    { title:"Book 19", author:"Author 19", genre:"Psychologie", borrowed: true, dueDate: "2024-04-09" },
];



// Middleware pour servir les fichiers statiques (CSS, JavaScript, etc)
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

app.get('/', function(req, res) {
    // Rendre la vue index.ejs et passer les données des livres à la vue
    res.render('index', { books: books, request: req});
});

// Route pour obtenir la liste complète des livres
app.get('/api/books/getBooks', (req, res) => {
    res.json({option: 'getBooks', result: books, request: req});
});

// Route pour trier la collection de livres par titre
app.get('/api/books/sort', (req, res) => {
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
    res.json({option: 'sortBooks', result: sortedBooks, request: req});
});

// Route pour supprimer un livre de la collection
app.delete('/api/books/:title', (req, res) => {
    // Traitement pour supprimer un livre de la collection
    const titleToRemove = req.params.title;
    // Supprimer un livre de la collection
    const indexToRemove = books.findIndex(book => book.title === titleToRemove);
    if (indexToRemove !== -1) {
        const removedBook = books.splice(indexToRemove, 1);
        res.json({ option: 'deleteBook', result: removedBook[0] });  
    } else {
        res.json({option: 'deleteBook', result: `Le livre "${titleToRemove}" n'existe pas dans la collection.`});
    }
});

// Route pour emprunter un livre
app.put('/api/books/borrow/:title', (req, res) => {
    // Traitement pour emprunter un livre
    const titleToBorrow = req.params.title;
    const bookToBorrow = books.find(book => book.title === titleToBorrow);
    if (bookToBorrow) {
        bookToBorrow.borrowed = true;
        bookToBorrow.dueDate = req.body.dueDate;
        res.json({ option: 'borrowBook', result: bookToBorrow });
    } else {
        res.status(404).json({option:'borrowBook', result: `Le livre "${titleToBorrow}" n'existe pas dans la collection.`});
    }
});

app.put('/api/books/return/:title', (req, res) => {
    // Traitement pour rendre un livre
    const titleToReturn = req.params.title;
    const bookToReturn = books.find(book => book.title === titleToReturn);
    if (bookToReturn) {
        bookToReturn.borrowed = false;
        bookToReturn.dueDate = null;
        res.json({option:'returnBook', result: `Le livre "${titleToReturn}" a été rendu`});
    } else {
        res.status({option:'returnBook', result: `Le livre "${titleToReturn}" n'existe pas dans la collection.`});
    }
});

// Route pour rechercher un livre par titre
app.get('/api/books/search/:title', (req, res) => {
    // Rechercher un livre par titre
    const query = req.params.title.toLowerCase();
    const matchingBooks = books.filter(book => book.title.toLowerCase().includes(query));
    res.json({ option:'searchBookByTitle', result: matchingBooks });   
});


// Route pour rechercher des livres par auteur
app.get('/api/books/search/author/:author', (req, res) => {
    // Traitement pour rechercher des livres par auteur
    const query = req.params.author.toLowerCase();
    const matchingBooks = books.filter(book => book.author.toLowerCase().includes(query));
    res.json({ option:'searchBookByAuthor', result: matchingBooks });   
});

// Route pour rechercher des livres par genre
app.get('/api/books/search/genre/:genre', (req, res) => { 
    // Traitement pour rechercher des livres par genre
    const query = req.params.genre.toLowerCase();
    const matchingBooks = books.filter(book => book.genre.toLowerCase().includes(query));
    res.json({ option:'searchBookByGenre', result: matchingBooks });
    
});


// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server listening at http://localhost:${port}`);
});