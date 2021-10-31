package co.usa.reto3.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto3.reto3.model.Client;
import co.usa.reto3.reto3.repository.ClientRepositorio;

@Service
public class ClientServicio {
    @Autowired
    private ClientRepositorio clientRepositorio;

    public List<Client>getAll(){
        return clientRepositorio.getAll();
    }

    public Optional<Client>getClient(int id){
        return clientRepositorio.getClient(id);
    }

    public Client save(Client clie){
        if (clie.getIdClient()==null){
            return clientRepositorio.save(clie);

        }else{
            Optional<Client> consulta=clientRepositorio.getClient(clie.getIdClient());
            if (consulta.isEmpty()) {
                return clientRepositorio.save(clie);
            } else {
                return clie;
            }
        }
    }

    public Client update(Client clie){
        if(clie.getIdClient()!=null){
            Optional<Client> consulta=clientRepositorio.getClient(clie.getIdClient());
            if(!consulta.isEmpty()){
                if(clie.getEmail()!=null){
                    consulta.get().setEmail(clie.getEmail());
                }
                if(clie.getPassword()!=null){
                    consulta.get().setPassword(clie.getPassword());
                }
                if(clie.getName()!=null){
                    consulta.get().setName(clie.getName());
                }
                if(clie.getAge()!=null){
                    consulta.get().setAge(clie.getAge());
                }
                return clientRepositorio.save(consulta.get());
            }
        }
        return clie;
    }
    public boolean deleteClient(int idClient){
        Optional<Client> consulta=clientRepositorio.getClient(idClient);
            if (!consulta.isEmpty()) {
                clientRepositorio.delete(consulta.get());
                return true;

            }
        return false;
    }
}

