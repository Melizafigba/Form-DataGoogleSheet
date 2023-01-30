$('#btn_consultar').click(function() {
    fn_obtenerValor();
})

$('#btn_consultarClima').click(function() {
    fn_obtenerClima();
})

// MOUSE OVER: EVENTO QUE SE DESENCADENA AL PASAR EL MOUSE POR ENCIMA
$('#txt_indicador').mouseover(function() {
    $('#txt_indicador').addClass('is-valid');
})

// MOUSE OUT: EVENTO QUE SE DESENCADENA AL SALIR CON EL MOUSE DE UN CONTROL
$('#txt_indicador').mouseout(function() {
    $('#txt_indicador').removeClass('is-valid');
})

// KEY DOWN: EVNETO QUE SE DESENCADENA AL PRESIONAR (HACIA ABAJO) UNA TECLA.
// E: ENTREGA INFORMACIÓN DEL EVENTO. EN ESTE CASO LO UTILIZAMOS PARA SABER LA TECLA QUE SE PRESIONÓ
$('#txt_indicador').keydown(function(e) {
    console.log(e.keyCode);

    if(e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 'enter' || e.keyCode == 'tab') {
        var valor = $('#txt_indicador').val();

        //CASO DE QUE LA API RESPONDA DE FORMA CORRECTA (STATUS CODE 200, 201, 202)
        $.getJSON('https://api.gael.cloud/general/public/monedas/' + valor, function(data) {

            if(data.Valor == undefined) {
                $('#txt_valorObtenido').val(data.message);
            } else {
                $('#txt_valorObtenido').val(data.Valor);
            }
        //CASO DE QUE LA API RESPONDA CON ERROR (STATUS CODE 500)
        }).fail(function() {
            $('#txt_valorObtenido').val("EL VALOR INGRESADO NO ARROJÓ INFORMACIÓN");
        });
    }
});

$('#txt_indicador').keyup(function(e) {
    var valor = $('#txt_indicador').val();

    if(valor.length > 3){
        valor = valor.substring(0, 3);
    }
    
    $('#txt_indicador').val(valor);
});




function fn_obtenerValor() {
    $.getJSON('https://mindicador.cl/api', function(data) {
        var indicadores = data;
        var seleccion = $('#cmb_indicador option:selected').text();
        var valor = '';

        if(seleccion.toUpperCase() == 'DÓLAR') {
            valor = 'Dólar: ' + indicadores.dolar.valor;
        } else if(seleccion.toUpperCase() == 'EURO') {
            valor = 'Euro: ' + indicadores.euro.valor;
        } else if(seleccion.toUpperCase() == 'UF') {
            valor = 'UF: ' + indicadores.uf.valor;
        } else {
            valor = "Debe seleccionar un valor";
        }

        $('#txt_valor').val(valor);        
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}

function fn_obtenerClima() {
    $.getJSON('https://api.gael.cloud/general/public/clima', function(data) {
        var climas = data;
        $("#listaClimas").empty();

        for (x of climas) {
           $("#listaClimas").append("<li>" + x.Estacion 
                + " - " + x.Temp + "° - " + x.Estado + "</li>")
        }

        $('#txt_valor').val(valor);        
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}

//Prueba2 JS


$("#btn_limpiar").click(function() {
    
    $('#txt_rut').val('');
    $('#txt_nombre').val('');
    $('#txt_appaterno').val('');
    $('#txt_apmaterno').val('');
    $('#txt_correo').val('');
    $('#txt_rut').removeClass('is-valid')
    $('#txt_rut').removeClass('is-invalid')

    $('#txt_nombre').removeClass('is-valid')
    $('#txt_nombre').removeClass('is-invalid')

    $('#txt_appaterno').removeClass('is-valid')
    $('#txt_appaterno').removeClass('is-invalid')

    $('#txt_apmaterno').removeClass('is-valid')
    $('#txt_apmaterno').removeClass('is-invalid')

    $('#txt_correo').removeClass('is-valid')
    $('#txt_correo').removeClass('is-invalid')

    $('#errores').text('')
}); 

$("#btn_registro").click(function() {
    
    $("#errores").empty();

     /***********Consumir API de RUT************ */
    $.getJSON('https://api.libreapi.cl/rut/validate' , {rut: $('#txt_rut').val()},function(data) {
        var respuesta = data;
        var valido = respuesta.data.valid;
        if (valido){
            $('#txt_rut').addClass('is-valid')
            $('#txt_rut').removeClass('is-invalid')

        } else{
            $('#errores').append('<li> RUT inválido, corríjalo para continuar.');
            $('#txt_rut').addClass('is-invalid');
            $('#txt_rut').removeClass('is-valid');
            }   
        }).fail(function() {
            $('#errores').append('<li> RUT inválido, corríjalo para continuar.');
            $('#txt_rut').addClass('is-invalid');
            $('#txt_rut').removeClass('is-valid');
            
        });

    
    /*************Validadores de contenido**********************/
    usuario = $("#txt_nombre").val();
    if(usuario == "") {
            validador = 1;
            $("#errores").append('<li> Debe ingresar un nombre </li>');
            $('#txt_nombre').removeClass('is-valid')
            $('#txt_nombre').addClass('is-invalid');
    }
    else{  
            $('#txt_nombre').removeClass('is-invalid')
            $('#txt_nombre').addClass('is-valid');
    };

    apellido1 = $("#txt_appaterno").val();
    if(apellido1 == "") {
            validador = 1;
            $("#errores").append('<li> Debe ingresar el apellido paterno </li>');
            $('#txt_appaterno').removeClass('is-valid')
            $('#txt_appaterno').addClass('is-invalid');
    }else{  
            $('#txt_appaterno').removeClass('is-invalid')
            $('#txt_appaterno').addClass('is-valid');
    };

    apellido2 = $("#txt_apmaterno").val();
    if(apellido2 == "") {
            validador = 1;
            $("#errores").append('<li> Debe ingresar el apellido materno </li>');
            $('#txt_apmaterno').removeClass('is-valid')
            $('#txt_apmaterno').addClass('is-invalid');
    }else{  
            $('#txt_apmaterno').removeClass('is-invalid')
            $('#txt_apmaterno').addClass('is-valid');
    };


    mail = $("#txt_correo").val();
    if(mail == "") {
            validador = 1;
            $("#errores").append('<li> Debe ingresar un mail </li>');
            $('#txt_correo').removeClass('is-valid')
            $('#txt_correo').addClass('is-invalid');
    }else{  
            $('#txt_correo').removeClass('is-invalid')
            $('#txt_correo').addClass('is-valid');
    };


   
    
});

/******Notificacion temporal****** */
function mensaje(){
if( $('#errores').text()==""){
    $('.toast').toast({ delay: 8000 });
    $('.toast').toast('show');
    
}

}



