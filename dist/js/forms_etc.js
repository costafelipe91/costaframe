$(document).ready(function() {
    $(".fone").mask("(99)9999-9999?9");
    $(".uf").mask("aa");
    $(".cep").mask("99999-999");
    $(".cpf").mask("999.999.999-99");
    $(".cnpj").mask("99.999.999/9999-99");
    $(".data").mask("99/99/9999");
    $(".hora").mask("99:99");
    $(".valor").maskMoney({
        decimal: ",",
        thousands: "."
    });

    $(".grouped_elements").fancybox();

    /*LIMPAR CAMPOS EDIT*/
    $("#limpa").click(function(event) {
        event.preventDefault();
        document.formEdit.reset();
    });

    /*SALVAR CAMPOS*/
    $("#salvarContato").click(function(event) {
        event.preventDefault();
        $("#formContato").submit();
    });
    
    $("#salvarTrabalhe").click(function(event) {
        event.preventDefault();
        $("#formTrabalhe").submit();
    });

    $("#formEdit").validar({
        "marcar": false
    });

    $("#formTrabalhe").validar({
        "marcar": false
    });

    $("#formContato").validar({
        "after": function() {
            $("#enviando").show();
            $.post(URLBASE + 'contatos/enviar', this.serialize(), function(data) {
                if (data.ok) {
                    $('#enviando').html('<h2>Obrigado por entrar em contato! <br/>Retornaremos em breve...<h2>');
                } else {
                    $('#enviando').html('<h2>Ops! N&atilde;o conseguimos receber seu contato... <br/>Tente novamente mais tarde!</h2>');
                }
                
            }, 'json');
            return false;
        },
        "marcar": false
    });

    $("#formFranqueado").validar({
        "after": function() {
            $('#details-contact').hide();
            $("#franqueado-loading").show();
            $.post(URLBASE + 'index/franqueado', this.serialize(), function(data) {
                if (data.ok) {
                    $('#details-contact').html('Obrigado por entrar em contato! <br/>Retornaremos em breve...');
                    setTimeout(function(){ location.href = URLBASE; }, 4000);
                } else {
                    $('#details-contact').html('Ops! N&atilde;o conseguimos receber seu contato... <br/>Tente novamente mais tarde!');
                }
                $('#details-contact').show(200);
                
            }, 'json');
            return false;
        },
        "marcar": false
    });

    /*LIMPAR CAMPOS LOGIN*/
    $("#limpaLog").click(function(event) {
        event.preventDefault();
        document.formLogin.reset();
    });

    url = window.location.href.split('#');

    if(url[1]){
        $('html, body').animate({
            scrollTop: $('#'+url[1]).offset().top
        }, 250);
    }
});

function menuMaluco(idDiv){
    $('body').attr("class", "menu-hide");
    $('html, body').animate({
        scrollTop: $(idDiv).offset().top
    }, 250);
}

//VERIFICA O 9 DIGITO DO TELEFONE
function verificaTelefone(puti){
    valor = $(puti).val();
    valor = valor.replace('_', '');
    //console.log(valor);
    if(valor.length > 13){
        //console.log(14);
        $(puti).mask('(99)99999-9999');
    }else{
        //console.log(13);
        $(puti).mask('(99)9999-9999?9');
    }
}

function mask(o, f) {
    setTimeout(function () {
        var v = f(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function validationPhone(v) {
    var r = v.replace(/\D/g,"");
    r = r.replace(/^0/,"");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d\d)(\d{5})(\d{4}).*/,"+$1 ($2) $3-$4");
    }
    else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d\d)(\d{4})(\d{0,4}).*/,"+$1 ($2) $3-$4");
    }
    else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d\d)(\d{0,5})/,"+$1 ($2) $3");
    }
    else {
        r = r.replace(/^(\d\d)(\d*)/, "+$1 ($2");
    }
    return r;
}

function atualizarProjetos(servicoId){
    $(".item-projeto").hide(200);

    $(".titulo-projeto").html($(".titulo-servico-"+servicoId).html());

    $(".servico-"+servicoId).show(500);

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#desc-service").offset().top
    }, 1000);
}