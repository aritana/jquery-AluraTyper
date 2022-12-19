var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//To be called when the page is full loaded.
$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcador();
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
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000)
    })
}

function finalizaJogo() {
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcador() {
    var frase = $(".phrase").text();

    campo.on("input", function () {
        // campo.attr("border-color","green");
        var digitado = campo.val().trim();
        var comparavel = frase.substring(0, digitado.length);


        console.log("digitado:" + digitado);
        console.log("comparavel:" + comparavel);


        if (digitado == comparavel) {
            campo.removeClass("borda-vermelha");
            campo.addClass("borda-verde");
            console.log("certo");
        } else {
            campo.removeClass("borda-verde");
            campo.addClass("borda-vermelha");
            console.log("errado");
        }
    })
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

function inserePlacar() {
    var tbodyTable = $(".placar").find("tbody");
    var user = "Aritana";
    var numPalavas = $("#contador-palavras").text();

    console.log(numPalavas);
    
    var row = "<tr>" +
                  "<td>"+ user + "</td>"+
                  "<td>"+ numPalavas + "</td>"+
        "</tr>";
    tbodyTable.append(row);

}

$("#botao-reiniciar").on("click", reiniciaJogo);