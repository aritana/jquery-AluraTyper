var phrase = $(".phrase").text();
var words = phrase.split(" ");
var numberOfWords = words.length;
var phraseLength = $("#phrase-length");

phraseLength.text(numberOfWords);

var campo = $(".campo-digitacao");
campo.on("input", function () {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres)

});

var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function () {
    var cronometroId = setInterval(function () {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante)
       console.log(tempoRestante)
        if (tempoRestante < 1) {
            campo.attr("disabled", true)
            clearInterval(cronometroId);
        }

    }, 1000)
})

