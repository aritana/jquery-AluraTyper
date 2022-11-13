var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//To be called when the page is full loaded.
$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
})


function atualizaTamanhoFrase() {
    var phrase = $(".phrase").text();
    var words = phrase.split(" ");
    var numberOfWords = words.length;
    var phraseLength = $("#phrase-length");
    phraseLength.text(numberOfWords);
}

function inicializaContadores() {
    campo.on("input", function () {        
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres)

    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroId = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroId);
                $("#botao-reiniciar").attr("disabled", false);
            }

        }, 1000)
    })
}

function reiniciaJogo() {
  
        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text(0);
        $("#contador-caracteres").text(0);
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();    
}
$("#botao-reiniciar").on("click",reiniciaJogo);