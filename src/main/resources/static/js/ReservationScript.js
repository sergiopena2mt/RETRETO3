$(document).ready(function(){
    $("#btnActualizar").hide(); //Para ocultar el botón Guardar mientras no se vaya a editar algo.

})

// funcion para mostrar la tabla con los registros.

function listar() {
    $.ajax({
        url: "http://localhost:8090/api/Reservation/all",
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
                <th>StartDate</th>
                <th>DevolutionDate</th>
                <th>Status</th>
                <th>Score</th>
                <th colspan="2">ACTIONS</th>    
                </tr>`;

    for (var i = 0; i < respuesta.length; i++) { //A través del For llenar la tabla
        tabla += `<tr>
                    <td>${respuesta[i].idReservation}</td>
                    <td>${respuesta[i].startDate}</td>
                    <td>${respuesta[i].devolutionDate}</td>
                    <td>${respuesta[i].status}</td> 
                    <td>${respuesta[i].score}</td> 
                    <td><button onclick="editarRegistro(${respuesta[i].idReservation})">Editar</td>
                    <td><button onclick="borrar(${respuesta[i].idReservation})">Borrar</td>

                </tr>
                `;
    }

    tabla+=`</table>`;

    $("#listado").html(tabla);


}


// funcion para agregar registros a la tabla
function agregar(){
    var datos={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        score:$("#score").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Reservation/save",
        data:datosPeticion,
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Insertado");
            alert("Se guardó la reservación correctamente");
            listar();
        },

        error:function(xhr,status){
            console.log(status);
            alert("No se guardó la reservación correctamente");
        }


    });

    // dejar los campos de inputs vacíos al agregar.
    $("#startDate").val(""),
    $("#devolutionDate").val(""),
    $("#status").val(""),
    $("#score").val("")
} 

// funcion para editar registros seleccionados de la tabla
function editarRegistro(numId) {
    $("#btnActualizar").show(); //mientrás esté 'Editar' mostrar  el btn Guardar
    $("#btnAgregar").hide(); //mientrás esté 'Editar' ocultar  el btn Agregar
    $("#btnListar").hide(); //mientrás esté 'Editar' ocultar  el btn Listar
   
    $.ajax({
        url: "http://localhost:8090/api/Reservation/" + numId,
        type: 'GET',
        dataType: "json",

        success: function (respuesta) { //los datos seleccionados de la tabla los muestre en los inputs.
            console.log(respuesta);
            $("#idReservation").val(respuesta.idReservation);
            $("#startDate").val(respuesta.startDate);
            $("#devolutionDate").val(respuesta.devolutionDate);
            $("#status").val(respuesta.status);
            $("#score").val(respuesta.score);
                   
        },

        error: function (xhr, status) {
            console.log(status);
        }

    });



}

function actualizar(){
    var datos={
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        score:$("#score").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Reservation/update",
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
    $("#startDate").val(""),
    $("#devolutionDate").val(""),
    $("#status").val(""),
    $("#score").val("")
 

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
        url:"http://localhost:8090/api/Reservation/" + numId,
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
