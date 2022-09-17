const TickeControl = require('../models/ticket-control');


const ticketControl = new TickeControl(); // Esta es una instancia que va a ser unica, cada vez que se reinicializa su backend


const socketController = (socket) => { // Controlador que va a manejar toda la informacion de Sockets
    
    /*socket.on('disconnect', () => {}); */

    //TODO:notificar que hay un nuevo ticket pendiente de asignar
    socket.emit( 'ultimo-ticket', ticketControl.ultimo ); //emitir un mensaje solo a la persona que se esta conectando


    socket.on('siguiente-ticket', ( payload, callback ) => { // 'enviar-mensaje' es el nombre que se le da al evento 

        const siguiente = ticketControl.siguiente();
        callback( siguiente ); //El callback manda un objeto String que es el ticket.numero


    })

}



module.exports = {
    socketController
}

