const myLibrary = [];

function Book(title) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  if (title) {
    this.title = title;
  } else {
    this.title = "untitled";
  }
}

function addBookToLibrary(title) {
  let book = new Book(title);
  let bookCount = myLibrary.push(book);
  console.log(
    `You now have ${bookCount} book${
      bookCount > 1 ? "s" : ""
    } in your myLibrary. The new book's ID is ${book.id}.`
  );
}

addBookToLibrary("The Hobbit");
addBookToLibrary("War and Peace");
addBookToLibrary();

console.log({ myLibrary });
