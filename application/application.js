const readlineSync = require('readline-sync');

let bookstore = [ 
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

// Fonction pour gérer la collection des livres de bookstore
function getBooks() {
    return bookstore;
}

// Fonction pour ranger des livres
function sortBooks() {
    return bookstore.sort((a, b) => a.title.localeCompare(b.title));
}

// Fonction pour ajouter un nouveau livre à bookstore
function addBook(newBook) {
    bookstore.push(newBook);
}

// Fonction pour supprimer un livre de bookstore
function removeBook(bookTitle) {
    let bookIndex = bookstore.findIndex(book => book.title === bookTitle);
    if (bookIndex !== -1) {
        bookstore.splice(bookIndex, 1);
    } else {
        console.log("Le livre spécifié n'existe pas dans la collection.");
    }
}

// Fonction pour rendre un livre
function returnBook(bookTitle) {
    let bookIndex = bookstore.findIndex(book => book.title === bookTitle);
    if (bookIndex !== -1) {
        bookstore[bookIndex].borrowed = false;
        bookstore[bookIndex].dueDate = null;
    } else {
        console.log("Le livre spécifié n'existe pas dans la collection.");
    }
}

// Fonction pour emprunter un livre
function borrowBook(bookTitle) {
    let bookIndex = bookstore.findIndex(book => book.title === bookTitle);
    if (bookIndex !== -1) {
        bookstore[bookIndex].borrowed = true;
        bookstore[bookIndex].dueDate = "2024-04-30";
    } else {
        console.log("Le livre spécifié n'existe pas dans la collection.");
    }
}

// Fonction pour afficher les livres empruntés
function getBorrowedBooks() {
    return bookstore.filter(book => book.borrowed === true);
}

// Fonction pour afficher les livres en retard
function getOverdueBooks() {
    return bookstore.filter(book => book.borrowed === true && book.dueDate < "2024-04-30");
}

// Fonction pour afficher les livres disponibles
function getAvailableBooks() {
    return bookstore.filter(book => book.borrowed === false);
}

// Function pour rechercher un livre par titre
function searchBook(bookTitle) {
    return bookstore.find(book => book.title === bookTitle);
}

// Fonction pour rechercher des livres par auteur
function searchBookByAuthor(author) {
    return bookstore.filter(book => book.author === author);
}

// Fonction pour rechercher des livres par genre
function searchBookByGenre(genre) {
    return bookstore.filter(book => book.genre === genre);
}

// Fonction pour rechercher des livres par date d'échéance des emprunts
function searchBookByDueDate(dueDate) {
    return bookstore.filter(book => book.dueDate === dueDate);
}

// Options pour l'utilisateur
const options = [
    "Afficher la collection de livres",
    "Trier la collection de livres par titre",
    "Ajouter un nouveau livre",
    "Supprimer un livre de la collection",
    "Rendre un livre",
    "Emprunter un livre",
    "Afficher les livres empruntés",
    "Afficher les livres en retard",
    "Afficher les livres disponibles",
    "Rechercher un livre par titre",
    "Rechercher des livres par auteur",
    "Rechercher des livres par genre",
    "Rechercher des livres par date d'échéance"
];

// Fonction pour afficher les options à l'utilisateur
function displayOptions() {
    console.log("Options :");
    options.forEach((option, index) => console.log(`${index + 1}. ${option}`));
}

// Exécution de l'application
while (true) {
    displayOptions(); // Affichage des options
    const selectedOption = parseInt(readlineSync.question("Choisissez une option : ")) - 1; // Sélection de l'option
    if (selectedOption === 12) { // Si l'option sélectionnée est la 13ème, sortir de la boucle
        break;
    }
    // Exécuter l'option sélectionnée
    switch (selectedOption) {
        case 0:
            console.log("Collection de livres : ", getBooks());
            break;
        case 1:
            console.log("Collection de livres triée par titre : ", sortBooks());
            break;
        case 2:
            console.log("Ajout d'un nouveau livre : ");
            const newBookTitle = readlineSync.question("Titre du livre : ");
            const newBookAuthor = readlineSync.question("Auteur du livre : ");
            const newBookGenre = readlineSync.question("Genre du livre : ");
            addBook({ title: newBookTitle, author: newBookAuthor, genre: newBookGenre, borrowed: false, dueDate: null });
            console.log("Collection de livres après l'ajout : ", getBooks());
            break;
        case 3:
            console.log("Suppression d'un livre de la collection : ");
            const bookToRemove = readlineSync.question("Titre du livre à supprimer : ");
            removeBook(bookToRemove);
            console.log("Collection de livres après la suppression : ", getBooks());
            break;
        case 4:
            console.log("Rendre un livre : ");
            const bookToReturn = readlineSync.question("Titre du livre à rendre : ");
            returnBook(bookToReturn);
            console.log("Collection de livres après le retour : ", getBooks());
            break;
        case 5:
            console.log("Emprunter un livre : ");
            const bookToBorrow = readlineSync.question("Titre du livre à emprunter : ");
            borrowBook(bookToBorrow);
            console.log("Collection de livres après l'emprunt : ", getBooks());
            break;
        case 6:
            console.log("Livres empruntés : ", getBorrowedBooks());
            break;
        case 7:
            console.log("Livres en retard : ", getOverdueBooks());
            break;
        case 8:
            console.log("Livres disponibles : ", getAvailableBooks());
            break;
        case 9:
            console.log("Recherche du livre par titre : ");
            const bookTitleToSearch = readlineSync.question("Titre du livre à rechercher : ");
            console.log("Résultat de la recherche : ", searchBook(bookTitleToSearch));
            break;
        case 10:
            console.log("Recherche des livres par auteur : ");
            const authorToSearch = readlineSync.question("Nom de l'auteur à rechercher : ");
            console.log("Résultat de la recherche : ", searchBookByAuthor(authorToSearch));
            break;
        case 11:
            console.log("Recherche des livres par genre : ");
            const genreToSearch = readlineSync.question("Genre à rechercher : ");
            console.log("Résultat de la recherche : ", searchBookByGenre(genreToSearch));
            break;
        default:
            console.log("Option invalide.");
    }
}