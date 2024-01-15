// Andiamo a importare il contratto definito dal file Migrations.sol
// artifacts.require si riferisce ai contratti compilati
var Migrations = artifacts.require("./Migrations.sol");


module.exports = function(deployer) {
  // Inserisce i contratti all'interno della blockchain
  deployer.deploy(Migrations);
};
