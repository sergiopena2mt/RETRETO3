package co.usa.reto3.reto3.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto3.reto3.model.Client;
import co.usa.reto3.reto3.repository.crud.ClientCrudRepositorio;

@Repository
public class ClientRepositorio {
    @Autowired
    private ClientCrudRepositorio clientCrudRepositorio;

    public List<Client>getAll(){
        return (List<Client>)clientCrudRepositorio.findAll();
    }

    public Optional<Client>getClient(int id){
        return clientCrudRepositorio.findById(id);
    }

    public Client save(Client clie){
        return clientCrudRepositorio.save(clie);
 
    }
    public void delete(Client clie){
        clientCrudRepositorio.delete(clie);
    }
}
