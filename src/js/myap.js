App = {
  web3Provider: null,
  contracts: {},

init: async function() {

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          // Request account access
           await window.ethereum.enable();
        } catch (error) {
        // User denied account access...
        console.error("User denied account access")
        }
     }
     // Legacy dapp browsers...
     else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
     }
     // If no injected web3 instance is detected, fall back to Ganache
     else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
     }
     web3 = new Web3(App.web3Provider);

     return App.initContract();
  },

  initContract: function() {
     $.getJSON('Book.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var BuyArtifact = data;
        App.contracts.Book = TruffleContract(BuyArtifact);

        // Set the provider for our contract
        App.contracts.Book.setProvider(App.web3Provider);

        // Use our contract to retrieve and mark the buyed book
        return App.markBuyed();
     });
     //return App.bindEvents();
  },

  markBuyed: function() {
    var bookInstance;

    App.contracts.Book.deployed().then(function(instance) {
       bookInstance = instance;

       return bookInstance.getBooks.call();
    }).then(function(books) {
      $.getJSON('../books.json', function(data1) {
      var booksRow = $('#booksRow');
      var bookTemplate = $('#bookTemplate');
      var cont = 0;
       for (i = 0; i < books.length; i++) {
          
          if (books[i] !== '0x0000000000000000000000000000000000000000') {
             //alert(data1[i].title);
             bookTemplate.find('.panel-title').text(data1[i].title);
             bookTemplate.find('img').attr('src', data1[i].picture);
             bookTemplate.find('.book-isbn').text(data1[i].isbn);
             bookTemplate.find('.book-numpag').text(data1[i].numpag);
             bookTemplate.find('.book-writer').text(data1[i].writer);
             bookTemplate.find('.book-edition').text(data1[i].edition);
             cont=1;

        booksRow.append(bookTemplate.html());
               
          }
       }
       if(cont==0)
         alert("Nessun libro presente");
    });

    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
