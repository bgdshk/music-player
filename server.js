const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express();
const log = console.log;
const port = 5556;

const config = {
    authorized: false,
    version: "0.0.1",
    theme_primary_color: '#333'  
}

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
})

app.get('/config', (req, res) => {
    res.json(config)
})

app.get('/tracks', (req, res) => {
    fs.readdir('./dist/playlist', (err, data) => {
        if(err) throw new Error
        res.json({ 
            amount: data.length,
            tracks: data        
        })
    })
})

app.listen(port);
log(`Server strted on http://localhost:${port} 👍`)
