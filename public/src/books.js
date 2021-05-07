const { findAccountById } = require("./accounts")

function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id);
return result;
};

function findBookById(books, id) {
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    if (book.id === id)
    return book
  } 
}

function partitionBooksByBorrowedStatus(books) {
  let partition = [];
  partition.push(books.filter(({ borrows }) => !borrows[0].returned));
  partition.push(books.filter(({ borrows }) => borrows[0].returned));
  return partition;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow=>{
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] =  borrow.returned;
    result.push(obj);
  })
  console.log(result);
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
