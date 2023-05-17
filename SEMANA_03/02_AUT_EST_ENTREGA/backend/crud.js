const express = require('express'); 
    const bodyParser = require('body-parser');
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    const sqlite3 = require('sqlite3').verbose();
    const DBPATH = '../data/ponderada_s2.db';

    const hostname = '127.0.0.1';
    const port = 3000;
    const app = express();

    /* Colocar toda a parte estática no frontend */
    app.use(express.static("../frontend/"));

    /* Definição dos endpoints */
    /******** CRUD ************/
    app.use(express.json());

    // Retorna todos registros (é o R do CRUD - Read)
    app.get('/FORMACAO', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = 'SELECT * FROM FORMACAO ORDER BY NOME';
            db.all(sql, [],  (err, rows ) => {
                if (err) {
                    throw err;
                }
                res.json(rows);
            });
            db.close(); // Fecha o banco
    });

    // Insere um registro (é o C do CRUD - Create)
    app.post('/insereFORMACAO', urlencodedParser, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        sql = "INSERT INTO FORMACAO (NOME, DATA, DESCRICAO, USER_ID) VALUES ('" + req.body.NOME + "', '" + req.body.DATA + "', " + req.body.DESCRICAO + req.body.USER_ID +"')";
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }	
        });
        res.write('<p>FORMACAO INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
        db.close(); // Fecha o banco
        res.end();
    });

    // Monta o formulário para o update (é o U do CRUD - Update)
    app.get('/atualizaFORMACAO', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        sql = "SELECT * FROM FORMACAO WHERE FORMACAO_ID ="+ req.query.FORMACAO_ID;
        console.log(sql);
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

    // Atualiza um registro (é o U do CRUD - Update)
    app.post('/atualizaFORMACAO', urlencodedParser, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        sql = "UPDATE FORMACAO SET NOME ='" + req.body.NOME + "', DATA = '" + req.body.DATA + "' , DESCRICAO ='" + req.body.DESCRICAO + "' , USER_ID ='" + req.body.USER_ID + "' WHERE FORMACAO_ID ='" + req.body.FORMACAO_ID + "'";
        console.log(sql);
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
            res.end();
        });
        res.write('<p>FORMACAO ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
        db.close(); // Fecha o banco
    });

    // Exclui um registro (é o D do CRUD - Delete)
    app.get('/removeFORMACAO', urlencodedParser, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        sql = "DELETE FROM FORMACAO WHERE FORMACAO_ID='" + req.query.FORMACAO_ID + "'";
        console.log(sql);
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
            res.write('<p>FORMACAO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
            res.end();
        });
        db.close(); // Fecha o banco
    });

    app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
    });