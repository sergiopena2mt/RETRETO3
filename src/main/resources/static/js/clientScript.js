$(document).ready(function(){
    $("#btnActualizar").hide(); //Para ocultar el botón Guardar mientras no se vaya a editar algo.

})

// funcion para mostrar la tabla con los registros.

function listar() {
    $.ajax({
        url: "http://localhost:8090/api/Client/all",
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
                <th>Email</th>
                <th>Password</th>
                <th>Name</th>
                <th>Age</th>
                <th colspan="2">ACTIONS</th>    
                </tr>`;

    for (var i = 0; i < respuesta.length; i++) { //A través del For llenar la tabla
        tabla += `<tr>
                    <td>${respuesta[i].idClient}</td>
                    <td>${respuesta[i].email}</td>
                    <td>${respuesta[i].password}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].age}</td>
                    <td><button onclick="editarRegistro(${respuesta[i].idClient})">Editar</td>
                    <td><button onclick="borrar(${respuesta[i].idClient})">Borrar</td>

                </tr>
                `;
    }

    tabla+=`</table>`;

    $("#listado").html(tabla);


}


// funcion para agregar registros a la tabla
function agregar(){
    var datos={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Client/save",
        data:datosPeticion,
        type:'POST',
        contentType:"application/json; charset=utf-8",
        dataType: 'JSON',

        success:function(respuesta){
            console.log("Insertado");
            alert("Se guardó el cliente correctamente");
            listar();
        },

        error:function(xhr,status){
            console.log(status);
            alert("No se guardó el cliente correctamente");
        }


    });

    // dejar los campos de inputs vacíos al agregar.
    $("#email").val(""),
    $("#password").val(""),
    $("#name").val(""),
    $("#age").val("")
} 

// funcion para editar registros seleccionados de la tabla
function editarRegistro(numId) {
    $("#btnActualizar").show(); //mientrás esté 'Editar' mostrar  el btn Guardar
    $("#btnAgregar").hide(); //mientrás esté 'Editar' ocultar  el btn Agregar
    $("#btnListar").hide(); //mientrás esté 'Editar' ocultar  el btn Listar
   
    $.ajax({
        url: "http://localhost:8090/api/Client/" + numId,
        type: 'GET',
        dataType: "json",

        success: function (respuesta) { //los datos seleccionados de la tabla los muestre en los inputs.
            console.log(respuesta);
            $("#idClient").val(respuesta.idClient);
            $("#email").val(respuesta.email);
            $("#password").val(respuesta.password);
            $("#name").val(respuesta.name);
            $("#age").val(respuesta.age);
            
        },

        error: function (xhr, status) {
            console.log(status);
        }

    });



}

function actualizar(){
    var datos={
        idClient:$("#idClient").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    }
    
    let datosPeticion = JSON.stringify(datos); //convertir los datos en json    

    $.ajax({
        url:"http://localhost:8090/api/Client/update",
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
    $("#email").val(""),
    $("#password").val(""),
    $("#name").val(""),
    $("#age").val("")
 

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
        url:"http://localhost:8090/api/Client/" + numId,
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
