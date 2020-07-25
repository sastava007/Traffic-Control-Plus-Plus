App = {
  web3Provider: null,
  contracts: {},
  // account: '0xe9DaE588F7C8C2eDc93C025d52d64827e8491b0E',
  account: '0x4D19e47F0C68764c182E7D7B8381CB0665364952',

  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: async function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();
    // web3.eth.getAccounts().then(function(accounts) {
    //   console.log(accounts);
    // })
    // Load account data
    // web3.eth.getCoinbase(function(err, account) {
    //   if (err === null) {
    //     App.account = account;
    //     console.log(account)
    //     $("#accountAddress").html("Your Account: " + account);
    //   }
    // });
    // const accounts=await web3.eth.getAccounts();
    // console.log(accounts)
// console.log(app)
    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      console.log(instance)
      // console.log(instance.candidatesCount())
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();
      console.log(candidatesCount)
      for (var i = 1; i <= 1; i++) {
        electionInstance.candidates(i).then(function(candidate) {
    
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];
          var gmail= "xyz@gmail.com";
          var accountname = App.account
          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + gmail + "</td><td>"+ accountname + "</td></tr>"
          candidatesResults.append(candidateTemplate);
// console.log(candidateTemplate)
          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + "Drive safe and secure" + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      $('#text').hide();

      if(hasVoted) {
        $('form').hide();
        $('#text').show();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    console.log("hek")
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
