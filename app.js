const libraryService = new LibraryService();


const book1 = new Book("Book 1", "Author 1", "Fiction", false, null);
const book2 = new Book("Book 2", "Author 2", "UnFiction", true, "2024-04-30");
libraryService.addBook(book1);
libraryService.addBook(book2);


function displayBooks() {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = ""; 

    
    libraryService.getBooks().forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const titleElement = document.createElement("h3");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;

        const genreElement = document.createElement("p");
        genreElement.textContent = `Genre: ${book.genre}`;

        const borrowedElement = document.createElement("p");
        borrowedElement.textContent = `Borrowed: ${book.borrowed ? "Yes" : "No"}`;

        const dueDateElement = document.createElement("p");
        dueDateElement.textContent = `Due Date: ${book.dueDate ? book.dueDate : "N/A"}`;

        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(genreElement);
        bookCard.appendChild(borrowedElement);
        bookCard.appendChild(dueDateElement);

        booksContainer.appendChild(bookCard);
    });
}


displayBooks();