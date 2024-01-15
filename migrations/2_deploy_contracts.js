// Cerca un contratto compilato chiamato Book (si riferisce a Book.sol)
var Book = artifacts.require("Book");

module.exports = function(deployer) {
  // Inserisce i contratti all'interno della blockchain
  deployer.deploy(Book);
};