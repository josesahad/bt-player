var client = require('../btclient.js')
var ffmpeg = require('fluent-ffmpeg');

exports.getSongs = function(req, res) {

    res.set({
        "Content-Type": "application/json"
    })

//    var magnetUrl = 'magnet:?' + req.param('albumId')

//    xt=urn:btih:83AA6E1A154F00098BD683B3C96B250EE366B881&dn=taylor+swift+1989+deluxe+mp3+2014&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337
//    client.addMagnet(magnetUrl, function(torrent) {
//        client.files(torrent).toString()
//    })
}

exports.getSong = function(req, res) {
    var callback = function(torrent) {

        var audio = client.streamFile(torrent, req.param("songId"))

        res.set({
            "Content-Type": "audio/mpeg"
        })

        new ffmpeg({source: audio})
            .toFormat('mp3')
        .writeToStream(res, function(data, err) {
            if (err) console.log(err)
        })

        audio.pipe(res)
    }

    var magnetUrl = 'magnet:?' + req.param('albumId')
    client.addMagnet(magnetUrl, callback)
}