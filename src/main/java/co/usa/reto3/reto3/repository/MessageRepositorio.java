package co.usa.reto3.reto3.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto3.reto3.model.Message;
import co.usa.reto3.reto3.repository.crud.MessageCrudRepositorio;

@Repository
public class MessageRepositorio {
    @Autowired
    private MessageCrudRepositorio messageCrudRepositorio;


    public List<Message>getAll(){
        return (List<Message>)messageCrudRepositorio.findAll();
    }

    public Optional<Message>getMessage(int id){
        return messageCrudRepositorio.findById(id);
    }

    public Message save(Message msge){
        return messageCrudRepositorio.save(msge);
    }
    public void delete(Message msge){
        messageCrudRepositorio.delete(msge);
    }
}
