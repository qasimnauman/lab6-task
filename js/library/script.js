document.addEventListener("DOMContentLoaded", () => {
    LoadBooks();
    updateTotalBookCount();
    updateAvailableBookCount();
    AddNewBook();
    SearchBook();
});

const LoadBooks = (booksToRender = books) => {
    const tableBody = document.getElementById("book-table-body");
    tableBody.innerHTML = "";
    booksToRender.forEach((book) => {
        const globalIndex = books.findIndex(b => b.title === book.title);
        const bookRow = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        bookRow.appendChild(titleCell);

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        bookRow.appendChild(authorCell);

        const yearCell = document.createElement("td");
        yearCell.textContent = book.yearPublished;
        bookRow.appendChild(yearCell);

        const genreCell = document.createElement("td");
        genreCell.textContent = book.genre;
        bookRow.appendChild(genreCell);

        const availabilityCell = document.createElement("td");
        availabilityCell.textContent = book.isAvailable ? "Available" : "Not Available";
        availabilityCell.className = book.isAvailable ? "available" : "not-available";
        bookRow.appendChild(availabilityCell);

        const actionsCell = document.createElement("td");

        const statusDropdown = document.createElement("select");
        const optionAvailable = document.createElement("option");
        optionAvailable.value = "true";
        optionAvailable.textContent = "Available";
        statusDropdown.appendChild(optionAvailable);
        const optionNotAvailable = document.createElement("option");
        optionNotAvailable.value = "false";
        optionNotAvailable.textContent = "Not Available";
        statusDropdown.appendChild(optionNotAvailable);
        statusDropdown.value = book.isAvailable ? "true" : "false";
        actionsCell.appendChild(statusDropdown);

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.style.marginLeft = "10px";
        updateButton.addEventListener("click", () => {
            updateBookStatus(globalIndex, statusDropdown.value);
        });
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.style.marginLeft = "10px";
        deleteButton.addEventListener("click", () => {
            DeleteBook(book.title);
        });
        actionsCell.appendChild(deleteButton);

        bookRow.appendChild(actionsCell);
        tableBody.appendChild(bookRow);
    });
};

const updateTotalBookCount = () => {
    const noOfBooks = document.getElementById("book-count");
    noOfBooks.textContent = books.length;
};

const updateAvailableBookCount = () => {
    const availableCount = books.filter(book => book.isAvailable).length;
    const noOfAvailableBooks = document.getElementById("book-available");
    noOfAvailableBooks.textContent = availableCount;
};

const updateBookStatus = (bookIndex, newStatusValue) => {
    const isAvailable = newStatusValue === "true";
    books[bookIndex].isAvailable = isAvailable;
    const tableBody = document.getElementById("book-table-body");
    const bookRow = tableBody.children[bookIndex];
    if (bookRow) {
        const availabilityCell = bookRow.children[4];
        availabilityCell.textContent = isAvailable ? "Available" : "Not Available";
        availabilityCell.className = isAvailable ? "available" : "not-available";
    }
    updateAvailableBookCount();
};

const DeleteBook = (bookTitle) => {
    const bookIndex = books.findIndex(book => book.title === bookTitle);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        LoadBooks();
        updateTotalBookCount();
        updateAvailableBookCount();
    }
};

const AddNewBook = () => {
    document.getElementById("add-book-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.getElementById("book-title").value;
        let author = document.getElementById("book-author").value;
        let year = parseInt(document.getElementById("book-year").value);
        let genre = document.getElementById("book-genre").value;
        let availabilityVal = document.getElementById("book-availability").value;
        let isAvailable = availabilityVal === "true";
        let newBook = { title, author, yearPublished: year, genre, isAvailable };
        books.push(newBook);
        LoadBooks();
        updateTotalBookCount();
        updateAvailableBookCount();
        document.getElementById("add-book-form").reset();
    });
}

const SearchBook = () => {
    document.getElementById("search-bar").addEventListener("input", (e) => {
        let query = e.target.value.toLowerCase();
        if (query === "") {
            LoadBooks();
        } else {
            let filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.genre.toLowerCase().includes(query)
            );
            LoadBooks(filteredBooks);
        }
    });
}