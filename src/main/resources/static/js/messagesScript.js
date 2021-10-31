$(document).ready(function(){
    $("#btnActualizar").hide(); //Para ocultar el botón Guardar mientras no se vaya a editar algo.

})

// funcion para mostrar la tabla con los registros.

function listar() {
    $.ajax({
        url: "http://localhost:8090/api/Message/all",
        type: 'GET',
        dataType: "JSON",

        success: function (respuesta) {
            console.log(respuesta);
            listarRespuesta(respuesta);
        },

        error: function (xhr, status) {
            console.log(status);
        }

    });

}

// funcion para crear el cuerpo de la tabla
function listarRespuesta(respuesta) { //Creación de la tabla 'Datos de cabecera'.
    var tabla = `<table border="1">
                <tr>
                <th>Id</th>
                <th>MessageText</th>
                <th colspan="2">ACTIONS</th>    
                </tr>`;

    for (var i = 0; i < respuesta.length; i++) { //A través del For llenar la tabla
        tabla += `<tr>
                    <td>${respuesta[i].idMessage}</td>
                    <td>${respuesta[i].messageText}</td>
                    <td><button onclick="editarRegistro(${respuesta[i].idMessage})">Editar</td>
                    <td><button onclick="borrar(${respuesta[i].idMessage})">Borrar</td>

                </tr>
                `;
    }

    tabla+=`</table>`;

    $("#listado").html(tabla);


}


// funcion para agregar registros a la tabla
function agregar(){
    var datos={
        messageText:$("#messageText").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Message/save",
        data:datosPeticion,
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Insertado");
            alert("Se guardó el mensaje correctamente");
            listar();
        },

        error:function(xhr,status){
            console.log(status);
            alert("No se guardó el mensaje correctamente");
        }


    });

    // dejar los campos de inputs vacíos al agregar.
    $("#messageText").val("")
} 

// funcion para editar registros seleccionados de la tabla
function editarRegistro(numId) {
    $("#btnActualizar").show(); //mientrás esté 'Editar' mostrar  el btn Guardar
    $("#btnAgregar").hide(); //mientrás esté 'Editar' ocultar  el btn Agregar
    $("#btnListar").hide(); //mientrás esté 'Editar' ocultar  el btn Listar
   
    $.ajax({
        url: "http://localhost:8090/api/Message/" + numId,
        type: 'GET',
        dataType: "json",

        success: function (respuesta) { //los datos seleccionados de la tabla los muestre en los inputs.
            console.log(respuesta);
            $("#idMessage").val(respuesta.idMessage);
            $("#messageText").val(respuesta.messageText);
                   
        },

        error: function (xhr, status) {
            console.log(status);
        }

    });



}

function actualizar(){
    var datos={
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Message/update",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Actualizado");
            listar();
        },
        error:function(xhr,status){
            console.log(status);
            alert("No se guardó correctamente");
        }

    });

    // dejar los campos de inputs vacíos al agregar.
    $("#messageText").val("")
 

    //ocultar botón de actualizar y mostrar los botones de Agregar y Listar.
    $("#btnActualizar").hide();
    $("#btnAgregar").show(); 
    $("#btnListar").show(); 
} 
    

// funcion para borrar registros de la Tabla
function borrar(numId){
    var datos={
        id:numId
    }

    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    
    $.ajax({
        url:"http://localhost:8090/api/Message/" + numId,
        data:datosPeticion,
        type:'DELETE',
        contentType:"application/JSON",
        datatype:"JSON",    

        success:function(respuesta){
            console.log("Borrado");
            listar();
            alert("Se ha Eliminado el registro.")
        },
        error:function(xhr,status){
            console.log(status);
        }
    });  
}
