const myLibrary = [];
const body = document.querySelector("body");
const librarySection = document.querySelector(".library");
const menuSection = document.querySelector(".menu");

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();

  if (title) {
    this.title = title;
  } else {
    this.title = "untitled";
  }

  if (author) {
    this.author = author;
  } else {
    this.author = "unknown";
  }

  if (pages) {
    this.pages = pages;
  } else {
    this.pages = 0;
  }

  if (read) {
    this.read = read;
  } else {
    this.read = false;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  let bookCount = myLibrary.push(book);
  // console.log(
  //   `You now have ${bookCount} book${
  //     bookCount > 1 ? "s" : ""
  //   } in your myLibrary. The new book's ID is ${book.id}.`
  // );
}

function removeBookFromLibraryById(theId) {
  let theIndex = myLibrary.findIndex((book) => book.id == theId);
  myLibrary.splice(theIndex, 1);
}
function clearLibrarySection() {
  const bookElements = document.querySelectorAll(".book");
  if (bookElements.length > 0) {
    bookElements.forEach((bookElement) => {
      bookElement.remove();
    });
  }
}
function displayLibrarySection() {
  clearLibrarySection();

  myLibrary.forEach((book) => {
    createBookModal(book);
  });
}

function createBookModal(book) {
  // console.group("createBookModal()");
  const librarySection = document.querySelector(".library");

  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  bookContainer.dataset.id = book.id;
  librarySection.appendChild(bookContainer);

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("title");
  bookTitle.textContent = book.title;
  bookContainer.appendChild(bookTitle);

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("author");
  bookAuthor.textContent = book.author;
  bookContainer.appendChild(bookAuthor);

  const bookPages = document.createElement("div");
  bookPages.classList.add("pages");
  bookPages.textContent = book.pages;
  bookContainer.appendChild(bookPages);

  const bookPagesLabel = document.createElement("label");
  bookPagesLabel.setAttribute("for", "isRead");
  bookPagesLabel.textContent = "Pages";
  bookPages.parentNode.insertBefore(bookPagesLabel, bookPages);

  const bookRead = document.createElement("input");
  bookRead.id = "isRead";
  bookRead.type = "checkbox";
  bookRead.checked = book.read;
  bookContainer.appendChild(bookRead);
  bookRead.addEventListener("click", (e) => {
    // console.group("checkBox");
    // console.log("check: " + book.id);
    let theBook = myLibrary.find(
      (book) => book.id === bookContainer.dataset.id
    );
    // console.log(theBook);
    if (theBook) {
      theBook.read = e.target.checked;
      // console.log("Library: " + theBook.read);
      // console.log("HTML: " + e.target.checked);
    }
    // console.groupEnd();
  });

  const bookReadLabel = document.createElement("label");
  bookReadLabel.setAttribute("for", "isRead");
  bookReadLabel.textContent = "Read";
  bookRead.parentNode.insertBefore(bookReadLabel, bookRead);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  bookContainer.appendChild(deleteButton);
  deleteButton.addEventListener("click", (e) => {
    // console.group("deleteButton");
    // console.log("delete: " + book.id);
    let theIndex = myLibrary.findIndex(
      (book) => book.id === bookContainer.dataset.id
    );
    // console.log("delete: index = " + theIndex);
    if (theIndex >= 0) {
      myLibrary.splice(theIndex, 1);
      // console.log(e.target.parentNode);
      e.target.parentNode.remove();
    }
    // console.groupEnd();
  });
  // console.groupEnd();
}

const dialog = document.querySelector("dialog");

// "Add Book" button opens the dialog modally
const addButton = document.querySelector("dialog + .addButton");
addButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Save" button adds the boook to library and closes the dialog
const saveButton = document.querySelector(".saveButton");
saveButton.addEventListener("click", () => {
  newTitle = document.getElementById("title");
  newAuthor = document.getElementById("author");
  newPages = document.getElementById("pages");
  newRead = document.getElementById("read");

  addBookToLibrary(
    newTitle.value,
    newAuthor.value,
    newPages.value,
    newRead.checked
  );

  dialog.close();

  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = 0;
  newRead.checked = false;
  displayLibrarySection();
});

// "Close" button closes the dialog
const cancelButton = document.querySelector(".cancelButton");
cancelButton.addEventListener("click", () => {
  newTitle = document.getElementById("title");
  newAuthor = document.getElementById("author");
  newPages = document.getElementById("pages");
  newRead = document.getElementById("read");

  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = 0;
  newRead.checked = false;
  dialog.close();
});

// "List Books" button prints the book names to console
const listBooksButton = document.querySelector(".listBooksButton");
listBooksButton.addEventListener("click", () => {
  console.log("Clicked listBooksButton:");
  myLibrary.forEach((book) => {
    console.log(book.title);
  });
});

// "Update Display" button refreshes the library display
const updateDisplayButton = document.querySelector(".updateDisplayButton");
updateDisplayButton.addEventListener("click", () => {
  console.log("Clicked updateDisplayButton:");

  displayLibrarySection();
});

// "Delete All Books" button deletes all books from the library
const deleteAllBooksButton = document.querySelector(".deleteAllBooksButton");
deleteAllBooksButton.addEventListener("click", () => {
  console.log("Clicked deleteAllBooksButton:");
  myLibrary.length = 0;
  displayLibrarySection();
});

const addSampleBooksButton = document.querySelector(".addSampleBooksButton");
addSampleBooksButton.addEventListener("click", () => {
  console.log("Clicked addSampleBooksButton:");
  addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 567, true);
  addBookToLibrary(
    "A Song of Ice and Fire",
    "George R. R. Martin",
    10000,
    false
  );
  displayLibrarySection();
});
