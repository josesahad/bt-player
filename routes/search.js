var client = require('../btclient.js')

exports.search = function(req, res) {

    res.set({
        "Content-Type": "application/json"
    })

    client.search(req.param('query'), res)
}