package co.usa.reto3.reto3.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.usa.reto3.reto3.model.Computer;
import co.usa.reto3.reto3.service.ComputerServicio;

@RestController
@RequestMapping("api/Computer")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT} )

public class ComputerControlador {
    @Autowired
    private  ComputerServicio computerServicio;
    
    @GetMapping("/all")
    public List<Computer>getComputer(){
        return computerServicio.getAll();
    }

    @GetMapping("/{id}") // rojo: el atributo de la clase
    public Optional<Computer>getComputer(@PathVariable("id") int id){//azul:servicio
        return computerServicio.getComputer(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Computer save(@RequestBody Computer comp){
        return computerServicio.save(comp);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Computer update(@RequestBody Computer comp){
        return computerServicio.update(comp);
    }

    @DeleteMapping("/{id}") // rojo: el atributo de la clase
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteComputer(@PathVariable("id") int idComputer){ //azul:servicio
        return computerServicio.deleteComputer(idComputer);
    }
}
