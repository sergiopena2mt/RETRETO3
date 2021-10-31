$(document).ready(function(){
    $("#btnActualizar").hide(); //Para ocultar el botón Guardar mientras no se vaya a editar algo.
    $("#id").prop('disabled',true);


})

// funcion para mostrar la tabla con los registros.

function listar() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8090/api/Category/all",
        type: 'GET',
        dataType: "JSON",

        success: function (respuesta) {
            console.log(respuesta);
            listarRespuesta(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            });   
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
                <th>Name</th>
                <th>Description</th>
                <th colspan="2">Actions</th>    
                </tr>`;

    for (var i = 0; i < respuesta.length; i++) { //A través del For llenar la tabla
        tabla += `<tr>
                    <td>${respuesta[i].id}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].description}</td>
                    <td><button onclick="editarRegistro(${respuesta[i].id})">Editar</td>
                    <td><button onclick="borrar(${respuesta[i].id})">Borrar</td>

                </tr>
                `;
    }

    tabla+=`</table>`;

    $("#listado").html(tabla);


}


// funcion para agregar registros a la tabla
function agregar(){
    var datos={
        name:$("#name").val(),
        description:$("#description").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Category/save",
        data:datosPeticion,
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Insertado");
            alert("Se guardo correctamente");
            listar();
        },

        error:function(xhr,status){
            console.log(status);
            alert("No se guardo correctamente");
        }


    });

    // dejar los campos de inputs vacíos al agregar.
    $("#name").val(""),
    $("#description").val("")
} 

// funcion para editar registros seleccionados de la tabla
function editarRegistro(numId) {
    $("#btnActualizar").show(); //mientrás esté 'Editar' mostrar  el btn Guardar
    $("#btnAgregar").hide(); //mientrás esté 'Editar' ocultar  el btn Agregar
    $("#btnListar").hide(); //mientrás esté 'Editar' ocultar  el btn Listar
   
    $.ajax({
        url: "http://localhost:8090/api/Category/" + numId,
        type: 'GET',
        dataType: "json",

        success: function (respuesta) { //los datos seleccionados de la tabla los muestre en los campos de arriba.
            console.log(respuesta);
            $("#name").val(respuesta.name);
            $("#description").val(respuesta.description);
            $("#id").val(respuesta.id);
        },

        error: function (xhr, status) {
            console.log(status);
        }

    });



}

function actualizar(){
    var datos={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Category/update",
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
            alert("No se guardo correctamente");
        }

    });

    // dejar los campos de inputs vacíos al agregar.
    $("#name").val(""),
    $("#description").val("")

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
        url:"http://localhost:8090/api/Category/" + numId,
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

