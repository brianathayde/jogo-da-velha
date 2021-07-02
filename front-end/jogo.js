
var jogando = false;
var jogador1, jogador2;

class Jogador{
    constructor(nome, vitorias, derrotas){
        this.nome = nome;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
    }
}
exports.Jogador = Jogador;

function start(){
    for (let i = 0; i < 9; i++) {
        var e = document.getElementById(""+i);
        e.style.backgroundColor = "white";
        e.innerHTML = "-";                   
    }
    var e = document.getElementById("infos");                
    e.innerHTML = "-";      
    e.style.visibility = "hidden";

}
function btJogar(){
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.post('/jogar', {
        jogando: true
    })
    .then(function (response) {
        console.log(response);
        jogando = response.data.jogando;
        if(jogando == true){
            var e = document.getElementById("jogar");
            e.style.visibility = "hidden";
            start();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}
function btClick(id){
    var x = id % 3;
    var y = 0;
    if(id >= 6){
        y=2;
    }
    else if(id >= 3){
        y=1;
    }
    var envio= {
        x: x,
        y: y
    }
    if(jogando){
        axios.defaults.baseURL = 'http://localhost:8080';
        axios.post('/jogadas', envio)
        .then(function (response) {
            console.log(response);

            if(response.data.fimDeJogo == true){  
                jogando = false;
                document.getElementById("txt-jogador1").disabled = false;
                document.getElementById("txt-jogador2").disabled = false;

                var infos = document.getElementById("infos");
                infos.style.visibility = "visible";
                if(response.data.vencedor == "Empate!"){
                    infos.innerHTML = response.data.vencedor;
                }
                else{
                    infos.innerHTML = response.data.vencedor + " ganhou!";
                }
                
                if(response.data.vencedor == jogador1.nome){
                    jogador1.vitorias += 1;
                    jogador2.derrotas += 1;
                    document.getElementById("vitorias-jogador1").innerHTML = jogador1.vitorias;
                    document.getElementById("derrotas-jogador2").innerHTML = jogador2.derrotas;
                }
                else if(response.data.vencedor == jogador2.nome){
                    jogador2.vitorias += 1;
                    jogador1.derrotas += 1;
                    document.getElementById("vitorias-jogador2").innerHTML = jogador2.vitorias;
                    document.getElementById("derrotas-jogador1").innerHTML = jogador1.derrotas;
                }
            }
            if(response.data.peca == "X"){
                let e = document.getElementById(id);
                e.style.backgroundColor = "green";
                e.innerHTML = "X";
            }                        
            if(response.data.peca == "O"){
                let e = document.getElementById(id);
                e.style.backgroundColor = "red";
                e.innerHTML = "O";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }               
}
function btNomeJogador(id){
    axios.defaults.baseURL = 'http://localhost:8080';

    var txtId = id.replace('bt-','txt-');
    nomeJogador = document.getElementById(txtId).value;
    document.getElementById(txtId).disabled = true;
    if(document.getElementById("txt-jogador1").disabled == true && document.getElementById("txt-jogador2").disabled == true) {
        document.getElementById("jogar").style.visibility = "visible";
    }

    console.log(nomeJogador + "        x" + txtId);
    var envio= {
        nome: nomeJogador
    }
    var post = '/set' + id.replace('bt-','')
    axios.post(post, envio)
    .then(function (response) {
        console.log(response);
        var h2Id = id.replace('bt-','h2-');
        var vitoriasId = id.replace('bt-','vitorias-');
        var derrotasId = id.replace('bt-','derrotas-');
        if(id.replace('bt-','') == 'jogador1'){
            jogador1 = new Jogador(response.data.nome, response.data.vitorias, response.data.derrotas);
        }
        else if(id.replace('bt-','') == 'jogador2'){
            jogador2 = new Jogador(response.data.nome, response.data.vitorias, response.data.derrotas);
        }
        document.getElementById(h2Id).innerHTML = response.data.nome;
        document.getElementById(vitoriasId).innerHTML = response.data.vitorias;
        e = document.getElementById(derrotasId).innerHTML = response.data.derrotas;

    })
    .catch(function (error) {
        console.log(error);
    });
}