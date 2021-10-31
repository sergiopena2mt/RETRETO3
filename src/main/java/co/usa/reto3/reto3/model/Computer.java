package co.usa.reto3.reto3.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "computer")
public class Computer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String brand;
    private Integer year;
    private String description;


    /**
     * relacion muchos a uno (muchos computadores una sola categoria)
     */
    @ManyToOne
    @JoinColumn(name = "category")
    @JsonIgnoreProperties("computers")
    private Category category;

    /**
     * relacion uno a muchos (un computador muchos mensajes)
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "computer") //mapea a atributo que está en la otra tabla
    @JsonIgnoreProperties({"computer","client"})
    private List<Message> messages;

    /**
     * relacion uno a muchos (un computador muchas reservas)
    */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "computer") //mapea a atributo que está en la otra tabla
    @JsonIgnoreProperties({"computer","client"})
    private List<Reservation> reservations;


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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    

   
    
}
