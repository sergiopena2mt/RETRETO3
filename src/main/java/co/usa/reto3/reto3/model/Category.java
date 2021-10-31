package co.usa.reto3.reto3.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "category")
public class Category implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;

    //Relación uno a muchos (una categoria muchos computadores)
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "category") //mapea a atributo que está en la otra tabla
    @JsonIgnoreProperties("category")
    private List<Computer> computers;


    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public List<Computer> getComputers() {
        return computers;
    }
    public void setComputers(List<Computer> computers) {
        this.computers = computers;
    }

    
}
