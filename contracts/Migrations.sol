// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Migrations {
  // Variabile owner = l'indirizzo dell'account che effettua il deployment del contratto (x truffle)
  address public owner = msg.sender;

  // Variabile last_completed_migration = tiene traccia dell'ultima migrazione completata (x truffle)
  uint public last_completed_migration;


  //  E' usato per proteggere la funzione setCompleted in modo che solo l'owner del contratto possa eseguirla
  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  // Aggiorna il registro di quale migrazione è stata completata per ultima
  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
