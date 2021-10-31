$(document).ready(function(){
    $("#btnActualizar").hide(); //Para ocultar el botón Guardar mientras no se vaya a editar algo.

})

// funcion para mostrar la tabla con los registros.

function listar() {
    console.log("Se esté ejecutando")
    $.ajax({
        url: "http://localhost:8090/api/Computer/all",
        type: 'GET',
        dataType: "JSON",

        success: function (respuesta) {
            console.log(respuesta);
            listarRespuesta(respuesta);
                        
            let $select = $("#select-computer");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            });
        },

        
    });

}

// funcion para crear el cuerpo de la tabla
function listarRespuesta(respuesta) { //Creación de la tabla 'Datos de cabecera'.
    var tabla = `<table border="1">
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Year</th>
                <th>Description</th>
                <th colspan="2">ACTIONS</th>    
                </tr>`;

    for (var i = 0; i < respuesta.length; i++) { //A través del For llenar la tabla
        tabla += `<tr>
                    <td>${respuesta[i].id}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].brand}</td>
                    <td>${respuesta[i].year}</td>
                    <td>${respuesta[i].description}</td>
                    <td><button onclick="editarRegistro2(${respuesta[i].id})">Editar</td>
                    <td><button onclick="borrar2(${respuesta[i].id})">Borrar</td>

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
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Computer/save",
        data:datosPeticion,
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Insertado");
            alert("Se guardó el computador correctamente");
            listar();
            window.location.reload()
        },

        error:function(xhr,status){
            console.log(status);
            window.location.reload();
            alert("No se guardó el computador correctamente");
            
        }


    });

    // dejar los campos de inputs vacíos al agregar.
    $("#name").val(""),
    $("#brand").val(""),
    $("#year").val(""),
    $("#description").val("")
} 

// funcion para editar registros seleccionados de la tabla
function editarRegistro(numId) {
    $("#btnActualizar").show(); //mientrás esté 'Editar' mostrar  el btn Guardar
    $("#btnAgregar").hide(); //mientrás esté 'Editar' ocultar  el btn Agregar
    $("#btnListar").hide(); //mientrás esté 'Editar' ocultar  el btn Listar
   
    $.ajax({
        url: "http://localhost:8090/api/Computer/" + numId,
        type: 'GET',
        dataType: "json",

        success: function (respuesta) { //los datos seleccionados de la tabla los muestre en los inputs.
            console.log(respuesta);
            $("#id").val(respuesta.id);
            $("#name").val(respuesta.name);
            $("#brand").val(respuesta.brand);
            $("#year").val(respuesta.year);
            $("#description").val(respuesta.description);
            
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
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Computer/update",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Actualizado");
            listar();
            window.location.reload();
        },
        error:function(xhr,status){
            console.log(status);
            window.location.reload();
            alert("No se guardó correctamente");
        }

    });

    // dejar los campos de inputs vacíos al agregar.
    $("#name").val(""),
    $("#brand").val(""),
    $("#year").val(""),
    $("#description").val(""),

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
        url:"http://localhost:8090/api/Computer/" + numId,
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
