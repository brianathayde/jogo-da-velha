const MongoClient = require('mongodb').MongoClient;
const Jogador = require('./Jogador').Jogador;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database 
const dbName = 'jogo-da-velha';
// Collection 
const dbCollection = 'jogadores';

const insertDocuments = function(jogador, db, callback) {
    const collection = db.collection(dbCollection);
    collection.insertMany([{ nome: jogador.nome, vitorias: 0, derrotas: 0 }], function(err, result) {
      callback(result.ops[0]);
    });
  };

  const findDocuments = function(jogador, db, callback) {
    const collection = db.collection(dbCollection);
    collection.find({ nome: jogador.nome }).toArray(function(err, docs) {
      console.log('Found the following records ' + jogador.nome);
      callback(docs[0]);
    });
  };

// a function 'callbackServer' vai ser responsavel por retornar o post 
// para o front end e assim finalizar o processo
// deve ser feita por callback pq o mongo trabalha com async
function setJogador(jogador, callbackServer){
  MongoClient.connect(url, function(err, client) {
    
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    findDocuments(jogador, db, function(jogadorCallback) {
      if(jogadorCallback!=null) 
        callbackServer(jogadorCallback);
      else 
        insertDocuments(jogador, db, function(jogadorCallback) {
          callbackServer(jogadorCallback);
        });
      client.close();
    });
  });
}

function updateJogador(jogador, callback) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);

    const collection = db.collection(dbCollection);
    collection.updateOne({nome: jogador.nome }, { $set: { vitorias: jogador.vitorias, derrotas: jogador.derrotas } }, function(err, result) {
    
      callback(result);
      client.close();
    });
  });
}

exports.setJogador = setJogador;
exports.updateJogador = updateJogador;