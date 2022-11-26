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
                campo.attr("disabled", true);
                clearInterval(cronometroId);
                $("#botao-reiniciar").attr("disabled", false);
                campo.toggleClass("campo-desativado");
            }

        }, 1000)
    })
}


function inicializaMarcador(){
    var frase = $(".phrase").text();
   
    campo.on("input",function(){
        //campo.attr("border-color","green");
        var digitando = campo.val();
        var comparavel = frase.substring(0,digitando.length);

        if(digitando.localeCompare(comparavel)==0){
            campo.addClass("borda-verde"); 
            campo.removeClass("borda-vermelha");
            console.log("certo");
        }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde"); 
            console.log("errad");
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

$("#botao-reiniciar").on("click",reiniciaJogo);