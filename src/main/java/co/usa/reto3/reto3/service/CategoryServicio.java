package co.usa.reto3.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto3.reto3.model.Category;
import co.usa.reto3.reto3.repository.CategoryRepositorio;

@Service
public class CategoryServicio {
    @Autowired
    private CategoryRepositorio categoryRepositorio;

    public List<Category>getAll(){
        return categoryRepositorio.getAll();
    }

    public Optional<Category>getCategory(int id){
        return categoryRepositorio.getCategory(id);
    }

    public Category save(Category catg){
        if (catg.getId()==null){
            return categoryRepositorio.save(catg);

        }else{
            Optional<Category> consulta=categoryRepositorio.getCategory(catg.getId());
            if (consulta.isEmpty()) {
                return categoryRepositorio.save(catg);
            } else {
                return catg;
            }
        }
    }

    public Category update(Category catg){
        if(catg.getId()!=null){
            Optional<Category> consulta=categoryRepositorio.getCategory(catg.getId());
            if(!consulta.isEmpty()){
                if(catg.getDescription()!=null){
                    consulta.get().setDescription(catg.getDescription());
                }
                if(catg.getName()!=null){
                    consulta.get().setName(catg.getName());
                }
                return categoryRepositorio.save(consulta.get());
            }
        }
        return catg;
    }
    public boolean deleteCategory(int id){
        Optional<Category> consulta=categoryRepositorio.getCategory(id);
            if (!consulta.isEmpty()) {
                categoryRepositorio.delete(consulta.get());
                return true;

            }
        return false;
    }
}
