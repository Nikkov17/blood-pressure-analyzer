'use strict';
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/json'})
    res.end('{name: Kolya}');
}).listen(3001, () => {
    console.log('its alive');
})