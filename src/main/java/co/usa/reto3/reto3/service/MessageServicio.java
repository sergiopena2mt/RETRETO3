package co.usa.reto3.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto3.reto3.model.Message;
import co.usa.reto3.reto3.repository.MessageRepositorio;

@Service
public class MessageServicio {
    @Autowired
    private MessageRepositorio messageRepositorio;

    public List<Message>getAll(){
        return messageRepositorio.getAll();
    }

    public Optional<Message>getMessage(int id){
        return messageRepositorio.getMessage(id);
    }

    public Message save(Message msge){
        if (msge.getIdMessage()==null){
            return messageRepositorio.save(msge);

        }else{
            Optional<Message> consulta=messageRepositorio.getMessage(msge.getIdMessage());
            if (consulta.isEmpty()) {
                return messageRepositorio.save(msge);
            } else {
                return msge;
            }
        }
    }

    public Message update(Message msge){
        if(msge.getIdMessage()!=null){
            Optional<Message> consulta=messageRepositorio.getMessage(msge.getIdMessage());
            if(!consulta.isEmpty()){
                if(msge.getMessageText()!=null){
                    consulta.get().setMessageText(msge.getMessageText());
                }
                return messageRepositorio.save(consulta.get());
            }
        }
        return msge;
    }
    public boolean deleteMessage(int idMessage){
        Optional<Message> consulta=messageRepositorio.getMessage(idMessage);
            if (!consulta.isEmpty()) {
                messageRepositorio.delete(consulta.get());
                return true;

            }
        return false;
    }
}
