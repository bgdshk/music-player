const express = require('express')
const path = require('path')
const fs = require('fs')
const mp3Duration = require('mp3-duration')
const NodeID3 = require('node-id3')

const app = express();
const log = console.log;
const port = 5556;

const config = {
    authorized: false,
    version: "0.0.1",
    theme_primary_color: '#333'  
}

let tracksDuration = (tracks) => {
    return Promise.all(tracks.map((track, index, array) => {
        return new Promise(resolve => {
            mp3Duration('./dist/playlist/' + track, (err, duration) => {
                return duration;
            }).then((duration) => {
                let arr = {
                    name: track,
                    duration: duration,
                    amount: array.length
                }

                resolve(arr)
              
            })
        })
    }))
}

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
})

app.get('/config', (req, res) => {
    res.json(config)
})

app.get('/tracks', 
        (req, res) => {
            fs.readdir('./dist/playlist', (err, data) => {
                if(err) throw new Error
                tracksDuration(data).then(arr => {
                    res.json(arr)
                })
            })
        }
)

app.listen(port);
log(`🔥 Server started on http://localhost:${port} 🔥`)
