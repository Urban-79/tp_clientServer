'use strict';

var express = require('express');
var app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/api', function (req, res) {
    res.send((new Date()).toLocaleTimeString());
});

app.listen(3000);

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws) => {
    ws.on('message', (message) => {
        console.log(`received: ${message}`);
        wss.broadcast(`${message}`)
    });

    ws.on('end', () => {
        console.log('Connection ended...');
    });

    ws.send('Hello Client');
//connexion BDD
    
    //fin connexion BDD
}));

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
        asyncFunction();
    });
};
const mariadb = require('mariadb');
    const pool = mariadb.createPool({
        host: '127.0.0.1:3305',
        user: 'root',
        password: 'root',
        database:'chat',
        connectionLimit: 5
    });
    async function asyncFunction() {
        let conn;
        try {
            conn = await pool.getConnection();
            //const rows = await conn.query("SELECT 1 as val");
            //console.log(rows); //[ {val: 1}, meta: ... ]
            const res = await conn.query("INSERT INTO comment value ('HELLO', '03/06/2022-11.41')");
            console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

        } catch (err) {
            console.log(err);
            throw err;            
        } finally {
            if (conn) return conn.end();
        }
    }