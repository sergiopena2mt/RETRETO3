package co.usa.reto3.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto3.reto3.model.Computer;
import co.usa.reto3.reto3.repository.ComputerRepositorio;

@Service
public class ComputerServicio {
    @Autowired
    private ComputerRepositorio computerRepositorio;

    public List<Computer>getAll(){
        return computerRepositorio.getAll();
    }

    public Optional<Computer>getComputer(int id){
        return computerRepositorio.getComputer(id);
    }

    public Computer save(Computer comp){
        if (comp.getId()==null){
            return computerRepositorio.save(comp);

        }else{
            Optional<Computer> consulta=computerRepositorio.getComputer(comp.getId());
            if (consulta.isEmpty()) {
                return computerRepositorio.save(comp);
            } else {
                return comp;
            }
        }
    }

    public Computer update(Computer comp){
        if(comp.getId()!=null){
            Optional<Computer> consulta=computerRepositorio.getComputer(comp.getId());
            if(!consulta.isEmpty()){
                if(comp.getName()!=null){
                    consulta.get().setName(comp.getName());
                }
                if(comp.getBrand()!=null){
                    consulta.get().setBrand(comp.getBrand());
                }
                if(comp.getYear()!=null){
                    consulta.get().setYear(comp.getYear());
                }
                if(comp.getDescription()!=null){
                    consulta.get().setDescription(comp.getDescription());
                }
                return computerRepositorio.save(consulta.get());
            }
        }
        return comp;
    }
    public boolean deleteComputer(int id){
        Optional<Computer> consulta=computerRepositorio.getComputer(id);
            if (!consulta.isEmpty()) {
                computerRepositorio.delete(consulta.get());
                return true;

            }
        return false;
    }
}
