var tabuleiro  = require("./tabuleiro");
 

function jogadas(){
    var resposta = {status : "ok",
    peca : tabuleiro.pecaJogada(),
    fimDeJogo : tabuleiro.fimDeJogo(),
    vencedor : tabuleiro.vitoria()};

    return resposta;
}

function jogar(){
    var resposta = {jogando : true};
    return resposta;
}

 exports.jogadas = jogadas;
 exports.jogar = jogar;