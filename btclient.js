var BitTorrentClient = require('webtorrent')
var request = require('request');

_client = new BitTorrentClient()

var client = {
    addMagnet: function(magnetURI, callback){
        _client.add(magnetURI)

        _client.on('torrent', function (torrent) {
            console.log(torrent.name)
            callback(torrent)
        })
    },
    streamFile: function(torrent, fileName){
        return getFile(torrent, fileName)
    },
    getFiles: function(torrent){
        return getFiles(torrent)
    },
    search: function(keyword, res){
        return searchTorrent(keyword, res)
    }

}

function getFile(torrent, fileName) {

    var streamFile

    torrent.files.forEach(function (file) {

        console.log(file.name)
        if (file.name == fileName) {
            console.log('Downloading File: ' + file.name)

            var stream = file.createReadStream()

            stream.on('end', function () {
                console.log('File Downloaded')
            })

            stream.on('data', function (data) {

            })

            streamFile = stream;
        }
    })

    return streamFile
}

function getFiles(torrent){
    var response = []

    torrent.files.forEach(function (file) {
        var jsonObject = {}

        jsonObject.song = file.name
        jsonObject.length = file.length

        response.push(jsonObject)
    });

    return response
}

function searchTorrent(keyword, res){
    var url = 'http://fenopy.se/module/search/api.php?keyword=' + keyword  + '&category=1&format=json'

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })
}

module.exports = client