$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);         
    }).always(function(){
        $("#spinner").toggle();
    })
};

function trocaFraseAleatoria(data){
        let frase = $(".frase");
        let numeroAleatorio = Math.floor(Math.random() * data.length);
        frase.text(data[numeroAleatorio].texto);        
        atualizaTamanhoFrase();
        atualizaTempoIncial(data[numeroAleatorio].tempo);
 };

 function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = {id : fraseId}; //criacao do objeto JS que guarda a id
    //passando objeto como segundo parâmetro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

 function trocaFrase(data){
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoIncial(data.tempo);
 }