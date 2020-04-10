var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores()
    incializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster({
        trigger:"custom"
    });
});


function atualizaTempoIncial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
};


function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(/\S+/).length - 1;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
};


function inicializaContadores() {
    campo.on("input", function () {

        var conteudoCampo = campo.val();
        var qtdPalavras = conteudoCampo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudoCampo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
};

function incializaCronometro() {

    campo.one("focus", function () {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000)
    });

};

function finalizaJogo() {
    campo.attr("disabled", true);
    //alert("Game Over, bitch!")
    campo.toggleClass("campo-desativado");
    inserePlacar();
};

function inicializaMarcadores() {

    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        // Poderia ter usado um IF
        var ehCorreto = (digitado === comparavel);
        campo.toggleClass("borda-verde", ehCorreto);
        campo.toggleClass("borda-vermelha", !ehCorreto);

    });
};


function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    incializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
};

