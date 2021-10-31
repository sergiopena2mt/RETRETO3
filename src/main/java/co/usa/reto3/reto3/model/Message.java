package co.usa.reto3.reto3.model;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "message")
public class Message implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    //relacion muchos a uno (muchos mensajes un solo computador)
    @ManyToOne
    @JoinColumn(name = "computer")
    @JsonIgnoreProperties({"messages","client","reservations"})
    private Computer computer;

    //relacion muchos a uno (muchos mensajes un solo cliente)
    @ManyToOne
    @JoinColumn(name = "client")
    @JsonIgnoreProperties({"messages","client","reservations"})
    private Client client;

    public Integer getIdMessage() {
        return idMessage;
    }
    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }
    public String getMessageText() {
        return messageText;
    }
    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }
    public Computer getComputer() {
        return computer;
    }
    public void setComputer(Computer computer) {
        this.computer = computer;
    }
    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }

    
}
