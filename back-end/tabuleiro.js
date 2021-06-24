//var jogada = 0;

var matrizTabuleiro = new Array(3);
matrizTabuleiro[0] =new Array(3);
matrizTabuleiro[1] =new Array(3);
matrizTabuleiro[2] =new Array(3);


var pecaDesativada = "DESATIVADA";
const PECA_X = "X";
const PECA_O = "O";
var jogada = 0;
var gg = false;

    
function start() {
    for(let x = 0; x <= 2; x++) {
        for(let y = 0; y <= 2; y++) {
            matrizTabuleiro[x][y] = pecaDesativada;
        }
    }	
    console.log(matrizTabuleiro);
    jogada = 0;
    gg = false;		
}

function addPeca(y, x) {
    if(matrizTabuleiro[x][y] == pecaDesativada) {
        jogada++;
        if(jogada % 2 == 0) {
            matrizTabuleiro[x][y] = PECA_O;
        }
        else {
            matrizTabuleiro[x][y] = PECA_X;
        }
        console.log(matrizTabuleiro);
    }
}

function pecaJogada(){
    console.log(jogada);
    if(jogada % 2 == 0) {
        return PECA_O;
    }
    else {
        return PECA_X;
    }
}

function vitoria(){
    const NULO = "-";
    const VITORIA_X = "X ganhou!";
    const VITORIA_O = "O ganhou!";
    const EMPATE = "Empate!";

    var vencedor = "-";

    if((matrizTabuleiro[0][0] == PECA_X && matrizTabuleiro[1][0] == PECA_X && matrizTabuleiro[2][0] == PECA_X) ||
    (matrizTabuleiro[0][1] == PECA_X && matrizTabuleiro[1][1] == PECA_X && matrizTabuleiro[2][1] == PECA_X) ||
    (matrizTabuleiro[0][2] == PECA_X && matrizTabuleiro[1][2] == PECA_X && matrizTabuleiro[2][2] == PECA_X)){
        vencedor = VITORIA_X;
    }
    else if((matrizTabuleiro[0][0] == PECA_X && matrizTabuleiro[0][1] == PECA_X && matrizTabuleiro[0][2] == PECA_X) ||
    (matrizTabuleiro[1][0] == PECA_X && matrizTabuleiro[1][1] == PECA_X && matrizTabuleiro[1][2] == PECA_X) ||
    (matrizTabuleiro[2][0] == PECA_X && matrizTabuleiro[2][1] == PECA_X && matrizTabuleiro[2][2] == PECA_X)) {
        vencedor = VITORIA_X;
    } 
    else if((matrizTabuleiro[0][0] == PECA_X && matrizTabuleiro[1][1] == PECA_X && matrizTabuleiro[2][2] == PECA_X) ||
    (matrizTabuleiro[0][2] == PECA_X && matrizTabuleiro[1][1] == PECA_X && matrizTabuleiro[2][0] == PECA_X)) {
        vencedor = VITORIA_X;
    }  
    else if((matrizTabuleiro[0][0] == PECA_O && matrizTabuleiro[1][0] == PECA_O && matrizTabuleiro[2][0] == PECA_O) ||
    (matrizTabuleiro[0][1] == PECA_O && matrizTabuleiro[1][1] == PECA_O && matrizTabuleiro[2][1] == PECA_O) ||
    (matrizTabuleiro[0][2] == PECA_O && matrizTabuleiro[1][2] == PECA_O && matrizTabuleiro[2][2] == PECA_O)){
        vencedor = VITORIA_O;
    }
    else if((matrizTabuleiro[0][0] == PECA_O && matrizTabuleiro[0][1] == PECA_O && matrizTabuleiro[0][2] == PECA_O) ||
    (matrizTabuleiro[1][0] == PECA_O && matrizTabuleiro[1][1] == PECA_O && matrizTabuleiro[1][2] == PECA_O) ||
    (matrizTabuleiro[2][0] == PECA_O && matrizTabuleiro[2][1] == PECA_O && matrizTabuleiro[2][2] == PECA_O))  {
        vencedor = VITORIA_O;
    }
    else if((matrizTabuleiro[0][0] == PECA_O && matrizTabuleiro[1][1] == PECA_O && matrizTabuleiro[2][2] == PECA_O) ||
    (matrizTabuleiro[0][2] == PECA_O && matrizTabuleiro[1][1] == PECA_O && matrizTabuleiro[2][0] == PECA_O))  {
        vencedor = VITORIA_O;      
    }
    else if(jogada >=9){
        vencedor = EMPATE;
    }

    if(vencedor != NULO){
        gg = true;
    }
    
    return vencedor;
}

function fimDeJogo(){
    return gg;
}


exports.start = start;
exports.addPeca = addPeca;
exports.pecaJogada = pecaJogada;
exports.vitoria = vitoria;
exports.fimDeJogo = fimDeJogo;


