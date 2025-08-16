const myLibrary = [];
const body = document.querySelector("body");
const librarySection = document.querySelector(".library");
const menuSection = document.querySelector(".menu");
const form = document.querySelector("form");

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
  myLibrary.push(book);
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

let formElements = [];
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("pages");
const readInput = document.getElementById("read");

// "Save" button adds the book to library and closes the dialog
const saveButton = document.querySelector(".saveButton");
saveButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (Object.keys(errors).length === 0) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pageInput.value,
      readInput.checked
    );

    dialog.close();

    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = 0;
    readInput.checked = false;
    displayLibrarySection();
  }
});

// "Close" button closes the dialog
const cancelButton = document.querySelector(".cancelButton");
cancelButton.addEventListener("click", () => {
  titleInput.value = "";
  authorInput.value = "";
  pageInput.value = 0;
  readInput.checked = false;
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

// Form Validation
const errors = {};
function addError(key, value) {
  errors[key] = value;
  console.log(errors);
  const tempText = Object.values(errors).flat();
  // const errorText = document.querySelector("span.error");
  console.log(`addError(), errors = ${tempText}`);
}

function removeError(key) {
  delete errors[key];
  console.log(errors);
  const tempText = Object.values(errors).flat();
  console.log(`removeError(), errors = ${tempText}`);
}
function updateErrors() {
  clearErrors();
  const errorsSection = document.getElementById("errors");
  Object.values(errors).forEach((error) => {
    const errorSpan = document.createElement("span");
    errorSpan.textContent = error;
    errorSpan.className = "error";
    errorsSection.appendChild(errorSpan);
  });
}

function clearErrors() {
  const tempErrors = document.querySelectorAll(".error");
  tempErrors.forEach((error) => error.remove());
}

titleInput.addEventListener("input", (event) => {
  const id = event.target.getAttribute("id");
  const idName = id.charAt(0).toUpperCase() + id.slice(1);
  if (event.target.validity.tooShort) {
    addError(
      id,
      `${idName} must be longer than ${event.target.getAttribute(
        "minlength"
      )} characters`
    );
  } else if (event.target.validity.valueMissing) {
    addError(id, `${idName} is required`);
  } else {
    removeError(id);
  }
  setTimeout(updateErrors, 1000);
});

authorInput.addEventListener("input", (event) => {
  const id = event.target.getAttribute("id");
  const idName = id.charAt(0).toUpperCase() + id.slice(1);
  if (event.target.validity.tooShort) {
    addError(
      id,
      `${idName} must be longer than ${event.target.getAttribute(
        "minlength"
      )} characters`
    );
  } else if (event.target.validity.valueMissing) {
    addError(id, `${idName} is required`);
  } else {
    removeError(id);
  }
  setTimeout(updateErrors, 1000);
});

pageInput.addEventListener("input", (event) => {
  const id = event.target.getAttribute("id");
  const idName = id.charAt(0).toUpperCase() + id.slice(1);
  if (event.target.validity.rangeUnderflow) {
    addError(
      id,
      `${idName} must be greater than ${event.target.getAttribute("min")}`
    );
  } else if (event.target.validity.valueMissing) {
    addError(id, `${idName} is required`);
  } else {
    removeError(id);
  }
  setTimeout(updateErrors, 1000);
});
