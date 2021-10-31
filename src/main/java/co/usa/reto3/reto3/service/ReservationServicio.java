package co.usa.reto3.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.reto3.reto3.model.Reservation;
import co.usa.reto3.reto3.repository.ReservationRepositorio;

@Service
public class ReservationServicio {
    @Autowired
    private ReservationRepositorio reservationRepositorio;

    public List<Reservation>getAll(){
        return reservationRepositorio.getAll();
    }

    public Optional<Reservation>getReservation(int id){
        return reservationRepositorio.getReservation(id);
    }

    public Reservation save(Reservation rsvt){
        if (rsvt.getIdReservation()==null){
            return reservationRepositorio.save(rsvt);

        }else{
            Optional<Reservation> consulta=reservationRepositorio.getReservation(rsvt.getIdReservation());
            if (consulta.isEmpty()) {
                return reservationRepositorio.save(rsvt);
            } else {
                return rsvt;
            }
        }
    }

    public Reservation update(Reservation rsvt){
        if(rsvt.getIdReservation()!=null){
            Optional<Reservation> consulta=reservationRepositorio.getReservation(rsvt.getIdReservation());
            if(!consulta.isEmpty()){
                if(rsvt.getStartDate()!=null){
                    consulta.get().setStartDate(rsvt.getStartDate());
                }
                if(rsvt.getDevolutionDate()!=null){
                    consulta.get().setDevolutionDate(rsvt.getDevolutionDate());
                }
                if(rsvt.getStatus()!=null){
                    consulta.get().setStatus(rsvt.getStatus());
                }
                if(rsvt.getScore()!=null){
                    consulta.get().setScore(rsvt.getScore());
                }
                return reservationRepositorio.save(consulta.get());
            }
        }
        return rsvt;
    }
    public boolean deleteReservation(int idReservation){
        Optional<Reservation> consulta=reservationRepositorio.getReservation(idReservation);
            if (!consulta.isEmpty()) {
                reservationRepositorio.delete(consulta.get());
                return true;

            }
        return false;
    }
}
