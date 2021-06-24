
var express = require('express');

var apiJogo = require("./apiJogo");
var tabuleiro  = require("./tabuleiro");
var app = express();
const PORT = 8080;

tabuleiro.start();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(PORT);

console.log('Servidor HTTP esta escutando na porta ' + PORT);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res){
    res.json(p);
});


app.post('/jogadas', function(req, res){
    var dados = req.body;
    tabuleiro.addPeca(dados.x, dados.y);
    console.log(dados);
    console.log(tabuleiro.vitoria());

    res.json(apiJogo.jogadas());
});

app.post('/jogar', function(req, res){
    var dados = req.body;
    console.log(dados.jogando);   
    if(dados.jogando == true){
        tabuleiro.start();
    }
    res.json(apiJogo.jogar());
});