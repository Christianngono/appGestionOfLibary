class Book {
    constructor(title, author, genre, borrowed, dueDate) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.borrowed = borrowed;
        this.dueDate = dueDate;
    }

    displayDetails() {
        return `${this.title} by ${this.author} (${this.genre})`;
    }

    borrowBook() {
        this.borrowed = true;
        this.dueDate = "2024-04-30";
    }

   
    returnBook() {
        this.borrowed = false;
        this.dueDate = null;
    }
}


class LibraryService {
    constructor() {
        this.bookstore = [];
    }

    getBooks() {
        return this.bookstore;
    }

    
    sortBooks() {
        this.bookstore.sort((a, b) => a.title.localeCompare(b.title));
    }

   
    addBook(newBook) {
        this.bookstore.push(newBook);
    }

   
    removeBook(bookTitle) {
        let bookIndex = this.bookstore.findIndex(book => book.title === bookTitle);
        if (bookIndex !== -1) {
            this.bookstore.splice(bookIndex, 1);
        } else {
            console.log("Le livre spécifié n'existe pas dans la collection.");
        }
    }

    
    getBorrowedBooks() {
        return this.bookstore.filter(book => book.borrowed === true);
    }

  
    getOverdueBooks() {
        return this.bookstore.filter(book => book.borrowed === true && book.dueDate < "2024-04-30");
    }

   
    getAvailableBooks() {
        return this.bookstore.filter(book => book.borrowed === false);
    }

    
    searchBook(bookTitle) {
        return this.bookstore.find(book => book.title === bookTitle);
    }

    
    searchBookByAuthor(author) {
        return this.bookstore.filter(book => book.author === author);
    }

   
    searchBookByGenre(genre) {
        return this.bookstore.filter(book => book.genre === genre);
    }
}