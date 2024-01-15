pragma solidity ^0.5.0;

contract Book {
	// E' un array di indirizzi Etherium
	address[21] public books; 


	// Buy a book
	function buyBook(uint bookId) public returns (uint) {
		
		// Controlla l'ID del libro se va da 0 a 20
		require(bookId >= 0 && bookId <= 20);

		// Assegna l'indirizzo dell'account che sta eseguendo la transazione all'elemento dell'array "books" all'indice specificato da bookId
		books[bookId] = msg.sender;

		return bookId;
	}


	// Retrieving the books
	// Ritorna tutti gli indirizzi Etherium
	function getBooks() public view returns (address[21] memory) {
  		return books;
	}
}