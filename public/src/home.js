function getTotalBooksCount(books) {
  return books.length
};

function getTotalAccountsCount(accounts) {
  return accounts.length
};

function getBooksBorrowedCount(books) {
  return books.filter((book) => {
    const [recent] = book.borrows;
    return !recent.returned;
  }).length;
}

function getMostCommonGenres(books) {
  const countByGenre = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sort = sortFunction(countByGenre);
  return sort.map((name) => ({ name, count: countByGenre[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const topFiveBooks = books.map((book) => {
    const mostPopular = {
      name: book.title,
      count: book.borrows.length,
    };
    return mostPopular;
  });
  return topFiveBooks
    .sort((titleA, titleB) => titleB.count - titleA.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let topFiveAuthors = [];
  for (let book in books) {
    let bookAuthor = books[book].authorId;
    let matchAuthor = authors.find((auth) => auth.id === bookAuthor);
    let authorName = `${matchAuthor.name.first} ${matchAuthor.name.last}`;
    topFiveAuthors.push({
      name: authorName,
      count: books[book].borrows.length,
    });
  }
  return topFiveAuthors
    .sort((a, b) => (a.count > b.count ? -1 : 1))
    .slice(0, 5);
}

function sortFunction(obj) {
  const key = Object.keys(obj);
  return key.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyA] < obj[keyB]) {
      return 1;
    } else {
      return 0;
    }
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
