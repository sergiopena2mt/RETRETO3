package co.usa.reto3.reto3.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.reto3.reto3.model.Reservation;
import co.usa.reto3.reto3.repository.crud.ReservationCrudRepositorio;

@Repository
public class ReservationRepositorio {
    @Autowired
    private ReservationCrudRepositorio reservationCrudRepositorio;


    public List<Reservation>getAll(){
        return (List<Reservation>)reservationCrudRepositorio.findAll();
    }

    public Optional<Reservation>getReservation(int id){
        return reservationCrudRepositorio.findById(id);
    }

    public Reservation save(Reservation rsvt){
        return reservationCrudRepositorio.save(rsvt);
    }
    public void delete(Reservation rsvt){
        reservationCrudRepositorio.delete(rsvt);
    }
}
