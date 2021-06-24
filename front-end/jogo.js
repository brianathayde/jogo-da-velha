
var jogando = false;
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
                var e = document.getElementById("jogar");
                e.style.visibility = "visible";   

                e = document.getElementById("infos");
                e.style.visibility = "visible";   
                e.innerHTML = response.data.vencedor;
                if(response.data.peca == "X"){
                    e = document.getElementById(id);
                    e.style.backgroundColor = "green";
                    e.innerHTML = "X";
                }
                if(response.data.peca == "O"){
                    e = document.getElementById(id);
                    e.style.backgroundColor = "red";
                    e.innerHTML = "O";
                }
            }
            else{
                if(response.data.peca == "X"){
                    var e = document.getElementById(id);
                    e.style.backgroundColor = "green";
                    e.innerHTML = "X";
                }                        
                if(response.data.peca == "O"){
                    var e = document.getElementById(id);
                    e.style.backgroundColor = "red";
                    e.innerHTML = "O";
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }               
}