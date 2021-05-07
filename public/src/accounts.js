function findAccountById(accounts, id) {
let result = accounts.find((account) => account.id === id);
return result
};

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  const accId = account.id;
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => accId === borrow.id && total++));
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach(book =>{
    let borrowArray = book.borrows;
    if (borrowArray.find(borrow => borrow.id === account.id && borrow.returned === false)) {
      booksPossessed.push(book);
    }
  })
  booksPossessed.forEach(book => {
    let author = authors.find(person => person.id === book.authorId);
    book['author'] = author;
  })
  console.log(booksPossessed)
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
