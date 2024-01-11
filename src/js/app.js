App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load books.
    $.getJSON('../books.json', function(data) {
      var booksRow = $('#booksRow');
      var bookTemplate = $('#bookTemplate');

      for (i = 0; i < data.length; i ++) {
        bookTemplate.find('.panel-title').text(data[i].title);
        bookTemplate.find('img').attr('src', data[i].picture);
        bookTemplate.find('.book-isbn').text(data[i].isbn);
        bookTemplate.find('.book-numpag').text(data[i].numpag);
        bookTemplate.find('.book-writer').text(data[i].writer);
        bookTemplate.find('.book-edition').text(data[i].edition);
        bookTemplate.find('.btn-buy').attr('data-id', data[i].id);

        booksRow.append(bookTemplate.html());
      }
    });

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
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
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

     // Use our contract to retrieve and mark the buyed books
     return App.markBuyed();
  });


    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
  },

  markBuyed: function() {
    var bookInstance;

    App.contracts.Book.deployed().then(function(instance) {
      bookInstance = instance;

      return bookInstance.getBooks.call();
    }).then(function(books) {
      for (i = 0; i < books.length; i++) {
        if (books[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-book').eq(i).find('button').text('Buyed').attr('disabled', true);
        }
      }
   }).catch(function(err) {
     console.log(err.message);
   });

  },

  handleBuy: function(event) {
    event.preventDefault();

    var bookId = parseInt($(event.target).data('id'));

    var bookInstance;

    web3.eth.getAccounts(function(error, accounts) {
     if (error) {
       console.log(error);
     }

    var account = accounts[0];

    App.contracts.Book.deployed().then(function(instance) {
      bookInstance = instance;

      // Execute buy as a transaction by sending account
      return bookInstance.buyBook(bookId, {from: account});
    }).then(function(result) {
      return App.markBuyed();
    }).catch(function(err) {
      console.log(err.message);
    });
  });

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});