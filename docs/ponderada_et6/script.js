$(document).ready(function() {
    $("#meuBotao").mouseenter(function() {
        $(this).addClass("botao-hover"); // Adiciona a classe quando o cursor entra no botão
    }).mouseleave(function() {
        $(this).removeClass("botao-hover"); // Remove a classe quando o cursor sai do botão
    });

    $("#meuBotao").click(function() {
        abrirLinkedIn();
    });

    function abrirLinkedIn() {
        var url = "https://www.linkedin.com/in/cec%C3%ADlia-alonso-gon%C3%A7alves-3aa4bb271/";
        window.open(url, "_blank");
        window.location.href = window.location.href; // Redireciona de volta à página original
    }
});

$(document).ready(function() {
    $(".titulo").css("background-color", "orange");
  });
  
