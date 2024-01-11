pragma solidity ^0.5.0;

contract Book {
	address[20] public books;

	// Buy a book
	function buyBook(uint bookId) public returns (uint) {
		require(bookId >= 0 && bookId <= 19);

		books[bookId] = msg.sender;

		return bookId;
	}

	// Retrieving the books
	function getBooks() public view returns (address[20] memory) {
  		return books;
	}
}