var braintree = require("braintree");

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '5vhr4gbqq9wy74k2',
    publicKey:    'hk8bptz6cvqjxrny',
    privateKey:   '4f40e70ae85e0cb7a58a885b8ebf0016'
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(err);
        } else {
            res.send(response);
        }
      });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            
            options: {
                submitForSettlement: true
            }
      }, 
      function(err, result) {
          if(err){
              res.status(500).json(err);
          } else {
              res.json(result);
          }
      });
};
